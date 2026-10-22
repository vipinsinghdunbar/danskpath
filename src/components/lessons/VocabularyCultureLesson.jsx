import { useState } from 'react';
import { useExerciseSubmission, AttemptFeedback, DifficultyIndicator, ConfidenceSelector } from '../AdaptiveExerciseWrapper';

// Lesson 8: Vocabulary & Culture
// Focus: Danish idioms, slang, cultural expressions, and authentic vocabulary in cultural contexts
// Structure: 20 exercises across sections + 5 quiz questions

export default function VocabularyCultureLesson({ lesson, onComplete, onBack, onAttemptRecorded, currentDifficulty }) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [showExplanation, setShowExplanation] = useState({});
  const [userConfidence, setUserConfidence] = useState(3);
  const [exerciseStartTime, setExerciseStartTime] = useState(null);

  const handleExerciseSubmit = useExerciseSubmission(
    onAttemptRecorded,
    'vocabulary-culture',
    `section${currentSectionIndex}`,
    'Vocabulary & Culture',
    currentDifficulty
  );

  const sections = [
    {
      type: "intro",
      title: "Vocabulary & Culture",
      content: "Danish language isn't just grammar—it's deeply connected to Danish culture, history, and values. In this lesson, you'll learn idioms, slang, cultural expressions, and authentic vocabulary that natives use daily. Understanding these will help you communicate naturally and appreciate Danish perspectives.",
      englishContext: "English has idioms like 'piece of cake' (easy) and 'raining cats and dogs' (heavy rain). Danish has equally colorful expressions that reveal cultural values around hygge, directness, and community."
    },
    {
      type: "section",
      title: "Danish Idioms & Expressions",
      exercises: [
        {
          id: "vc1",
          type: "mcq",
          question: "What does 'Det er ikke dårligt' literally mean, and what does it actually mean?",
          instruction: "Choose the closest interpretation:",
          options: [
            {
              text: "It's not bad (literal); it's actually good/decent (cultural usage)",
              correct: true,
              why: "Danes use understatement as cultural politeness. Saying something is 'not bad' means it's quite good."
            },
            {
              text: "It's definitely bad (both literally and culturally)",
              correct: false,
              why: "This is the opposite. The idiom uses understatement—'not bad' is a compliment."
            },
            {
              text: "It's completely terrible",
              correct: false,
              why: "This misses the cultural nuance of Danish understatement."
            },
            {
              text: "It means the weather is acceptable",
              correct: false,
              why: "While Danes do talk about weather often, this expression applies broadly, not just to weather."
            }
          ],
          explanation: "Danish culture values modesty and understatement. Saying something is 'ikke dårligt' (not bad) is actually high praise, reflecting a cultural preference for restraint.",
          why: "Understanding idioms requires grasping cultural values, not just literal translation."
        },
        {
          id: "vc2",
          type: "fillblank",
          question: "Fill in the blank: 'Jeg har fugle i hovedet' means ___.",
          instruction: "Complete the English interpretation:",
          options: [
            { text: "I have birds in my head (I'm a little crazy/absent-minded)", correct: true, why: "This idiom describes someone who's distracted, forgetful, or not thinking clearly." },
            { text: "I have a bird as a pet", correct: false, why: "That would be a literal statement, not an idiom." },
            { text: "I'm very intelligent", correct: false, why: "The opposite—it suggests someone isn't thinking clearly." },
            { text: "I love nature", correct: false, why: "Not connected to this idiom." }
          ],
          explanation: "In Danish, having birds in your head means you're scatterbrained or distracted—a playful way to describe absent-mindedness.",
          why: "Idioms often use animals or natural imagery to express psychological states."
        },
        {
          id: "vc3",
          type: "mcq",
          question: "What's the significance of 'hygge' in Danish culture?",
          instruction: "Choose the most accurate description:",
          options: [
            {
              text: "A cozy, warm feeling of togetherness—a core Danish cultural value around comfort, community, and candlelight",
              correct: true,
              why: "Hygge is untranslatable but represents the Danish emphasis on creating warm, intimate, comfortable moments with others."
            },
            {
              text: "A type of Danish furniture",
              correct: false,
              why: "Furniture may be part of creating hygge, but hygge itself is a feeling/atmosphere, not an object."
            },
            {
              text: "A traditional Danish dish",
              correct: false,
              why: "Hygge isn't food—though food can contribute to a hygge atmosphere."
            },
            {
              text: "A Danish greeting",
              correct: false,
              why: "Hygge is a cultural concept, not a greeting."
            }
          ],
          explanation: "Hygge (pronounced 'hoo-gah') is one of Denmark's most important cultural concepts. It describes the feeling of warmth, coziness, and contentment—often involving candlelight, comfort, and good company.",
          why: "Some cultural concepts can't be directly translated; understanding hygge is key to understanding Danish values."
        },
        {
          id: "vc4",
          type: "transformation",
          question: "Transform this literal statement into its idiomatic meaning: 'Han er en blå øjet dreng'",
          instruction: "What does this idiom actually mean?",
          options: [
            { text: "He's a naive, innocent, or simple person (often used affectionately)", correct: true, why: "A 'blue-eyed boy' in Danish means someone innocent or naive, often with affection or mild mockery." },
            { text: "He has blue eyes", correct: false, why: "That would be the literal meaning, but the idiom means something different." },
            { text: "He's sad or melancholic", correct: false, why: "This doesn't match the idiom." },
            { text: "He's very intelligent", correct: false, why: "The opposite—it suggests simplicity or innocence." }
          ],
          explanation: "The idiom 'blå øjet dreng' (blue-eyed boy) describes someone innocent, naive, or simple—often used affectionately but also as mild teasing.",
          why: "Idioms often have historical or cultural origins that explain their metaphorical meaning."
        },
        {
          id: "vc5",
          type: "mcq",
          question: "What does 'en løgn har lange ben' mean?",
          instruction: "Choose the closest interpretation:",
          options: [
            {
              text: "A lie has long legs (lies eventually catch up with you/the truth comes out)",
              correct: true,
              why: "This Danish proverb means that lies don't stay hidden—they run away on their long legs but eventually get caught."
            },
            {
              text: "Lies are always obvious",
              correct: false,
              why: "While the meaning conveys consequences, this misses the poetic nature of the saying."
            },
            {
              text: "Liars are physically tall",
              correct: false,
              why: "This is a literal misreading."
            },
            {
              text: "Lies are easy to tell",
              correct: false,
              why: "The idiom suggests the opposite—that lies catch up with you."
            }
          ],
          explanation: "This proverb warns that lies don't stay hidden forever. The metaphor of 'long legs' suggests lies run away but eventually can't escape the truth.",
          why: "Proverbs reveal cultural wisdom and values about honesty and consequences."
        }
      ]
    },
    {
      type: "section",
      title: "Slang & Everyday Language",
      exercises: [
        {
          id: "vc6",
          type: "mcq",
          question: "What does 'vildt' mean in modern Danish slang?",
          instruction: "Choose the correct usage:",
          options: [
            { text: "Crazy/wild (used to emphasize something amazing or intense)", correct: true, why: "Vildt is used like English 'insane' or 'wild'—'det er vildt godt' = 'that's crazy good.'" },
            { text: "Angry or hostile", correct: false, why: "Vildt doesn't mean angry—it's enthusiastic, not hostile." },
            { text: "Literally wild (animals or nature)", correct: false, why: "While vildt can mean wild in a literal sense, in slang it means 'amazing.'" },
            { text: "Confused or lost", correct: false, why: "This doesn't match slang usage." }
          ],
          explanation: "Young Danes use 'vildt' (wild/crazy) to emphasize positively: 'Det er vildt godt' = 'That's crazy good.' It's similar to English 'insane' or 'wild' as slang.",
          why: "Modern slang helps you sound natural and understand contemporary Danish."
        },
        {
          id: "vc7",
          type: "fillblank",
          question: "Complete the slang phrase: 'Det er fandme...'",
          instruction: "What does 'fandme' mean?",
          options: [
            { text: "Damn/bloody (a mild curse word for emphasis)", correct: true, why: "Fandme is a colloquial intensifier—roughly equivalent to 'damn' or 'bloody.'" },
            { text: "Definitely or certainly", correct: false, why: "It's not a formal intensifier—it's slang with a mild curse." },
            { text: "A common greeting", correct: false, why: "It's not a greeting." },
            { text: "Boring or dull", correct: false, why: "No connection to this meaning." }
          ],
          explanation: "Fandme is a casual, colloquial intensifier used in informal speech. 'Det er fandme godt' = 'That's damn good.'",
          why: "Slang helps you sound natural and understand informal Danish conversation."
        },
        {
          id: "vc8",
          type: "mcq",
          question: "What does 'at være på røven' mean literally and what does it express?",
          instruction: "Choose the correct interpretation:",
          options: [
            {
              text: "To be on your ass (to be broke, without money, or in a difficult situation)",
              correct: true,
              why: "This slang expression means to be in financial difficulty or hardship, similar to English 'broke.'"
            },
            {
              text: "To sit down and relax",
              correct: false,
              why: "While literal, the idiom means the opposite—hardship, not relaxation."
            },
            {
              text: "To be lazy or inactive",
              correct: false,
              why: "Not the same as financial difficulty."
            },
            {
              text: "To be happy and content",
              correct: false,
              why: "The opposite—it expresses hardship."
            }
          ],
          explanation: "The slang 'være på røven' literally means 'to be on your ass' and expresses being broke or in financial difficulty. It's a colorful, informal way to say you're struggling.",
          why: "Understanding slang expressions helps you connect with how Danes actually talk."
        },
        {
          id: "vc9",
          type: "transformation",
          question: "What does 'det er mega' mean in Danish slang?",
          instruction: "What does this expression convey?",
          options: [
            { text: "It's mega/really (emphasizing something as big, great, or intense)", correct: true, why: "Mega is international slang—'det er mega godt' = 'it's really good' or 'it's awesome.'" },
            { text: "It's related to size or measurement", correct: false, why: "While mega technically means 'million times,' in slang it just means 'really.'" },
            { text: "It's scientific or technical", correct: false, why: "In conversation, it's casual slang, not technical." },
            { text: "It expresses disappointment", correct: false, why: "No—it usually expresses enthusiasm." }
          ],
          explanation: "Mega is used in casual Danish to mean 'really' or 'very' in an enthusiastic way: 'Det er mega spændende' = 'It's really exciting!'",
          why: "Modern slang helps you understand younger Danes and contemporary language use."
        },
        {
          id: "vc10",
          type: "mcq",
          question: "What's the cultural context behind Danes' directness in communication?",
          instruction: "Choose the best explanation:",
          options: [
            {
              text: "Danish culture values honesty and straightforward communication as respectful and efficient",
              correct: true,
              why: "Danes see directness as honest and professional—saying 'that's not good' is not rude, it's transparent and efficient."
            },
            {
              text: "Danes are naturally impolite or cold",
              correct: false,
              why: "Directness ≠ rudeness. Danes separate honesty from personal warmth."
            },
            {
              text: "Danish language lacks polite forms",
              correct: false,
              why: "Danish has polite forms; directness is cultural choice, not linguistic limitation."
            },
            {
              text: "Danes are less emotional than other cultures",
              correct: false,
              why: "This is a stereotype; directness doesn't mean lack of emotion."
            }
          ],
          explanation: "Danish culture values transparency and honesty. Directness is seen as respectful, not rude. Danes separate the message from the person—disagreeing with an idea doesn't mean disrespecting the person.",
          why: "Cultural communication styles affect how language is used and interpreted."
        }
      ]
    },
    {
      type: "section",
      title: "Culture-Specific Vocabulary",
      exercises: [
        {
          id: "vc11",
          type: "mcq",
          question: "What does 'Janteloven' (the Law of Jante) represent in Danish culture?",
          instruction: "Choose the correct description:",
          options: [
            {
              text: "A cultural principle that emphasizes community over individual achievement and discourages standing out",
              correct: true,
              why: "Janteloven is a cultural norm originating from Nordic literature that values equality and modesty—not promoting yourself or appearing superior."
            },
            {
              text: "A famous Danish law or legal code",
              correct: false,
              why: "It's not an official law—it's a cultural principle."
            },
            {
              text: "A celebration or festival",
              correct: false,
              why: "Not a celebration—it's a cultural value about behavior."
            },
            {
              text: "A type of traditional Danish entertainment",
              correct: false,
              why: "No connection to entertainment."
            }
          ],
          explanation: "Janteloven (literally 'the Law of Jante') is a concept from Danish author Aksel Sandemose describing a culture that values equality and discourages individuals from standing out or acting superior. It's a key part of understanding Danish social norms.",
          why: "Understanding cultural concepts is essential to understanding how Danes think and communicate."
        },
        {
          id: "vc12",
          type: "fillblank",
          question: "Fill in: 'At være 'Dansk rigtig' means ___.",
          instruction: "What does this cultural expression mean?",
          options: [
            { text: "To be authentically/truly Danish (culturally correct or fitting)", correct: true, why: "This expression describes someone or something as genuinely Danish—fitting cultural norms and values." },
            { text: "To speak Danish correctly", correct: false, why: "While related, it's broader than just language." },
            { text: "To follow all Danish laws", correct: false, why: "It's cultural, not legal." },
            { text: "To be wealthy or successful", correct: false, why: "No connection to economic status." }
          ],
          explanation: "Dansk rigtig' (truly Danish) describes something as authentically Danish—fitting cultural values, style, or behavior. It can apply to people, food, traditions, or ways of doing things.",
          why: "This concept captures what Danes consider authentic to their culture."
        },
        {
          id: "vc13",
          type: "mcq",
          question: "What role does 'fika' (coffee break) play in Scandinavian/Danish culture?",
          instruction: "Choose the best answer:",
          options: [
            {
              text: "It's a social ritual for connection and community—a designated time for coffee, pastries, and conversation",
              correct: true,
              why: "Coffee breaks in Danish culture aren't just about caffeine—they're social moments that emphasize community and presence."
            },
            {
              text: "It's primarily about productivity and work efficiency",
              correct: false,
              why: "The opposite—it's about pausing work for human connection."
            },
            {
              text: "It's a formal business meeting",
              correct: false,
              why: "It's casual and social, not formal."
            },
            {
              text: "It's a dessert or specific food",
              correct: false,
              why: "While pastries might be served, fika is the social practice, not the food."
            }
          ],
          explanation: "In Danish and broader Scandinavian culture, coffee breaks (fika in Swedish, but the concept applies in Denmark) are sacred social moments. They represent valuing human connection and presence over pure productivity.",
          why: "Understanding workplace and social rituals reveals cultural values."
        },
        {
          id: "vc14",
          type: "transformation",
          question: "What's the cultural significance of 'arbejdsmiljø' (work environment)?",
          instruction: "Why is this concept important in Danish business?",
          options: [
            { text: "It encompasses not just physical space but also psychological well-being, relationships, and team dynamics", correct: true, why: "Arbejdsmiljø is broader than English 'work environment'—it includes mental health, relationships, and overall well-being." },
            { text: "It refers only to office furniture and equipment", correct: false, why: "Too narrow—the Danish concept is much broader." },
            { text: "It's about salary and compensation", correct: false, why: "Not related to pay." },
            { text: "It's a legal requirement with no cultural importance", correct: false, why: "While it's legally required, it reflects deeply held cultural values about well-being." }
          ],
          explanation: "The Danish concept of arbejdsmiljø (work environment/workplace climate) includes physical space, psychological safety, relationships, and overall well-being. It reflects a cultural value that work should support human flourishing, not just productivity.",
          why: "This vocabulary reveals how Danish culture prioritizes well-being and relationships."
        },
        {
          id: "vc15",
          type: "mcq",
          question: "What does 'samvær' mean in Danish?",
          instruction: "Choose the closest definition:",
          options: [
            {
              text: "Being together (the quality time and presence shared with others)",
              correct: true,
              why: "Samvær captures the Danish value of simply being present with people—not doing anything special, just togetherness."
            },
            {
              text: "A formal meeting or gathering",
              correct: false,
              why: "It's more casual—just being together, not necessarily a formal event."
            },
            {
              text: "Agreement or consensus",
              correct: false,
              why: "Not about agreement—it's about shared presence."
            },
            {
              text: "A celebration or party",
              correct: false,
              why: "Can include celebrations, but samvær is broader—it's any meaningful togetherness."
            }
          ],
          explanation: "Samvær is a beautiful Danish word describing the value of simply being together with others—quality time and presence. It's central to Danish social values and culture.",
          why: "Words like samvær reveal what cultures value most deeply."
        }
      ]
    },
    {
      type: "production",
      title: "Create a Cultural Reflection",
      scenarios: [
        {
          id: "prod1",
          instruction: "Write a short reflection (3-4 sentences) about a Danish cultural concept (hygge, janteloven, samvær) and how it differs from a similar concept in your own culture.",
          guidance: "Consider: What does the Danish concept emphasize? What values does it reveal? How is it different from your cultural equivalent?"
        },
        {
          id: "prod2",
          instruction: "Use at least two Danish idioms or slang words in a short dialogue (4-6 exchanges) between two Danish speakers discussing their day or a recent event.",
          guidance: "Try to integrate idioms naturally. What would Danes actually say to each other? Use 'vildt,' 'fandme,' idioms, or cultural concepts you learned."
        }
      ]
    },
    {
      type: "quiz",
      title: "Vocabulary & Culture Quiz",
      quizItems: [
        {
          id: "q1",
          question: "What does 'Det er ikke dårligt' actually mean in Danish culture?",
          options: [
            { text: "It's actually quite good (understatement as compliment)", correct: true, why: "Correct—Danish uses understatement culturally." },
            { text: "It's definitely bad", correct: false, why: "Opposite of the cultural meaning." },
            { text: "It's neutral or okay", correct: false, why: "It's actually positive—a compliment through understatement." },
            { text: "The weather is poor", correct: false, why: "Not weather-specific." }
          ]
        },
        {
          id: "q2",
          question: "Which word best describes the Danish cultural value of prioritizing equality and discouraging standing out?",
          options: [
            { text: "Janteloven", correct: true, why: "Correct—Janteloven is the cultural principle of equality." },
            { text: "Hygge", correct: false, why: "Hygge is about coziness, not equality." },
            { text: "Samvær", correct: false, why: "Samvær is about being together, not about equality principle." },
            { text: "Arbejdsmiljø", correct: false, why: "This refers to work environment." }
          ]
        },
        {
          id: "q3",
          question: "What does 'vildt' mean in modern Danish slang?",
          options: [
            { text: "Crazy/wild (used to emphasize something amazing)", correct: true, why: "Correct—vildt is slang for 'amazing' or 'crazy good.'" },
            { text: "Angry or upset", correct: false, why: "Vildt isn't about anger." },
            { text: "Literally wild (nature)", correct: false, why: "Not the slang meaning." },
            { text: "Confused", correct: false, why: "No connection." }
          ]
        },
        {
          id: "q4",
          question: "What does 'samvær' represent in Danish culture?",
          options: [
            { text: "The value of simply being together with others (quality presence)", correct: true, why: "Correct—samvær is togetherness and presence." },
            { text: "Agreement or consensus", correct: false, why: "Not about agreement." },
            { text: "A formal meeting", correct: false, why: "It's casual togetherness." },
            { text: "A celebration or party", correct: false, why: "Can include celebrations, but broader than that." }
          ]
        },
        {
          id: "q5",
          question: "Why is Danish communication often described as 'direct'?",
          options: [
            { text: "Because Danish culture values honesty and transparency as respectful and efficient", correct: true, why: "Correct—directness is a cultural value, not rudeness." },
            { text: "Because Danes are naturally impolite", correct: false, why: "Directness ≠ rudeness." },
            { text: "Because Danish language lacks polite forms", correct: false, why: "Danish has polite forms—it's cultural choice." },
            { text: "Because Danes are less emotional", correct: false, why: "Directness ≠ lack of emotion." }
          ]
        }
      ]
    },
    {
      type: "complete",
      title: "Lesson Complete!",
      message: "Outstanding! You've learned Danish idioms, slang, and cultural values that reveal what Danes care about most: community, honesty, presence, and equality. These insights will help you communicate authentically and understand Danish society more deeply."
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

  const handleOptionClick = async (exerciseId, optionIndex) => {
    // Track exercise start time on first interaction
    if (!exerciseStartTime) {
      setExerciseStartTime(Date.now());
    }

    const currentExercise = currentSection.exercises?.find(e => e.id === exerciseId);
    const selectedOption = currentExercise?.options[optionIndex];
    const errorType = selectedOption?.correct ? null : 'VALG'; // VALG for selection errors

    // Record attempt with adaptive tracking
    await handleExerciseSubmit({
      exerciseId,
      userAnswer: selectedOption?.text || '',
      isCorrect: selectedOption?.correct || false,
      userConfidence,
      errorType
    });

    setResponses({ ...responses, [exerciseId]: optionIndex });
    setShowExplanation({ ...showExplanation, [exerciseId]: true });

    // Reset confidence for next exercise
    setUserConfidence(3);
    setExerciseStartTime(null);
  };

  const handleNext = () => {
    // Reset state for next section
    setUserConfidence(3);
    setExerciseStartTime(null);
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
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-gray-100 grid place-items-center text-gray-900 font-[600]"
              aria-label="Back"
            >
              ←
            </button>
            <DifficultyIndicator difficulty={currentDifficulty} />
          </div>
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
                {responses[exercise.id] === undefined && <ConfidenceSelector value={userConfidence} onChange={setUserConfidence} />}

                <div className="space-y-2 mb-4 mt-4">
                  {exercise.options.map((option, optionIdx) => (
                    <button
                      key={optionIdx}
                      onClick={() => handleOptionClick(exercise.id, optionIdx)}
                      disabled={responses[exercise.id] !== undefined}
                      className={`w-full p-3 rounded-[8px] text-left text-[14px] font-[500] transition-all ${
                        responses[exercise.id] === optionIdx
                          ? option.correct
                            ? "bg-green-100 border-2 border-green-600 text-green-900"
                            : "bg-red-100 border-2 border-red-600 text-red-900"
                          : "bg-white border border-gray-300 text-gray-900 hover:border-gray-400 cursor-pointer"
                      }`}
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
                {showExplanation[exercise.id] && responses[exercise.id] !== undefined && (
                  <>
                    <AttemptFeedback
                      isCorrect={exercise.options[responses[exercise.id]]?.correct}
                      feedback={exercise.options[responses[exercise.id]]?.why}
                    />
                    <div className="bg-blue-50 rounded-[8px] p-3 border-l-4 border-blue-600 mt-3">
                      <p className="text-[13px] text-blue-900 font-[600] mb-2">Explanation:</p>
                      <p className="text-[13px] text-blue-800">{exercise.explanation}</p>
                    </div>
                  </>
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
                  placeholder="Write your response here..."
                  className="w-full h-[120px] p-3 border border-gray-300 rounded-[8px] text-[14px] font-[500] resize-none focus:outline-none focus:ring-2 focus:ring-green-600"
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
      <div className="min-h-screen bg-[#f2f2f7] flex items-center justify-center px-4">
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
