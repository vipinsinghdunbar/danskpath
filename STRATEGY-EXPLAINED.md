# DanskPath — Learning Strategy & UX Explained Simply

## Who is this for?
Adult immigrant in Denmark, enrolled in Danskuddannelse 3, Modul 3+ (A2 moving to B1). Has job + family. Studies in stolen hours: 15-45 min on phone (bus, lunch), up to 90 min on desktop evening. Needs to pass Modultest, speak at work, understand neighbours. Not a hobbyist — has real deadline.

## The central insight (why most apps fail)
At A2→B1, bottleneck is NOT "I don't know the rule". You know V2 rule. Bottleneck is:
1. **Decoding live spoken Danish** — Danish swallows ~25% syllables even in careful speech. You read at B2, hear at A2.
2. **Producing V2 under pressure** — You know rule, but in real conversation you say "I dag jeg arbejder" (English S-V-O habit) instead of "I dag arbejder jeg".
3. **Usable vocabulary** — You know "møde" but can't say "holde et møde, indkalde til et møde". Single words don't make speech. Collocations do.

Everything in DanskPath attacks those 3.

## The 8 pillars (what you must learn)

Every complete platform needs 6 + 2 for PD3:

1. **Grammar** = skeleton. V2, inversion, ledsætning (ikke before verb), sin/sit, en/et, etc. 28 topics, 761 items in your original bank.
2. **Vocabulary** = flesh. Need 3000-4000 for PD3. We have 1052 now with collocations + particle verbs (slå op, finde ud af). Not "møde = meeting" but "holde et møde".
3. **Reading** = eye training. Graded A1→B2: SMS, bus notice, menu → news, official letter, debate. Tap word for sound + meaning. PD3 uses gapped + cloze formats.
4. **Listening** = hardest. 26 pieces: monolog, phone (borgerservice, pizzeria), DSB announcement, DR news, P4 traffic radio, multi-speaker kaffepause. Transcript hidden first. 30 reduction dictionary: det er → d'er.
5. **Speaking** = where most apps fail. 18 scenarios: kaffepause, lægen, jobsamtale, borgerservice + PD3 oral exam: picture description (2 min), monologue (2 min), discussion. Voice input via Web Speech API + hold-the-Danish phrases: "vent lidt", "kan du sige det igen, langsommere?"
6. **Writing** = consolidates grammar. 8 tasks: A1 short message → B2 PD3 150-200 word argument. Checks V2, bindeord, length + AI feedback if you add OpenAI key.
7. **Pronunciation** = 12 weeks: blødt d, stød, uvular r, schwa, swallowed syllables, numbers. Self-recording via mic.
8. **Culture & Society** = PD3 Delprøve 1. 10 modules: Folketing 179 members, Grundlov 5 June, welfare universalisme, arbejdsmarked overenskomst/fagforening, values tillid/jantelov/hygge, healthcare egen læge, education, everyday fredagsbar/julefrokost, bolig/foreningsliv, history.

## The 4 content rules (govern everything)

1. **Explain before drill.** Never ask to practice what not taught. Lesson first, exercise second — always.
2. **English first, Danish second.** You already do V2 in English: "Never have I seen...". Danish does it every sentence. We show mechanism you own, then where Danish diverges. Fastest bridge.
3. **Reasons on every answer.** Not "correct/incorrect". We say: what you wrote, what is correct, why correct, why your answer was tempting, which rule it tests. Getting it right by feel vs understanding look same but behave different under pressure.
4. **Adapt to learner, not curriculum.** Curriculum is hypothesis. Your actual mistakes are data that override it. If you keep failing V2 after 3 topics, system weights next session toward V2, not next topic on schedule.

## UX — How it should FEEL (from your design-system.md)

Look at Duolingo/Babbel/Pimsleur: game — streaks, hearts, coins, confetti. Works for 5-min hobby. Our users have real deadline — Modultest, job requiring Danish, kids speaking Danish. Game feels patronising. We do NOT use streaks/hearts/confetti.

Look at Anki/Notion/Linear: clean hierarchy, fast navigation, tool on your side not wasting time. That's feeling.

Visual: Apple native + Notion clarity + Duolingo typefaces without playfulness. White/near-white light, deep neutral dark, ONE muted Danish blue #2A4F9E (Øresund blue) for interactive only — never decoration. Typography generous, readable at small sizes because you're reading Danish you're still learning — difficulty of content should not be compounded by difficulty of reading.

**Mobile first:** Primary device is phone, one hand, noisy environment. Buttons min 44px, readable without zoom. Bottom tab bar primary nav, sidebar for tablet/desktop. No loading screens — everything pre-loaded, <100ms switch. If you tap and wait, we failed.

**Feedback honest:** Wrong → see correct immediately, plain why correct, why yours tempting. No "almost! nice try!" We say: this you wrote, this correct, here why. That's respect.

## User Journey — What actually happens

### Step 0: Landing (Forside) — if no test done
You see: What DanskPath is (not phrasebook, not chatbot, not Duolingo), 3 bottlenecks, 8 pillars, how it works in 3 steps, phone mock of your personal path. CTA: "Tag niveau-test (7 min)".

No login. No data leaves device.

### Step 1: Diagnostic (Niveau) — 7 min, 15 questions
Tests: V2, ledsætning, sin/sit, ligge/lægge, kollokationer, particle verbs, reductions, samfund, PD3 formats.
Each question: English-first explanation + why answer correct + why wrong tempting.
Result: % + level (Modul 2 A1-A2, Modul 3 A2, Modul 4 B1, Modul 5 B1-B2 PD3-klar) + what it means + full review.

Saves to localStorage: dansk_level, dansk_diagnostic.

### Step 2: Path Set (Læringssti) — complete with tracking
Shows Modul 1-2 → Modul 3 → Modul 4 → Modul 5 → PD3. Each module lists:
- Grammar topics (with done/total progress bar)
- Vocab themes
- Reading/listening targets
- Goal: "Fortælle om hverdag", "Jobsamtale på dansk", "Bestå Modultest 5"
- "Du er her" badge on your module.

This is your curriculum spine — but adaptive.

### Step 3: Daily Practice Loop (Øv) — the main screen
First thing you see when you open app. NOT generic "keep it up!". Feels like knowledgeable friend giving ONE clear advice based on your actual weak spots:

System checks:
- listeningAcc <60% + <8 attempts → "Lytning er din flaskehals — du læser B1 men hører A2. Det er normalt. Én telefon-øvelse nu giver mest."
- Box0 >250 → "For mange nye ord — konsolider. 10 min flashcards kollokationer nu."
- grammarDone <5 → "V2-reglen — 80% af B1-fejl. På engelsk gør du det nogle gange, på dansk altid."
- writingAttempts <2 → "Skrivning konsoliderer grammatik — uden skrivning forbliver grammatik passiv."

Shows 4 cards: Ordforråd (sikre/usikre/nye), Grammatik (done/total), Lytning (accuracy), Skrivning+Kultur.

Quick actions: 10 flashcards, 1 lytteøvelse (transcript hidden first), 2 min samtale with hold-the-Danish.

**No repeats:** 
- Vocab: Leitner Box 0-5. Box0 new, Box1 unsure, Box2+ secure. getDueItems sorts Box ascending → you see new/weak first, secure not repeated until Box0/1 done.
- Grammar 761 items: timestamp in dansk_seen, filtered out 14 days in "Kun nye" mode. Weak items saved in dansk_weak → shown in Svage-mode.
- Listening/Reading: dansk_used_listening marks ✓ klaret, sorts unused first. Resets only when all used → cycle.

### Step 4: Progress (Fremskridt) — honest dashboard
No leaderboard. Shows: level, secure words %, grammar done, skills accuracy (listening, reading, writing, culture) from actual attempts. Weekly auto-report: "Uge-rapport: 247 nye ord, 12% lytning, anbefaling næste uge: fokus lytning". Like dashboard you'd trust at work.

## How to run on iPhone + connect laptop

**Now (preview):**
- Preview URL https://5173-xxxx.e2b.app works on laptop + iPhone. Open on iPhone Safari → Share → Add to Home Screen → standalone app.

**On your laptop permanently:**
- Option A: Open public/danskpath-standalone.html (656KB single file) — double-click, works offline. AirDrop to iPhone.
- Option B: Unzip danskpath-laptop.zip → npm install → npm run dev -- --host 0.0.0.0 → laptop localhost:5173, iPhone same WiFi http://[laptop-ip]:5173
- Option C: npm run build → drag dist/ to netlify.com/drop → permanent https://danskpath.dk

**Sync laptop ↔ iPhone until backend:**
Forbind enheder screen → Export backup JSON → Import on other device. Phase 5 will be Supabase backend with real login + teacher dashboard.

## Success bar (from your strategy doc)
- 3 months regular use at Modul 3 → pass Modultest 3
- 6 months → hold basic conversation at work without switching to English
- 12 months + continued instruction → ready for PD3

That is the product. A learner passes test and speaks confidently.
