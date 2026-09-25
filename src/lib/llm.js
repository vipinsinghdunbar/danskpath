export function getLLMConfig() {
  try {
    return JSON.parse(localStorage.getItem('dansk_llm')||'null');
  } catch { return null; }
}
export function saveLLMConfig(cfg) {
  localStorage.setItem('dansk_llm', JSON.stringify(cfg));
}

export async function callLLM({ system, user, maxTokens=600 }) {
  const cfg = getLLMConfig();
  if(!cfg || !cfg.apiKey) throw new Error("Ingen API-nøgle. Tilføj den i Indstillinger.");
  const provider = cfg.provider || "openai";

  if(provider === "openai") {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cfg.apiKey}`
      },
      body: JSON.stringify({
        model: cfg.model || "gpt-4o-mini",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user }
        ],
        max_tokens: maxTokens,
        temperature: 0.7
      })
    });
    if(!res.ok) {
      const txt = await res.text();
      throw new Error(`OpenAI fejl ${res.status}: ${txt.slice(0,300)}`);
    }
    const data = await res.json();
    return data.choices?.[0]?.message?.content || "";
  } else if(provider === "anthropic") {
    // Anthropic does not allow CORS from browser - try anyway, warn user
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": cfg.apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: cfg.model || "claude-3-5-haiku-20241022",
        max_tokens: maxTokens,
        system,
        messages: [{ role: "user", content: user }]
      })
    });
    if(!res.ok) {
      const txt = await res.text();
      throw new Error(`Anthropic fejl ${res.status}: ${txt.slice(0,400)}. Tip: Anthropic blokerer ofte browser-kald. Brug OpenAI-nøgle eller en proxy.`);
    }
    const data = await res.json();
    return data.content?.[0]?.text || "";
  }
  throw new Error("Ukendt provider");
}

export async function getWritingFeedback(task, text) {
  const system = `Du er en dansk PD3-eksaminator. Giv feedback på dansk (men forklar svære ting på engelsk hvis nødvendigt). Vurder:
1. Indhold og opgaveopfyldelse
2. Sammenhæng (bindeord, V2, ledsætninger)
3. Ordforråd (kollokationer)
4. Grammatik (nutid/datid, en/et, inversion)
5. Forslag til bedre formulering (2-3 konkrete rettelser)

Svar i dette format:
**Overordnet:** (1 sætning)
**Styrker:** 2-3 punkter
**Fejl at rette:** 2-3 konkrete fejl med rettelse
**Bedre version:** Omskriv 1-2 sætninger mere idiomatisk
**Karakter (PD3 skala):** 02/4/7/10/12

Vær opmuntrende men ærlig. Brug dansk.`;
  const user = `Opgave: ${task.title} - ${task.prompt}\n\nElevens tekst:\n${text}`;
  return await callLLM({ system, user, maxTokens: 700 });
}

export async function getConversationReply(scenario, history) {
  const system = `${scenario.systemPrompt}\nDu er i scenariet: ${scenario.title}. Niveau ${scenario.level}. Svar på dansk, max 2-3 sætninger. Hvis brugeren skriver på engelsk, svar venligt på dansk og opfordre til dansk. Ret ikke grammatik medmindre bedt om det. Vær naturlig, brug reduktioner nogle gange (d'er, ik, skaddu).`;
  const user = history.map(m=>`${m.role==='user'?'Bruger':'Dig'}: ${m.content}`).join('\n') + "\n\nSvar som 'Dig':";
  return await callLLM({ system, user, maxTokens: 200 });
}

// Rule-based fallback — improved offline heuristics (no API key needed)
export function ruleBasedWritingFeedback(task, text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const sentences = text.split(/[.!?]+/).filter(s=>s.trim().length>0);
  const lower = text.toLowerCase();
  const issues = [];
  const strengths = [];
  const fixes = [];

  // Length
  if(words < task.minWords) issues.push(`For kort: ${words} ord, skal være mindst ${task.minWords}. Tilføj 1-2 sætninger med fordi/derfor.`);
  else if(words > (task.maxWords||200)+30) issues.push(`For lang: ${words} ord, PD3 vil have max ${task.maxWords||200}. Skær 1 sætning.`);
  else strengths.push(`God længde: ${words} ord — inden for ${task.minWords}-${task.maxWords||200}.`);

  // Personal style
  if(!lower.includes("jeg")) issues.push("Brug 'jeg' — personlig stil forventes i PD3 Delprøve 4.");
  else strengths.push("Du bruger 'jeg' — godt, personlig stil.");

  // Connectors
  const connectors = ["fordi","derfor","selvom","selv om","men","så","også","derudover","for det første","på den anden side","til sidst","desuden","nemlig"];
  const foundConnectors = connectors.filter(c=>lower.includes(c));
  if(foundConnectors.length===0) {
    issues.push("Tilføj bindeord: 'fordi', 'derfor', 'selvom', 'derudover' — PD3 giver 25% for sammenhæng.");
    fixes.push("Tilføj: 'Jeg synes det fordi...' eller 'Derfor mener jeg...'");
  } else if(foundConnectors.length>=2) strengths.push(`God brug af bindeord: ${foundConnectors.slice(0,3).join(', ')}.`);
  else strengths.push(`Du bruger bindeord (${foundConnectors.join(', ')}) — tilføj én mere for topkarakter.`);

  // V2 check — simple heuristic: if sentence starts with time word, next should be verb
  const timeStarters = ["i dag","i går","i morgen","i sidste uge","derfor","så","i 2024","om aftenen"];
  let v2Errors = 0;
  sentences.forEach(s=>{
    const t = s.trim().toLowerCase();
    timeStarters.forEach(ts=>{
      if(t.startsWith(ts) && t.includes(" jeg ") && !t.match(new RegExp(`^${ts}\\s+(er|har|arbejder|kommer|går|skal|vil|kan)\\b`))) {
        // Check if pattern is "I dag jeg..." which is wrong
        if(t.match(new RegExp(`^${ts}\\s+jeg\\b`))) v2Errors++;
      }
    });
  });
  // Direct check for common V2 error
  if(/i dag jeg|i går jeg|i morgen jeg|derfor jeg/i.test(text)) {
    v2Errors++;
    issues.push("V2-fejl fundet: 'I dag jeg arbejder' → skal være 'I dag arbejder jeg'. Verbet på plads 2 når noget andet end subjektet står først.");
    fixes.push("Ret: 'I dag jeg...' → 'I dag ... jeg' med verbet før subjektet. Fx 'I dag arbejder jeg hjemme'.");
  } else if(sentences.length>0) {
    strengths.push("Ingen åbenlyse V2-fejl — godt!");
  }

  // Subordinate clause check
  const hasSubordinate = /at jeg|at det|at vi|fordi jeg|fordi det|som jeg|som bor|der bor/i.test(text);
  if(!hasSubordinate && words>40) {
    issues.push("Tilføj ledsætning: 'Jeg synes, at...' eller 'Det er vigtigt, fordi...' — PD3 kræver ledsætninger.");
    fixes.push("Tilføj: 'Jeg synes, at det er vigtigt fordi...'");
  } else if(hasSubordinate) strengths.push("Du bruger ledsætning (at/fordi/som) — vigtigt for B1/B2.");

  // Repetition check
  const wordFreq = {};
  lower.split(/\s+/).forEach(w=>{
    if(w.length>3) wordFreq[w]=(wordFreq[w]||0)+1;
  });
  const repeated = Object.entries(wordFreq).filter(([_,c])=>c>=4).map(([w])=>w).slice(0,2);
  if(repeated.length>0) {
    issues.push(`Gentagelse: '${repeated.join("', '")}' bruges ${wordFreq[repeated[0]]} gange. Brug synonym.`);
    fixes.push(`I stedet for '${repeated[0]}' gentaget: brug synonym eller 'det', 'dette'.`);
  }

  // Punctuation
  if(!/[.!?]$/.test(text.trim())) issues.push("Husk punktum til sidst.");
  if((text.match(/,/g)||[]).length===0 && sentences.length>1) issues.push("Brug komma før 'at', 'som', 'der' i ledsætninger.");

  // Checklist from task
  task.checklist?.forEach(word=>{
    if(!lower.includes(word.toLowerCase().split(' ')[0])) {
      issues.push(`Overvej at inkludere: '${word}' (del af opgaven).`);
    }
  });

  // Build feedback
  const overall = words < task.minWords ? "Teksten er for kort — udvid med 1-2 sætninger med fordi/derfor og et eksempel fra dit liv."
    : v2Errors>0 ? "Godt indhold, men ret V2-fejl — det koster dyrt i PD3. Ellers fin struktur."
    : foundConnectors.length>=2 && hasSubordinate ? "Fin besvarelse der opfylder opgaven. Du bruger både bindeord og ledsætning — det er B1/B2 niveau."
    : "Okay besvarelse. Tilføj bindeord og ledsætning for at løfte til 10.";

  return `**Overordnet (offline, ingen nøgle nødvendig):** ${overall}

**Styrker:**
- ${strengths.slice(0,4).join('\n- ') || "Du har skrevet noget — det er første skridt!"}

**Fejl at rette (heuristik):**
- ${issues.slice(0,5).join('\n- ') || "Ingen åbenlyse fejl fundet af den automatiske tjek."}

**Konkrete rettelser:**
- ${fixes.slice(0,3).join('\n- ') || "Prøv: 'Jeg synes, at...' + ledsætning, og husk V2: 'I dag arbejder jeg...' ikke 'I dag jeg arbejder...'"}

**Før/efter eksempel:**
- Før: "I dag jeg arbejder hjemme fordi jeg er syg."
- Efter: "I dag arbejder jeg hjemme, fordi jeg er syg. Derfor kan jeg ikke komme."

**Karakter (estimeret):** ${v2Errors>0 ? "4" : foundConnectors.length>=2 ? "10" : "7"} — ${v2Errors>0 ? "Ret V2 for at nå 7-10" : foundConnectors.length>=2 ? "B1-B2 niveau, tæt på PD3" : "B1 niveau, med plads til forbedring"}.

*Tip: Dette er offline feedback der virker uden API-nøgle. For AI-feedback med omskrivning, tilføj OpenAI-nøgle i Indstillinger. Din tekst gemmes lokalt til før/efter sammenligning.*`;
}
