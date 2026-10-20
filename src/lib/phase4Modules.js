/**
 * PHASE 4: INTEGRATED LEARNING MODULES
 * 15 modules covering A2→B1 progression
 * Professional methodology: UCplus + B1 curricula + Busuu speech methods
 * Assessment-driven difficulty: A1/A2/B1/B2+ levels based on diagnostic test
 *
 * Structure per module:
 * - Diagnostic test (5 min, determines difficulty)
 * - Grammar anchor (8 min, explanation + exercises)
 * - Reading (10 min, authentic material + comprehension)
 * - Listening (10 min, natural pace + transcription + comprehension)
 * - Speaking production (15 min, shadowing + prompted responses)
 * - Pronunciation focus (5 min, targeted tips + practice)
 * - Closing integration (7 min, all 4 skills in one coherent task)
 */

export const phase4Modules = {
  // ========================================
  // PHASE 1: TRANSACTIONAL (Modules 1-5)
  // ========================================

  // MODULE 1: "Møde en ny kollega" (Meeting a New Colleague)
  MODULE_001: {
    id: "MODULE_001",
    title: "Møde en ny kollega",
    subtitle: "Meeting a New Colleague",
    level: "A2",
    phaseArea: "Transactional",
    duration: 45,
    learningOutcomes: [
      "Introduce yourself in Danish with present tense.",
      "Ask basic questions about background and role.",
      "Understand and respond to conversational greetings.",
      "Use possessives (min/mit vs. hans/hendes) correctly.",
      "Recognize and produce natural Danish pronunciation."
    ],

    // OPENING: Activation (5 min)
    opening: {
      contextSetting: "Du starter på din første dag på et tech-selskab i København. Du møder en kollega, Anna, i køkkenet. Hun siger hej.",
      speakingPrompt: "Uden at tænke for meget: Hvad vil du sige? Hvad vil du gerne vide om hende?",
      instruction: "Tal højt (optag dig selv hvis muligt) — dette er u-bedømt. Bare snak naturligt."
    },

    // DIAGNOSTIC TEST: (5 min, determines difficulty level)
    diagnosticTest: {
      instructions: "Besvare disse 10 spørgsmål for at bestemme dit startagniveau.",
      questions: [
        {
          id: "diag_001",
          question: "Jeg ___ fra Danmark. (present tense of 'at komme')",
          options: ["kommer", "kommet", "kommer fra"],
          correct: "kommer",
          category: "grammar_present_tense"
        },
        {
          id: "diag_002",
          question: "Min kollega ___ som udvikler. (present tense of 'at arbejde')",
          options: ["arbejde", "arbejder", "arbejdede"],
          correct: "arbejder",
          category: "grammar_present_tense"
        },
        {
          id: "diag_003",
          question: "Han tager ___ hat og går. (possessive for 'hans')",
          options: ["sin", "hans", "hans"],
          correct: "sin",
          category: "grammar_possessive"
        },
        {
          id: "diag_004",
          question: "Hun interesserer sig for ___. (infinitive after preposition)",
          options: ["at danse", "danse", "danser"],
          correct: "at danse",
          category: "grammar_infinitive"
        },
        {
          id: "diag_005",
          question: "Listen: 'Hej! Jeg hedder Anna.' — Hvad er hendes navn?",
          audio: "audio_001_greeting.mp3",
          options: ["Anna", "Anders", "Anja"],
          correct: "Anna",
          category: "listening_basic"
        },
        {
          id: "diag_006",
          question: "Hvad betyder 'tæt på'?",
          options: ["close to", "far from", "next to"],
          correct: "close to",
          category: "vocabulary"
        },
        {
          id: "diag_007",
          question: "I hvilken periode bruger man 'kom' (preterite)?",
          options: ["past tense", "present tense", "future tense"],
          correct: "past tense",
          category: "grammar_tense"
        },
        {
          id: "diag_008",
          question: "Læs: 'Mit job er interessant.' — Hvad er emnet?",
          text: "Mit job er interessant og udfordrende.",
          options: ["mit job", "interessant", "udfordrende"],
          correct: "mit job",
          category: "reading_subject"
        },
        {
          id: "diag_009",
          question: "Hvilken sætning er grammatisk korrekt?",
          options: [
            "Jeg arbejder ikke på mødet",
            "Jeg ikke arbejder på mødet",
            "Jeg arbejder mødet ikke på"
          ],
          correct: "Jeg arbejder ikke på mødet",
          category: "grammar_word_order"
        },
        {
          id: "diag_010",
          question: "Listen & infer: Speaker siger 'Jeg interesserer mig for dans.' — Hvad er hendes hobby?",
          audio: "audio_002_hobby.mp3",
          options: ["swimming", "dancing", "running"],
          correct: "dancing",
          category: "listening_inference"
        }
      ],
      scoringRubric: {
        "0-3": { level: 1, difficulty: "A1", description: "Foundation level — simplest module version" },
        "4-6": { level: 2, difficulty: "A2", description: "Building level — standard module version" },
        "7-9": { level: 3, difficulty: "B1", description: "Fluency level — advanced module version" },
        "10": { level: 4, difficulty: "B2+", description: "Mastery level — expert module version" }
      }
    },

    // GRAMMAR ANCHOR: Present tense + possessives + pronouns (8 min)
    grammarAnchor: {
      targetStructures: ["present_tense", "possessives_min_mit", "pronouns_subject_object"],

      explanation: {
        title: "Present Tense + Possessives + Pronouns in Introductions",
        content: `
In Danish, introductions use three core patterns:

**Pattern 1: Present tense (simple present)**
- Jeg hedder [name] = I'm called [name]
- Jeg kommer fra [place] = I'm from [place]
- Jeg arbejder som [job] = I work as [job]
- Jeg har [years] års erfaring = I have [years] experience

Notice: No progressive tense. Danes don't say "Jeg er arbejdende" (I am working). Just "Jeg arbejder."

**Pattern 2: Possessives (min, mit, mine vs. hans, hendes)**

When YOU own something (and you're the subject):
- min (common gender): "Min familie er fra Indien" = My family is from India
- mit (neuter): "Mit job er interessant" = My job is interesting
- mine (plural): "Mine kolleger er gode" = My colleagues are good

When SOMEONE ELSE owns something:
- hans: "Hans familie bor i Sverige" = His family lives in Sweden
- hendes: "Hendes job er som udvikler" = Her job is as a developer
- deres: "Deres barndomshjem var i Amerika" = Their childhood home was in America

**KEY DIFFERENCE:** If you're talking about YOUR things, use min/mit/mine. If someone else's things, use hans/hendes/deres.

**Pattern 3: Pronouns (Jeg, du, han, hun, det, vi, de)**

Subject position (who's doing the action):
- Jeg hedder Vipin = I'm called Vipin
- Du kommer fra hvor? = Where are you from?
- Han arbejder her = He works here
- Hun er udvikler = She's a developer
- Vi mødes mandag = We meet Monday
- De er fra Danmark = They're from Denmark

Object position (who's receiving the action):
- Jeg møder ham = I meet him
- Han møder hende = He meets her
- Vi møder dem = We meet them
        `
      },

      examples: [
        {
          label: "Example 1: Introduction about yourself",
          text: `"Hej! Jeg hedder Vipin. Jeg kommer fra Indien, men jeg har boet i Sverige. Jeg arbejder som product manager, og jeg har fem års erfaring."

Breakdown:
- Jeg hedder... (present tense, "to be called")
- Jeg kommer fra... (present tense, "to come from")
- Jeg har boet... (present perfect, but you see the pattern)
- Jeg arbejder som... (present tense, "to work as")
- Jeg har [number] års erfaring (present perfect, but for experience)`
        },
        {
          label: "Example 2: Talking about someone else",
          text: `"Min kollega Anna arbejder som udvikler. Hendes job er meget interessant. Hun har tre års erfaring her. Hans chef hedder Peter, og han er meget venlig."

Breakdown:
- Min kollega (possessive min + noun)
- Hendes job (someone else's thing, use hendes)
- Hun har (present perfect for her, but pattern is clear)
- Hans chef (someone else's thing, use hans)`
        },
        {
          label: "Example 3: Common mistakes & fixes",
          mistakes: [
            { wrong: "Jeg arbejde som PM", correct: "Jeg arbejder som PM", reason: "Present tense needs -r conjugation" },
            { wrong: "Min husband er fra Sverige", correct: "Min mand er fra Sverige", reason: "husband=common gender, use min" },
            { wrong: "Du kommer fra Sverige?", correct: "Ja, jeg kommer fra Sverige", reason: "Repeat pattern in answer" }
          ]
        }
      ],

      pronunciationNotes: `
**Present tense endings sound like:**
- jeg hedder = YAY HED-ur (stress on first syllable of verb)
- du kommer = doo KOHM-ur (same)
- han arbejder = hahn AR-baj-dur (stress on first syllable)

**Possessives in speech:**
- min (sounds like "min") — natural stress
- mit (sounds like "mit") — natural stress
- hans (sounds like "hahns") — 'a' like in "father"
- hendes (sounds like "HEN-ees") — stress on first syllable
      `
    },

    // CONTROLLED EXERCISES (3.5 min)
    controlledExercises: [
      {
        type: "fill_blank",
        instruction: "Udfyld verbet i præsens tidsform.",
        exercises: [
          {
            id: "ex_001",
            question: "Jeg ___ fra Danmark.",
            options: ["kommer", "kommet", "kommer fra"],
            correct: "kommer",
            explanation: "Present tense: 'comes from'. Standard V2 word order."
          },
          {
            id: "ex_002",
            question: "Han ___ som udvikler.",
            options: ["arbejd", "arbejder", "arbejde"],
            correct: "arbejder",
            explanation: "Present tense, 3rd person singular. Add -r to stem."
          },
          {
            id: "ex_003",
            question: "Du ___ tre års erfaring?",
            options: ["har", "havde", "vil have"],
            correct: "har",
            explanation: "Present tense question: 'Do you have...?'"
          }
        ]
      },
      {
        type: "match_possessive",
        instruction: "Vælg den korrekte possessive (min/mit vs. hans/hendes).",
        exercises: [
          {
            id: "ex_004",
            question: "Jeg taler om ___ datter.",
            options: ["min", "hans", "hendes"],
            correct: "min",
            explanation: "MY daughter — I (subject) own her. Use min."
          },
          {
            id: "ex_005",
            question: "Han taler om ___ datter.",
            options: ["min", "hans", "hendes"],
            correct: "hans",
            explanation: "HIS daughter — he (subject) owns her. Use hans."
          },
          {
            id: "ex_006",
            question: "Hun taler om ___ job.",
            options: ["min", "hendes", "hans"],
            correct: "hendes",
            explanation: "HER job — she (subject) owns it. Use hendes."
          }
        ]
      },
      {
        type: "speak_and_record",
        instruction: "Sig disse sætninger højt. Optag dig selv.",
        exercises: [
          {
            id: "ex_007",
            sentence: "Jeg hedder Vipin.",
            feedbackPoints: ["pronunciation of 'hedder'", "stress on 'Vi-' in Vipin"],
            focusArea: "subject introduction"
          },
          {
            id: "ex_008",
            sentence: "Jeg kommer fra Indien.",
            feedbackPoints: ["clear 'kommer' pronunciation", "vowel length in 'Indien'"],
            focusArea: "origin statement"
          },
          {
            id: "ex_009",
            sentence: "Jeg arbejder som product manager.",
            feedbackPoints: ["stress on 'AR-' in arbejder", "English 'product' vs. Danish 'produkt'"],
            focusArea: "job introduction"
          }
        ]
      }
    ],

    // READING: Authentic text (10 min)
    reading: {
      preVocabulary: [
        { word: "erfaring", english: "experience", example: "Jeg har fem års erfaring" },
        { word: "udvikler", english: "developer", example: "Hun er udvikler" },
        { word: "IT", english: "IT/tech (same in both languages)", example: "Jeg arbejder inden for IT" },
        { word: "tæt på", english: "close to", example: "Vi bor tæt på hinanden" },
        { word: "lille", english: "small", example: "Mit team er lille" }
      ],

      material: {
        source: "Email from a colleague on first day",
        text: `Hej Vipin!

Jeg så at du starter i dag. Jeg hedder Anna, og jeg arbejder som udvikler i IT-teamet. Jeg ville gerne møde dig og fortælle dig lidt om os.

Mit team består af tre personer: mig, en anden udvikler som hedder Søren, og en designer som hedder Maria. Vi har arbejdet sammen i to år, og vi er meget glad for hinanden. Vi arbejder tæt på hinanden hver dag.

Hvad har du arbejdet med før? Og hvad interesserer du dig for uden for arbejdet? Jeg interesserer mig selv for dans og løb.

Vi skal mødes efter arbejde for at fejre at du starter. Alle fra teamet kommer, og vi går til kaffe sammen.

Vil du gerne vide noget mere om mig eller mit team før vi mødes?

/Anna`
      },

      comprehensionQuestions: [
        {
          id: "comp_001",
          type: "literal",
          question: "Hvem er Anna? Hvad gør hun?",
          expectedAnswer: "Anna er en udvikler. Hun arbejder i IT-teamet.",
          answerGuidance: "Look for subject + profession + location."
        },
        {
          id: "comp_002",
          type: "literal",
          question: "Hvor mange personer er der i Annas team? Hvad hedder de?",
          expectedAnswer: "Der er tre personer: Anna, Søren, og Maria. Søren er udvikler og Maria er designer.",
          answerGuidance: "Count and list."
        },
        {
          id: "comp_003",
          type: "inference",
          question: "Hvad betyder 'Vi arbejder tæt på hinanden'?",
          expectedAnswer: "Det betyder at de arbejder sammen hver dag tæt ved hinanden.",
          answerGuidance: "Infer meaning from context."
        },
        {
          id: "comp_004",
          type: "literal",
          question: "Hvad interesserer Anna sig for uden for arbejdet?",
          expectedAnswer: "Anna interesserer sig for dans og løb.",
          answerGuidance: "Direct quote from text."
        },
        {
          id: "comp_005",
          type: "inference",
          question: "Hvad skal I gøre efter arbejde? Hvorfor?",
          expectedAnswer: "I skal gå til kaffe og fejre at Vipin starter. Alle fra teamet kommer.",
          answerGuidance: "Infer purpose from context."
        }
      ],

      grammarExercise: {
        instruction: "Understreg alle possessives (min, mit, hans, hendes) i emailen.",
        possessivesInText: [
          { text: "Mit team", type: "min/mit" },
          { text: "en anden udvikler", type: "none" },
          { text: "Vil du gerne vide noget mere om mig eller mit team", type: "min/mit" }
        ]
      }
    },

    // LISTENING: Audio scenario (10 min)
    listening: {
      audioFile: "module_001_meeting_colleague.mp3",
      duration: 90,

      transcript: {
        label: "Don't read this yet! Listen first.",
        content: `Anna: Hej! Du er ny, ikke? Jeg hedder Anna. Hvad hedder du?
You:  Jeg hedder Vipin.
Anna: Flot navn. Hvor kommer du fra?
You:  Jeg kommer fra New Delhi, fra Indien. Men jeg har boet i Sverige.
Anna: Ah, dejligt! Sverige er flot. Hvad skal du lave her hos os?
You:  Jeg skal arbejde som product manager.
Anna: Perfekt. Vi har brug for det. Vil du gerne møde mit team efter arbejde?
You:  Ja, gerne. Tak skal du have!
Anna: Velbekomme. Jeg ses i dag.`
      },

      transcriptionTask: {
        instruction: "Lyt én gang med normalt tempo. Skriv hvad du hører på dansk.",
        goal: "Get 70%+ correct. You won't catch everything. That's OK.",
        afterTranscription: "System shows you the real transcript. You compare: what you got right (green), what you missed (yellow), what you misheard (red)."
      },

      comprehensionQuestions: [
        {
          id: "listen_comp_001",
          type: "literal",
          question: "Hvad siger Anna når hun møder dig?",
          expectedAnswer: "Hun siger 'Hej, du er ny, ikke?' og spørger hvad du hedder.",
          answerGuidance: "Opening lines."
        },
        {
          id: "listen_comp_002",
          type: "literal",
          question: "Hvad invitation giver Anna til dig? Hvornår?",
          expectedAnswer: "Hun inviterer dig til at møde hendes team efter arbejde.",
          answerGuidance: "Look for 'vil du gerne...'"
        },
        {
          id: "listen_comp_003",
          type: "inference",
          question: "Hvad betyder 'Velbekomme' når Anna siger det til sidst?",
          expectedAnswer: "Det er en venlig afsked, som betyder 'Farvel, vi ses senere' eller 'Til snart.'",
          answerGuidance: "Infer tone and meaning from context."
        },
        {
          id: "listen_comp_004",
          type: "inference",
          question: "Hvad er Annas tone i samtalen? Venlig? Stiv? Travl?",
          expectedAnswer: "Hun er venlig og åben. Hun interesserer sig for hvor Vipin kommer fra.",
          answerGuidance: "Assess tone from word choice and questions asked."
        }
      ]
    },

    // SPEAKING PRODUCTION (15 min)
    speakingProduction: {
      // PART A: Shadowing (5 min)
      shadowingExercises: [
        {
          id: "shadow_001",
          nativeModel: {
            text: "Hej! Jeg hedder Anna, og jeg arbejder som udvikler her.",
            audio: "native_shadow_001.mp3"
          },
          instruction: "Listen once. Immediately repeat — match the pace, rhythm, and flow. Record yourself.",
          afterRecording: {
            feedback: [
              "✅ Good rhythm! Your stress on 'arbejder' is perfect.",
              "⚠️ Your pronunciation of 'udvikler' — try /ø/ sound (like 'uh' in English 'but'): øh-vik-lur",
              "✅ Overall: sounds natural and confident. Try one more time with that /ø/ correction."
            ]
          },
          pronunciationFocus: { sound: "ø", explanation: "Like 'uh' in English 'but'", examples: ["udvikler", "køre", "størst"] }
        },
        {
          id: "shadow_002",
          nativeModel: {
            text: "Hvor kommer du fra?",
            audio: "native_shadow_002.mp3"
          },
          instruction: "Listen and repeat immediately.",
          afterRecording: {
            feedback: [
              "✅ Perfect! Clean, simple, great intonation.",
              "💡 Try once more with a more natural, conversational pace (slightly slower)."
            ]
          }
        },
        {
          id: "shadow_003",
          nativeModel: {
            text: "Ja, gerne. Tak skal du have!",
            audio: "native_shadow_003.mp3"
          },
          instruction: "Listen and repeat immediately.",
          afterRecording: {
            feedback: [
              "✅ Excellent! Natural tone.",
              "⚠️ Slight note on 'gerne' — it's not 'jer-nuh' but 'YER-nuh' with stress on first syllable."
            ]
          },
          pronunciationFocus: { sound: "gerne", stress: "first syllable", explanation: "Accent on YER, not jer" }
        }
      ],

      // PART B: Prompted Responses (7 min)
      promptedResponses: [
        {
          id: "prompt_001",
          prompt: "Hej! Du er ny, ikke? Hvad hedder du?",
          expectedMinimum: "1-2 sentences minimum",
          expectedLevel: "A2",
          grammarFocus: ["present_tense_introduce", "subject_pronouns"],
          yourResponse: {
            example: "Ja, jeg hedder Vipin. Jeg kommer fra Indien, men jeg har boet i Sverige.",
            feedback: {
              transcription: "Ja, jeg hedder Vipin. Jeg kommer fra Indien, men jeg har boet i Sverige.",
              grammar: "✅ Correct! 'Jeg hedder' (present) + 'jeg kommer' (present) + 'jeg har boet' (present perfect) all correct.",
              pronunciation: [
                "✅ 'Vipin' — good, clear",
                "✅ 'Indien' — very good",
                "✅ 'Sverige' — good (S-VER-i-uh)",
                "⚠️ 'boet' — slightly unclear, try /boh-uh/ — it's the past participle"
              ],
              fluency: "✅ Good pacing, natural pause after 'Sverige'. Sounds confident.",
              vocabulary: "✅ All A2 appropriate."
            }
          }
        },
        {
          id: "prompt_002",
          prompt: "Hvad skal du lave her?",
          expectedMinimum: "2-3 sentences",
          expectedLevel: "A2",
          grammarFocus: ["present_tense_work", "future_obligation_skal"],
          yourResponse: {
            example: "Jeg skal arbejde som product manager. Jeg har fem års erfaring, og jeg glæder mig til at lære dansk kultur.",
            feedback: {
              transcription: "Jeg skal arbejde som product manager. Jeg har fem års erfaring, og jeg glæder mig til at lære dansk kultur.",
              grammar: "✅ 'Jeg skal arbejde' (future/duty) + 'Jeg har fem års erfaring' (present perfect for experience) both correct. 'Jeg glæder mig til at lære' — good use of reflexive + infinitive.",
              pronunciation: [
                "⚠️ 'arbejde' — try stressing first syllable: **AR**-baj-uh (you said baj-AR)",
                "✅ 'erfaring' — good",
                "✅ 'kultur' — very good"
              ],
              fluency: "✅ Natural flow, appropriate pauses.",
              suggestion: "Your three-sentence response shows good depth. You're not just answering the question, you're adding context (experience + excitement)."
            }
          }
        },
        {
          id: "prompt_003",
          prompt: "Hvor kommer du fra egentlig?",
          expectedMinimum: "3-4 sentences with detail",
          expectedLevel: "A2/B1",
          grammarFocus: ["past_tense_grew_up", "present_perfect_lived"],
          yourResponse: {
            example: "Jeg er fra New Delhi, som er hovedstaden i Indien. Jeg voksede op der med min familie. Men nu interesserer jeg mig for at leve i Danmark.",
            feedback: {
              transcription: "Jeg er fra New Delhi, som er hovedstaden i Indien. Jeg voksede op der med min familie. Men nu interesserer jeg mig for at leve i Danmark.",
              grammar: "✅ All correct. Nice use of 'som er' (which is) to add info, 'jeg voksede op' (I grew up), possessive 'min familie'.",
              pronunciation: [
                "✅ 'egentlig' — you understood this (means 'actually'), good",
                "✅ 'New Delhi' — good",
                "⚠️ 'hovedstaden' — try /HO-vud-stad-un/, stress on first syllable"
              ],
              fluency: "✅ Flowing well now. You're getting more confident with longer sentences.",
              assessment: "This is flowing well. You're speaking like someone who knows what they're talking about."
            }
          }
        }
      ]
    },

    // PRONUNCIATION FOCUS (5 min)
    pronunciationFocus: {
      title: "Module 1 Pronunciation Challenges",

      challenge1: {
        title: "The 'kj' and 'skj' sounds",
        problem: "English speakers say 'kj' like a hard 'k'. Wrong!",
        examples: {
          wrong: "kah-role (wrong car)",
          correct: "kyo-rule (correct car in Danish)"
        },
        theSound: "Danish 'kj' and 'skj' are like 'ky' in English 'onion' or 'canyon' — it's a /kʲ/ sound (k + y together).",
        practiceWords: [
          { danish: "kjole", pronunciation: "KYO-luh", english: "dress" },
          { danish: "købe", pronunciation: "KØ-buh", english: "buy" },
          { danish: "kjemisk", pronunciation: "KYE-mi-sk", english: "chemical" }
        ],
        howToPractice: [
          "1. Say English 'canyon' very slowly: 'kany-on'",
          "2. Now say Danish 'kjole': Kyo-luh",
          "3. Record yourself saying all three: kjole, købe, kjemisk",
          "4. Compare to native speaker"
        ]
      },

      challenge2: {
        title: "Vowel length (short vs. long)",
        problem: "Danish has SHORT and LONG vowel sounds. They change meaning!",
        examples: [
          { short: "skal (SKAHL — short 'a')", long: "skål (SKOL — long 'a', rounded)", english: "cheers/toast" }
        ],
        keyPairs: [
          { danish: "skal vs. skål", meaning: "shall/will vs. cheers (completely different!)" },
          { danish: "mand", meaning: "man (but length matters in context)" }
        ],
        practice: "Say 'skal' vs. 'skål' — listen for the vowel length difference. Record yourself, compare."
      },

      challenge3: {
        title: "The 'r' sound",
        problem: "Danish 'r' is softer than English 'r'.",
        comparison: {
          english: "Run (rolled, hard R)",
          danish: "ren (softer, more guttural R)"
        },
        howItSounds: "Like the French 'r' — guttural, from the back of your throat, not rolled.",
        practiceWords: [
          { danish: "ret", pronunciation: "pronounced with guttural R", english: "right, straight" },
          { danish: "rig", english: "rich" },
          { danish: "røde", english: "red" }
        ]
      }
    },

    // CLOSING INTEGRATION TASK (7 min)
    integrationTask: {
      title: "Scenario: All 4 skills in one coherent task",
      context: "You've met Anna. She sends you an email. You have to: (1) READ her email, (2) WRITE a response, (3) LISTEN to her feedback on your response, (4) SPEAK in a follow-up conversation.",

      step1_read: {
        duration: "2 min",
        instruction: "READ Anna's email",
        email: `Hej Vipin!

Det var så fedt at møde dig i dag! Jeg syntes du virker som en dejlig person. Og dit dansk er allerede meget godt.

Jeg tænker på om du vil være med til min dansehold næste torsdag? Vi danser swing, og det er meget sjovt. Mine venner fra danseklubben kommer også. Hvis du interesserer dig for dans, ville det være perfekt for dig!

Hvad synes du? Kan du komme?

/Anna`,
        understanding: {
          question1: "Anna enjoyed meeting you — true or false?",
          answer1: "True",
          question2: "What does she invite you to?",
          answer2: "A swing dance class next Thursday"
        }
      },

      step2_write: {
        duration: "3 min",
        instruction: "WRITE a response email to Anna",
        requirements: {
          structure: "Say thank you for the invite, say whether you want to come, add details about your dance experience or why you're interested, ask a practical question (time, location, cost, what to wear)",
          grammarFocus: ["present_perfect_experience", "future_intention", "politeness_structures"],
          minimumLength: "4-5 sentences"
        },
        yourEmail: `Hej Anna!

Tak for invitationen! Det lyder fantastisk. Jeg interesserer mig meget for dans, og jeg har allerede erfaring med swing. Jeg dansede i Sverige i tre år.

Ja, jeg vil meget gerne komme næste torsdag. Det bliver sjovt at møde dine venner fra danseklubben.

En spørgsmål: hvad tid starter klassen? Og hvor er det henne? Skal jeg bringe noget?

Jeg glæder mig til at se dig!

/Vipin`,
        systemFeedback: {
          grammar: "✅ Mostly excellent. Grammar notes: 'En spørgsmål' → should be 'Et spørgsmål' (neuter, not common gender). Otherwise perfect tenses, word order, politeness structures all correct.",
          vocabulary: "✅ Strong B1 range. 'fantastisk', 'erfaring', 'klasse', 'glæder mig' — all appropriate.",
          tone: "✅ Friendly, warm, appropriate for new colleague. Good balance of interest and humility.",
          spelling: "✅ All correct"
        }
      },

      step3_listen: {
        duration: "1 min",
        instruction: "LISTEN to Anna's reply (voice message)",
        audio: "anna_voice_reply.mp3",
        transcript: `Hej Vipin! Ja, det er fantastisk at du kan komme! Klassen starter klokken 19:30 i Dansehallen på Nørrebro. Du skal ikke bringe noget, bare dine danseskopå. Vi mødes klokken 19:15 før klassen. Jeg ses i dag!`,
        understand: {
          information: "Class is at 19:30 at Dansehallen on Nørrebro. Meet at 19:15. Bring dance shoes only."
        }
      },

      step4_speak: {
        duration: "1 min",
        instruction: "SPEAK in a follow-up conversation with Anna",
        scenario: "Anna calls you to confirm",
        annaPrompt: "Hej Vipin! Jeg var bare sikker på at du har Dansehallens adresse. Det er Rantzausgade 52 på Nørrebro. Er det OK for dig?",
        yourResponse: {
          example: "Ja, det er perfekt! Tak. Jeg kan finde stedet. Jeg glæder mig til at danse med dig og dine venner. Jeg ses torsdag klokken 19:15!",
          feedback: {
            grammar: "✅ Good",
            fluency: "✅ Natural, confident tone",
            pronunciation: "Minor note on 'klokken' (KLO-kun), but overall very clear"
          }
        }
      },

      closingReflection: {
        questions: [
          "Did you understand the entire scenario?",
          "Could you respond naturally at each step?",
          "Where did you struggle most? (Reading? Speaking? Hearing?)",
          "What was the easiest part?"
        ]
      }
    }
  }

  // [Modules 2-5 will follow the same structure, abbreviated for file size]
  // MODULE_002: Søge job
  // MODULE_003: Køb og handel
  // MODULE_004: Rejse og planlægning
  // MODULE_005: Bolig og miljø
};

export function getModule(moduleId) {
  return phase4Modules[moduleId] || null;
}

export function getAllModuleIds() {
  return Object.keys(phase4Modules);
}

export function getModulesByPhase(phase) {
  // Phase 1: transactional (001-005)
  // Phase 2: narrative (006-010)
  // Phase 3: argumentative (011-015)
  const start = phase === 1 ? 1 : phase === 2 ? 6 : 11;
  const end = phase === 1 ? 5 : phase === 2 ? 10 : 15;
  const modules = [];
  for (let i = start; i <= end; i++) {
    const moduleId = `MODULE_${String(i).padStart(3, '0')}`;
    if (phase4Modules[moduleId]) {
      modules.push(phase4Modules[moduleId]);
    }
  }
  return modules;
}
