import { useState } from 'react';
import { useExerciseSubmission, AttemptFeedback, DifficultyIndicator, ConfidenceSelector } from '../AdaptiveExerciseWrapper';

// Lesson 7: Grammar Deep-dive — Advanced tenses, conditionals, complex sentences
// Topics: conditional tenses, hypotheticals, complex subordination, modal nuance

export default function GrammarDeepDiveLesson({ lesson, onComplete, onBack, onAttemptRecorded, currentDifficulty }) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [showExplanation, setShowExplanation] = useState({});
  const [userConfidence, setUserConfidence] = useState(3);
  const [exerciseStartTime, setExerciseStartTime] = useState(null);

  const handleExerciseSubmit = useExerciseSubmission(
    onAttemptRecorded,
    'grammar-deep-dive',
    `section${currentSectionIndex}`,
    'Grammar Deep-dive',
    currentDifficulty
  );

  const sections = [
    {
      type: "intro",
      title: "Grammar Deep-dive",
      content: "In this lesson, you'll master the advanced grammar structures that separate fluent speakers from intermediate learners: conditional tenses (hvis jeg havde...), hypotheticals, complex sentence combining, and the subtle uses of modal verbs. These structures appear constantly in professional and academic Danish.",
      englishContext: "English speakers often struggle with Danish conditionals because English uses would + infinitive while Danish uses past tense in the condition. This lesson builds that intuition through comparison. You'll also learn how to string together complex ideas without sounding choppy or foreign."
    },
    {
      type: "section",
      title: "Conditional Tenses & Hypotheticals",
      exercises: [
        {
          id: "gd1",
          type: "mcq",
          question: "How do you express a hypothetical condition in Danish?",
          instruction: "Choose the correct structure for: If I had studied harder, I would have passed.",
          options: [
            { text: "Hvis jeg studerede mere, ville jeg bestå.", correct: false, why: "This is open condition (real possibility). For hypothetical past, use past perfect: havde + past participle." },
            { text: "Hvis jeg havde studeret mere, ville jeg have bestået.", correct: true, why: "Correct! Past perfect in the condition (havde studeret) + would-have (ville have) structure. This is the classic Danish hypothetical." },
            { text: "Hvis jeg havde studeret mere, ville jeg bestå.", correct: false, why: "Mixed tense. If condition is past perfect, consequence must also be past perfect (ville have bestået)." }
          ],
          explanation: "Danish conditional structure: Hvis + past perfect subject verb, main clause + ville + have + past participle. The key difference from English: Danish uses past tense, not would.",
          why: "Hypothetical conditions are frequent in decision-making, regret, and complex arguments in business Danish."
        },
        {
          id: "gd2",
          type: "fillblank",
          question: "Fill in the correct verb form:",
          instruction: "Hvis jeg _____ tid, ville jeg drikke kaffe med dig.",
          options: [
            { text: "havde", correct: true, why: "Correct! Havde (past perfect auxiliary) + noun sets up the hypothetical. Full form would be havde tid (had time)." },
            { text: "havde haft", correct: false, why: "This would suggest time in the past, not present. Use simple havde for a general hypothetical." },
            { text: "har", correct: false, why: "Present perfect doesn't work in hypothetical conditions. Must use past tense." }
          ],
          explanation: "In conditional clauses, had time = havde tid (not havde haft tid). The structure is: hvis + past tense + condition, would result.",
          why: "This construction appears constantly when discussing what you would do with more resources, time, or support."
        },
        {
          id: "gd3",
          type: "mcq",
          question: "What is the difference between these two sentences?",
          optionGroupA: "A: Hvis jeg ser ham, siger jeg hej.",
          optionGroupB: "B: Hvis jeg så ham, ville jeg sige hej.",
          instruction: "What does each one mean?",
          options: [
            { text: "A = open condition (might happen), B = hypothetical (unlikely)", correct: true, why: "Correct! A uses present: real possibility. B uses past: unlikely or imaginary. This distinction is critical in Danish." },
            { text: "A = hypothetical, B = open condition", correct: false, why: "Reversed. A is the real possibility; B is the hypothetical." },
            { text: "Both are the same meaning, just different phrasing", correct: false, why: "They are grammatically and semantically different." }
          ],
          explanation: "Open conditions (present tense) = realistic scenarios. Hypothetical conditions (past tense) = unlikely, imaginary, or contrary to fact. This mirrors English subtle better than most learners realize.",
          why: "Confusing these changes the meaning entirely. In a job interview, saying hvis jeg ville arbejde her (if I would work here) sounds hesitant; hvis jeg arbejder her (if I work here) sounds committed."
        },
        {
          id: "gd4",
          type: "transformation",
          question: "Rewrite this open condition as a hypothetical:",
          instruction: "Hvis priserne stiger, køber jeg ikke bilen.",
          options: [
            { text: "Hvis priserne var steget, ville jeg ikke have købt bilen.", correct: false, why: "This refers to a past hypothetical. For present hypothetical, use simple past: hvis priserne steg..." },
            { text: "Hvis priserne steg, ville jeg ikke købe bilen.", correct: true, why: "Correct! Change present stiger to past steg in condition, and add ville in main clause. This shifts from likely to unlikely." },
            { text: "Hvis priserne steget, ville jeg ikke købe bilen.", correct: false, why: "Steget is not a valid form here. Use the past tense steg." }
          ],
          explanation: "To shift from open to hypothetical: present → past tense in condition, add ville in main clause. The hypothetical version suggests you probably will buy it despite the price rise.",
          why: "This grammatical shift is how Danish speakers express degrees of certainty and commitment."
        },
        {
          id: "gd5",
          type: "fillblank",
          question: "Complete the hypothetical:",
          instruction: "Hvis jeg _____ børn, _____ jeg ændre mit arbejdsliv.",
          options: [
            { text: "havde / ville", correct: true, why: "Correct! Havde (condition) + ville (consequence). Structure: hvis jeg havde børn, ville jeg ændre..." },
            { text: "har / ville", correct: false, why: "Har is present; hypotheticals use past tense. Must use havde." },
            { text: "havde / ville have", correct: false, why: "The consequence is present hypothetical (skulle have), not past. Use simple ville." }
          ],
          explanation: "Present hypothetical structure: hvis + past tense, skulle have + infinitive means would do. This expresses what would happen if a current situation were different.",
          why: "Common in discussions about how life would change with different circumstances (children, relocation, career change)."
        }
      ]
    },
    {
      type: "section",
      title: "Complex Subordination & Sentence Combining",
      exercises: [
        {
          id: "gd6",
          type: "mcq",
          question: "Which sentence correctly combines these two ideas: 'The meeting was delayed. The client had not arrived yet.'",
          options: [
            { text: "Mødet blev udsat, fordi klienten var ikke kommet endnu.", correct: false, why: "Word order error in subordinate clause. After fordi, the verb comes after the adverbial: klienten var endnu ikke kommet." },
            { text: "Mødet blev udsat, fordi klienten endnu ikke var kommet.", correct: true, why: "Correct! In subordinate clauses with ledsætning, word order is: subject + adverbial + verb (klienten endnu ikke var kommet)." },
            { text: "Mødet blev udsat, da klienten var ikke kommet.", correct: false, why: "Both word order and register wrong. Da is more formal; use fordi for cause. And word order must follow subordinate rules." }
          ],
          explanation: "In subordinate clauses (ledsætninger): subject + adverbial placement + verb at end. This is where B1 learners make the most frequent errors under pressure.",
          why: "Professional writing requires seamless subordination without sounding choppy or repetitive."
        },
        {
          id: "gd7",
          type: "fillblank",
          question: "Fill in the missing conjunction and fix word order:",
          instruction: "Jeg arbejdede hele dagen, _____ jeg var træt, jeg gik hjem tidligt.",
          options: [
            { text: "og da", correct: true, why: "Correct! Og da = and because/since. Combines ideas smoothly: I worked all day, and because I was tired, I went home early." },
            { text: "fordi da", correct: false, why: "Redundant. Use one causal conjunction: either fordi or og da." },
            { text: "da og", correct: false, why: "Wrong word order. Da (conjunction) comes after the first clause." }
          ],
          explanation: "Chaining clauses with og da (and because) or og hvis (and if) creates flowing Danish without repetition. This is a mark of fluent writing.",
          why: "Narrative and professional writing both rely on these connectors to show relationships between ideas."
        },
        {
          id: "gd8",
          type: "mcq",
          question: "How would you combine 'I sent the email' + 'I received a response' + 'I was surprised'?",
          options: [
            { text: "Jeg sendte emailen, modtog et svar, og jeg var overrasket.", correct: false, why: "Comma splice. Too many coordination. Better: 'Jeg sendte emailen, og da jeg modtog et svar, var jeg overrasket.'" },
            { text: "Jeg sendte emailen, og da jeg modtog et svar, var jeg overrasket.", correct: true, why: "Correct! Combines with og da + subordinate clause. Smooth and clear." },
            { text: "Jeg sendte emailen, og jeg modtog et svar, og jeg var overrasket.", correct: false, why: "Three linked clauses with og becomes monotonous. Use subordination instead." }
          ],
          explanation: "Vary clause structure: mix coordination (og) with subordination (da) to create rhythm and clarity. This is what separates textbook from natural Danish.",
          why: "Email, reports, and presentations all benefit from varied sentence structure that maintains attention."
        },
        {
          id: "gd9",
          type: "transformation",
          question: "Rewrite using a relative clause instead of two sentences:",
          instruction: "Vi mødte en konsulent. Hun havde erfaring med vores problemstilling.",
          options: [
            { text: "Vi mødte en konsulent, som havde erfaring med vores problemstilling.", correct: true, why: "Correct! Som introduces relative clause. Full form: konsulent + som + verb structure with comma." },
            { text: "Vi mødte en konsulent der havde erfaring med vores problemstilling.", correct: false, why: "Der is acceptable but less formal; typically used without antecedent (there is). Som is more standard here." },
            { text: "Vi mødte en konsulent hvem havde erfaring med vores problemstilling.", correct: false, why: "Hvem is for objects, not subjects. Use som for subject relative clauses." }
          ],
          explanation: "Relative clauses (som/der/hvis) allow you to embed description within a sentence. Kommer som har erfaring is more sophisticated than Vi mødte en person. Hun havde erfaring.",
          why: "Professional communication depends on embedding information efficiently without breaking the reader's flow."
        },
        {
          id: "gd10",
          type: "fillblank",
          question: "Complete the sentence with the correct relative marker:",
          instruction: "Systemet, _____ vi implementerede i november, har reduceret fejl med 40%.",
          options: [
            { text: "som", correct: true, why: "Correct! Som for the object of implementerede. The full clause is: vi implementerede systemet (systemet is the object)." },
            { text: "der", correct: false, why: "Der works in existential clauses (Der er et system) but not here where som is the object." },
            { text: "hvis", correct: false, why: "Hvis is possessive (whose). This relative needs an object marker: som." }
          ],
          explanation: "Object relative clauses take som: systemet som vi implementerede. Subject relative clauses take som/der: systemet som fungerer godt. Know the difference to avoid ambiguity.",
          why: "In documentation and reports, precise relative pronouns ensure readers follow your logic."
        }
      ]
    },
    {
      type: "section",
      title: "Modal Verbs & Nuance",
      exercises: [
        {
          id: "gd11",
          type: "mcq",
          question: "What is the difference between skal and vil in Danish?",
          instruction: "Which sentence uses skal correctly?",
          options: [
            { text: "Du skal komme til mødet i morgen.", correct: true, why: "Correct! Skal = obligation/requirement. You must come. This is external obligation." },
            { text: "Jeg vil komme til mødet i morgen.", correct: false, why: "Vil = intention/desire. I want to come. Different modal." },
            { text: "Both are the same; Danish speakers use them interchangeably.", correct: false, why: "They are distinct. Skal = must/should; vil = will/want to." }
          ],
          explanation: "Skal (must/should) expresses obligation. Vil (will/want) expresses intention. In the workplace, skal carries authority; vil is voluntary.",
          why: "Confusing these changes the tone from directive to optional, which shifts how your message is received."
        },
        {
          id: "gd12",
          type: "fillblank",
          question: "Choose the right modal:",
          instruction: "Jeg _____ gerne drikke kaffe, men jeg _____ ikke tid.",
          options: [
            { text: "vil / har", correct: true, why: "Correct! Vil gerne (would like to) + present tense for state (har ikke tid = don't have time). Express desire + constraint." },
            { text: "skal / skal", correct: false, why: "Skal = obligation. This means I must drink coffee and I must not have time, which doesn't make sense." },
            { text: "vil / skal", correct: false, why: "Vil gerne (want to) is right, but skal ikke tid doesn't work. Use present tense har ikke tid." }
          ],
          explanation: "Vil gerne = would like to (polite desire). Skal = obligatory. Kan = ability. Know which modal expresses which attitude.",
          why: "In professional settings, modal choice determines whether you sound cooperative, obligated, or unable."
        },
        {
          id: "gd13",
          type: "mcq",
          question: "How do you express possibility or likelihood in Danish?",
          options: [
            { text: "Kan + infinitive (kan være)", correct: false, why: "Kan = ability. For possibility, use kan + infinitive (kan være) but also kunne (might) and måske (perhaps)." },
            { text: "Kunne + infinitive (kunne være)", correct: true, why: "Correct! Kunne = might/could (possibility). Dette kunne være rigtigt = This could be right. Expresses hedging." },
            { text: "Må + infinitive (må være)", correct: false, why: "Må = may/must. Can express permission or obligation depending on context." }
          ],
          explanation: "Kunne (might), kan (can), må (must/may), and modalpartikler like nok/vel (probably/I suppose) all shade meaning toward hedging. Danish loves hedging in professional talk.",
          why: "In meetings and presentations, English speakers often sound overconfident to Danes because they skip these softening modals."
        },
        {
          id: "gd14",
          type: "transformation",
          question: "Rewrite to sound more tentative:",
          instruction: "Det er en god idé.",
          options: [
            { text: "Det kunne være en god idé.", correct: true, why: "Correct! Kunne (could) softens the statement. This is how Danes hedge—it's politer and less confrontational." },
            { text: "Det vil være en god idé.", correct: false, why: "Vil is future/intention, not hedging. Doesn't soften." },
            { text: "Det skal være en god idé.", correct: false, why: "Skal sounds obligatory, not tentative." }
          ],
          explanation: "To hedge: could be, might be, perhaps, probably (kunne, måske, nok, vel). These softening words are essential in Danish workplace culture.",
          why: "Danes value consensus-building and collective decision-making. Hedging modals show you are open to input."
        },
        {
          id: "gd15",
          type: "mcq",
          question: "Which sentence correctly expresses regret about a past action?",
          options: [
            { text: "Jeg burde have studeret mere.", correct: true, why: "Correct! Burde (should/ought) + have + past participle. Expresses hindsight: I should have studied more." },
            { text: "Jeg skulle have studeret mere.", correct: true, why: "Also correct! Skulle + have is equally valid for expressing regret. Both burde and skulle work here." },
            { text: "Jeg ville have studeret mere.", correct: false, why: "Ville = would. This is hypothetical. For regret, use burde or skulle." }
          ],
          explanation: "Burde/skulle + have + past participle = should have / ought to have. This structure expresses regret, blame, or counterintuitive advice about the past.",
          why: "Reflecting on mistakes or learning from experience requires this structure in professional contexts."
        }
      ]
    },
    {
      type: "production",
      title: "Your Turn: Advanced Writing",
      instruction: "Write responses using the advanced structures you've learned: conditionals, complex subordination, and modal nuance.",
      scenarios: [
        {
          id: "prod1",
          prompt: "Write a sentence expressing a hypothetical: If I had more resources, I would expand the project.",
          hint: "Use: Hvis jeg havde flere ressourcer, ville jeg..."
        },
        {
          id: "prod2",
          prompt: "Write a sentence with a relative clause combining: I met someone. They had experience in AI.",
          hint: "Use: Vi mødte en person, som havde..."
        }
      ]
    },
    {
      type: "quiz",
      title: "Check Your Understanding",
      quizItems: [
        {
          id: "q1",
          question: "What is the main difference between open and hypothetical conditions?",
          options: [
            { text: "Open uses present tense (realistic); hypothetical uses past tense (unlikely/imaginary)", correct: true, why: "Correct! This is the fundamental distinction." },
            { text: "Open is formal; hypothetical is casual", correct: false, why: "Register is independent of condition type." },
            { text: "They are the same; just different words", correct: false, why: "They are grammatically and semantically different." }
          ],
          explanation: "Tense choice in the condition marks whether you think something is likely or imaginary."
        },
        {
          id: "q2",
          question: "In a subordinate clause (ledsætning), where does the verb go?",
          options: [
            { text: "After the adverbial", correct: true, why: "Correct! Order: subject + adverbial + verb. Example: da jeg ikke kunne komme (when I could not come)." },
            { text: "Before the adverbial (like main clauses)", correct: false, why: "That is V2 word order. Ledsætninger have the verb at the end." },
            { text: "At the beginning", correct: false, why: "Verb never begins a subordinate clause." }
          ],
          explanation: "Subordinate clause word order (SVO) is different from main clause V2. This is critical."
        },
        {
          id: "q3",
          question: "How do you express 'I should have done it' in Danish?",
          options: [
            { text: "Jeg burde have gjort det.", correct: true, why: "Correct! Burde + have + past participle." },
            { text: "Jeg ville have gjort det.", correct: false, why: "Ville have = would have (hypothetical), not should have (regret)." },
            { text: "Jeg skal have gjort det.", correct: false, why: "Skal = must. Not the right modal for regret." }
          ],
          explanation: "Burde and skulle both express regret/obligation hindsight. Use + have + past participle."
        },
        {
          id: "q4",
          question: "Which modal expresses possibility/might?",
          options: [
            { text: "Kunne", correct: true, why: "Correct! Kunne = might/could. Kunne være = might be." },
            { text: "Skal", correct: false, why: "Skal = must/should (obligation)." },
            { text: "Vil", correct: false, why: "Vil = will (future/intention)." }
          ],
          explanation: "Kunne softens claims and expresses hedging, essential in professional Danish."
        },
        {
          id: "q5",
          question: "Which relative pronoun is correct for an object? 'The document som/der we reviewed...'",
          options: [
            { text: "som", correct: true, why: "Correct! Som for object relative clauses (we reviewed = object position)." },
            { text: "der", correct: false, why: "Der is for existential or subject relative clauses, not objects." },
            { text: "hvis", correct: false, why: "Hvis = whose (possessive)." }
          ],
          explanation: "Object relative = som; subject relative = som/der; possessive = hvis."
        }
      ]
    },
    {
      type: "complete",
      title: "Lesson Complete!",
      message: "You've mastered the grammar structures that separate intermediate from advanced speakers. Conditional tenses, complex subordination, and modal nuance are now in your toolkit. These skills will make your Danish writing and speech sound confident and professional."
    }
  ];

  const currentSection = sections[currentSectionIndex];

  const handleExerciseResponse = async (exerciseId, selectedOption) => {
    // Track exercise start time on first interaction
    if (!exerciseStartTime) {
      setExerciseStartTime(Date.now());
    }

    const errorType = selectedOption.correct ? null : 'BØJ'; // BØJ for grammar/conjugation errors

    // Record attempt with adaptive tracking
    await handleExerciseSubmit({
      exerciseId,
      userAnswer: selectedOption.text,
      isCorrect: selectedOption.correct,
      userConfidence,
      errorType
    });

    setResponses({
      ...responses,
      [exerciseId]: selectedOption
    });
    setShowExplanation({
      ...showExplanation,
      [exerciseId]: true
    });

    // Reset confidence for next exercise
    setUserConfidence(3);
    setExerciseStartTime(null);
  };

  const handleQuizResponse = async (quizId, selectedOption) => {
    // Track quiz start time on first interaction
    if (!exerciseStartTime) {
      setExerciseStartTime(Date.now());
    }

    const errorType = selectedOption.correct ? null : 'BØJ';

    // Record attempt with adaptive tracking
    await handleExerciseSubmit({
      exerciseId: quizId,
      userAnswer: selectedOption.text,
      isCorrect: selectedOption.correct,
      userConfidence,
      errorType
    });

    setResponses({
      ...responses,
      [quizId]: selectedOption
    });
    setShowExplanation({
      ...showExplanation,
      [quizId]: true
    });

    // Reset confidence for next quiz item
    setUserConfidence(3);
    setExerciseStartTime(null);
  };

  const handleNext = () => {
    // Reset state for next section
    setUserConfidence(3);
    setExerciseStartTime(null);
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const handleBack = () => {
    // Reset state when going back
    setUserConfidence(3);
    setExerciseStartTime(null);
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
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handleBack}
              className="w-10 h-10 rounded-full bg-gray-100 grid place-items-center text-gray-900 font-[600]"
            >
              ←
            </button>
            <DifficultyIndicator difficulty={currentDifficulty} />
          </div>
          <h2 className="text-[24px] font-[700] mb-6">{currentSection.title}</h2>

          {currentSection.exercises.map((exercise, idx) => {
            const response = responses[exercise.id];
            const isAnswered = !!response;

            return (
              <div key={exercise.id} className="mb-8 pb-6 border-b border-gray-200">
                <div className="text-[12px] text-gray-600 font-[600] mb-2 uppercase">
                  Exercise {idx + 1}
                </div>
                {exercise.instruction && (
                  <p className="text-[13px] text-gray-700 mb-3 italic">{exercise.instruction}</p>
                )}
                {exercise.optionGroupA && (
                  <div className="bg-gray-50 rounded-[8px] p-3 mb-3 border border-gray-200">
                    <p className="text-[13px] text-gray-800 mb-2"><strong>A:</strong> {exercise.optionGroupA}</p>
                    <p className="text-[13px] text-gray-800"><strong>B:</strong> {exercise.optionGroupB}</p>
                  </div>
                )}
                <p className="text-[14px] font-[600] text-gray-900 mb-3">{exercise.question}</p>

                {!isAnswered && <ConfidenceSelector value={userConfidence} onChange={setUserConfidence} />}

                <div className="space-y-2 mb-4 mt-4">
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
                  <>
                    <AttemptFeedback isCorrect={response.correct} feedback={response.why} />
                    <div className="bg-blue-50 rounded-[8px] p-3 border border-blue-200 mt-3">
                      <p className="text-[12px] text-gray-700">{exercise.explanation}</p>
                    </div>
                  </>
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
