import { useState } from 'react';

// Lesson 9: Speaking Practice
// Focus: Conversational fluency, dialogue patterns, natural speaking, and confident communication
// Structure: 20 exercises (dialogue scenarios) + 5 quiz questions

export default function SpeakingPracticeLesson({ lesson, onComplete, onBack }) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [showExplanation, setShowExplanation] = useState({});

  const sections = [
    {
      type: "intro",
      title: "Speaking Practice — Conversational Fluency",
      content: "Speaking Danish confidently means more than grammar accuracy—it's about natural rhythm, appropriate responses, and handling real conversations. In this lesson, you'll practice dialogue patterns across scenarios: greetings, casual conversation, problem-solving, and natural speech patterns. You'll learn how to sound natural, not robotic.",
      englishContext: "Real conversation isn't formal. You'll hear pauses, filler words like 'så' (so), discourse markers, and natural speech patterns. This lesson teaches you how authentic Danish conversation actually flows."
    },
    {
      type: "section",
      title: "Greetings & Social Opening",
      exercises: [
        {
          id: "sp1",
          type: "mcq",
          question: "Which greeting is most appropriate for casual encounter with a colleague you see regularly?",
          instruction: "Choose the natural response:",
          options: [
            {
              text: "'Hej! Hvordan går det?' (Hey! How's it going?)",
              correct: true,
              why: "This is natural, casual, and the question 'Hvordan går det?' is a standard greeting that expects a brief response."
            },
            {
              text: "'God morgen. Jeg håber at du har det godt.' (Good morning. I hope you are well.)",
              correct: false,
              why: "Too formal for a colleague you see regularly. This sounds overly stiff."
            },
            {
              text: "'Hej dig!' (Hey you!)",
              correct: false,
              why: "Possible but less natural than the full greeting with a question."
            },
            {
              text: "'Goddag. Er du på arbejde i dag?' (Good day. Are you at work today?)",
              correct: false,
              why: "Overly formal and the question is odd if you're already at work together."
            }
          ],
          explanation: "Natural Danish greetings are brief and conversational. 'Hej! Hvordan går det?' is the standard pattern—it's warm, efficient, and opens conversation without being formal.",
          why: "Authentic dialogue requires natural rhythm and appropriate formality level."
        },
        {
          id: "sp2",
          type: "transformation",
          question: "Someone asks 'Hvordan går det?' What's a natural, brief response that invites reciprocal conversation?",
          instruction: "Choose the most natural response:",
          options: [
            { text: "'Godt! Og med dig?' (Good! And you?)", correct: true, why: "Brief, positive, and naturally reciprocal—this is how Danes actually respond." },
            { text: "'Det går mig fint.' (It's going fine for me.)", correct: false, why: "Too formal and doesn't invite reciprocal response." },
            { text: "'Jeg har det udmærket, tak for at spørge.' (I'm doing excellent, thanks for asking.)", correct: false, why: "Overly formal for casual conversation." },
            { text: "'Ikke så dårligt.' (Not so bad.)", correct: false, why: "Understatement is fine, but lacks the reciprocal 'og med dig?'" }
          ],
          explanation: "Natural responses are brief and include reciprocal elements. 'Godt! Og med dig?' is authentic—it acknowledges the greeting, answers briefly, and returns the question naturally.",
          why: "Conversation flow depends on natural reciprocal patterns."
        },
        {
          id: "sp3",
          type: "mcq",
          question: "What does 'Så mig da!' mean in casual Danish conversation?",
          instruction: "What is this phrase used for?",
          options: [
            {
              text: "It's a filler/discourse marker meaning 'so' or 'well' used to start a new thought or show interest",
              correct: true,
              why: "'Så mig da!' is a conversational marker that shows you're listening and ready for the next thought—very natural in dialogue."
            },
            {
              text: "'Show me' (a direct command)",
              correct: false,
              why: "While it can mean that literally, in conversation it's a discourse marker."
            },
            {
              text: "An expression of agreement",
              correct: false,
              why: "Not primarily for agreement—it's for showing attention and inviting continuation."
            },
            {
              text: "A greeting or goodbye",
              correct: false,
              why: "Neither—it's a conversational marker."
            }
          ],
          explanation: "'Så mig da!' (well, so, go on) is a natural discourse marker showing you're listening and interested. Danes use it constantly to keep conversation flowing naturally.",
          why: "Native speakers use discourse markers and fillers; learning these makes you sound natural."
        },
        {
          id: "sp4",
          type: "fillblank",
          question: "Complete the dialogue: A: 'Vi skal snart mødes igen.' B: '___ godt. Hvornår?'",
          instruction: "What naturally follows in this conversation?",
          options: [
            { text: "Det er (It is)", correct: true, why: "'Det er godt' (That's good) is the natural Danish response to a suggestion about meeting again." },
            { text: "Jeg er (I am)", correct: false, why: "Doesn't fit the context." },
            { text: "Du er (You are)", correct: false, why: "Doesn't fit grammatically or contextually." },
            { text: "Vi er (We are)", correct: false, why: "Doesn't fit the context of responding to a meeting suggestion." }
          ],
          explanation: "The full response would be 'Det er godt. Hvornår?' (That's good. When?) - a natural way to affirm a suggestion and ask for details.",
          why: "Natural dialogue often uses short, predictable phrases that flow together smoothly."
        },
        {
          id: "sp5",
          type: "mcq",
          question: "Someone says 'Du virker træt i dag' (You seem tired today). What's a natural response?",
          instruction: "Choose the most natural reply:",
          options: [
            {
              text: "'Ja, jeg har sovet dårligt i nat' (Yeah, I slept poorly last night)",
              correct: true,
              why: "Simple, natural, and explains the observation with a brief reason—this is how people actually respond."
            },
            {
              text: "'Jeg kan ikke være træt eller ej, som jeg har lyst til.' (I can't be tired or not, as I wish.)",
              correct: false,
              why: "Overly philosophical and unnatural for casual observation."
            },
            {
              text: "'Jeg virker ikke træt på mig selv.' (I don't seem tired to myself.)",
              correct: false,
              why: "Defensive and awkward—not natural."
            },
            {
              text: "'Du har ret. Jeg er træt.' (You're right. I'm tired.)",
              correct: false,
              why: "Too formal; the first response is more natural."
            }
          ],
          explanation: "When someone observes you seem tired, a natural response is brief acknowledgment and explanation. 'Ja, jeg har sovet dårligt i nat' is authentic and conversational.",
          why: "Natural dialogue involves simple responses that match the formality and brevity of the situation."
        }
      ]
    },
    {
      type: "section",
      title: "Casual Conversation & Storytelling",
      exercises: [
        {
          id: "sp6",
          type: "mcq",
          question: "In Danish conversation, what's the most natural way to start telling a story?",
          instruction: "Choose the authentic opening:",
          options: [
            {
              text: "'Så jeg var på arbejde i går, ikke? Og så skete der noget helt vildt.' (So I was at work yesterday, right? And then something crazy happened.)",
              correct: true,
              why: "Using 'så' (so) and 'ikke?' (right?) to set context and 'og så' (and then) to move the story forward is very natural Danish storytelling."
            },
            {
              text: "'Jeg vil fortælle dig en historie om hvad der skete på arbejde.' (I want to tell you a story about what happened at work.)",
              correct: false,
              why: "Too formal—sounds like you're reading from a script."
            },
            {
              text: "'En historisk begivenhed fandt sted på mit arbejdssted igår.' (A historical event took place at my workplace yesterday.)",
              correct: false,
              why: "Far too formal and awkward for casual conversation."
            },
            {
              text: "'Du skal høre. Arbejde. Igår. Vildt.' (You should hear. Work. Yesterday. Crazy.)",
              correct: false,
              why: "Too choppy and incomplete."
            }
          ],
          explanation: "Natural Danish storytelling uses connectors like 'så', 'og så', and 'ikke?' to make the story flow and involve the listener. 'Så jeg var...og så skete der...' is the authentic pattern.",
          why: "Storytelling in any language has natural patterns; learning them makes you sound fluent."
        },
        {
          id: "sp7",
          type: "transformation",
          question: "You're telling a story and want to intensify it. Which phrase adds natural emphasis?",
          instruction: "Choose the natural intensifier:",
          options: [
            { text: "'Og så blev det helt vildt' (And then it got really crazy)", correct: true, why: "'Vildt' (crazy/wild) is the natural intensifier Danes use to heighten stories." },
            { text: "'Og dermed steg intensiteten gradvist.' (And thus intensity gradually increased.)", correct: false, why: "Too formal and analytical for storytelling." },
            { text: "'Og på dette tidspunkt blev situationen meget alvorlig.' (And at this point the situation became very serious.)", correct: false, why: "Too formal for casual conversation." },
            { text: "'Og jeg blev meget overrasket.' (And I became very surprised.)", correct: false, why: "Too direct; doesn't add narrative intensity." }
          ],
          explanation: "'Og så blev det helt vildt' is the natural way to escalate a story—using 'vildt' (crazy) as the intensifier that Danes use constantly in casual speech.",
          why: "Each language has natural intensifiers; 'vildt' is core to Danish casual speech."
        },
        {
          id: "sp8",
          type: "fillblank",
          question: "Complete the response: A: 'Hvad skete der?' B: 'Jamen, ___ kom ind og...'",
          instruction: "How do you naturally introduce a character in a story?",
          options: [
            { text: "han (he)", correct: true, why: "Natural storytelling uses simple pronouns: 'han kom ind og...' (he came in and...)" },
            { text: "en person (a person)", correct: false, why: "Too formal for storytelling." },
            { text: "individet (the individual)", correct: false, why: "Far too formal." },
            { text: "personen i spørgsmål (the person in question)", correct: false, why: "Overly formal and awkward." }
          ],
          explanation: "Natural stories use simple introductions: 'han kom ind', 'hun sagde', 'de gjorde'—direct and conversational, not formal descriptions.",
          why: "Storytelling relies on simple, direct language, not formal descriptions."
        },
        {
          id: "sp9",
          type: "mcq",
          question: "Someone tells you their story ends with 'og så var det hele overstået.' What does this mean?",
          instruction: "What does this ending convey?",
          options: [
            {
              text: "And then it was all over (conveying relief or completion)",
              correct: true,
              why: "'Og så var det hele overstået' is the natural way to wrap up a story with a sense of completion or relief."
            },
            {
              text: "And then everything was exceeded",
              correct: false,
              why: "Wrong meaning—'overstået' means completed/over, not exceeded."
            },
            {
              text: "And then we started over",
              correct: false,
              why: "'Overstået' doesn't mean starting over."
            },
            {
              text: "And then I was devastated",
              correct: false,
              why: "No connection to the actual meaning."
            }
          ],
          explanation: "The phrase 'og så var det hele overstået' is the natural conclusion to a story—it wraps things up and often implies relief that the situation is resolved.",
          why: "Narratives have natural opening and closing patterns in every language."
        },
        {
          id: "sp10",
          type: "mcq",
          question: "What natural filler does a Dane use when pausing to think while speaking?",
          instruction: "Choose the most natural pause filler:",
          options: [
            {
              text: "'Ej, hvad var det jeg ville sige...' (Well, what was I going to say...)",
              correct: true,
              why: "This is the authentic pause filler—very natural when thinking or gathering thoughts."
            },
            {
              text: "'Jeg har brug for mere tid til at reflektere.' (I need more time to reflect.)",
              correct: false,
              why: "Too formal for a speaking pause."
            },
            {
              text: "'Moment, s.v.t.' (Moment, please.)",
              correct: false,
              why: "Overly formal abbreviation."
            },
            {
              text: "'Jeg må tænke over det.' (I must think about it.)",
              correct: false,
              why: "More formal than the natural filler phrase."
            }
          ],
          explanation: "'Ej, hvad var det jeg ville sige...' (Well, what was I saying...) is the natural filler phrase Danes use when pausing mid-conversation—it sounds natural and keeps the conversation flowing.",
          why: "Native fillers and pauses make you sound fluent and natural."
        }
      ]
    },
    {
      type: "section",
      title: "Problem-Solving & Practical Conversation",
      exercises: [
        {
          id: "sp11",
          type: "mcq",
          question: "You need help but don't want to be demanding. Which is the most natural request?",
          instruction: "Choose the polite but natural approach:",
          options: [
            {
              text: "'Kan du ikke hjælpe mig med noget?' (Can't you help me with something?)",
              correct: true,
              why: "This uses the natural Danish indirect request pattern—it's polite but conversational, not overly formal."
            },
            {
              text: "'Jeg beder dine respektfuldt om assistance.' (I respectfully ask for your assistance.)",
              correct: false,
              why: "Far too formal and stilted."
            },
            {
              text: "'Ville du være så venlig at hjælpe mig?' (Would you be so kind as to help me?)",
              correct: false,
              why: "Too formal—though correct, not natural in casual conversation."
            },
            {
              text: "'Du skal hjælpe mig.' (You must help me.)",
              correct: false,
              why: "Too demanding and rude."
            }
          ],
          explanation: "'Kan du ikke hjælpe mig med noget?' is the natural indirect request—it's polite without being overly formal, and it's how Danes actually ask for help.",
          why: "Different languages have different politeness strategies; this is the Danish way."
        },
        {
          id: "sp12",
          type: "transformation",
          question: "Someone offers help. What's the most natural way to accept enthusiastically?",
          instruction: "Choose the authentic acceptance:",
          options: [
            { text: "'Ja tak! Det ville være helt vildt at få hjælp.' (Yes, thanks! That would be awesome to get help.)", correct: true, why: "'Vildt' (awesome) and 'ja tak' (yes thanks) is natural enthusiasm." },
            { text: "'Jeg accepterer venligt dit tilbud.' (I kindly accept your offer.)", correct: false, why: "Too formal." },
            { text: "'Tak skal du have. Det er meget værdifuldt.' (Thanks. It is very valuable.)", correct: false, why: "Too formal for accepting casual help." },
            { text: "'Jeg kan ikke være uden din hjælp.' (I cannot be without your help.)", correct: false, why: "Overly dramatic." }
          ],
          explanation: "'Ja tak! Det ville være helt vildt!' combines natural enthusiasm with the slang term 'vildt' that younger Danes use constantly. It's warm and natural.",
          why: "Accepting help naturally requires enthusiasm and appropriate slang."
        },
        {
          id: "sp13",
          type: "mcq",
          question: "Someone doesn't understand what you said. What's the natural response to repeat differently?",
          instruction: "Choose the authentic rephrasing approach:",
          options: [
            {
              text: "'Okay, lad mig sige det anderledes...' (Okay, let me say it differently...)",
              correct: true,
              why: "Natural and conversational—it shows willingness to help the listener understand."
            },
            {
              text: "'Jeg skal reformulere min tidligere proposition.' (I shall reformulate my earlier proposition.)",
              correct: false,
              why: "Far too formal."
            },
            {
              text: "'Du forstod det ikke, så jeg prøver igen.' (You didn't understand, so I'll try again.)",
              correct: false,
              why: "Too blunt and potentially rude."
            },
            {
              text: "'Min kommunikation var upræcis. Lad mig genopklare.' (My communication was imprecise. Let me clarify.)",
              correct: false,
              why: "Too formal and self-blaming."
            }
          ],
          explanation: "'Okay, lad mig sige det anderledes...' is the natural way to rephrase—it's casual, collaborative, and shows you're willing to help.",
          why: "Problem-solving conversation requires natural collaborative language."
        },
        {
          id: "sp14",
          type: "fillblank",
          question: "Complete the negotiation: A: 'Det er for dyrt.' B: 'Men hvad hvis jeg ___ det til...'",
          instruction: "How do you naturally make a counteroffer?",
          options: [
            { text: "sænker (lower)", correct: true, why: "'Hvad hvis jeg sænker det til...' (What if I lower it to...) is the natural counteroffer pattern." },
            { text: "reducerer (reduce)", correct: false, why: "Too formal; 'sænker' is more natural." },
            { text: "mindsker (diminish)", correct: false, why: "Too formal." },
            { text: "formindrer (lessens)", correct: false, why: "Too formal." }
          ],
          explanation: "'Hvad hvis jeg sænker det til...' uses the natural 'hvad hvis' (what if) pattern combined with 'sænker' (lower) for a conversational counteroffer.",
          why: "Negotiation language has natural patterns in every language."
        },
        {
          id: "sp15",
          type: "mcq",
          question: "You've resolved a problem. What's the natural closing statement?",
          instruction: "Choose the most natural conclusion:",
          options: [
            {
              text: "'Godt! Så er det løst.' (Good! So that's solved.)",
              correct: true,
              why: "'Så er det løst' (so that's solved) is the natural Danish way to conclude a problem-solving conversation."
            },
            {
              text: "'Hermed er questionen afsluttet.' (Herewith, the question is concluded.)",
              correct: false,
              why: "Far too formal."
            },
            {
              text: "'Problemet har fået sin løsning.' (The problem has received its solution.)",
              correct: false,
              why: "Overly formal."
            },
            {
              text: "'Vi har opnået en konsensus.' (We have achieved consensus.)",
              correct: false,
              why: "Too formal for casual conversation."
            }
          ],
          explanation: "'Godt! Så er det løst.' is the natural, brief way to wrap up problem-solving conversation—it acknowledges resolution with simple efficiency.",
          why: "Closings should match the formality of the conversation."
        }
      ]
    },
    {
      type: "section",
      title: "Natural Speech Patterns & Confidence",
      exercises: [
        {
          id: "sp16",
          type: "mcq",
          question: "What does the discourse marker 'ikke?' do in conversation?",
          instruction: "What is its primary function?",
          options: [
            {
              text: "It's a tag question seeking agreement/confirmation ('right?' in English)",
              correct: true,
              why: "'Ikke?' at the end of statements seeks listener confirmation and keeps conversation inclusive and engaging."
            },
            {
              text: "It negates the previous statement",
              correct: false,
              why: "'Ikke?' doesn't negate—it confirms and involves the listener."
            },
            {
              text: "It introduces a question",
              correct: false,
              why: "It's a tag at the end, not an introduction."
            },
            {
              text: "It expresses disagreement",
              correct: false,
              why: "The opposite—it seeks agreement."
            }
          ],
          explanation: "'Ikke?' is a tag question (like 'right?' or 'isn't it?' in English). 'Det var godt, ikke?' (That was good, right?) involves the listener and makes conversation collaborative.",
          why: "Tag questions are key to natural conversation flow."
        },
        {
          id: "sp17",
          type: "transformation",
          question: "How do you express uncertainty naturally while still sounding confident?",
          instruction: "Choose the natural expression of uncertainty:",
          options: [
            { text: "'Jeg tror det handler om...' (I think it's about...)", correct: true, why: "'Jeg tror' (I think) is the natural way to express opinion/uncertainty while maintaining confidence." },
            { text: "'Jeg er helt usikker på hvad der...' (I'm completely unsure about what...)", correct: false, why: "Too defeatist and apologetic." },
            { text: "'Jeg kan muligvis antyde at...' (I can possibly suggest that...)", correct: false, why: "Too formal and hesitant." },
            { text: "'Jeg er sandsynligvis forkert, men måske...' (I'm probably wrong, but maybe...)", correct: false, why: "Too self-deprecating." }
          ],
          explanation: "'Jeg tror det handler om...' expresses uncertainty while maintaining conversational confidence. Using 'jeg tror' (I think) is natural and doesn't undermine your authority.",
          why: "Confidence in conversation isn't about certainty—it's about natural expression."
        },
        {
          id: "sp18",
          type: "mcq",
          question: "Someone corrects you. What's the natural way to acknowledge and move forward?",
          instruction: "Choose the most natural response:",
          options: [
            {
              text: "'Ah ja, selvfølgelig! Tak for det.' (Ah yes, of course! Thanks for that.)",
              correct: true,
              why: "This acknowledges correction gracefully without over-apologizing. It's natural and keeps conversation moving."
            },
            {
              text: "'Jeg var helt forkert. Jeg beklager dybt.' (I was completely wrong. I apologize deeply.)",
              correct: false,
              why: "Over-apologetic and diminishes confidence."
            },
            {
              text: "'Jeg accept dit korrekt statement.' (I accept your correct statement.)",
              correct: false,
              why: "Awkward phrasing and overly formal."
            },
            {
              text: "'Du har ret og jeg har uret.' (You are right and I am wrong.)",
              correct: false,
              why: "Too stark and formal."
            }
          ],
          explanation: "'Ah ja, selvfølgelig! Tak for det.' is the natural response—it acknowledges the correction lightly, accepts it, and moves forward without excessive apology.",
          why: "Confident people acknowledge corrections without diminishing themselves."
        },
        {
          id: "sp19",
          type: "fillblank",
          question: "Complete the natural expression of experience: 'Jeg har selv ___ det samme'",
          instruction: "What verb makes this natural?",
          options: [
            { text: "oplevet (experienced)", correct: true, why: "'Jeg har selv oplevet det samme' (I've myself experienced the same) is natural when relating to someone's story." },
            { text: "gennemgået (gone through)", correct: false, why: "Too formal; 'oplevet' is more natural." },
            { text: "vidneret (witnessed)", correct: false, why: "Too formal." },
            { text: "mærket (felt/sensed)", correct: false, why: "Less natural than 'oplevet.'" }
          ],
          explanation: "'Jeg har selv oplevet det samme' is the natural way to say 'I've experienced the same thing'—it's conversational and relates well to others' stories.",
          why: "Natural conversation involves sharing similar experiences using natural vocabulary."
        },
        {
          id: "sp20",
          type: "mcq",
          question: "You want to ask a genuine question to keep conversation going. What's most natural?",
          instruction: "Choose the authentic curious question:",
          options: [
            {
              text: "'Og hvad gjorde du så?' (And what did you do then?)",
              correct: true,
              why: "'Og hvad gjorde du så?' uses natural connectors and shows genuine curiosity in a casual way."
            },
            {
              text: "'Jeg er interesseret i at høre om dine påfølgende handlinger.' (I am interested in hearing about your subsequent actions.)",
              correct: false,
              why: "Far too formal."
            },
            {
              text: "'Fortæl mig detaljer om hvad der skete derefter.' (Tell me details about what happened after.)",
              correct: false,
              why: "Too demanding and formal."
            },
            {
              text: "'Jeg ønsker information om næste begivenhed.' (I wish information about the next event.)",
              correct: false,
              why: "Overly formal and awkward."
            }
          ],
          explanation: "'Og hvad gjorde du så?' is the natural follow-up question—it uses 'og' to connect ideas and 'så' to move the story forward. It's genuinely curious without being formal.",
          why: "Authentic conversation relies on simple, natural follow-up questions."
        }
      ]
    },
    {
      type: "production",
      title: "Practice Natural Dialogue",
      scenarios: [
        {
          id: "prod1",
          instruction: "Write a realistic 6-8 line dialogue between two friends catching up after a week. Include: a greeting, a question, a brief story response with 'og så', and a natural closing.",
          guidance: "Focus on: natural 'Hej! Hvordan går det?' greeting, brief responses, use 'og så' to advance the story, include one discourse marker like 'ikke?' or 'så mig da!'"
        },
        {
          id: "prod2",
          instruction: "Write a scenario where you ask for help (e.g., 'Kan du ikke hjælpe mig med...?'), the person accepts, and you wrap up naturally with 'Det er vildt at få hjælp.'",
          guidance: "Make it 4-5 exchanges. Focus on: indirect request pattern, natural acceptance with enthusiasm, and natural closing like 'Tak skal du have!'"
        }
      ]
    },
    {
      type: "quiz",
      title: "Speaking Practice Quiz",
      quizItems: [
        {
          id: "q1",
          question: "Which opening is most natural for a casual conversation with a colleague?",
          options: [
            { text: "'Hej! Hvordan går det?' (informal and naturally conversational)", correct: true, why: "Correct—this is how Danes naturally greet colleagues." },
            { text: "'God dag. Jeg ønsker at spørge hvordan du har det.' (Too formal)", correct: false, why: "Overly formal for casual conversation." },
            { text: "'Godmorgen. Er du på arbejde i dag?' (Awkward and unnecessary)", correct: false, why: "Obviously you're at work if you're there!" },
            { text: "'Hej dig!' (Incomplete without a question)", correct: false, why: "Less natural without asking 'Hvordan går det?'" }
          ]
        },
        {
          id: "q2",
          question: "What does 'og så' mean in Danish storytelling?",
          options: [
            { text: "'and then' (used to advance the narrative)", correct: true, why: "Correct—'og så' is the connector that moves stories forward naturally." },
            { text: "'so' (introducing a conclusion)", correct: false, why: "It's for advancing, not concluding." },
            { text: "'well' (a filler word)", correct: false, why: "It's a narrative connector, not just a filler." },
            { text: "'because' (introducing a reason)", correct: false, why: "No—'og så' doesn't express causation." }
          ]
        },
        {
          id: "q3",
          question: "How do you naturally ask for help in Danish without being demanding?",
          options: [
            { text: "'Kan du ikke hjælpe mig med noget?' (indirect request pattern)", correct: true, why: "Correct—this is the natural Danish way to ask for help politely." },
            { text: "'Du skal hjælpe mig.' (Direct and demanding)", correct: false, why: "Too demanding." },
            { text: "'Ville du være så venlig?' (Too formal)", correct: false, why: "Formal, though technically correct." },
            { text: "'Jeg har absolut behov for din hjælp.' (Too desperate)", correct: false, why: "Over-the-top." }
          ]
        },
        {
          id: "q4",
          question: "What does 'ikke?' do at the end of a sentence?",
          options: [
            { text: "It's a tag question seeking agreement/confirmation", correct: true, why: "Correct—'ikke?' seeks the listener's confirmation and involvement." },
            { text: "It negates the entire statement", correct: false, why: "It confirms, doesn't negate." },
            { text: "It ends a question", correct: false, why: "It's a tag on statements, not how you form questions." },
            { text: "It expresses doubt", correct: false, why: "It actually seeks confirmation, not doubt." }
          ]
        },
        {
          id: "q5",
          question: "How do you acknowledge a correction gracefully in Danish?",
          options: [
            { text: "'Ah ja, selvfølgelig! Tak for det.' (natural and confident)", correct: true, why: "Correct—this acknowledges correction without over-apologizing." },
            { text: "'Jeg var helt forkert. Jeg beklager dybt.' (Over-apologetic)", correct: false, why: "Too self-deprecating." },
            { text: "'Du har ret og jeg har uret.' (Too stark)", correct: false, why: "Too formal and diminishing." },
            { text: "'Hmm, interessant perspektiv.' (Dismissive)", correct: false, why: "Sounds like you're not accepting the correction." }
          ]
        }
      ]
    },
    {
      type: "complete",
      title: "You're Ready to Speak!",
      message: "Congratulations! You've completed all 9 lessons and mastered Danish from basic grammar through advanced cultural fluency and natural speaking. You can now engage in authentic conversations, tell stories naturally, problem-solve effectively, and sound confident speaking Danish. The next step is finding real conversations with native speakers to continue building fluency. Du klarer det!" // "You've got this!"
    }
  ];

  // Calculate score
  const calculateScore = () => {
    const exerciseIds = sections
      .filter(s => s.exercises)
      .flatMap(s => s.exercises.map(e => e.id));
    const quizIds = sections
      .find(s => s.type === "quiz")
      ?.quizItems.map(q => q.id) || [];
    const totalQuestions = [...exerciseIds, ...quizIds];

    let correct = 0;
    totalQuestions.forEach(id => {
      const section = sections.find(s => s.exercises && s.exercises.find(e => e.id === id));
      if (section) {
        const exercise = section.exercises.find(e => e.id === id);
        if (exercise && responses[id] !== undefined) {
          const selected = exercise.options[responses[id]];
          if (selected?.correct) correct++;
        }
      } else {
        const quiz = sections.find(s => s.type === "quiz");
        if (quiz) {
          const quizItem = quiz.quizItems.find(q => q.id === id);
          if (quizItem && responses[id] !== undefined) {
            const selected = quizItem.options[responses[id]];
            if (selected?.correct) correct++;
          }
        }
      }
    });

    return Math.round((correct / totalQuestions.length) * 100);
  };

  const currentSection = sections[currentSectionIndex];

  const handleOptionClick = (exerciseId, optionIndex) => {
    setResponses({ ...responses, [exerciseId]: optionIndex });
    setShowExplanation({ ...showExplanation, [exerciseId]: true });
  };

  const handleNext = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleComplete = () => {
    const score = calculateScore();
    onComplete(score);
  };

  // Render: Intro Section
  if (currentSection.type === "intro") {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[600px] mx-auto px-4 py-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 grid place-items-center text-gray-900 font-[600] mb-4"
            aria-label="Back"
          >
            ←
          </button>
          <h1 className="text-[28px] font-[700] text-gray-900 mb-4">{currentSection.title}</h1>
          <div className="bg-blue-50 rounded-[12px] p-4 border border-blue-200 mb-6">
            <p className="text-[14px] text-gray-800 leading-[1.6] mb-3">{currentSection.content}</p>
            <p className="text-[13px] text-gray-700 leading-[1.6] italic">
              <strong>Cultural context:</strong> {currentSection.englishContext}
            </p>
          </div>
          <button
            onClick={handleNext}
            className="w-full py-3 bg-green-600 text-white font-[600] rounded-[8px] hover:bg-green-700 transition-colors"
          >
            Start Lesson
          </button>
        </div>
      </div>
    );
  }

  // Render: Exercise Section
  if (currentSection.type === "section") {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[600px] mx-auto px-4 py-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 grid place-items-center text-gray-900 font-[600] mb-4"
            aria-label="Back"
          >
            ←
          </button>
          <h1 className="text-[24px] font-[700] text-gray-900 mb-6">{currentSection.title}</h1>
          <div className="space-y-6">
            {currentSection.exercises.map((exercise, idx) => (
              <div key={exercise.id} className="bg-gray-50 rounded-[12px] p-4 border border-gray-200">
                <div className="text-[12px] text-gray-500 font-[600] mb-2">
                  Question {idx + 1} of {currentSection.exercises.length}
                </div>
                <h2 className="text-[15px] font-[700] text-gray-900 mb-3">{exercise.question}</h2>
                {exercise.instruction && (
                  <p className="text-[13px] text-gray-700 mb-3 italic">{exercise.instruction}</p>
                )}
                <div className="space-y-2 mb-4">
                  {exercise.options.map((option, optionIdx) => (
                    <button
                      key={optionIdx}
                      onClick={() => handleOptionClick(exercise.id, optionIdx)}
                      className={`w-full p-3 rounded-[8px] text-left text-[14px] font-[500] transition-all ${
                        responses[exercise.id] === optionIdx
                          ? option.correct
                            ? "bg-green-100 border-2 border-green-600 text-green-900"
                            : "bg-red-100 border-2 border-red-600 text-red-900"
                          : "bg-white border border-gray-300 text-gray-900 hover:border-gray-400"
                      }`}
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
                {showExplanation[exercise.id] && responses[exercise.id] !== undefined && (
                  <div className="bg-blue-50 rounded-[8px] p-3 border-l-4 border-blue-600">
                    <p className="text-[13px] text-blue-900 font-[600] mb-2">Explanation:</p>
                    <p className="text-[13px] text-blue-800 mb-2">{exercise.explanation}</p>
                    <p className="text-[12px] text-blue-700 italic">
                      <strong>Why:</strong> {exercise.why}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleNext}
            className="w-full mt-6 py-3 bg-green-600 text-white font-[600] rounded-[8px] hover:bg-green-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Render: Production Section
  if (currentSection.type === "production") {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[600px] mx-auto px-4 py-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 grid place-items-center text-gray-900 font-[600] mb-4"
            aria-label="Back"
          >
            ←
          </button>
          <h1 className="text-[24px] font-[700] text-gray-900 mb-6">{currentSection.title}</h1>
          <div className="space-y-6">
            {currentSection.scenarios.map((scenario, idx) => (
              <div key={scenario.id} className="bg-gray-50 rounded-[12px] p-4 border border-gray-200">
                <div className="text-[12px] text-gray-500 font-[600] mb-2">
                  Scenario {idx + 1} of {currentSection.scenarios.length}
                </div>
                <p className="text-[14px] font-[700] text-gray-900 mb-3">{scenario.instruction}</p>
                <p className="text-[13px] text-gray-600 mb-3 italic">💡 {scenario.guidance}</p>
                <textarea
                  placeholder="Write your dialogue here..."
                  className="w-full h-[150px] p-3 border border-gray-300 rounded-[8px] text-[14px] font-[500] resize-none focus:outline-none focus:ring-2 focus:ring-green-600"
                  value={responses[scenario.id] || ""}
                  onChange={(e) => setResponses({ ...responses, [scenario.id]: e.target.value })}
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleNext}
            className="w-full mt-6 py-3 bg-green-600 text-white font-[600] rounded-[8px] hover:bg-green-700 transition-colors"
          >
            Continue to Quiz
          </button>
        </div>
      </div>
    );
  }

  // Render: Quiz Section
  if (currentSection.type === "quiz") {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[600px] mx-auto px-4 py-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 grid place-items-center text-gray-900 font-[600] mb-4"
            aria-label="Back"
          >
            ←
          </button>
          <h1 className="text-[24px] font-[700] text-gray-900 mb-6">{currentSection.title}</h1>
          <div className="space-y-6">
            {currentSection.quizItems.map((item, idx) => (
              <div key={item.id} className="bg-gray-50 rounded-[12px] p-4 border border-gray-200">
                <div className="text-[12px] text-gray-500 font-[600] mb-2">
                  Question {idx + 1} of {currentSection.quizItems.length}
                </div>
                <h2 className="text-[15px] font-[700] text-gray-900 mb-3">{item.question}</h2>
                <div className="space-y-2">
                  {item.options.map((option, optionIdx) => (
                    <button
                      key={optionIdx}
                      onClick={() => handleOptionClick(item.id, optionIdx)}
                      className={`w-full p-3 rounded-[8px] text-left text-[14px] font-[500] transition-all ${
                        responses[item.id] === optionIdx
                          ? option.correct
                            ? "bg-green-100 border-2 border-green-600 text-green-900"
                            : "bg-red-100 border-2 border-red-600 text-red-900"
                          : "bg-white border border-gray-300 text-gray-900 hover:border-gray-400"
                      }`}
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
                {showExplanation[item.id] && responses[item.id] !== undefined && (
                  <div className="mt-3 bg-blue-50 rounded-[8px] p-3 border-l-4 border-blue-600">
                    <p className="text-[12px] text-blue-900 font-[600]">
                      {item.options[responses[item.id]].why}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleComplete}
            className="w-full mt-6 py-3 bg-green-600 text-white font-[600] rounded-[8px] hover:bg-green-700 transition-colors"
          >
            Complete Lesson
          </button>
        </div>
      </div>
    );
  }

  // Render: Complete Section
  if (currentSection.type === "complete") {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
        <div className="max-w-[500px] text-center">
          <div className="text-[72px] mb-4">🎉</div>
          <h1 className="text-[28px] font-[700] text-gray-900 mb-3">{currentSection.title}</h1>
          <div className="bg-green-100 rounded-[12px] p-6 mb-6 border border-green-300">
            <div className="text-[48px] font-[700] text-green-700 mb-2">{score}%</div>
            <p className="text-[16px] font-[600] text-green-800">Your Score</p>
          </div>
          <p className="text-[15px] text-gray-700 leading-[1.7] mb-6">{currentSection.message}</p>
          <button
            onClick={onBack}
            className="w-full py-3 bg-green-600 text-white font-[600] rounded-[8px] hover:bg-green-700 transition-colors"
          >
            Back to Lessons
          </button>
        </div>
      </div>
    );
  }
}
