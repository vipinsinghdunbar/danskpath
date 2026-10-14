import { useState } from 'react';

// Lesson 6: Reading Comprehension — News, emails, texts, forms, everyday writing
// Contexts: news headlines, email correspondence, SMS/messages, restaurant menus, signs, forms

export default function ReadingComprehensionLesson({ lesson, onComplete, onBack }) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [showExplanation, setShowExplanation] = useState({});

  const sections = [
    {
      type: "intro",
      title: "Reading Comprehension",
      content: "In this lesson, you'll practice reading and understanding authentic Danish text from real-world sources: news articles, personal emails, text messages, menus, signs, and forms. Each text teaches vocabulary and reading strategies for different contexts.",
      englishContext: "Reading is often easier than listening because you can slow down and reread. This lesson trains your eye to scan text quickly, find key information, and understand context even when you encounter unfamiliar words."
    },
    {
      type: "section",
      title: "News & Current Events",
      exercises: [
        {
          id: "rc1",
          type: "reading",
          context: "Online news article headline and summary",
          text: "Vejret bliver koldt i dag. Meteorologisk Institut advarer om temperaturer under -5 grader. Der er både frost og is på vejene. Motorister skal køre meget forsigtigt.",
          translation: "The weather will be cold today. The Meteorological Institute warns of temperatures below -5 degrees. There is both frost and ice on the roads. Drivers should drive very carefully.",
          question: "What weather danger does the article mention specifically?",
          options: [
            { text: "Heavy rain", correct: false, why: "The article mentions frost and ice, not rain." },
            { text: "Frost and ice on roads", correct: true, why: "Correct! The text says Der er både frost og is på vejene (There is both frost and ice on the roads)." },
            { text: "Strong winds", correct: false, why: "Not mentioned in the article." }
          ],
          explanation: "Key reading skill: scanning for specific dangers. The words frost (frost) and is (ice) stand out as critical road hazards.",
          why: "Understanding weather warnings is important for safety when traveling in Denmark."
        },
        {
          id: "rc2",
          type: "reading",
          context: "Social news story",
          text: "En lille dreng fra Aarhus vandt en kunstkonkurrence. Hans tegning af havnen blev valgt blandt 200 andre. Han får en præmie på 500 kroner og hans tegning skal vises på rådhuset.",
          translation: "A little boy from Aarhus won an art competition. His drawing of the harbor was chosen among 200 others. He gets a prize of 500 kroner and his drawing will be displayed at the town hall.",
          question: "How many drawings were entered in the competition?",
          options: [
            { text: "50", correct: false, why: "The text says blandt 200 andre (among 200 others)." },
            { text: "200", correct: true, why: "Correct! Blandt 200 andre means among 200 other entries." },
            { text: "500", correct: false, why: "500 is the prize amount in kroner, not the number of entries." }
          ],
          explanation: "Key reading skill: distinguishing between different types of numbers (quantity vs. monetary value). The words blandt (among) signal a count.",
          why: "News often contains statistics. Learning to identify and extract numbers is crucial."
        },
        {
          id: "rc3",
          type: "reading",
          context: "Business news brief",
          text: "Et stort dansk firmaspil har åbnet sin første butik i København. Firmaet sælger elskooter og cykler. Åbningen var meget populær med over 1000 mennesker der kom på første dag.",
          translation: "A large Danish company has opened its first store in Copenhagen. The company sells electric scooters and bicycles. The opening was very popular with over 1000 people coming on the first day.",
          question: "What does the company sell?",
          options: [
            { text: "Cars and motorcycles", correct: false, why: "They sell elskooter og cykler (scooters and bicycles)." },
            { text: "Electric scooters and bicycles", correct: true, why: "Correct! Elskooter means electric scooter; cykel means bicycle." },
            { text: "Computers and phones", correct: false, why: "Not mentioned." }
          ],
          explanation: "Key reading skill: identifying the main subject of a sentence. The word sælger (sells) signals what follows is the product.",
          why: "Business news teaches you vocabulary for commerce and modern products."
        },
        {
          id: "rc4",
          type: "reading",
          context: "Sports news",
          text: "FC København vandt kampen 3-1 mod Brøndby i dag. Målscorere var Skov, Claesson og Jensen. Det var en spændende og intensiv kamp fra start til slut.",
          translation: "FC Copenhagen won the match 3-1 against Brøndby today. The scorers were Skov, Claesson and Jensen. It was an exciting and intense match from start to finish.",
          question: "What was the final score?",
          options: [
            { text: "2-1", correct: false, why: "The article states 3-1." },
            { text: "3-1", correct: true, why: "Correct! FC København vandt kampen 3-1 means FC Copenhagen won 3-1." },
            { text: "1-3", correct: false, why: "That would be a loss, not a win." }
          ],
          explanation: "Key reading skill: numbers in sports. Danish uses the format [home score]-[away score].",
          why: "Sports vocabulary is common in news and everyday conversation."
        },
        {
          id: "rc5",
          type: "reading",
          context: "Environmental news",
          text: "Danmark vil reducere CO2-udledninger med 80 procent inden 2030. Regeringen har vedtaget en ny klimaplan. Planen inkluderer mere grøn energi og færre benzin-biler på vejene.",
          translation: "Denmark will reduce CO2 emissions by 80 percent by 2030. The government has adopted a new climate plan. The plan includes more green energy and fewer gasoline cars on the roads.",
          question: "By what percentage will Denmark reduce CO2 emissions?",
          options: [
            { text: "50%", correct: false, why: "The target is 80 procent (80 percent)." },
            { text: "80%", correct: true, why: "Correct! 80 procent inden 2030 means 80 percent by 2030." },
            { text: "100%", correct: false, why: "That would be complete elimination." }
          ],
          explanation: "Key reading skill: understanding percentages and timelines. The word procent means percent; inden means by/before.",
          why: "Understanding climate and environmental news is becoming increasingly important."
        }
      ]
    },
    {
      type: "section",
      title: "Personal Communication (Email & Text)",
      exercises: [
        {
          id: "rc6",
          type: "reading",
          context: "Personal email from a friend",
          text: "Hej! Hvordan går det? Jeg skriver for at høre, om du har tid til at mødes næste fredag. Jeg foreslår at vi mødes på kafeen ved siden af biblioteket kl. 15:00. Lad mig vide hvad du synes!",
          translation: "Hi! How are you? I'm writing to ask if you have time to meet next Friday. I suggest we meet at the cafe next to the library at 3 PM. Let me know what you think!",
          question: "Where does the sender suggest meeting?",
          options: [
            { text: "At the library", correct: false, why: "They suggest the café next to the library, not the library itself." },
            { text: "At a café next to the library", correct: true, why: "Correct! Kafeen ved siden af biblioteket means the café next to the library." },
            { text: "At the train station", correct: false, why: "Not mentioned." }
          ],
          explanation: "Key reading skill: location details. Prepositional phrases like ved siden af (next to) show relationship between places.",
          why: "Personal emails are common when meeting Danish friends or colleagues."
        },
        {
          id: "rc7",
          type: "reading",
          context: "Work email from a colleague",
          text: "Hallo både! Mødet på mandag er rykket fra 10:00 til 14:00. Kan alle stadig komme? Hvis ikke, skriv en email til mig før fredag.",
          translation: "Hello everyone! The Monday meeting has been moved from 10:00 to 2:00 PM. Can everyone still come? If not, send me an email before Friday.",
          question: "What time is the meeting now scheduled for?",
          options: [
            { text: "10:00 AM", correct: false, why: "It was at 10:00, but it has been moved to 14:00." },
            { text: "2:00 PM (14:00)", correct: true, why: "Correct! Møtet er rykket til 14:00 means the meeting has been moved to 14:00 (2 PM)." },
            { text: "4:00 PM", correct: false, why: "Not the correct time." }
          ],
          explanation: "Key reading skill: time changes. The word rykket means moved/postponed. Always look for the new time after this word.",
          why: "Work emails require careful reading to avoid missing important changes."
        },
        {
          id: "rc8",
          type: "reading",
          context: "Text message (SMS) from a friend",
          text: "Hej! Skal du på tur i weekend? Der er godt vejr og jeg tænker på at gå en tur i Mols Bjerge. Du kender det område ikke, så det vil være sjovt!",
          translation: "Hi! Are you doing anything this weekend? The weather is good and I'm thinking about hiking in Mols Bjerge. You don't know that area, so it would be fun!",
          question: "What is being suggested as an activity?",
          options: [
            { text: "Swimming at the beach", correct: false, why: "A hiking trip to Mols Bjerge is suggested, not swimming." },
            { text: "Hiking in Mols Bjerge", correct: true, why: "Correct! Gå en tur i Mols Bjerge means go hiking in Mols Bjerge (a famous Danish hiking area)." },
            { text: "Going to the city", correct: false, why: "Not mentioned." }
          ],
          explanation: "Key reading skill: understanding proposals. The phrase tænker på means thinking about/considering.",
          why: "Casual text messages use simpler language but still require reading comprehension."
        },
        {
          id: "rc9",
          type: "reading",
          context: "Confirmation message",
          text: "Tak for invitationen til festen på lørdag! Jeg kommer selvfølgelig. Skal jeg tage noget med? Jeg kan lave min berømte tiramisu hvis du vil.",
          translation: "Thanks for the invitation to the party on Saturday! Of course I'm coming. Should I bring something? I can make my famous tiramisu if you'd like.",
          question: "When is the party?",
          options: [
            { text: "Friday", correct: false, why: "The message says lørdag, which is Saturday." },
            { text: "Saturday", correct: true, why: "Correct! Lørdag means Saturday." },
            { text: "Sunday", correct: false, why: "Not mentioned." }
          ],
          explanation: "Key reading skill: day recognition. Learn Danish days of the week: mandag (Monday), tirsdag (Tuesday), onsdag (Wednesday), torsdag (Thursday), fredag (Friday), lørdag (Saturday), søndag (Sunday).",
          why: "Dating invitations requires knowing the days of the week."
        },
        {
          id: "rc10",
          type: "reading",
          context: "Delivery notification",
          text: "Din pakke er klar til afhentning på Føtex på Strøget. Du har 14 dage på at hente den. Hvis du ikke henter den inden fristen, sendes den tilbage til forretningen.",
          translation: "Your package is ready for pickup at Føtex on Strøget. You have 14 days to pick it up. If you don't pick it up before the deadline, it will be sent back to the store.",
          question: "How many days do you have to pick up the package?",
          options: [
            { text: "7 days", correct: false, why: "The message states 14 dage (14 days)." },
            { text: "14 days", correct: true, why: "Correct! Du har 14 dage på at hente den means you have 14 days to pick it up." },
            { text: "30 days", correct: false, why: "Not mentioned." }
          ],
          explanation: "Key reading skill: deadline extraction. The word fristen means the deadline/time limit.",
          why: "Pickup notifications are common when ordering online in Denmark."
        }
      ]
    },
    {
      type: "section",
      title: "Menus, Signs & Forms",
      exercises: [
        {
          id: "rc11",
          type: "reading",
          context: "Restaurant menu section",
          text: "HOVEDRETTER: Fiskekikert med nye kartofler - 185 kr. Kyllingebryst med champignon-sovs - 179 kr. Vegetarisk lasagne - 145 kr. Alle hovedretter serveres med salat og brød.",
          translation: "MAIN COURSES: Fish with new potatoes - 185 kr. Chicken breast with mushroom sauce - 179 kr. Vegetarian lasagna - 145 kr. All main courses are served with salad and bread.",
          question: "Which main course is the cheapest?",
          options: [
            { text: "Fish", correct: false, why: "Fish costs 185 kr. Vegetarian lasagna is cheaper." },
            { text: "Vegetarian lasagna", correct: true, why: "Correct! Vegetarisk lasagne is 145 kr, the lowest price." },
            { text: "Chicken breast", correct: false, why: "Chicken is 179 kr, more than lasagna." }
          ],
          explanation: "Key reading skill: scanning menus for prices. Look for numbers and kr (kronor/kroner, Danish currency).",
          why: "Reading menus is essential when dining out in Denmark."
        },
        {
          id: "rc12",
          type: "reading",
          context: "Public sign at a swimming pool",
          text: "BADEREGLEMENT: Børn under 12 år skal være under opsyn af en voksen. Svømning ikke tilladt uden badehånd. Glasflasker er ikke tilladt. Åbent: Man-Fre 6:00-22:00, Lør-Søn 8:00-20:00.",
          translation: "POOL RULES: Children under 12 must be supervised by an adult. Swimming is not allowed without a swimming pass. Glass bottles are not allowed. Open: Mon-Fri 6 AM-10 PM, Sat-Sun 8 AM-8 PM.",
          question: "What document is required to swim?",
          options: [
            { text: "A passport", correct: false, why: "A badehånd (swimming pass/badge) is required, not a passport." },
            { text: "A swimming pass", correct: true, why: "Correct! Badehånd means swimming pass/badge." },
            { text: "A doctor's certificate", correct: false, why: "Not mentioned." }
          ],
          explanation: "Key reading skill: identifying requirements. The word tilladt means allowed; ikke tilladt means not allowed.",
          why: "Public signs convey important rules and safety information in Denmark."
        },
        {
          id: "rc13",
          type: "reading",
          context: "Store sign",
          text: "UDSALG! Alle tøj -50%. Kampe gælder kun denne weekend. Ingen returnering af udsalgsvarer.",
          translation: "SALE! All clothing -50%. Offer valid only this weekend. No returns on sale items.",
          question: "What is the discount percentage?",
          options: [
            { text: "25%", correct: false, why: "The sign states -50 procent (50 percent discount)." },
            { text: "50%", correct: true, why: "Correct! Alle tøj -50% means all clothing 50% off." },
            { text: "75%", correct: false, why: "Not the stated discount." }
          ],
          explanation: "Key reading skill: understanding retail offers. The words udsalg (sale) and tilbud (offer) signal discounts.",
          why: "Recognizing sales and discounts helps you save money while shopping."
        },
        {
          id: "rc14",
          type: "reading",
          context: "Doctor's appointment card",
          text: "Patientnavn: Mark Jensen. Dato: 5. november 2024. Tid: 14:30. Læge: Dr. Hansen. Lokation: Sundhedscenter, Aarhus. Husk at møde 10 minutter før tid.",
          translation: "Patient name: Mark Jensen. Date: November 5, 2024. Time: 2:30 PM. Doctor: Dr. Hansen. Location: Health Center, Aarhus. Remember to arrive 10 minutes early.",
          question: "When should the patient arrive?",
          options: [
            { text: "2:20 PM", correct: true, why: "Correct! Møde 10 minutter før tid means arrive 10 minutes before the scheduled time of 14:30 (2:30 PM)." },
            { text: "2:30 PM", correct: false, why: "That's the scheduled time, but patients should arrive earlier." },
            { text: "2:40 PM", correct: false, why: "That would be after the appointment time." }
          ],
          explanation: "Key reading skill: appointment time management. Before tid means before the scheduled time.",
          why: "Medical appointments are important. Understanding timing prevents missed appointments."
        },
        {
          id: "rc15",
          type: "reading",
          context: "Train ticket information",
          text: "DSB BILLETTINE: Afgangstid 14:45, Ankomstid 16:20. Strække: København H - Aarhus H. Vogn: 5, Plads: 42. Billettype: Voksen. Pris: 295 kr.",
          translation: "DSB TICKET INFO: Departure time 14:45, Arrival time 16:20. Route: Copenhagen H - Aarhus H. Car: 5, Seat: 42. Ticket type: Adult. Price: 295 kr.",
          question: "What car number and seat number is the passenger?",
          options: [
            { text: "Car 4, Seat 41", correct: false, why: "The ticket shows Vogn 5 (Car 5) and Plads 42 (Seat 42)." },
            { text: "Car 5, Seat 42", correct: true, why: "Correct! Vogn 5 and Plads 42 are shown on the ticket." },
            { text: "Car 42, Seat 5", correct: false, why: "You've reversed the numbers." }
          ],
          explanation: "Key reading skill: ticket information extraction. Always read labels like Vogn (car) and Plads (seat) carefully.",
          why: "Train tickets require careful reading to find your correct car and seat."
        }
      ]
    },
    {
      type: "section",
      title: "Everyday Texts & Instructions",
      exercises: [
        {
          id: "rc16",
          type: "reading",
          context: "Kitchen instruction on product packaging",
          text: "TILBEREDNING: Kok mælken i 5 minutter. Tilsæt kakaopulver og sukker. Rør godt sammen. Serveres varm med boller eller kiks.",
          translation: "PREPARATION: Boil the milk for 5 minutes. Add cocoa powder and sugar. Stir well together. Serve hot with rolls or crackers.",
          question: "How long should the milk be boiled?",
          options: [
            { text: "3 minutes", correct: false, why: "The instruction says 5 minutter (5 minutes)." },
            { text: "5 minutes", correct: true, why: "Correct! Kok mælken i 5 minutter means boil the milk for 5 minutes." },
            { text: "10 minutes", correct: false, why: "Not the correct duration." }
          ],
          explanation: "Key reading skill: following instructions. Words like kok (boil), tilsæt (add), rør (stir) are common cooking verbs.",
          why: "Product instructions are essential for safe food preparation."
        },
        {
          id: "rc17",
          type: "reading",
          context: "Lost and found notice",
          text: "FUNDET: En sort lædervendetaske med personlige papirer. Fundet på Strøget den 3. oktober. Hvis du mister dette, kontakt Politistationen på Rådhuspladsen eller ring 114.",
          translation: "FOUND: A black leather wallet with personal papers. Found on Strøget on October 3rd. If you lost this, contact the Police Station at Rådhus Square or call 114.",
          question: "What was found?",
          options: [
            { text: "A pair of sunglasses", correct: false, why: "A sort lædervendetaske (black leather wallet) was found." },
            { text: "A black leather wallet", correct: true, why: "Correct! Sort lædervendetaske describes a black leather wallet." },
            { text: "A phone", correct: false, why: "Not mentioned." }
          ],
          explanation: "Key reading skill: identifying objects. Descriptive words like sort (black) and læder (leather) help identify items.",
          why: "Lost and found notices help you recover lost items when traveling."
        },
        {
          id: "rc18",
          type: "reading",
          context: "Postcard from a vacation",
          text: "Hej fra Danmark! Vi har været her i en uge og det har været fantastisk. Vejret er pænt, og vi har set smukke slotte og kirker. Befolkningen er venlig og alle snakker engelsk. Vi kommer hjem på mandag.",
          translation: "Hi from Denmark! We have been here for a week and it has been fantastic. The weather is nice, and we have seen beautiful castles and churches. The people are friendly and everyone speaks English. We come home on Monday.",
          question: "How long has the person been in Denmark?",
          options: [
            { text: "A few days", correct: false, why: "The postcard says i en uge (for a week)." },
            { text: "A week", correct: true, why: "Correct! Vi har været her i en uge means we have been here for a week." },
            { text: "Two weeks", correct: false, why: "Not mentioned." }
          ],
          explanation: "Key reading skill: timeline comprehension. En uge means one week; en dag means one day; en måned means one month.",
          why: "Reading personal messages helps you stay connected with friends while traveling."
        },
        {
          id: "rc19",
          type: "reading",
          context: "Appointment reminder SMS",
          text: "PÅMINDELSE: Dit frisørapointment er i dag kl. 17:00. Hvis du kan ikke møde op, afmeld venligst senest 2 timer før. Ring til os på 40 40 40 40.",
          translation: "REMINDER: Your hair salon appointment is today at 5 PM. If you cannot show up, please cancel at least 2 hours in advance. Call us at 40 40 40 40.",
          question: "What time is the appointment?",
          options: [
            { text: "3 PM (15:00)", correct: false, why: "The reminder states 17:00 (5 PM)." },
            { text: "5 PM (17:00)", correct: true, why: "Correct! Dit frisørapointment er i dag kl. 17:00 means your hair appointment is today at 5 PM." },
            { text: "7 PM (19:00)", correct: false, why: "Not the scheduled time." }
          ],
          explanation: "Key reading skill: time notation. Danes use 24-hour time format: 17:00 is 5 PM.",
          why: "Appointment reminders help you stay on schedule and honor commitments."
        },
        {
          id: "rc20",
          type: "reading",
          context: "Return policy statement",
          text: "RETURPOLITIK: Du kan returnere varer inden for 14 dage efter køb. Varen skal være uåbnet og i originalemballagen. Sendepris betales af dig. Fuldt pengebeløb returneres inden 5 arbejdsdage.",
          translation: "RETURN POLICY: You can return items within 14 days of purchase. The item must be unopened and in original packaging. You pay for shipping. Full refund is returned within 5 business days.",
          question: "How many days do you have to return something?",
          options: [
            { text: "7 days", correct: false, why: "The policy allows 14 dage (14 days) for returns." },
            { text: "14 days", correct: true, why: "Correct! Du kan returnere varer inden for 14 dage means you can return items within 14 days." },
            { text: "30 days", correct: false, why: "Not the specified timeframe." }
          ],
          explanation: "Key reading skill: return timeframes. Inden for means within; dage means days.",
          why: "Understanding return policies protects your consumer rights when shopping online."
        }
      ]
    },
    {
      type: "production",
      title: "Your Turn: Reading & Writing Response",
      instruction: "Read a short text and respond to it with a short message or answer. Write in Danish as naturally as you can.",
      scenarios: [
        {
          id: "prod1",
          prompt: "Your friend sends you: Hej! Kan du mødes på fredag? (Hey! Can you meet Friday?) - Write a response accepting or declining.",
          hint: "Use: Ja, jeg kan mødes / Nej, jeg kan ikke mødes (Yes, I can meet / No, I cannot meet)"
        },
        {
          id: "prod2",
          prompt: "A sign in a store says: Udsalg på alle sko - 40% rabat! (Sale on all shoes - 40% discount!) - Write a sentence expressing interest in this offer.",
          hint: "Use: Det lyder godt / interessant / dejligt! (That sounds good/interesting/great!)"
        }
      ]
    },
    {
      type: "quiz",
      title: "Check Your Understanding",
      quizItems: [
        {
          id: "q1",
          question: "What does frost mean in the context of weather?",
          options: [
            { text: "Heavy rain", correct: false, why: "Frost refers to ice crystals, not rain." },
            { text: "Frost/frozen conditions", correct: true, why: "Correct! Frost is frozen precipitation and dangerous driving conditions." },
            { text: "Strong wind", correct: false, why: "That would be vind or storm." }
          ],
          explanation: "Frost is a common Danish weather phenomenon, especially in winter."
        },
        {
          id: "q2",
          question: "What does blandt mean in a news article?",
          options: [
            { text: "After", correct: false, why: "Blandt means among, not after." },
            { text: "Among", correct: true, why: "Correct! Blandt signals that a number of items are being compared or selected." },
            { text: "During", correct: false, why: "That would be under or i løbet af." }
          ],
          explanation: "Among is frequently used in news to show selection or comparison."
        },
        {
          id: "q3",
          question: "What does rykket mean in a meeting notification?",
          options: [
            { text: "Cancelled", correct: false, why: "Cancelled would be aflyst." },
            { text: "Moved/Postponed", correct: true, why: "Correct! Møtet er rykket means the meeting has been rescheduled." },
            { text: "Confirmed", correct: false, why: "Confirmed would be bekræftet." }
          ],
          explanation: "Rykket appears in meeting notices to alert of time changes."
        },
        {
          id: "q4",
          question: "What does lørdag mean?",
          options: [
            { text: "Friday", correct: false, why: "Friday is fredag." },
            { text: "Saturday", correct: true, why: "Correct! Lørdag is Saturday." },
            { text: "Sunday", correct: false, why: "Sunday is søndag." }
          ],
          explanation: "Days of the week are essential for reading appointments and plans."
        },
        {
          id: "q5",
          question: "What does inden for mean in a return policy?",
          options: [
            { text: "Never", correct: false, why: "Inden for means within, not never." },
            { text: "Within (a time period)", correct: true, why: "Correct! Inden for 14 dage means within 14 days." },
            { text: "After", correct: false, why: "After would be efter." }
          ],
          explanation: "Inden for is critical for understanding deadlines and timeframes."
        }
      ]
    },
    {
      type: "complete",
      title: "Lesson Complete!",
      message: "You've practiced reading authentic Danish texts from real-world contexts. You can now scan menus, understand emails, follow instructions, and extract key information from news and documents."
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
                  Exercise {idx + 1} — {exercise.context}
                </div>
                <div className="bg-gray-50 rounded-[8px] p-4 mb-4 border border-gray-200">
                  <p className="text-[13px] text-gray-800 mb-3">{exercise.text}</p>
                  <div className="text-[12px] text-gray-600 italic border-t border-gray-300 pt-3 mt-3">
                    {exercise.translation}
                  </div>
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
              <p className="text-[13px] font-[600] text-gray-900 mb-3">{scenario.prompt}</p>
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
