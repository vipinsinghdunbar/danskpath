import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
// Support persistent disk on Render (/data), Fly.io (/data), and local
const DATA_DIR = fs.existsSync('/data') ? '/data' : __dirname;
const DB_FILE = path.join(DATA_DIR, 'danish-platform-db.json');
const JWT_SECRET = process.env.JWT_SECRET || 'danskpath-secret-key-change-in-prod';
const JWT_EXPIRES = '30d';
const NODE_ENV = process.env.NODE_ENV || 'development';
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '').split(',').filter(Boolean);

// Security: warn if using default secret in production
if (NODE_ENV === 'production' && JWT_SECRET === 'danskpath-secret-key-change-in-prod') {
  console.warn('⚠️  SECURITY: Using default JWT_SECRET in production! Set JWT_SECRET env var!');
}

// === Security Headers (helmet-like without dependency) ===
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '0'); // Disable old XSS filter, rely on CSP
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(self), geolocation=()');
  if (NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
  // CSP: allow self, fonts.googleapis, inline styles needed for Tailwind
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self' https:; worker-src 'self'; manifest-src 'self'");
  res.removeHeader('X-Powered-By');
  next();
});

// === CORS - restricted in production ===
const corsOptions = {
  origin: (origin, cb) => {
    // Allow no origin (mobile apps, curl, same-origin)
    if (!origin) return cb(null, true);
    if (ALLOWED_ORIGINS.length === 0) {
      // Dev: allow all, Prod: allow trycloudflare + render + vercel + localhost
      if (NODE_ENV !== 'production') return cb(null, true);
      const allowedPatterns = ['trycloudflare.com', 'danskpath', 'render.com', 'vercel.app', 'localhost', '127.0.0.1'];
      const isAllowed = allowedPatterns.some(p => origin.includes(p));
      return cb(null, isAllowed);
    }
    return cb(null, ALLOWED_ORIGINS.includes(origin));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));

// === Rate Limiting (in-memory) ===
const rateLimitStore = new Map();
function rateLimit({ windowMs = 15*60*1000, max = 100, keyPrefix = 'rl' } = {}) {
  return (req, res, next) => {
    const key = `${keyPrefix}:${req.ip}:${req.path}`;
    const now = Date.now();
    const entry = rateLimitStore.get(key) || { count: 0, reset: now + windowMs };
    if (now > entry.reset) {
      entry.count = 0;
      entry.reset = now + windowMs;
    }
    entry.count++;
    rateLimitStore.set(key, entry);
    if (entry.count > max) {
      return res.status(429).json({ error: 'Too many requests, try again later', retryAfter: Math.ceil((entry.reset - now)/1000) });
    }
    next();
  };
}
// Clean old entries every 10 min
setInterval(() => {
  const now = Date.now();
  for (const [k,v] of rateLimitStore.entries()) if (now > v.reset) rateLimitStore.delete(k);
}, 10*60*1000);

// === Input sanitization helper ===
function sanitizeString(s, maxLen = 500) {
  if (typeof s !== 'string') return '';
  return s.slice(0, maxLen).replace(/[<>]/g, '').trim();
}

// Serve frontend build + public assets
const distPath = path.join(__dirname, 'dist');
const publicPath = path.join(__dirname, 'public');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, { maxAge: '1d', etag: true }));
}
if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath, { maxAge: '1d' }));
}

// DB helpers
function initDB() {
  if (!fs.existsSync(DB_FILE)) {
    const initial = {
      users: [],
      referrals: [],
      trials: [],
      assessments: [],
      feedback: [],
      learningPaths: [],
      surveys: [],
      rewards: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2));
    return initial;
  }
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch {
    return { users: [], referrals: [], trials: [], assessments: [], feedback: [], learningPaths: [], surveys: [], rewards: [] };
  }
}

function readDB() {
  return initDB();
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Ensure admin Vipin exists
function ensureAdmin() {
  const db = readDB();
  let admin = db.users.find(u => u.role === 'admin' && u.name === 'Vipin');
  if (!admin) {
    const hash = bcrypt.hashSync('vipin123', 10); // default password, can be changed
    admin = {
      id: uuidv4(),
      name: 'Vipin',
      email: 'vipin@danskpath.dk',
      role: 'admin',
      passwordHash: hash,
      createdAt: new Date().toISOString(),
      danishStartDate: '2023-01-15',
      targetLevel: 'PD3',
      goals: ['child_school', 'job_interview', 'pd3'],
      status: 'active'
    };
    db.users.push(admin);
    writeDB(db);
    console.log('✅ Admin Vipin created: email vipin@danskpath.dk / password vipin123');
  }
  return admin;
}

ensureAdmin();

// Auth middleware
function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'No token' });
  const token = header.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

function adminMiddleware(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  next();
}

// Question bank for adaptive assessment (varied)
const questionBank = [
  { id: 1, category: "grammar", type: "V2", q: "Vælg korrekt: ___ arbejder jeg hjemme.", options: ["I dag","I dag jeg","I dag er jeg"], a: 0, why: "V2: tid først → inversion. 'I dag arbejder jeg'.", level: "A2" },
  { id: 2, category: "grammar", type: "Ledsætning", q: "Jeg ved, at han ___ kommer.", options: ["ikke","kommer ikke","ikke kommer"], a: 2, why: "Ledsætning: ikke FØR verbet.", level: "B1" },
  { id: 3, category: "grammar", type: "Sin/sit", q: "Hun elsker ___ mand.", options: ["sin","hendes","hans"], a: 0, why: "Sin = tilbage til subjektet.", level: "B1" },
  { id: 4, category: "grammar", type: "Ligge/lægge", q: "Bogen ___ på bordet.", options: ["ligger","lægger","sidder"], a: 0, why: "Ligge = tilstand, lægge = handling.", level: "A2" },
  { id: 5, category: "grammar", type: "Præpositioner", q: "Jeg har boet her ___ 3 år.", options: ["i","på","om"], a: 0, why: "'I' + tid = varighed.", level: "A2" },
  { id: 6, category: "vocab", type: "Kollokationer", q: "Hvad betyder 'holde et møde'?", options: ["To have a meeting","To leave a meeting","To cancel"], a: 0, why: "Kollokation: holde et møde = have a meeting.", level: "B1" },
  { id: 7, category: "vocab", type: "Partikelverber", q: "At 'slå op' betyder:", options: ["To look up / break up","To close","To open"], a: 0, why: "Partikelverber: slå op = look up.", level: "B1" },
  { id: 8, category: "listening", type: "Reduktion", q: "Hvad betyder reduktionen 'd'er'?", options: ["det er","der er","det var"], a: 0, why: "det er → d'er.", level: "B1" },
  { id: 9, category: "culture", type: "Samfund", q: "Hvor mange medlemmer i Folketinget?", options: ["179","150","200"], a: 0, why: "179 medlemmer.", level: "B1" },
  { id: 10, category: "culture", type: "Arbejdsmarked", q: "Hvad er 'flexicurity'?", options: ["Let at fyre + dagpenge + aktiv indsats","Kun lav skat","Kun høj løn"], a: 0, why: "Dansk model: let at fyre, dagpenge.", level: "B1" },
  { id: 11, category: "grammar", type: "Relativ", q: "Det er manden, ___ bor ved siden af.", options: ["der","som","hvis"], a: 0, why: "Der = subjekt i relativsætning.", level: "B1" },
  { id: 12, category: "grammar", type: "Modalpartikler", q: "Det er ___ klart, at vi skal hjælpe. (fælles viden)", options: ["jo","da","vel"], a: 0, why: "Jo = som du ved.", level: "B2" },
  { id: 13, category: "vocab", type: "Kollokationer", q: "At 'tage stilling til' betyder:", options: ["To take a stance","To stand up","To take a chair"], a: 0, why: "Kollokation: tage stilling til.", level: "B1" },
  { id: 14, category: "reading", type: "PD3 format", q: "PD3 gapped text tester:", options: ["Sammenhæng og bindeord","Kun stavning","Kun udtale"], a: 0, why: "Gapped text: sammenhæng.", level: "B1" },
  { id: 15, category: "writing", type: "Skrivning", q: "PD3 Delprøve 4 kræver:", options: ["150-200 ord med indledning, argumenter, konklusion","10 ord","Kun sms"], a: 0, why: "150-200 ord, struktur.", level: "B2" },
  // Additional varied questions for adaptive
  { id: 16, category: "grammar", type: "V2", q: "___ kommer bussen ikke?", options: ["Hvorfor","Hvorfor kommer","Hvorfor kommer ikke"], a: 0, why: "Hvorfor = hv-ord, V2 efter.", level: "A2" },
  { id: 17, category: "grammar", type: "Flertal", q: "Jeg har to ___", options: ["bil","biler","bilen"], a: 1, why: "Flertal: to biler.", level: "A2" },
  { id: 18, category: "vocab", type: "Kollokationer", q: "'Træffe en beslutning' betyder:", options: ["Make a decision","Meet a decision","Find a decision"], a: 0, why: "Træffe en beslutning = make a decision.", level: "B1" },
  { id: 19, category: "listening", type: "Telefon", q: "I telefonen: 'Jeg stiller dig om' betyder:", options: ["I transfer you","I stop you","I call you"], a: 0, why: "Stille om = transfer call.", level: "B1" },
  { id: 20, category: "reading", type: "Forståelse", q: "Hvad er hovedpointen i PD3 læsning?", options: ["Forstå holdning og argumentation","Kun finde datoer","Kun oversætte ord"], a: 0, why: "PD3 tester forståelse af holdning.", level: "B2" },
  { id: 21, category: "grammar", type: "Adjektiv", q: "En ___ bil (stor)", options: ["stor","stort","store"], a: 0, why: "En stor bil (fælleskøn).", level: "B1" },
  { id: 22, category: "grammar", type: "Adjektiv", q: "Et ___ hus (stor)", options: ["stor","stort","store"], a: 1, why: "Et stort hus (intetkøn).", level: "B1" },
  { id: 23, category: "writing", type: "Bindeord", q: "Bedste bindeord for argumentation:", options: ["For det første, derudover, til sidst","Og, og, og","Hej, hej, hej"], a: 0, why: "PD3: for det første, derudover, til sidst.", level: "B2" },
  { id: 24, category: "vocab", type: "Arbejde", q: "'Holde fyraften' betyder:", options: ["Finish work","Hold a party","Keep working"], a: 0, why: "Holde fyraften = finish work.", level: "B1" },
];

function calculateResult(answers) {
  // answers: { questionId: selectedOptionIndex }
  let correct = 0;
  const byCategory = {};
  const byType = {};
  const wrongTypes = [];
  
  questionBank.forEach(q => {
    const userAns = answers[q.id];
    const isCorrect = userAns === q.a;
    if (isCorrect) correct++;
    else wrongTypes.push(q.type);
    
    if (!byCategory[q.category]) byCategory[q.category] = { correct: 0, total: 0 };
    byCategory[q.category].total++;
    if (isCorrect) byCategory[q.category].correct++;
    
    if (!byType[q.type]) byType[q.type] = { correct: 0, total: 0 };
    byType[q.type].total++;
    if (isCorrect) byType[q.type].correct++;
  });

  const total = Object.keys(answers).length || questionBank.length;
  const pct = Math.round((correct / total) * 100);
  
  let level = "Modul 2 (A1-A2)";
  if (pct >= 40 && pct < 65) level = "Modul 3 (A2)";
  else if (pct >= 65 && pct < 80) level = "Modul 4 (B1)";
  else if (pct >= 80) level = "Modul 5 (B1-B2) - PD3 klar";

  const strengths = [];
  const weaknesses = [];
  Object.entries(byCategory).forEach(([cat, stats]) => {
    const catPct = Math.round((stats.correct / stats.total) * 100);
    if (catPct >= 70) strengths.push(cat);
    else if (catPct < 60) weaknesses.push(cat);
  });

  // Recommended path
  const path = [];
  if (weaknesses.includes('grammar') || wrongTypes.includes('V2')) path.push({ step: 1, title: "V2 + inversion", why: "80% of B1 errors are V2. Fastest win.", time: "Week 1-2" });
  if (weaknesses.includes('vocab')) path.push({ step: path.length+1, title: "Collocations: holde møde, træffe beslutning", why: "You need words that work in speech, not single words.", time: "Week 2-3" });
  if (weaknesses.includes('listening')) path.push({ step: path.length+1, title: "Listening without transcript", why: "Danish swallows 25% syllables. Second time you understand 30% more.", time: "Week 3-4" });
  if (weaknesses.includes('writing') || wrongTypes.includes('Bindeord')) path.push({ step: path.length+1, title: "Writing 150-200 words with structure", why: "PD3 requires indledning, 2 arguments, konklusion with bindeord.", time: "Week 4-6" });
  if (path.length < 4) {
    path.push({ step: path.length+1, title: "Culture + PD3 exam format", why: "Folketing 179, flexicurity, jantelov — needed for Delprøve 1.", time: "Week 6-8" });
  }
  if (path.length < 4) {
    path.push({ step: path.length+1, title: "Speaking: hold coffee break in Danish", why: "Vent lidt, hvad mener du? — keep conversation in Danish.", time: "Ongoing" });
  }

  const timeline = pct < 40 ? "6-9 months to PD3 with 15 min/day, 4 days/week" : pct < 65 ? "4-6 months to PD3" : pct < 80 ? "2-4 months to PD3" : "1-2 months to PD3 — close!";

  return { correct, total, pct, level, byCategory, byType, strengths, weaknesses, path, timeline, wrongTypes };
}

// ========== AUTH ==========
app.post('/api/auth/setup', rateLimit({ max: 5, windowMs: 60*1000, keyPrefix: 'setup' }), (req, res) => {
  const admin = ensureAdmin();
  res.json({ ok: true, admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role } });
});

app.post('/api/auth/register', rateLimit({ max: 10, windowMs: 15*60*1000, keyPrefix: 'register' }), (req, res) => {
  const { name, email, password, guestData } = req.body;
  const identifier = sanitizeString(name || email || '', 100);
  const pwd = password || '';
  
  if(!identifier || identifier.length < 3) return res.status(400).json({ error: 'Username must be at least 3 characters' });
  if(!pwd || pwd.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });
  if(pwd.length > 128) return res.status(400).json({ error: 'Password too long' });
  
  const db = readDB();
  if(db.users.find(u=>u.name===identifier || u.email===identifier)) {
    return res.status(400).json({ error: 'Username already exists' });
  }
  
  // Parse guest progress including Fortsæt her cleared stages
  let guestProgress = {};
  let guestScores = {};
  let clearedStages = {};
  try {
    if(guestData?.progress) guestProgress = JSON.parse(guestData.progress);
    if(guestData?.scores) guestScores = JSON.parse(guestData.scores);
    // Check for cleared stages in guestData
    if(guestData?.clearedStages) clearedStages = JSON.parse(guestData.clearedStages);
    // Also parse from progress if it contains stage clear flags
    Object.keys(guestData || {}).forEach(k=>{
      if(k.startsWith('stage_') && k.endsWith('_cleared')) {
        clearedStages[k] = guestData[k];
      }
    });
  } catch {}
  
  const newUser = {
    id: uuidv4(),
    name: identifier,
    email: identifier.includes('@') ? identifier : `${identifier}@danskpath.local`,
    passwordHash: bcrypt.hashSync(pwd, 10),
    role: 'learner',
    createdAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
    goals: [],
    // Transfer guest data if provided
    guestDiagnostic: guestData?.diagnostic ? JSON.parse(guestData.diagnostic) : null,
    guestLevel: guestData?.level || null,
    guestVerdict: guestData?.verdict ? JSON.parse(guestData.verdict) : null,
    guestGoals: guestData?.goals ? JSON.parse(guestData.goals) : [],
    guestProgress: guestProgress,
    guestScores: guestScores,
    // NEW: Fortsæt her progress sync — persist cleared stages + progress across devices
    progress: {
      ...guestProgress,
      clearedStages: clearedStages,
      lastSyncedAt: new Date().toISOString(),
      overall: 0
    },
    scores: guestScores,
    clearedStages: clearedStages,
    lastActiveAt: new Date().toISOString()
  };
  
  db.users.push(newUser);
  writeDB(db);
  
  const token = jwt.sign({ id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  res.json({ ok: true, token, user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, level: newUser.guestLevel, progress: newUser.progress, clearedStages: newUser.clearedStages } });
});

app.post('/api/auth/login', rateLimit({ max: 10, windowMs: 15*60*1000, keyPrefix: 'login' }), (req, res) => {
  const { email, password, name } = req.body;
  if (!password || typeof password !== 'string' || password.length < 3 || password.length > 128) {
    return res.status(400).json({ error: 'Invalid password format' });
  }
  const db = readDB();
  
  // Allow login by name or email - sanitize
  const identifier = sanitizeString(email || name || '', 200);
  const user = db.users.find(u => u.email === identifier || u.name === identifier || u.email === name);
  if (!user) return res.status(401).json({ error: 'User not found. Default admin: Vipin / vipin123 (change in production)' });
  
  const valid = bcrypt.compareSync(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: 'Wrong password' });
  
  // Update last active
  user.lastActiveAt = new Date().toISOString();
  writeDB(db);
  
  const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  res.json({ ok: true, token, user: { 
    id: user.id, 
    name: user.name, 
    email: user.email, 
    role: user.role, 
    goals: user.goals,
    level: user.guestLevel || user.level,
    progress: user.progress || user.guestProgress || {},
    scores: user.scores || user.guestScores || {},
    clearedStages: user.clearedStages || user.progress?.clearedStages || {},
    diagnostic: user.guestDiagnostic,
    verdict: user.guestVerdict
  }});
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
  const db = readDB();
  const user = db.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ ok: true, user: { 
    id: user.id, 
    name: user.name, 
    email: user.email, 
    role: user.role, 
    goals: user.goals, 
    danishStartDate: user.danishStartDate,
    level: user.guestLevel || user.level,
    progress: user.progress || user.guestProgress || {},
    scores: user.scores || user.guestScores || {},
    clearedStages: user.clearedStages || user.progress?.clearedStages || {},
    diagnostic: user.guestDiagnostic,
    verdict: user.guestVerdict,
    lastActiveAt: user.lastActiveAt
  }});
});

app.post('/api/auth/change-password', authMiddleware, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const db = readDB();
  const user = db.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (!bcrypt.compareSync(currentPassword, user.passwordHash)) return res.status(401).json({ error: 'Wrong current password' });
  user.passwordHash = bcrypt.hashSync(newPassword, 10);
  writeDB(db);
  res.json({ ok: true });
});

// ========== PROGRESS SYNC — Fortsæt her + Markér færdig ✓ persists across devices ==========
app.get('/api/progress', authMiddleware, (req, res) => {
  const db = readDB();
  const user = db.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  
  res.json({
    ok: true,
    progress: user.progress || user.guestProgress || {},
    scores: user.scores || user.guestScores || {},
    clearedStages: user.clearedStages || user.progress?.clearedStages || {},
    level: user.guestLevel || user.level,
    diagnostic: user.guestDiagnostic,
    verdict: user.guestVerdict,
    lastSyncedAt: user.progress?.lastSyncedAt || user.lastActiveAt
  });
});

app.post('/api/progress', authMiddleware, (req, res) => {
  const { progress, scores, clearedStages, level } = req.body;
  const db = readDB();
  const user = db.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  
  // Merge progress — keep existing + new, server wins for cleared stages (persist across devices)
  if(progress) {
    user.progress = {
      ...(user.progress || {}),
      ...(user.guestProgress || {}),
      ...progress,
      clearedStages: {
        ...(user.clearedStages || {}),
        ...(user.progress?.clearedStages || {}),
        ...(clearedStages || {}),
        ...(progress.clearedStages || {})
      },
      lastSyncedAt: new Date().toISOString()
    };
  }
  if(scores) {
    user.scores = { ...(user.scores || {}), ...(user.guestScores || {}), ...scores };
  }
  if(clearedStages) {
    user.clearedStages = {
      ...(user.clearedStages || {}),
      ...(user.progress?.clearedStages || {}),
      ...clearedStages
    };
    // Also sync to progress.clearedStages
    if(user.progress) {
      user.progress.clearedStages = { ...(user.progress.clearedStages || {}), ...clearedStages };
    }
  }
  if(level) {
    user.level = level;
    user.guestLevel = level;
  }
  user.lastActiveAt = new Date().toISOString();
  
  writeDB(db);
  
  res.json({
    ok: true,
    progress: user.progress,
    scores: user.scores,
    clearedStages: user.clearedStages,
    lastSyncedAt: user.progress.lastSyncedAt
  });
});

app.post('/api/progress/stage/:moduleId/clear', authMiddleware, (req, res) => {
  const { moduleId } = req.params; // m1, m2, m3, m4, m5
  const { grammarDone } = req.body;
  
  if(!['m1','m2','m3','m4','m5'].includes(moduleId)) {
    return res.status(400).json({ error: 'Invalid moduleId, must be m1-m5' });
  }
  
  const db = readDB();
  const user = db.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  
  // Mark stage cleared — Fortsæt her + Markér færdig ✓ persists across devices
  const clearedKey = `stage_${moduleId}_cleared`;
  if(!user.clearedStages) user.clearedStages = {};
  user.clearedStages[clearedKey] = 'true';
  
  if(!user.progress) user.progress = {};
  if(!user.progress.clearedStages) user.progress.clearedStages = {};
  user.progress.clearedStages[clearedKey] = 'true';
  user.progress.lastSyncedAt = new Date().toISOString();
  
  // Also mark grammar topics as done
  if(grammarDone && Array.isArray(grammarDone)) {
    grammarDone.forEach(t=>{
      user.progress[`grammar_${t}`] = true;
    });
  }
  
  // Calculate overall progress
  const totalStages = 5;
  const clearedCount = Object.keys(user.clearedStages).filter(k=>k.endsWith('_cleared') && user.clearedStages[k]==='true').length;
  user.progress.overall = Math.round((clearedCount / totalStages) * 100);
  user.lastActiveAt = new Date().toISOString();
  
  writeDB(db);
  
  console.log(`✅ Progress sync: user ${user.name} cleared ${moduleId} → ${clearedCount}/${totalStages} = ${user.progress.overall}%`);
  
  res.json({
    ok: true,
    moduleId,
    cleared: true,
    clearedStages: user.clearedStages,
    progress: user.progress,
    overall: user.progress.overall,
    message: `Stage ${moduleId} marked done ✓ — persists across devices`
  });
});

app.post('/api/progress/stage/:moduleId/unclear', authMiddleware, (req, res) => {
  const { moduleId } = req.params;
  const db = readDB();
  const user = db.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  
  const clearedKey = `stage_${moduleId}_cleared`;
  if(user.clearedStages) delete user.clearedStages[clearedKey];
  if(user.progress?.clearedStages) delete user.progress.clearedStages[clearedKey];
  if(user.progress) user.progress.lastSyncedAt = new Date().toISOString();
  user.lastActiveAt = new Date().toISOString();
  writeDB(db);
  
  res.json({ ok: true, moduleId, cleared: false, clearedStages: user.clearedStages || {} });
});

app.post('/api/progress/sync', authMiddleware, (req, res) => {
  const { progress, scores, clearedStages, level, diagnostic, verdict } = req.body;
  const db = readDB();
  const user = db.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  
  // Full sync from client localStorage to server — merge, server keeps cleared stages
  const serverCleared = user.clearedStages || user.progress?.clearedStages || {};
  const clientCleared = clearedStages || progress?.clearedStages || {};
  
  // Merge: server cleared + client cleared (union) — once cleared, stays cleared across devices
  const mergedCleared = { ...serverCleared, ...clientCleared };
  
  user.progress = {
    ...(user.progress || {}),
    ...(user.guestProgress || {}),
    ...(progress || {}),
    clearedStages: mergedCleared,
    lastSyncedAt: new Date().toISOString()
  };
  user.scores = { ...(user.scores || {}), ...(user.guestScores || {}), ...(scores || {}) };
  user.clearedStages = mergedCleared;
  if(level) { user.level = level; user.guestLevel = level; }
  if(diagnostic) user.guestDiagnostic = diagnostic;
  if(verdict) user.guestVerdict = verdict;
  user.lastActiveAt = new Date().toISOString();
  
  writeDB(db);
  
  res.json({
    ok: true,
    progress: user.progress,
    scores: user.scores,
    clearedStages: user.clearedStages,
    level: user.level,
    lastSyncedAt: user.progress.lastSyncedAt,
    message: 'Progress synced — persists across devices'
  });
});

// ========== REFERRALS ==========
app.post('/api/referrals', authMiddleware, adminMiddleware, (req, res) => {
  const db = readDB();
  const code = uuidv4().slice(0, 8);
  const referral = {
    id: uuidv4(),
    code,
    link: `${req.body.baseUrl || ''}/?ref=${code}`,
    createdBy: req.user.id,
    createdByName: req.user.name,
    createdAt: new Date().toISOString(),
    uses: 0,
    note: req.body.note || ''
  };
  db.referrals.push(referral);
  writeDB(db);
  res.json({ ok: true, referral });
});

app.get('/api/referrals', authMiddleware, adminMiddleware, (req, res) => {
  const db = readDB();
  const refs = db.referrals.filter(r => r.createdBy === req.user.id).reverse();
  res.json({ ok: true, referrals: refs });
});

// ========== TRIAL FLOW ==========
app.get('/api/questions', (req, res) => {
  // Return adaptive varied questions — randomize 15 from bank
  const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 15);
  // Don't send answers
  const publicQs = selected.map(q => ({ id: q.id, category: q.category, type: q.type, q: q.q, options: q.options, level: q.level }));
  res.json({ ok: true, questions: publicQs });
});

app.post('/api/trial/start', rateLimit({ max: 20, windowMs: 15*60*1000, keyPrefix: 'trial_start' }), (req, res) => {
  const { code, name, danishStartDate, goal, email } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });
  // Sanitize
  const cleanName = sanitizeString(name, 100);
  const cleanEmail = sanitizeString(email || '', 200);
  if (cleanName.length < 2) return res.status(400).json({ error: 'Name too short' });
  
  const db = readDB();
  let referral = null;
  if (code) {
    referral = db.referrals.find(r => r.code === code);
    if (referral) {
      referral.uses++;
    }
  }

  const trial = {
    id: uuidv4(),
    referralId: referral?.id || null,
    code: code ? sanitizeString(code, 50) : null,
    name: cleanName,
    email: cleanEmail,
    danishStartDate: sanitizeString(danishStartDate || '', 50),
    goal: sanitizeString(goal || '', 100),
    invitedBy: referral?.createdByName || sanitizeString(req.body.invitedBy || 'Vipin', 100),
    invitedById: referral?.createdBy || null,
    status: 'started',
    createdAt: new Date().toISOString(),
    completedAt: null,
    assessmentId: null,
    feedbackId: null
  };
  
  db.trials.push(trial);
  writeDB(db);
  res.json({ ok: true, trial });
});

app.post('/api/trial/assessment', (req, res) => {
  const { trialId, answers, timeSpent } = req.body;
  if (!trialId || !answers) return res.status(400).json({ error: 'trialId and answers required' });
  
  const db = readDB();
  const trial = db.trials.find(t => t.id === trialId);
  if (!trial) return res.status(404).json({ error: 'Trial not found' });

  const result = calculateResult(answers);
  
  const assessment = {
    id: uuidv4(),
    trialId,
    userId: null,
    type: 'trial',
    answers,
    score: result.correct,
    total: result.total,
    pct: result.pct,
    level: result.level,
    breakdown: result.byCategory,
    strengths: result.strengths,
    weaknesses: result.weaknesses,
    recommendedPath: result.path,
    timeline: result.timeline,
    timeSpent: timeSpent || 0,
    createdAt: new Date().toISOString()
  };
  
  db.assessments.push(assessment);
  trial.assessmentId = assessment.id;
  trial.status = 'assessed';
  trial.completedAt = new Date().toISOString();
  writeDB(db);
  
  res.json({ ok: true, assessment, result });
});

app.post('/api/trial/feedback', (req, res) => {
  const { trialId, wouldUse, helpful, wouldPay, whatToChange, nps } = req.body;
  if (!trialId) return res.status(400).json({ error: 'trialId required' });
  
  const db = readDB();
  const trial = db.trials.find(t => t.id === trialId);
  if (!trial) return res.status(404).json({ error: 'Trial not found' });

  const fb = {
    id: uuidv4(),
    trialId,
    wouldUse: wouldUse || '',
    helpful: helpful || '',
    wouldPay: wouldPay || '',
    whatToChange: whatToChange || '',
    nps: nps || null,
    createdAt: new Date().toISOString()
  };
  
  db.feedback.push(fb);
  trial.feedbackId = fb.id;
  trial.status = 'completed';
  writeDB(db);
  
  res.json({ ok: true, feedback: fb });
});

// ========== ADMIN ==========
app.get('/api/admin/trials', authMiddleware, adminMiddleware, (req, res) => {
  const db = readDB();
  const trials = db.trials.map(t => {
    const assessment = db.assessments.find(a => a.id === t.assessmentId);
    const feedback = db.feedback.find(f => f.id === t.feedbackId);
    return { ...t, assessment, feedback };
  }).reverse();
  res.json({ ok: true, trials });
});

app.get('/api/admin/stats', authMiddleware, adminMiddleware, (req, res) => {
  const db = readDB();
  const trials = db.trials;
  const avgPct = trials.length ? Math.round(trials.filter(t => {
    const a = db.assessments.find(x => x.id === t.assessmentId);
    return a;
  }).reduce((s, t) => {
    const a = db.assessments.find(x => x.id === t.assessmentId);
    return s + (a?.pct || 0);
  }, 0) / (trials.filter(t => db.assessments.find(x => x.id === t.assessmentId)).length || 1)) : 0;
  
  const byLevel = {};
  const wouldUse = { Yes: 0, Maybe: 0, No: 0 };
  const wouldPay = { Yes: 0, Maybe: 0, No: 0 };
  
  db.assessments.forEach(a => {
    if (a.level) byLevel[a.level] = (byLevel[a.level] || 0) + 1;
  });
  db.feedback.forEach(f => {
    if (f.wouldUse) wouldUse[f.wouldUse] = (wouldUse[f.wouldUse] || 0) + 1;
    if (f.wouldPay) wouldPay[f.wouldPay] = (wouldPay[f.wouldPay] || 0) + 1;
  });

  res.json({
    ok: true,
    totalTrials: trials.length,
    totalAssessments: db.assessments.length,
    totalFeedback: db.feedback.length,
    avgPct,
    byLevel,
    wouldUse,
    wouldPay,
    recent: trials.slice(-5).reverse().map(t => {
      const a = db.assessments.find(x => x.id === t.assessmentId);
      return { ...t, assessment: a };
    })
  });
});

app.get('/api/admin/trial/:id', authMiddleware, adminMiddleware, (req, res) => {
  const db = readDB();
  const trial = db.trials.find(t => t.id === req.params.id);
  if (!trial) return res.status(404).json({ error: 'Not found' });
  const assessment = db.assessments.find(a => a.id === trial.assessmentId);
  const feedback = db.feedback.find(f => f.id === trial.feedbackId);
  res.json({ ok: true, trial, assessment, feedback });
});

// Legacy endpoints for backward compat
app.post('/api/trial', (req, res)=>{
  const db = readDB();
  const trial = {
    id: req.body.id || `trial_${Date.now()}`,
    timestamp: new Date().toISOString(),
    name: req.body.name || 'Anonym',
    email: req.body.email || '',
    invitedBy: req.body.invitedBy || '',
    level: req.body.level,
    pct: req.body.pct,
    score: req.body.score,
    total: req.body.total,
    breakdown: req.body.breakdown,
    lacking: req.body.lacking,
    path: req.body.path,
    timeSpent: req.body.timeSpent,
  };
  db.trials.push(trial);
  writeDB(db);
  res.json({ ok: true, trial });
});

app.get('/api/trials', (req, res)=>{
  const db = readDB();
  res.json(db.trials.slice(-100).reverse());
});

app.get('/api/stats', (req, res)=>{
  const db = readDB();
  const trials = db.trials;
  const avgPct = trials.length ? Math.round(trials.reduce((s,t)=>{
    const a = db.assessments.find(x=>x.id===t.assessmentId);
    return s+(a?.pct||t.pct||0);
  },0)/trials.length) : 0;
  const byLevel = {};
  trials.forEach(t=>{
    const a = db.assessments.find(x=>x.id===t.assessmentId);
    const lvl = a?.level || t.level;
    if(lvl) byLevel[lvl]= (byLevel[lvl]||0)+1;
  });
  res.json({ totalTrials: trials.length, avgPct, byLevel, recent: trials.slice(-5).reverse() });
});

// Security & Compliance endpoints
app.get('/api/health', (req,res)=>res.json({ ok: true, time: new Date().toISOString(), users: readDB().users.length, env: NODE_ENV, secure: NODE_ENV === 'production' ? JWT_SECRET !== 'danskpath-secret-key-change-in-prod' : true }));

app.get('/api/security/audit', (req,res)=>{
  const issues = [];
  if (JWT_SECRET === 'danskpath-secret-key-change-in-prod') issues.push({ level: 'high', msg: 'Default JWT_SECRET in use', fix: 'Set JWT_SECRET env var 32+ chars' });
  if (NODE_ENV !== 'production') issues.push({ level: 'info', msg: 'Running in development mode' });
  res.json({
    ok: issues.filter(i=>i.level==='high').length===0,
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'HSTS': NODE_ENV==='production',
      'CSP': true,
      'CORS-restricted': ALLOWED_ORIGINS.length>0 || NODE_ENV==='production'
    },
    rateLimit: true,
    inputValidation: true,
    auth: { jwt: true, bcrypt: true, expiry: JWT_EXPIRES },
    storage: { type: 'json-file', encrypted: false, recommendation: 'Use Postgres for production at scale' },
    pii: { collected: ['name','email','danishStartDate','goal','assessment answers'], stored: 'local JSON + localStorage', gdprReady: false },
    issues
  });
});

// GDPR: Data deletion & export (user rights)
app.delete('/api/user/data', authMiddleware, (req,res)=>{
  const db = readDB();
  const uid = req.user.id;
  db.trials = db.trials.filter(t=> t.invitedById !== uid && t.email !== req.user.email);
  db.assessments = db.assessments.filter(a=> a.userId !== uid);
  // Keep user but anonymize if requested
  if (req.query.anonymize === 'true') {
    const u = db.users.find(u=>u.id===uid);
    if (u) { u.email = `deleted_${uid}@deleted.local`; u.name = 'Deleted User'; }
  }
  writeDB(db);
  res.json({ ok: true, message: 'Data deletion processed. For full account deletion contact privacy@danskpath.dk' });
});

app.get('/api/user/export', authMiddleware, (req,res)=>{
  const db = readDB();
  const uid = req.user.id;
  const userTrials = db.trials.filter(t=> t.email === req.user.email || t.invitedById === uid);
  const userAssessments = db.assessments.filter(a=> userTrials.some(t=>t.id===a.trialId));
  res.json({ ok: true, user: db.users.find(u=>u.id===uid), trials: userTrials, assessments: userAssessments, exportedAt: new Date().toISOString() });
});

// Explicit public routes that should serve index.html (fix broken links — user reported)
const publicRoutes = ['/assessment', '/architecture', '/privacy', '/terms', '/security', '/roadmap', '/website', '/practice', '/path', '/login', '/admin', '/share', '/diagnostic', '/progress', '/levels', '/flow'];
publicRoutes.forEach(route => {
  app.get(route, (req, res)=>{
    const distIndex = path.join(__dirname, 'dist', 'index.html');
    if (fs.existsSync(distIndex)) return res.sendFile(distIndex);
    // Dev fallback
    return res.json({ ok: true, route, message: `Route ${route} — frontend on :5173 in dev, dist not built yet` });
  });
});
// Also handle pretty URLs with trailing slash
app.get('/.well-known/security.txt', (req,res)=>{
  res.type('text/plain').send(`Contact: mailto:security@danskpath.dk
Expires: 2027-09-27T00:00:00.000Z
Acknowledgments: https://danskpath.app/security
Preferred-Languages: en, da
Canonical: https://${req.get('host')}/.well-known/security.txt
Policy: https://${req.get('host')}/security
`);
});

// Shareable assessment info endpoint
app.get('/api/assessment/info', (req, res)=>{
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  res.json({
    ok: true,
    url: `${baseUrl}/?page=assessment`,
    prettyUrl: `${baseUrl}/assessment`,
    qrPath: `/assessment-qr`,
    title: 'DanskPath — Find your Danish level',
    description: '7-min adaptive Danish test. From Modul 1 to PD3. Get your personal learning path.',
    instructions: {
      share: 'Copy link or download QR',
      inPerson: 'Show QR, they scan with camera',
      linkedIn: 'Download QR + post with link',
      email: 'Paste link + QR image',
      presentation: 'Full-screen QR slide',
      print: 'QR on handout, A4, poster'
    },
    privacy: 'QR opens public assessment only. No admin dashboard, no personal data. Each learner gets independent trialId.'
  });
});

// SPA fallback - serve index.html for all non-API routes (production)
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API not found', path: req.path });
  }
  
  const distIndex = path.join(__dirname, 'dist', 'index.html');
  const publicIndex = path.join(__dirname, 'public', 'index.html');
  
  if (fs.existsSync(distIndex)) {
    return res.sendFile(distIndex);
  }
  if (fs.existsSync(publicIndex)) {
    return res.sendFile(publicIndex);
  }
  
  // Dev mode fallback
  res.json({ 
    ok: true, 
    message: 'DanskPath API running — dev mode, frontend on :5173',
    version: 'M1→PD3 full education',
    endpoints: ['/api/auth/login', '/api/questions', '/api/trial/start', '/api/assessment/info', '/api/health'],
    shareable: {
      assessment: '/?page=assessment',
      prettyAssessment: '/assessment',
      website: '/',
      fullApp: '/?page=practice',
      admin: '/?page=admin'
    },
    env: process.env.NODE_ENV || 'development'
  });
});

app.listen(PORT, '0.0.0.0', ()=>{
  console.log(`🚀 DanskPath API + DB running on http://0.0.0.0:${PORT}`);
  console.log(`📁 DB file: ${DB_FILE} (exists: ${fs.existsSync(DB_FILE)})`);
  console.log(`📂 Dist exists: ${fs.existsSync(path.join(__dirname, 'dist'))}`);
  console.log(`👤 Admin: Vipin / vipin123 (change after first login)`);
  console.log(`🌐 Public URL: ${process.env.RENDER_EXTERNAL_URL || process.env.VERCEL_URL || `http://localhost:${PORT}`}`);
  console.log(`🔗 Assessment: /?page=assessment or /assessment`);
});
