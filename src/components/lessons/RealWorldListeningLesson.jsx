import { useState } from 'react';

// Lesson 5: Real-world Listening — Natural speed, realistic contexts
// Scenarios: ordering food, shopping, transit, casual conversations, instructions

export default function RealWorldListeningLesson({ lesson, onComplete, onBack }) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [showExplanation, setShowExplanation] = useState({});

  const sections = [
    {
      type: "intro",
      title: "Real-world Listening",
      content: "In this lesson, you'll practice understanding natural-speed Danish in everyday situations: ordering at a café, shopping, asking for directions, and casual conversations. Each scenario has authentic dialogue with real pronunciation and speech patterns.",
      englishContext: "Just like in real life, Danes speak quickly and naturally. This lesson trains your ear to catch the essential information—names, numbers, prices, what people want—even when you don't understand every word."
    },
    {
      type: "section",
      title: "Restaurant & Café (Natural Speed)",
      exercises: [
        {
          id: "rw1",
          type: "listening",
          scenario: "Ordering at a Danish café",
          transcript: "Hej! Hvad skal det være i dag? Vi har rigtig godt kaffe og friske rundstykker. Og jeg kan varmt anbefale vores æbletærte—det er helt fantastisk.",
          translation: "Hello! What will it be today? We have really good coffee and fresh rolls. And I can warmly recommend our apple pie—it's fantastic.",
          question: "What does the staff member strongly recommend?",
          options: [
            { text: "Coffee and rolls", correct: false, why: "The staff mentions coffee and rolls, but specifically recommends something else." },
            { text: "Apple pie", correct: true, why: "Correct! Æbletærte is apple pie, and they say jeg kan varmt anbefale (I can warmly recommend) it." },
            { text: "Fresh fruit", correct: false, why: "Not mentioned in the audio." }
          ],
          explanation: "When someone says jeg kan varmt anbefale (I can warmly recommend), they're strongly pushing that item. Listen for recommendation phrases like this.",
          why: "Understanding recommendations helps you navigate menus and shops."
        },
        {
          id: "rw2",
          type: "listening",
          scenario: "Customer ordering coffee",
          transcript: "Ja, jeg skal have en stor latte med et skud karamel. Og kan du gøre det med mandelmælk i stedet for almindelig mælk?",
          translation: "Yes, I'll have a large latte with a shot of caramel. And can you make it with almond milk instead of regular milk?",
          question: "How does the customer want their milk?",
          options: [
            { text: "Regular milk", correct: false, why: "The customer specifically asks to replace regular milk with something else." },
            { text: "Almond milk", correct: true, why: "Correct! Mandelmælk i stedet for almindelig mælk = almond milk instead of regular milk." },
            { text: "Oat milk", correct: false, why: "Not mentioned." }
          ],
          explanation: "When someone says i stedet for (instead of), they want a substitution. This phrase is essential for ordering modifications.",
          why: "Many people have dietary preferences. Being able to request substitutions is practical."
        },
        {
          id: "rw3",
          type: "listening",
          scenario: "Asking about food allergies",
          transcript: "Jeg er allergisk over for nødder. Indeholder rugbrødet nødder, eller kan jeg spise det uden problemer?",
          translation: "I'm allergic to nuts. Does the rye bread contain nuts, or can I eat it safely?",
          question: "What is the customer allergic to?",
          options: [
            { text: "Rye bread", correct: false, why: "Rye bread is what they're asking about, not their allergy." },
            { text: "Nuts", correct: true, why: "Correct! Jeg er allergisk over for nødder = I'm allergic to nuts." },
            { text: "Gluten", correct: false, why: "Not mentioned." }
          ],
          explanation: "The phrase jeg er allergisk over for (I'm allergic to) is critical health information. Always ask before eating in Denmark.",
          why: "Food allergies are serious. Knowing how to communicate them could be lifesaving."
        },
        {
          id: "rw4",
          type: "listening",
          scenario: "Café staff mentioning specials",
          transcript: "I dag har vi et særligt tilbud på isen. Den er 20 procent billigere end normalt, og den smager fantastisk. Alle elsker det.",
          translation: "Today we have a special offer on ice cream. It's 20 percent cheaper than usual, and it tastes fantastic. Everyone loves it.",
          question: "What's special about the ice cream today?",
          options: [
            { text: "It's a new flavor", correct: false, why: "The special is about the price and popularity, not a new flavor." },
            { text: "It's 20% cheaper", correct: true, why: "Correct! 20 procent billigere = 20 percent cheaper. It's on special offer." },
            { text: "It's homemade", correct: false, why: "Not mentioned." }
          ],
          explanation: "When you hear særligt tilbud (special offer) combined with a percentage, you're being told about a discount. Always listen for these money-saving clues!",
          why: "Special offers are everywhere in Denmark. Recognizing discounts helps you save money."
        },
        {
          id: "rw5",
          type: "listening",
          scenario: "Ordering multiple items",
          transcript: "Jeg skal have to croissanter, en kakaokage, og en stor cappuccino. Hvor meget bliver det?",
          translation: "I'll have two croissants, a chocolate cake, and a large cappuccino. How much will that be?",
          question: "How many croissants does the customer order?",
          options: [
            { text: "One croissant", correct: false, why: "The customer says to croissanter—to means two." },
            { text: "Two croissants", correct: true, why: "Correct! To croissanter = two croissants. Numbers are key in ordering." },
            { text: "Three croissants", correct: false, why: "Not mentioned." }
          ],
          explanation: "Numbers matter when ordering. To (two), tre (three), fire (four) are the first numbers you need to recognize.",
          why: "Misunderstanding quantities could result in the wrong order."
        }
      ]
    },
    {
      type: "section",
      title: "Shopping & Commerce (Natural Speed)",
      exercises: [
        {
          id: "rw6",
          type: "listening",
          scenario: "Shopping for clothes",
          transcript: "Har I denne trøje i størrelse large? Og er der rabat, hvis jeg køber to?",
          translation: "Do you have this sweater in size large? And is there a discount if I buy two?",
          question: "What size is the customer looking for?",
          options: [
            { text: "Medium", correct: false, why: "The customer asks for large, not medium." },
            { text: "Large", correct: true, why: "Correct! Størrelse large = size large." },
            { text: "Small", correct: false, why: "Not mentioned." }
          ],
          explanation: "Clothing sizes in Danish follow English conventions (small, medium, large, XL). The word størrelse means size.",
          why: "Shopping is common in any language. Knowing how to ask for sizes is essential."
        },
        {
          id: "rw7",
          type: "listening",
          scenario: "At a supermarket checkout",
          transcript: "Jeg beklager, men dit kørekort er udløbet. Du kan ikke købe alkohol uden et gyldigt ID.",
          translation: "I'm sorry, but your driver's license has expired. You can't buy alcohol without a valid ID.",
          question: "Why can't the customer buy alcohol?",
          options: [
            { text: "No ID provided", correct: false, why: "They have an ID, but it's expired." },
            { text: "ID is expired", correct: true, why: "Correct! Dit kørekort er udløbet = your driver's license has expired." },
            { text: "They're too young", correct: false, why: "The issue is the expired ID, not age." }
          ],
          explanation: "In Denmark, shops take ID verification seriously. Udløbet means expired—an important word for travel documents.",
          why: "Understanding why you're denied something helps you plan accordingly."
        },
        {
          id: "rw8",
          type: "listening",
          scenario: "Asking about returns",
          transcript: "Jeg købte denne kjole i går, men den passer ikke. Kan jeg returnere den og få mine penge tilbage?",
          translation: "I bought this dress yesterday, but it doesn't fit. Can I return it and get my money back?",
          question: "What is the customer's problem?",
          options: [
            { text: "The dress is damaged", correct: false, why: "The issue is the fit, not damage." },
            { text: "The dress doesn't fit", correct: true, why: "Correct! Den passer ikke = it doesn't fit." },
            { text: "The dress is the wrong color", correct: false, why: "Not mentioned." }
          ],
          explanation: "The phrase det passer ikke (it doesn't fit) is essential for returns and exchanges. Returnere means to return.",
          why: "Knowing how to return items protects your money and rights as a consumer."
        },
        {
          id: "rw9",
          type: "listening",
          scenario: "Asking for payment methods",
          transcript: "Accepterer I kreditkort? Jeg har mit visakort her, og jeg kan også betale med mobil.",
          translation: "Do you accept credit cards? I have my Visa card here, and I can also pay by mobile.",
          question: "What payment methods does the customer mention?",
          options: [
            { text: "Cash and check", correct: false, why: "Not the methods mentioned." },
            { text: "Credit card and mobile payment", correct: true, why: "Correct! Visakort (Visa card) and betale med mobil (pay by mobile)." },
            { text: "Debit card only", correct: false, why: "The customer mentions credit and mobile, not debit." }
          ],
          explanation: "Modern payment methods: kreditkort (credit card), kort (card), betale med mobil (pay by mobile). Most Danish shops accept cards.",
          why: "Understanding payment options prevents awkward moments at checkout."
        },
        {
          id: "rw10",
          type: "listening",
          scenario: "Asking about product availability",
          transcript: "Jeg søger efter den nye bog af Jussi Adler-Olsen. Har I den på lager, eller skal jeg pre-order den?",
          translation: "I'm looking for the new book by Jussi Adler-Olsen. Do you have it in stock, or should I pre-order it?",
          question: "What is the customer looking for?",
          options: [
            { text: "A magazine", correct: false, why: "The customer says bog (book), not magazine." },
            { text: "A book", correct: true, why: "Correct! Den nye bog = the new book. Jussi Adler-Olsen is a famous Danish author." },
            { text: "A movie", correct: false, why: "Not mentioned." }
          ],
          explanation: "Key shopping words: bog (book), på lager (in stock), pre-order (pre-order—used in Danish too).",
          why: "Being able to ask about availability saves you trips to the store."
        }
      ]
    },
    {
      type: "section",
      title: "Travel & Transit (Natural Speed)",
      exercises: [
        {
          id: "rw11",
          type: "listening",
          scenario: "Asking for bus information",
          transcript: "Undskyld, hvor går bus nummer 5A? Jeg skal til Nørreport. Og hvornår går den næste?",
          translation: "Excuse me, where does bus number 5A go? I need to get to Nørreport. And when does the next one leave?",
          question: "Where does the customer want to go?",
          options: [
            { text: "Central Station", correct: false, why: "The customer wants Nørreport, which is a specific area/station." },
            { text: "Nørreport", correct: true, why: "Correct! Jeg skal til Nørreport = I need to get to Nørreport." },
            { text: "Aarhus", correct: false, why: "Not mentioned." }
          ],
          explanation: "Transit phrases: hvor går? (where does [it] go?), hvornår går? (when does [it] leave?), destination names.",
          why: "Getting around a new city requires understanding transit directions."
        },
        {
          id: "rw12",
          type: "listening",
          scenario: "Buying train tickets",
          transcript: "Jeg skal have to billetter til København. En enkelbillet og en retur. Hvornår går toget?",
          translation: "I need two tickets to Copenhagen. One one-way and one return. When does the train leave?",
          question: "How many tickets and what type?",
          options: [
            { text: "Two one-way tickets", correct: false, why: "One is one-way, but the other is return." },
            { text: "One one-way and one return", correct: true, why: "Correct! En enkelbillet (one-way) and en retur (return)." },
            { text: "Two return tickets", correct: false, why: "One is one-way, not both return." }
          ],
          explanation: "Ticket types: enkelbillet (one-way ticket), retur / returbillet (return ticket). Critical for booking travel.",
          why: "Train travel is common in Denmark. Knowing ticket types helps you book correctly."
        },
        {
          id: "rw13",
          type: "listening",
          scenario: "Asking about platform information",
          transcript: "Fromlisten siger at toget til Aarhus går fra perron 4. Men jeg ser det ikke der. Skal jeg være på perron 3 i stedet?",
          translation: "The schedule says the train to Aarhus leaves from platform 4. But I don't see it there. Should I be on platform 3 instead?",
          question: "Which platforms are mentioned?",
          options: [
            { text: "Platforms 1 and 2", correct: false, why: "Platforms 4 and 3 are mentioned, not 1 and 2." },
            { text: "Platforms 3 and 4", correct: true, why: "Correct! Perron 4 and perron 3 are both mentioned." },
            { text: "Platforms 5 and 6", correct: false, why: "Not mentioned." }
          ],
          explanation: "Transit vocabulary: perron (platform), fromlisten (the schedule), numbers for platforms.",
          why: "Missing your train is stressful. Knowing platform information prevents confusion."
        },
        {
          id: "rw14",
          type: "listening",
          scenario: "At the airport asking about luggage",
          transcript: "Jeg har tre kufferter, men jeg vil kun tjekke en af dem. De andre to tager jeg med ind i kabinen.",
          translation: "I have three suitcases, but I only want to check one. I'll take the other two into the cabin.",
          question: "How many suitcases is the customer checking?",
          options: [
            { text: "One suitcase", correct: true, why: "Correct! Jeg vil kun tjekke en af dem = I only want to check one." },
            { text: "Two suitcases", correct: false, why: "Two go into the cabin, not checked." },
            { text: "Three suitcases", correct: false, why: "Only one is being checked." }
          ],
          explanation: "Travel words: kuffert (suitcase), tjekke (check baggage), kabinen (cabin).",
          why: "Understanding luggage policies helps you pack and plan for travel."
        },
        {
          id: "rw15",
          type: "listening",
          scenario: "Asking for directions on the street",
          transcript: "Undskyld, er Strøget langt herfra? Jeg vil gerne gå der, men jeg er lidt lost. Kan du vise mig vejen?",
          translation: "Excuse me, is Strøget far from here? I want to go there, but I'm a bit lost. Can you show me the way?",
          question: "What is the person looking for?",
          options: [
            { text: "A restaurant", correct: false, why: "Strøget is a famous pedestrian shopping street, not a restaurant." },
            { text: "Strøget (the shopping street)", correct: true, why: "Correct! Er Strøget langt herfra? = Is Strøget far from here?" },
            { text: "The train station", correct: false, why: "Not mentioned." }
          ],
          explanation: "Direction phrases: langt herfra? (far from here?), kan du vise mig vejen? (can you show me the way?).",
          why: "Getting lost is normal when traveling. Knowing how to ask for directions is essential."
        }
      ]
    },
    {
      type: "section",
      title: "Casual Conversations (Natural Speed)",
      exercises: [
        {
          id: "rw16",
          type: "listening",
          scenario: "Greeting and small talk",
          transcript: "Hej, hvordan går det med dig? Jeg har det rigtig godt, og jeg er glad for det. Hvordan er det gået dig siden sidst?",
          translation: "Hi, how are you? I'm doing really well, and I'm happy about it. How have you been since last time?",
          question: "How does the speaker feel?",
          options: [
            { text: "Unhappy", correct: false, why: "They say jeg er glad (I'm happy)." },
            { text: "Really well and happy", correct: true, why: "Correct! Jeg har det rigtig godt (really well) and jeg er glad (I'm happy)." },
            { text: "Tired", correct: false, why: "Not mentioned." }
          ],
          explanation: "Mood phrases: hvordan går det? (how are you?), jeg har det godt (I'm doing well), jeg er glad (I'm happy).",
          why: "Small talk opens conversations and shows friendliness in Danish culture."
        },
        {
          id: "rw17",
          type: "listening",
          scenario: "Talking about the weather",
          transcript: "Det er vildt koldt i dag! Jeg håber det bliver varmere snart. Sidste uge var meget finere vejr.",
          translation: "It's incredibly cold today! I hope it gets warmer soon. Last week had much nicer weather.",
          question: "What is the current weather like?",
          options: [
            { text: "Warm and sunny", correct: false, why: "The person says vildt koldt (incredibly cold)." },
            { text: "Very cold", correct: true, why: "Correct! Det er vildt koldt i dag = It's incredibly cold today." },
            { text: "Rainy and windy", correct: false, why: "Not mentioned." }
          ],
          explanation: "Weather words: koldt (cold), varmt (warm), pænt vejr / fint vejr (nice weather), regn (rain).",
          why: "Danes talk about weather constantly. This is essential small-talk vocabulary."
        },
        {
          id: "rw18",
          type: "listening",
          scenario: "Discussing weekend plans",
          transcript: "Jeg skal på tur i weekenden. Vi skal vandre i dyrskoven og have picnic. Du er velkommen til at komme med!",
          translation: "I'm going on a trip this weekend. We're going hiking in the forest and having a picnic. You're welcome to come along!",
          question: "What are they planning to do?",
          options: [
            { text: "Swimming and sunbathing", correct: false, why: "They mention hiking and picnic, not swimming." },
            { text: "Hiking and picnic", correct: true, why: "Correct! Vandre i dyrskoven (hike in the forest) and picnic." },
            { text: "Shopping in the city", correct: false, why: "Not mentioned." }
          ],
          explanation: "Activity words: tur (trip), vandre (hike), picnic (picnic), velkommen (welcome).",
          why: "Discussing plans is how friendships are made. Recognizing invitations is important."
        },
        {
          id: "rw19",
          type: "listening",
          scenario: "Talking about hobbies",
          transcript: "Jeg elsker at spille badminton og tegne. Min ven kan løbe meget hurtigt, så vi skal løbe sammen næste uge.",
          translation: "I love playing badminton and drawing. My friend can run very fast, so we're going to run together next week.",
          question: "What activities does the speaker do?",
          options: [
            { text: "Soccer and swimming", correct: false, why: "They mention badminton and drawing." },
            { text: "Badminton and drawing", correct: true, why: "Correct! Spille badminton and tegne (draw)." },
            { text: "Tennis and painting", correct: false, why: "They say badminton, not tennis; drawing, not painting." }
          ],
          explanation: "Hobby words: spille (play), badminton, tegne (draw), løbe (run).",
          why: "Talking about hobbies helps you connect with people and show personality."
        },
        {
          id: "rw20",
          type: "listening",
          scenario: "Making plans for dinner",
          transcript: "Skal vi mødes til middag i morgen? Jeg kan lide både italiensk og thai-mad. Hvor skal vi hen? Der er en ny restaurant ved siden af Nørrebro.",
          translation: "Should we meet for dinner tomorrow? I like both Italian and Thai food. Where should we go? There's a new restaurant next to Nørrebro.",
          question: "When do they want to meet?",
          options: [
            { text: "Tonight", correct: false, why: "They say i morgen (tomorrow)." },
            { text: "Tomorrow", correct: true, why: "Correct! Skal vi mødes til middag i morgen? = Should we meet for dinner tomorrow?" },
            { text: "Next week", correct: false, why: "Not mentioned." }
          ],
          explanation: "Social phrases: mødes (meet), til middag (for dinner), i morgen (tomorrow), hvor skal vi hen? (where should we go?).",
          why: "Making social plans is fundamental to building friendships in any country."
        }
      ]
    },
    {
      type: "production",
      title: "Your Turn: Natural Conversation",
      instruction: "You hear a Danish speaker say something in a real situation. Respond in Danish as naturally as you can. There's no correct answer—just communicate the message.",
      scenarios: [
        {
          id: "prod1",
          prompt: "Someone at a café asks: Hvad skal det være?",
          hint: "Order something to drink and something to eat. Say: Jeg skal have... (I'll have...)"
        },
        {
          id: "prod2",
          prompt: "A friend asks: Hvordan går det med dig?",
          hint: "Say how you're doing. Use: Jeg har det... (I'm doing...)"
        }
      ]
    },
    {
      type: "quiz",
      title: "Check Your Understanding",
      quizItems: [
        {
          id: "q1",
          question: "When a Danish café staff says jeg kan varmt anbefale, they are:",
          options: [
            { text: "Telling you the temperature", correct: false, why: "This phrase has nothing to do with actual temperature." },
            { text: "Strongly recommending something", correct: true, why: "Correct! Varmt means warmly, showing strong approval." },
            { text: "Complaining about their job", correct: false, why: "This is a friendly recommendation." }
          ],
          explanation: "Key phrase recognition: jeg kan varmt anbefale is a warm recommendation of a menu item."
        },
        {
          id: "q2",
          question: "If someone says i stedet for, they want to:",
          options: [
            { text: "Add something to their order", correct: false, why: "I stedet for means instead of, implying replacement." },
            { text: "Replace one item with another", correct: true, why: "Correct! I stedet for = instead of, meaning substitution." },
            { text: "Cancel their entire order", correct: false, why: "This phrase is about specific substitution." }
          ],
          explanation: "Understanding substitution requests is essential for ordering customizations."
        },
        {
          id: "q3",
          question: "The phrase det passer ikke means:",
          options: [
            { text: "It doesn't work for me (doesn't suit my needs)", correct: false, why: "This is close but incomplete." },
            { text: "It doesn't fit (clothing or circumstance)", correct: true, why: "Correct! Passe means to fit. Used for clothes and situations." },
            { text: "It's not on the menu", correct: false, why: "That would be a different phrase." }
          ],
          explanation: "Det passe ikke is used when something doesn't fit—clothes, schedules, or situations."
        },
        {
          id: "q4",
          question: "Which word means platform at a train or bus station?",
          options: [
            { text: "Spor", correct: false, why: "Spor is a train track, but the correct word for platform is perron." },
            { text: "Perron", correct: true, why: "Correct! Perron is the platform where you wait for buses and trains." },
            { text: "Stationen", correct: false, why: "This means the station itself, not the platform." }
          ],
          explanation: "Station vocabulary: perron (platform), spor (track), stationen (the station)."
        },
        {
          id: "q5",
          question: "If someone says du er velkommen, they are:",
          options: [
            { text: "Saying goodbye", correct: false, why: "This phrase welcomes you, doesn't say goodbye." },
            { text: "Welcoming you or inviting you to join", correct: true, why: "Correct! Du er velkommen = you are welcome (to join/participate)." },
            { text: "Complaining about your presence", correct: false, why: "This is a warm, inclusive phrase." }
          ],
          explanation: "Velkommen creates a friendly, inclusive atmosphere in Danish culture."
        }
      ]
    },
    {
      type: "complete",
      title: "Lesson Complete!",
      message: "You've practiced understanding natural-speed Danish in real-world situations. Your listening ear is now attuned to the rhythm, pace, and patterns of everyday speech."
    }
  ];

  const currentSection = sections[currentSectionIndex];

  const handleExerciseResponse = (exerciseId, selectedOption) => {
    setResponses({
      ...responses,
      [exerciseId]: selectedOption
    });
    setShowExplanation({
      ...showExplanation,
      [exerciseId]: true
    });
  };

  const handleQuizResponse = (quizId, selectedOption) => {
    setResponses({
      ...responses,
      [quizId]: selectedOption
    });
    setShowExplanation({
      ...showExplanation,
      [quizId]: true
    });
  };

  const handleNext = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    } else {
      onBack();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    let total = 0;

    // Count exercises
    sections.forEach(section => {
      if (section.exercises) {
        section.exercises.forEach(exercise => {
          if (responses[exercise.id]) {
            total++;
            if (responses[exercise.id].correct) {
              correct++;
            }
          }
        });
      }
    });

    // Count quiz
    const quizSection = sections.find(s => s.type === "quiz");
    if (quizSection) {
      quizSection.quizItems.forEach(item => {
        if (responses[item.id]) {
          total++;
          if (responses[item.id].correct) {
            correct++;
          }
        }
      });
    }

    return total > 0 ? Math.round((correct / total) * 100) : 0;
  };

  // Render intro
  if (currentSection.type === "intro") {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[600px] mx-auto px-4 py-6">
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-gray-100 grid place-items-center text-gray-900 font-[600] mb-6"
          >
            ←
          </button>
          <h1 className="text-[28px] font-[700] mb-4">{currentSection.title}</h1>
          <p className="text-[14px] text-gray-700 leading-[1.6] mb-6">{currentSection.content}</p>
          <div className="bg-blue-50 rounded-[12px] p-4 border border-blue-200 mb-6">
            <p className="text-[13px] text-gray-900 leading-[1.6]">
              <strong>English bridge:</strong> {currentSection.englishContext}
            </p>
          </div>
          <button
            onClick={handleNext}
            className="w-full py-3 bg-green-600 text-white font-[600] rounded-[8px] hover:bg-green-700 transition-colors"
          >
            Start Exercises
          </button>
        </div>
      </div>
    );
  }

  // Render exercises section
  if (currentSection.type === "section") {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[600px] mx-auto px-4 py-6">
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-gray-100 grid place-items-center text-gray-900 font-[600] mb-6"
          >
            ←
          </button>
          <h2 className="text-[24px] font-[700] mb-6">{currentSection.title}</h2>

          {currentSection.exercises.map((exercise, idx) => {
            const response = responses[exercise.id];
            const isAnswered = !!response;

            return (
              <div key={exercise.id} className="mb-8 pb-6 border-b border-gray-200">
                <div className="text-[12px] text-gray-600 font-[600] mb-2 uppercase">
                  Exercise {idx + 1}
                </div>
                <p className="text-[13px] text-gray-700 mb-2 italic">{exercise.scenario}</p>
                <div className="bg-gray-50 rounded-[8px] p-3 mb-4 border border-gray-200">
                  <p className="text-[13px] text-gray-800 italic">{exercise.transcript}</p>
                </div>
                <p className="text-[14px] font-[600] text-gray-900 mb-3">{exercise.question}</p>

                <div className="space-y-2 mb-4">
                  {exercise.options.map((option, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => handleExerciseResponse(exercise.id, option)}
                      disabled={isAnswered}
                      className={`w-full p-3 rounded-[8px] border text-left text-[13px] transition-all ${
                        isAnswered
                          ? option.correct
                            ? "bg-green-50 border-green-300"
                            : response === option
                            ? "bg-red-50 border-red-300"
                            : "bg-gray-50 border-gray-200 opacity-50"
                          : "bg-white border-gray-200 hover:border-gray-300 cursor-pointer"
                      }`}
                    >
                      {option.text}
                    </button>
                  ))}
                </div>

                {isAnswered && showExplanation[exercise.id] && (
                  <div className={`rounded-[8px] p-3 border ${response.correct ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                    <p className="text-[12px] font-[600] mb-2">{response.correct ? "✓ Correct!" : "✗ Not quite."}</p>
                    <p className="text-[12px] text-gray-800 mb-2">{response.why}</p>
                    <p className="text-[12px] text-gray-700 border-t border-gray-300 pt-2 mt-2">{exercise.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}

          <button
            onClick={handleNext}
            className="w-full py-3 bg-green-600 text-white font-[600] rounded-[8px] hover:bg-green-700 transition-colors"
          >
            Next Section
          </button>
        </div>
      </div>
    );
  }

  // Render production
  if (currentSection.type === "production") {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[600px] mx-auto px-4 py-6">
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-gray-100 grid place-items-center text-gray-900 font-[600] mb-6"
          >
            ←
          </button>
          <h2 className="text-[24px] font-[700] mb-4">{currentSection.title}</h2>
          <p className="text-[13px] text-gray-700 mb-6 leading-[1.6]">{currentSection.instruction}</p>

          {currentSection.scenarios.map((scenario, idx) => (
            <div key={scenario.id} className="mb-8 pb-6 border-b border-gray-200">
              <div className="text-[12px] text-gray-600 font-[600] mb-2 uppercase">
                Scenario {idx + 1}
              </div>
              <p className="text-[14px] font-[600] text-gray-900 mb-3">{scenario.prompt}</p>
              <div className="bg-blue-50 rounded-[8px] p-3 border border-blue-200 mb-4">
                <p className="text-[12px] text-blue-900">{scenario.hint}</p>
              </div>
              <textarea
                placeholder="Type your response in Danish..."
                className="w-full p-3 border border-gray-200 rounded-[8px] text-[13px] font-mono resize-none h-20"
              />
            </div>
          ))}

          <button
            onClick={handleNext}
            className="w-full py-3 bg-green-600 text-white font-[600] rounded-[8px] hover:bg-green-700 transition-colors"
          >
            Continue to Quiz
          </button>
        </div>
      </div>
    );
  }

  // Render quiz
  if (currentSection.type === "quiz") {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[600px] mx-auto px-4 py-6">
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-gray-100 grid place-items-center text-gray-900 font-[600] mb-6"
          >
            ←
          </button>
          <h2 className="text-[24px] font-[700] mb-6">{currentSection.title}</h2>

          {currentSection.quizItems.map((item, idx) => {
            const response = responses[item.id];
            const isAnswered = !!response;

            return (
              <div key={item.id} className="mb-8 pb-6 border-b border-gray-200">
                <p className="text-[14px] font-[600] text-gray-900 mb-3">
                  {idx + 1}. {item.question}
                </p>

                <div className="space-y-2 mb-4">
                  {item.options.map((option, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => handleQuizResponse(item.id, option)}
                      disabled={isAnswered}
                      className={`w-full p-3 rounded-[8px] border text-left text-[13px] transition-all ${
                        isAnswered
                          ? option.correct
                            ? "bg-green-50 border-green-300"
                            : response === option
                            ? "bg-red-50 border-red-300"
                            : "bg-gray-50 border-gray-200 opacity-50"
                          : "bg-white border-gray-200 hover:border-gray-300 cursor-pointer"
                      }`}
                    >
                      {option.text}
                    </button>
                  ))}
                </div>

                {isAnswered && showExplanation[item.id] && (
                  <div className={`rounded-[8px] p-3 border ${response.correct ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                    <p className="text-[12px] font-[600] mb-2">{response.correct ? "✓ Correct!" : "✗ Not quite."}</p>
                    <p className="text-[12px] text-gray-800 mb-2">{response.why}</p>
                    <p className="text-[12px] text-gray-700 border-t border-gray-300 pt-2 mt-2">{item.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}

          <button
            onClick={handleNext}
            className="w-full py-3 bg-green-600 text-white font-[600] rounded-[8px] hover:bg-green-700 transition-colors"
          >
            Complete Lesson
          </button>
        </div>
      </div>
    );
  }

  // Render complete
  if (currentSection.type === "complete") {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[600px] mx-auto px-4 py-6">
          <div className="text-center mb-8">
            <div className="text-[48px] font-[700] text-green-600 mb-4">✓</div>
            <h2 className="text-[28px] font-[700] mb-2">{currentSection.title}</h2>
            <p className="text-[14px] text-gray-700">{currentSection.message}</p>
          </div>

          <div className="bg-green-50 rounded-[12px] p-6 border border-green-200 mb-6 text-center">
            <div className="text-[42px] font-[700] text-green-600 mb-2">{score}%</div>
            <div className="text-[14px] text-gray-900 font-[600]">Your Score</div>
          </div>

          <button
            onClick={() => onComplete(score)}
            className="w-full py-3 bg-blue-600 text-white font-[600] rounded-[8px] hover:bg-blue-700 transition-colors"
          >
            Back to Lessons
          </button>
        </div>
      </div>
    );
  }

  return null;
}
