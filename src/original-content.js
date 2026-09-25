/* DanskPath - content bank.
 *
 * Content lives here, separate from the engine in platform.js, so it can be
 * reviewed by a Danish teacher without reading application code (roadmap
 * item 1). Every item is original.
 *
 * A template is a learning objective plus variants. The engine substitutes the
 * variant, shuffles the options, and records the `skill` code against the
 * learner's history so weak areas are measurable.
 *
 * Skill codes match the error taxonomy used in the learner's marked written
 * work, so app practice and marked sheets aggregate into one picture:
 *   ORD  word order        TID  tense / verb form     KØN  en / et
 *   BØJ  inflection        PRÆ  prepositions          VALG word choice
 *   REG  register
 */

const SKILLS = {
  ORD:  { label: "Word order",      da: "Ordstilling",  note: "V2, ledsætninger, placement of ikke" },
  TID:  { label: "Tense & verbs",   da: "Tid og verber", note: "datid, førnutid, infinitive after modals" },
  KØN:  { label: "Noun gender",     da: "Køn",          note: "en or et, and the definite form that follows" },
  BØJ:  { label: "Inflection",      da: "Bøjning",      note: "plurals, adjective agreement, possessives" },
  PRÆ:  { label: "Prepositions",    da: "Præpositioner", note: "i, på, til, om, siden" },
  VALG: { label: "Word choice",     da: "Ordvalg",      note: "connectors, modals, collocations" },
  REG:  { label: "Register",        da: "Register",     note: "formal and informal tone" },
  TAL:  { label: "Numbers",         da: "Tal",          note: "0–1000, years, dates and phone numbers" }
};

const GLOSSARY = {
  jeg:"I / me - used when you speak about yourself.",
  du:"you - used when speaking to one person.",
  han:"he - a masculine pronoun.",
  hun:"she - a feminine pronoun.",
  vi:"we - a group including you.",
  de:"they - a group of people.",
  skal:"must / will / am going to - usually a plan, appointment, or obligation.",
  kan:"can - ability or possibility.",
  må:"may / am allowed to - ‘må ikke’ means not allowed.",
  vil:"will / want to - ‘vil gerne’ makes a polite wish.",
  er:"am / is / are - present tense of ‘at være’.",
  har:"have / has - present tense of ‘at have’.",
  var:"was / were - past tense of ‘at være’.",
  ikke:"not - in a main clause it comes after the verb and subject.",
  på:"on / at - used in phrases such as ‘på arbejde’.",
  i:"in - used for places such as ‘i København’ and for a period of time.",
  til:"to - movement towards a destination.",
  om:"about; also ‘in’ for future time - ‘om en uge’ means in a week.",
  siden:"since - a starting point that continues until now.",
  fra:"from.",
  med:"with.",
  hos:"at someone’s place - ‘hos lægen’ means at the doctor’s.",
  arbejde:"work - ‘på arbejde’ means at work.",
  arbejder:"works / am working - present tense of ‘at arbejde’.",
  hjem:"home (direction) - ‘hjemme’ is home (location).",
  hjemme:"at home (location) - ‘hjem’ is the direction.",
  går:"walks / goes - present tense of ‘at gå’.",
  gik:"walked / went - past tense of ‘at gå’.",
  toget:"the train.",
  bussen:"the bus.",
  morgen:"morning; ‘i morgen’ means tomorrow.",
  morgenen:"the morning; ‘om morgenen’ means in the mornings.",
  fordi:"because - introduces a reason, and the clause after it uses subordinate word order.",
  men:"but - contrasts two ideas without changing word order.",
  derfor:"therefore / that is why - it counts as a full element, so the verb follows it.",
  selvom:"although / even though.",
  når:"when - for something repeated or in the future.",
  da:"when - for a single completed event in the past.",
  hvis:"if.",
  sin:"his / her / its own - refers back to the subject of the same clause.",
  sit:"his / her / its own, with an et-word.",
  hans:"his - someone other than the subject.",
  hendes:"her - someone other than the subject.",
  møde:"a meeting - ‘holde et møde’ means to hold a meeting.",
  frist:"a deadline - ‘overholde en frist’ means to meet a deadline.",
  opgave:"a task - ‘løse en opgave’ means to solve a task.",
  aftale:"an agreement or appointment - ‘lave en aftale’.",
  kollega:"a colleague.",
  sundhed:"health.",
  bolig:"housing / home.",
  fællesskab:"community.",
  mulighed:"opportunity / possibility.",
  undersøgelse:"survey / study.",
  forslag:"proposal / suggestion.",
  alligevel:"nevertheless / even so - introduces a contrast.",
  desuden:"in addition / furthermore.",
  imidlertid:"however - a formal qualifying contrast.",
  bæredygtig:"sustainable.",
  forbedre:"to improve.",
  oplevelse:"experience.",
  beslutning:"a decision - ‘træffe en beslutning’.",
  bestyrelsen:"the board (of a company or organisation).",
  // words that appear in the reading and listening texts, so the first tap lands on something
  hej:"hi / hello - the everyday greeting, fine at work too.",
  hilsen:"regards - ‘Hilsen Maja’ closes an informal message.",
  tak:"thanks. Note the initial t is strongly aspirated, closer to ‘tsak’.",
  klokken:"o’clock - ‘klokken ni’ means at nine.",
  otte:"eight.", ni:"nine.", ti:"ten.", seks:"six.",
  sent:"late.", lidt:"a little / slightly.",
  kommer:"come / comes - present tense of ‘at komme’.",
  tager:"take / takes - also used for transport: ‘jeg tager toget’.",
  købe:"to buy.", køber:"buys.",
  mødes:"to meet (each other) - an s-verb with reciprocal meaning.",
  ved:"by / next to; also ‘know’ - ‘jeg ved det’ means I know.",
  stationen:"the station.",
  biblioteket:"the library.",
  bog:"a book.", bogen:"the book.",
  låne:"to borrow - ‘låne en bog’.",
  aflevere:"to hand in / return something.",
  uger:"weeks.", dag:"a day.", dage:"days.",
  efter:"after.", bagefter:"afterwards.",
  arbejdsplads:"a workplace.",
  medarbejdere:"employees / staff.",
  samarbejdet:"the collaboration.",
  ro:"calm / quiet - ‘mere ro’ means more peace to work.",
  opgaver:"tasks.",
  beboere:"residents.",
  kommunen:"the municipality - the local authority, and a word you will meet constantly in Denmark.",
  støttet:"supported.",
  redskaber:"tools / equipment.",
  dyrker:"grow / cultivate.",
  afhænger:"depends - ‘afhænger af’ means depends on.",
  løsning:"a solution.", løsninger:"solutions.",
  gevinsten:"the gain / the benefit.",
  arbejdsgange:"work processes / routines.",
  ansvar:"responsibility.",
  borgere:"citizens.",
  hverdagen:"everyday life."
};

/* ------------------------------------------------------------------ *
 * Grammar templates
 * Each render() returns { prompt, correct, options, why }.
 * `options` must NOT include the correct answer - the engine adds and
 * shuffles it. `why` explains the rule, not just the correction.
 * ------------------------------------------------------------------ */

const TEMPLATES = {
  beginner: [
    {
      id: "b-kon-article", skill: "KØN",
      objective: "Choose en or et for a common noun",
      variants: [
        { noun: "bil",    art: "en", hint: "car" },
        { noun: "hus",    art: "et", hint: "house" },
        { noun: "cykel",  art: "en", hint: "bicycle" },
        { noun: "bord",   art: "et", hint: "table" },
        { noun: "taske",  art: "en", hint: "bag" },
        { noun: "æble",   art: "et", hint: "apple" },
        { noun: "kollega", art: "en", hint: "colleague" },
        { noun: "møde",   art: "et", hint: "meeting" }
      ],
      render: v => ({
        prompt: `en eller et? &nbsp; ___ ${v.noun} <em>(${v.hint})</em>`,
        correct: v.art,
        options: [v.art === "en" ? "et" : "en"],
        why: v.art === "en"
          ? `»${v.noun}« is a fælleskøn (common gender) word, so it takes <b>en</b>. Roughly 75% of Danish nouns are en-words, so en is the better guess when you genuinely do not know.`
          : `»${v.noun}« is an intetkøn (neuter) word, so it takes <b>et</b>. Neuter nouns are the minority, which is why they are worth memorising individually rather than guessing.`
      })
    },
    {
      id: "b-kon-definite", skill: "KØN",
      objective: "Form the definite singular, which exposes the gender",
      variants: [
        { noun: "bil",  def: "bilen",  wrong: ["bilet", "denbil"],  hint: "the car" },
        { noun: "hus",  def: "huset",  wrong: ["husen", "dethus"],  hint: "the house" },
        { noun: "bord", def: "bordet", wrong: ["borden", "detbord"], hint: "the table" },
        { noun: "avis", def: "avisen", wrong: ["aviset", "denavis"], hint: "the newspaper" }
      ],
      render: v => ({
        prompt: `Hvad er den bestemte form af »${v.noun}«? <em>(${v.hint})</em>`,
        correct: v.def,
        options: v.wrong,
        why: `Danish puts the article on the <b>end</b> of the noun, not in front of it: en bil → <b>bilen</b>, et hus → <b>huset</b>. The ending tells you the gender, which is why learning the definite form is worth more than learning the bare noun.`
      })
    },
    {
      id: "b-tid-datid", skill: "TID",
      objective: "Use past tense after a past time expression",
      variants: [
        { past: "købte", pres: "køber", inf: "købe", rest: "en ny bog" },
        { past: "spiste", pres: "spiser", inf: "spise", rest: "morgenmad klokken syv" },
        { past: "læste", pres: "læser", inf: "læse", rest: "avisen i toget" },
        { past: "arbejdede", pres: "arbejder", inf: "arbejde", rest: "hjemme hele dagen" },
        { past: "talte", pres: "taler", inf: "tale", rest: "med sin chef" }
      ],
      render: v => ({
        prompt: `I går ___ Anna ${v.rest}.`,
        correct: v.past,
        options: [v.pres, v.inf],
        why: `»I går« forces the past tense, so <b>${v.past}</b>. Notice the second thing happening here: the sentence opens with a time expression, so the verb comes straight after it and the subject <i>Anna</i> moves behind the verb. That is the V2 rule doing its work.`
      })
    },
    {
      id: "b-ord-inversion", skill: "ORD",
      objective: "Invert subject and verb after a fronted element",
      variants: [
        { front: "I morgen", subj: "Anna", verb: "tager", rest: "på arbejde" },
        { front: "Om sommeren", subj: "vi", verb: "rejser", rest: "til Norge" },
        { front: "Hver mandag", subj: "jeg", verb: "løber", rest: "en tur" },
        { front: "Efter arbejde", subj: "han", verb: "henter", rest: "børnene" },
        { front: "Klokken otte", subj: "toget", verb: "kører", rest: "fra stationen" }
      ],
      render: v => ({
        prompt: "Hvilken sætning er rigtig?",
        correct: `${v.front} ${v.verb} ${v.subj} ${v.rest}.`,
        options: [
          `${v.front} ${v.subj} ${v.verb} ${v.rest}.`,
          `${v.subj} ${v.front} ${v.verb} ${v.rest}.`
        ],
        why: `In a Danish main clause the finite verb is the <b>second element</b>. »${v.front}« fills the first position, so <b>${v.verb}</b> must come next and <i>${v.subj}</i> moves behind it. English lets the subject stay put - <i>Tomorrow Anna takes…</i> - and that habit is what produces the wrong version here.`
      })
    },
    {
      id: "b-pre-place", skill: "PRÆ",
      objective: "Choose the preposition for places",
      variants: [
        { frag: "Anna bor ___ København.", ans: "i", wrong: ["på", "til"],
          note: "Cities and countries take <b>i</b>: i København, i Danmark." },
        { frag: "Jeg er ___ arbejde.", ans: "på", wrong: ["i", "til"],
          note: "Workplaces and institutions take <b>på</b>: på arbejde, på kontoret, på hospitalet." },
        { frag: "Vi skal ___ lægen i morgen.", ans: "til", wrong: ["på", "i"],
          note: "Movement towards a person or service takes <b>til</b>: til lægen, til tandlægen." },
        { frag: "Han venter ___ stationen.", ans: "på", wrong: ["i", "til"],
          note: "Stations, squares and open places take <b>på</b>: på stationen, på torvet." },
        { frag: "Bogen ligger ___ bordet.", ans: "på", wrong: ["i", "ved"],
          note: "Resting on a surface is <b>på</b>. <i>I bordet</i> would mean inside the table." }
      ],
      render: v => ({
        prompt: v.frag,
        correct: v.ans,
        options: v.wrong,
        why: `${v.note} Danish prepositions rarely map one-to-one onto English ones, so learn them inside the phrase rather than as single words.`
      })
    },
    {
      id: "b-boj-plural", skill: "BØJ",
      objective: "Form the plural",
      variants: [
        { sg: "hus", pl: "huse", defPl: "husene", wrong: ["huser", "husene"], n: "to", irr: false },
        { sg: "bil", pl: "biler", defPl: "bilerne", wrong: ["bile", "bilerne"], n: "tre", irr: false },
        { sg: "barn", pl: "børn", defPl: "børnene", wrong: ["barner", "barne"], n: "to", irr: true },
        { sg: "bog", pl: "bøger", defPl: "bøgerne", wrong: ["boger", "bogger"], n: "fire", irr: true },
        { sg: "mand", pl: "mænd", defPl: "mændene", wrong: ["mande", "manner"], n: "to", irr: true }
      ],
      render: v => ({
        prompt: `Jeg har ${v.n} ___ . <em>(${v.sg})</em>`,
        correct: v.pl,
        options: v.wrong,
        why: v.irr
          ? `»${v.sg}« has an irregular plural: <b>${v.pl}</b>. There are only a handful of these in Danish, so they are worth memorising outright rather than looking for a rule. The definite plural is <b>${v.defPl}</b> - a third form again.`
          : `The plural of »${v.sg}« is <b>${v.pl}</b>. Careful: <i>${v.defPl}</i> is the <b>definite</b> plural (‘the ${v.sg}s’). Danish marks that with an ending where English uses a separate word, so one Danish noun has four forms to your two.`
      })
    },
    {
      id: "b-valg-modal", skill: "VALG",
      objective: "Choose the modal verb that carries the intended meaning",
      variants: [
        { frag: "___ du hjælpe mig?", ans: "Kan", wrong: ["Skal", "Må"], gloss: "Are you able to help me?",
          note: "<b>Kan</b> is ability. <i>Skal du hjælpe mig?</i> would ask whether you are obliged to; <i>Må du hjælpe mig?</i> whether you are allowed to." },
        { frag: "Du ___ ikke ryge her.", ans: "må", wrong: ["kan", "skal"], gloss: "It is not permitted.",
          note: "<b>Må ikke</b> is the standard way to say not allowed. <i>Kan ikke</i> would mean you are physically unable to." },
        { frag: "Jeg ___ på arbejde klokken otte.", ans: "skal", wrong: ["kan", "må"], gloss: "That is my fixed arrangement.",
          note: "<b>Skal</b> covers plans and obligations. Danish has no separate future tense, so skal plus a time expression is how you talk about tomorrow." },
        { frag: "___ jeg låne din telefon?", ans: "Må", wrong: ["Skal", "Vil"], gloss: "Asking permission politely.",
          note: "<b>Må jeg…?</b> is the polite request for permission - the equivalent of ‘may I’." }
      ],
      render: v => ({
        prompt: `${v.frag} <em>(${v.gloss})</em>`,
        correct: v.ans,
        options: v.wrong,
        why: v.note
      })
    },
    {
      id: "b-ord-ikke", skill: "ORD",
      objective: "Place ikke correctly in a main clause",
      variants: [
        { subj: "Jeg", verb: "kan", rest: "komme i morgen" },
        { subj: "Han", verb: "vil", rest: "spise fisk" },
        { subj: "Vi", verb: "skal", rest: "arbejde på lørdag" }
      ],
      render: v => ({
        prompt: "Hvilken sætning er rigtig?",
        correct: `${v.subj} ${v.verb} ikke ${v.rest}.`,
        options: [
          `${v.subj} ikke ${v.verb} ${v.rest}.`,
          `${v.subj} ${v.verb} ${v.rest} ikke.`
        ],
        why: `In a main clause <b>ikke</b> goes after the subject and the finite verb: ${v.subj} ${v.verb} <b>ikke</b>… Put it first and you break V2; put it last and it sounds like an afterthought. This changes in subordinate clauses, where ikke moves in front of the verb - that is the next thing to learn after this.`
      })
    }
  ],

  intermediate: [
    {
      id: "i-ord-ledsaetning", skill: "ORD",
      objective: "Subordinate clause word order: subject before ikke, verb after",
      variants: [
        { lead: "Jeg kommer ikke i dag, fordi", s: "jeg", adv: "ikke", v: "kan" },
        { lead: "Hun bliver hjemme, fordi", s: "hun", adv: "ikke", v: "har tid" },
        { lead: "Han siger, at", s: "han", adv: "ikke", v: "forstår det" },
        { lead: "Vi tager toget, fordi", s: "vi", adv: "ikke", v: "har en bil" }
      ],
      render: v => ({
        prompt: `${v.lead} ___ .`,
        correct: `${v.s} ${v.adv} ${v.v}`,
        options: [`${v.s} ${v.v} ${v.adv}`, `${v.adv} ${v.s} ${v.v}`],
        why: `This is the single most common B1 error in Danish. In a <b>ledsætning</b> (subordinate clause) the order flips: subject, then <b>ikke</b>, then the verb - »${v.s} ${v.adv} ${v.v}«. In a main clause you would say »${v.s} ${v.v} ${v.adv}«. Same words, opposite order, and the trigger is the conjunction in front.`
      })
    },
    {
      id: "i-ord-fronted-clause", skill: "ORD",
      objective: "A whole subordinate clause counts as one element",
      variants: [
        { sub: "Når jeg kommer hjem", v: "laver", s: "jeg", rest: "aftensmad" },
        { sub: "Hvis det regner", v: "bliver", s: "vi", rest: "hjemme" },
        { sub: "Da han var barn", v: "boede", s: "han", rest: "i Aarhus" },
        { sub: "Fordi bussen var forsinket", v: "kom", s: "jeg", rest: "for sent" }
      ],
      render: v => ({
        prompt: "Hvilken sætning er rigtig?",
        correct: `${v.sub}, ${v.v} ${v.s} ${v.rest}.`,
        options: [
          `${v.sub}, ${v.s} ${v.v} ${v.rest}.`,
          `${v.sub}, ${v.rest} ${v.v} ${v.s}.`
        ],
        why: `The whole clause »${v.sub}« fills the first position on its own - however many words it contains, it is <b>one element</b>. So the finite verb <b>${v.v}</b> comes immediately after the comma, and the subject <i>${v.s}</i> follows it. This is the hardest form of inversion and the one worth drilling most.`
      })
    },
    {
      id: "i-tid-fornutid", skill: "TID",
      objective: "Choose har or er in the present perfect",
      variants: [
        { frag: "Hun ___ lige kommet hjem.", ans: "er", wrong: ["har", "havde"], move: true },
        { frag: "Toget ___ allerede kørt.", ans: "er", wrong: ["har", "havde"], move: true },
        { frag: "Han ___ lige spist frokost.", ans: "har", wrong: ["er", "var"], move: false },
        { frag: "Vi ___ boet her i ti år.", ans: "har", wrong: ["er", "var"], move: false },
        { frag: "Bussen ___ gået nu.", ans: "er", wrong: ["har", "havde"], move: true }
      ],
      render: v => ({
        prompt: v.frag,
        correct: v.ans,
        options: v.wrong,
        why: v.move
          ? `Verbs of <b>movement or change of state</b> take <b>er</b> in the perfect: er kommet, er gået, er rejst, er blevet. English uses ‘have’ for everything, which is exactly why this one keeps slipping.`
          : `This verb describes an activity rather than movement or a change of state, so it takes <b>har</b>. Compare: <i>han er gået</i> (he has left) against <i>han har gået</i> (he has been walking) - the auxiliary changes the meaning, not just the grammar.`
      })
    },
    {
      id: "i-pre-time", skill: "PRÆ",
      objective: "Prepositions of time",
      variants: [
        { frag: "Han har boet i Aarhus ___ 2022.", ans: "siden", wrong: ["i", "fra"],
          note: "<b>Siden</b> marks a starting point that continues up to now, and it pairs with the perfect tense." },
        { frag: "Vi ses ___ en uge.", ans: "om", wrong: ["i", "på"],
          note: "<b>Om</b> plus a period means ‘in a week’s time’, pointing forward." },
        { frag: "Jeg var i Spanien ___ en uge.", ans: "i", wrong: ["om", "på"],
          note: "<b>I</b> plus a period measures how long something lasted." },
        { frag: "Mødet er ___ torsdag.", ans: "på", wrong: ["i", "om"],
          note: "<b>På</b> plus a weekday means the coming one. <i>Om torsdagen</i> would mean every Thursday." },
        { frag: "Jeg står tidligt op ___ morgenen.", ans: "om", wrong: ["i", "på"],
          note: "<b>Om morgenen</b> means in the mornings, habitually. <i>I morgen</i> is a different phrase entirely - it means tomorrow." }
      ],
      render: v => ({ prompt: v.frag, correct: v.ans, options: v.wrong, why: v.note })
    },
    {
      id: "i-valg-connector", skill: "VALG",
      objective: "Choose the connector that carries the intended logic",
      variants: [
        { frag: "Vi blev hjemme, ___ det regnede.", ans: "fordi", wrong: ["selvom", "derfor"],
          gloss: "the rain was the reason",
          note: "<b>Fordi</b> gives the cause. <i>Selvom</i> would reverse the meaning to ‘even though it was raining’, and <i>derfor</i> cannot introduce a subordinate clause at all." },
        { frag: "Han gik en tur, ___ det regnede.", ans: "selvom", wrong: ["fordi", "derfor"],
          gloss: "the rain did not stop him",
          note: "<b>Selvom</b> concedes: the rain was an obstacle he ignored. Getting fordi and selvom the wrong way round inverts what you meant to say." },
        { frag: "Det regnede. ___ blev vi hjemme.", ans: "Derfor", wrong: ["Fordi", "Selvom"],
          gloss: "a new sentence drawing the conclusion",
          note: "<b>Derfor</b> starts a new main clause, and because it fills the first position the verb follows it: <i>Derfor blev vi…</i> Note the inversion." },
        { frag: "Jeg ringer, ___ jeg er fremme.", ans: "når", wrong: ["da", "hvis"],
          gloss: "every time / whenever I arrive",
          note: "<b>Når</b> is for repeated or future events. <i>Da</i> is for one completed event in the past - that split does not exist in English ‘when’, which is why it is a reliable trap." }
      ],
      render: v => ({
        prompt: `${v.frag} <em>(${v.gloss})</em>`,
        correct: v.ans, options: v.wrong, why: v.note
      })
    },
    {
      id: "i-boj-sin", skill: "BØJ",
      objective: "sin/sit/sine versus hans/hendes",
      variants: [
        { frag: "Peter tog ___ jakke og gik.", ans: "sin", wrong: ["hans", "sit"],
          gloss: "his own jacket", own: true, gender: "en" },
        { frag: "Anna glemte ___ tørklæde.", ans: "sit", wrong: ["hendes", "sin"],
          gloss: "her own scarf, an et-word", own: true, gender: "et" },
        { frag: "Peter mødte Anna og kørte ___ bil.", ans: "hendes", wrong: ["sin", "sit"],
          gloss: "Anna’s car, not his own", own: false, gender: "en" },
        { frag: "Hun ringede til ___ forældre.", ans: "sine", wrong: ["hendes", "sin"],
          gloss: "her own parents, plural", own: true, gender: "pl" }
      ],
      render: v => ({
        prompt: `${v.frag} <em>(${v.gloss})</em>`,
        correct: v.ans,
        options: v.wrong,
        why: v.own
          ? `<b>Sin / sit / sine</b> point back to the subject of the same clause - the thing belongs to the person doing the verb. Then the form agrees with the noun: sin with en-words, <b>sit</b> with et-words, <b>sine</b> with plurals. English has no equivalent, so this has to be built from scratch.`
          : `Here the owner is <b>not</b> the subject, so you need <b>hendes</b> (or hans). Swap it for <i>sin</i> and a Danish listener understands that Peter drove his own car - a real change of meaning, not a small slip.`
      })
    },
    {
      id: "i-ord-adverbial", skill: "ORD",
      objective: "Place central adverbials in a main clause",
      variants: [
        { s: "Han", v: "har", adv: "aldrig", rest: "været i Jylland" },
        { s: "Jeg", v: "kan", adv: "altid", rest: "hjælpe om fredagen" },
        { s: "Vi", v: "har", adv: "kun", rest: "mødtes én gang" }
      ],
      render: v => ({
        prompt: "Hvilken sætning er rigtig?",
        correct: `${v.s} ${v.v} ${v.adv} ${v.rest}.`,
        options: [
          `${v.s} ${v.adv} ${v.v} ${v.rest}.`,
          `${v.s} ${v.v} ${v.rest} ${v.adv}.`
        ],
        why: `Adverbs like <b>${v.adv}</b>, aldrig, altid, ofte and kun sit in the same slot as ikke: after the subject and the finite verb. Learn the slot once and it covers all of them, instead of memorising each adverb separately.`
      })
    },
    {
      id: "i-tid-infinitive", skill: "TID",
      objective: "Bare infinitive after a modal verb",
      variants: [
        { frag: "Jeg skal ___ hjem nu.", ans: "gå", wrong: ["går", "gået"] },
        { frag: "Kan du ___ mig i morgen?", ans: "hjælpe", wrong: ["hjælper", "hjulpet"] },
        { frag: "Vi vil gerne ___ en aftale.", ans: "lave", wrong: ["laver", "lavet"] },
        { frag: "Du må ___ her, hvis du vil.", ans: "blive", wrong: ["bliver", "blevet"] }
      ],
      render: v => ({
        prompt: v.frag,
        correct: v.ans,
        options: v.wrong,
        why: `After a modal verb (skal, kan, vil, må, bør) Danish uses the <b>bare infinitive</b> with no <i>at</i>: skal <b>${v.ans}</b>, not skal at ${v.ans} and not skal ${v.wrong[0]}. English does the same thing - ‘I can help’, not ‘I can to help’ - so this one is easier than it looks once you notice the parallel.`
      })
    }
  ],

  advanced: [
    {
      id: "a-valg-contrast", skill: "VALG",
      objective: "Formal contrastive connectors",
      variants: [
        { frag: "Forslaget er relevant; ___ kræver det mere dokumentation.", ans: "alligevel", wrong: ["fordi", "derfor"],
          note: "<b>Alligevel</b> concedes the first point and then qualifies it. Note that it fills the first position, so the verb follows immediately: <i>alligevel kræver det…</i>" },
        { frag: "Tiltaget kan forbedre forholdene; ___ skal effekten vurderes løbende.", ans: "imidlertid", wrong: ["derfor", "fordi"],
          note: "<b>Imidlertid</b> is the formal register’s ‘however’. In speech you would more often hear <i>men</i> or <i>dog</i> - choosing imidlertid in a casual conversation sounds stilted." },
        { frag: "Analysen er grundig; ___ mangler den et internationalt perspektiv.", ans: "dog", wrong: ["desuden", "derfor"],
          note: "<b>Dog</b> is a lighter ‘however’ that works in both writing and speech. <i>Desuden</i> would add a further point rather than qualify the one before it." }
      ],
      render: v => ({ prompt: v.frag, correct: v.ans, options: v.wrong, why: v.note })
    },
    {
      id: "a-pre-collocation", skill: "PRÆ",
      objective: "Fixed verb + preposition collocations",
      variants: [
        { frag: "Rapporten peger ___, at løsningen skal tilpasses lokalt.", ans: "på", wrong: ["i", "til"],
          note: "The fixed expression is <b>at pege på</b> - to point to. The preposition belongs to the verb and cannot be worked out from the English." },
        { frag: "Vi skal tage stilling ___ forslaget inden fredag.", ans: "til", wrong: ["på", "om"],
          note: "<b>At tage stilling til</b> - to take a position on. Danish has ‘til’ where English has ‘on’." },
        { frag: "Beslutningen afhænger ___ budgettet.", ans: "af", wrong: ["på", "fra"],
          note: "<b>At afhænge af</b> - to depend on. English ‘on’ misleads you towards <i>på</i> here, and that is precisely the trap." },
        { frag: "Hun deltog ___ mødet i mandags.", ans: "i", wrong: ["på", "til"],
          note: "<b>At deltage i</b> - to take part in. Note that <i>på mødet</i> is fine after other verbs (<i>på mødet sagde hun…</i>), so the preposition follows the verb, not the noun." }
      ],
      render: v => ({ prompt: v.frag, correct: v.ans, options: v.wrong, why: v.note })
    },
    {
      id: "a-valg-om", skill: "VALG",
      objective: "Indirect questions with om",
      variants: [
        { frag: "Kommunen vil undersøge, ___ forslaget virker i praksis.", ans: "om", wrong: ["at", "fordi"] },
        { frag: "Jeg ved ikke, ___ han kommer i morgen.", ans: "om", wrong: ["at", "hvis"] },
        { frag: "Hun spurgte, ___ vi havde tid.", ans: "om", wrong: ["at", "hvis"] }
      ],
      render: v => ({
        prompt: v.frag,
        correct: v.ans,
        options: v.wrong,
        why: `<b>Om</b> introduces an indirect yes/no question - ‘whether’. The trap for English speakers is <i>hvis</i>, because English uses ‘if’ for both conditions and indirect questions. Danish keeps them apart: <i>hvis</i> is only ever a condition.`
      })
    },
    {
      id: "a-tid-passiv", skill: "TID",
      objective: "Choose between the blive-passive and the s-passive",
      variants: [
        { frag: "Beslutningen ___ truffet af bestyrelsen i går.", ans: "blev", wrong: ["var", "havde"],
          note: "<b>Blev</b> + past participle describes the event happening at a point in time. <i>Var truffet</i> would describe a state that already existed before something else." },
        { frag: "Rapporten ___ offentliggjort i sidste uge.", ans: "blev", wrong: ["var", "har"],
          note: "The act of publishing happened at a specific past moment, so <b>blev</b>. Danish uses this construction far more than English uses ‘was being’." },
        { frag: "Døren ___ åbnet, da vi ankom.", ans: "var", wrong: ["blev", "havde"],
          note: "Here the door was <b>already</b> open when you arrived - a state, not an event - so <b>var</b>. Swap in <i>blev</i> and it means the door opened at the moment you arrived." }
      ],
      render: v => ({ prompt: v.frag, correct: v.ans, options: v.wrong, why: v.note })
    },
    {
      id: "a-ord-ledsaetning", skill: "ORD",
      objective: "Adverbial placement inside a subordinate clause",
      variants: [
        { lead: "Han forklarede, at han", adv: "ikke", v: "havde nået det" },
        { lead: "Det fremgår, at kommunen", adv: "endnu ikke", v: "har besluttet noget" },
        { lead: "Hun nævnte, at hun", adv: "aldrig", v: "havde hørt om sagen" }
      ],
      render: v => ({
        prompt: `${v.lead} ___ .`,
        correct: `${v.adv} ${v.v}`,
        options: [
          `${v.v.split(" ")[0]} ${v.adv} ${v.v.split(" ").slice(1).join(" ")}`,
          `${v.v} ${v.adv}`
        ],
        why: `Inside a subordinate clause the adverbial comes <b>before</b> the verb: at han <b>${v.adv} ${v.v}</b>. In a main clause it would come after. At this level the rule is usually known and still breaks under pressure, which is why it stays in rotation.`
      })
    },
    {
      id: "a-reg-formality", skill: "REG",
      objective: "Match register to context",
      variants: [
        { frag: "En formel e-mail til en myndighed begynder bedst med:", ans: "Kære Anne Jensen", wrong: ["Hejsa", "Yo Anne"],
          note: "<b>Kære</b> plus full name is the standard formal opening. Danish workplaces are informal by international standards - <i>Hej Anne</i> is fine with colleagues - but an authority or an unknown recipient still takes Kære." },
        { frag: "Du afslutter en formel ansøgning med:", ans: "Med venlig hilsen", wrong: ["Vi ses", "Knus"],
          note: "<b>Med venlig hilsen</b> is the default formal close, often abbreviated <i>Mvh</i> in ordinary work email. <i>Knus</i> means hugs and belongs to friends and family only." },
        { frag: "Til en kollega du kender godt, skriver du:", ans: "Hej Mads", wrong: ["Kære Hr. Mads Nielsen", "Til rette vedkommende"],
          note: "Over-formality reads as distant or sarcastic in a Danish office. <i>Til rette vedkommende</i> (‘to whom it may concern’) is for letters with no known recipient." }
      ],
      render: v => ({ prompt: v.frag, correct: v.ans, options: v.wrong, why: v.note })
    },
    {
      id: "a-valg-collocation", skill: "VALG",
      objective: "Verb + noun collocations in professional Danish",
      variants: [
        { frag: "Vi skal ___ fristen på fredag.", ans: "overholde", wrong: ["holde", "følge"],
          note: "<b>At overholde en frist</b> - to meet a deadline. <i>Holde</i> alone means hold, and <i>følge</i> means follow." },
        { frag: "Bestyrelsen skal ___ en beslutning inden årets udgang.", ans: "træffe", wrong: ["gøre", "gribe"],
          note: "<b>At træffe en beslutning</b> is the formal collocation; <i>tage en beslutning</i> is the everyday one. Both are correct Danish, but <i>gøre</i> and <i>gribe</i> are not used with beslutning at all." },
        { frag: "Må jeg ___ et forslag?", ans: "komme med", wrong: ["give", "lave"],
          note: "<b>At komme med et forslag</b> - to make a suggestion. Danish uses ‘come with’ where English uses ‘make’, which is invisible unless you learn the phrase whole." }
      ],
      render: v => ({ prompt: v.frag, correct: v.ans, options: v.wrong, why: v.note })
    }
  ]
};

/* ------------------------------------------------------------------ *
 * Placement check - a real graded assessment, one item per level band,
 * ordered easy to hard. Scored by how far up the learner gets.
 * ------------------------------------------------------------------ */

const PLACEMENT = [
  { band: "beginner", prompt: "Jeg ___ fra Indien.", correct: "kommer", options: ["komme", "kom"],
    why: "Present tense, first person. ‘Jeg kommer fra …’ is the standard way to say where you are from." },
  { band: "beginner", prompt: "en eller et? &nbsp; ___ hus", correct: "et", options: ["en"],
    why: "‘Hus’ is a neuter (intetkøn) noun." },
  { band: "beginner", prompt: "Hvilken sætning er rigtig?", correct: "I morgen tager jeg på arbejde.",
    options: ["I morgen jeg tager på arbejde.", "Jeg i morgen tager på arbejde."],
    why: "The verb is the second element, so the subject moves behind it after a fronted time expression." },
  { band: "intermediate", prompt: "Hun ___ lige kommet hjem.", correct: "er", options: ["har", "havde"],
    why: "Verbs of movement take ‘er’ in the perfect." },
  { band: "intermediate", prompt: "Jeg kommer ikke, fordi ___ .", correct: "jeg ikke kan",
    options: ["jeg kan ikke", "kan jeg ikke"],
    why: "In a subordinate clause the adverbial comes before the verb." },
  { band: "intermediate", prompt: "Peter tog ___ jakke og gik. (his own)", correct: "sin", options: ["hans", "sit"],
    why: "‘Sin’ refers back to the subject of the same clause; ‘jakke’ is an en-word." },
  { band: "advanced", prompt: "Beslutningen ___ truffet af bestyrelsen i går.", correct: "blev", options: ["var", "havde"],
    why: "The blive-passive describes the event occurring at a point in time." },
  { band: "advanced", prompt: "Kommunen vil undersøge, ___ forslaget virker i praksis.", correct: "om",
    options: ["at", "hvis"],
    why: "‘Om’ introduces an indirect yes/no question; ‘hvis’ is only ever a condition." },
  { band: "advanced", prompt: "Forslaget er relevant; ___ kræver det mere dokumentation.", correct: "alligevel",
    options: ["fordi", "derfor"],
    why: "‘Alligevel’ concedes the first clause and qualifies it." }
];

/* ------------------------------------------------------------------ *
 * Reading, writing and listening - original DanskPath material.
 * ------------------------------------------------------------------ */

const READINGS = {
  beginner: [
    { title: "En besked fra Maja",
      text: "Hej Ali. Jeg kommer lidt sent i dag. Bussen kører ikke klokken otte, så jeg tager toget. Kan du købe kaffe til mig? Vi mødes ved stationen klokken ni. Hilsen Maja.",
      qs: [
        ["Hvor mødes Ali og Maja?", ["Ved stationen", "På arbejde", "I bussen"], 0],
        ["Hvorfor kommer Maja sent?", ["Bussen kører ikke", "Hun arbejder hjemme", "Hun nåede ikke toget"], 0]
      ] },
    { title: "På biblioteket",
      text: "Lars går på biblioteket efter arbejde. Han vil låne en bog på dansk. Bibliotekaren hjælper ham med at finde en let bog om København. Lars skal aflevere bogen igen om tre uger.",
      qs: [
        ["Hvorfor går Lars på biblioteket?", ["For at låne en bog", "For at købe kaffe", "For at møde sin lærer"], 0],
        ["Hvornår skal bogen afleveres?", ["Om tre uger", "I morgen", "Efter arbejde"], 0]
      ] },
    { title: "En tid hos lægen",
      text: "Amira ringer til lægen mandag morgen. Hun har ondt i halsen og er træt. Sekretæren siger, at der er en ledig tid onsdag klokken kvart over ti. Amira spørger, om hun skal tage noget med. Sekretæren siger, at hun kun skal huske sit sundhedskort.",
      qs: [
        ["Hvornår har Amira tid hos lægen?", ["Onsdag klokken kvart over ti", "Mandag morgen", "Torsdag eftermiddag"], 0],
        ["Hvad skal hun huske?", ["Sit sundhedskort", "En bog", "Sin cykel"], 0],
        ["Hvad fejler Amira?", ["Hun har ondt i halsen", "Hun har brækket armen", "Hun har tandpine"], 0]
      ] },
    { title: "Den nye lejlighed",
      text: "Jonas og Rikke flytter til en ny lejlighed i næste måned. Lejligheden ligger tæt på en skole og et supermarked. Der er tre værelser, et lille køkken og en altan. Huslejen er lidt højere end før, men de sparer penge på transport, fordi Jonas kan cykle på arbejde.",
      qs: [
        ["Hvorfor sparer de penge?", ["Jonas kan cykle på arbejde", "Huslejen er lavere", "De har ikke noget køkken"], 0],
        ["Hvad ligger tæt på lejligheden?", ["En skole og et supermarked", "En station og en park", "Et hospital"], 0],
        ["Hvornår flytter de?", ["I næste måned", "I denne uge", "Til sommer"], 0]
      ] }
  ],
  intermediate: [
    { title: "En ny løsning på kontoret",
      text: "På Sofies arbejdsplads arbejder flere medarbejdere hjemme to dage om ugen. I begyndelsen var nogle bekymrede for samarbejdet. Efter tre måneder viser en intern undersøgelse dog, at de fleste oplever mere ro til opgaver, der kræver koncentration. Teamet mødes stadig fysisk hver tirsdag, fordi de sværeste beslutninger træffes bedst ansigt til ansigt.",
      qs: [
        ["Hvad viser undersøgelsen?", ["At de fleste får mere ro til koncentration", "At alle vil arbejde hjemme hver dag", "At tirsdagsmøderne er stoppet"], 0],
        ["Hvorfor mødes teamet om tirsdagen?", ["Svære beslutninger træffes bedst ansigt til ansigt", "Kontoret er kun åbent tirsdag", "De skal teste internettet"], 0]
      ] },
    { title: "Nabolagets fælles have",
      text: "En gruppe beboere har lavet en fælles have mellem to boligblokke. Ideen opstod, fordi området manglede et sted, hvor naboer kunne mødes uformelt. Beboerne dyrker urter og grøntsager, men haven bruges også til små arrangementer. Kommunen har støttet projektet med redskaber, mens beboerne selv planlægger arbejdet.",
      qs: [
        ["Hvad var den vigtigste grund til haven?", ["At skabe et uformelt mødested", "At bygge nye boliger", "At sælge grøntsager"], 0],
        ["Hvem planlægger arbejdet?", ["Beboerne selv", "Kommunen alene", "En privat virksomhed"], 0]
      ] },
    { title: "Praktik på plejehjemmet",
      text: "Samir er i praktik på et plejehjem tre dage om ugen. I begyndelsen var det svært at forstå de ældre beboere, fordi mange taler hurtigt og utydeligt. Hans vejleder foreslog, at han skulle spørge igen i stedet for at nikke. Efter en måned oplever Samir, at han forstår mere, og at beboerne gerne gentager, når han beder om det.",
      qs: [
        ["Hvad var svært i begyndelsen?", ["At forstå beboerne", "At finde vej til arbejdet", "At møde til tiden"], 0],
        ["Hvad foreslog vejlederen?", ["At han skulle spørge igen", "At han skulle nikke mere", "At han skulle tale engelsk"], 0],
        ["Hvad sker der efter en måned?", ["Han forstår mere", "Han stopper i praktikken", "Beboerne taler langsommere end før"], 0]
      ] },
    { title: "Cykel eller bus?",
      text: "Mange pendlere står hver morgen med det samme valg. Bussen er behagelig i regnvejr, men den holder ofte i kø, og månedskortet koster penge. Cyklen er gratis og tager som regel lige så lang tid, men den kræver, at man har tøj med på arbejdet. Nogle vælger derfor en blandet løsning: cykel om sommeren og bus om vinteren.",
      qs: [
        ["Hvad kræver cyklen ifølge teksten?", ["At man har tøj med på arbejdet", "At man køber et månedskort", "At man står tidligere op"], 0],
        ["Hvad er ulempen ved bussen?", ["Den holder ofte i kø", "Den kører ikke om vinteren", "Den er altid forsinket"], 0],
        ["Hvad er den blandede løsning?", ["Cykel om sommeren og bus om vinteren", "Bil hele året", "Bus to gange om dagen"], 0]
      ] }
  ],
  advanced: [
    { title: "Når teknologi skal frigøre tid",
      text: "Digitale løsninger bliver ofte præsenteret som en enkel vej til mere effektiv offentlig service. Alligevel afhænger gevinsten ikke kun af teknologien selv, men af, om arbejdsgange og ansvar ændres samtidig. Hvis et nyt system blot lægges oven på gamle rutiner, kan resultatet blive flere klik frem for færre. Den væsentlige opgave er derfor ikke alene at vælge den rigtige platform, men at undersøge, hvilke problemer løsningen faktisk skal fjerne.",
      qs: [
        ["Hvad er tekstens hovedpointe?", ["Teknologi virker bedst sammen med ændrede arbejdsgange", "Nye systemer bør undgås i offentlig service", "Flere klik gør altid arbejdet mere præcist"], 0],
        ["Hvad antyder ‘oven på gamle rutiner’?", ["At teknologien kan skabe ekstra arbejde", "At platformen er fysisk placeret højt", "At gamle rutiner altid er bedre"], 0]
      ] },
    { title: "En mere nuanceret debat om transport",
      text: "Debatten om transport reduceres ofte til et valg mellem bilen og cyklen. Den modsætning overser imidlertid, at mulighederne er meget forskellige i byer og mindre lokalsamfund. En holdbar politik må derfor både forbedre den kollektive trafik, skabe sikre cykelruter og anerkende, at nogle borgere fortsat er afhængige af bilen. Målet bør ikke være at pege på én korrekt adfærd, men at gøre de bæredygtige valg realistiske i hverdagen.",
      qs: [
        ["Hvilken tilgang argumenterer teksten for?", ["Flere realistiske transportmuligheder", "Kun cykler i hele landet", "Mindre kollektiv trafik"], 0],
        ["Hvad betyder ‘reduceres ofte til’?", ["Gøres for enkelt", "Bliver dyrere", "Forklares mere detaljeret"], 0]
      ] },
    { title: "Hvorfor tager det tid at lære dansk?",
      text: "Mange kursister undrer sig over, at de kan læse en avisartikel, men ikke forstå en samtale i frokoststuen. Forklaringen er sjældent manglende ordforråd. Talt dansk udelader lyde og hele stavelser, og de ord, man kender fra papiret, lyder pludselig helt anderledes. Derfor hjælper det kun delvist at læse mere. Det, der rykker, er at lytte til det samme stykke to gange: første gang for helheden, anden gang for detaljen.",
      qs: [
        ["Hvad er hovedforklaringen på problemet?", ["Talt dansk lyder anderledes end skrevet dansk", "Kursisterne kan for få ord", "Aviserne skriver for svært"], 0],
        ["Hvad anbefaler teksten?", ["At lytte til det samme to gange", "At læse flere aviser", "Kun at tale engelsk i frokoststuen"], 0],
        ["Hvorfor hjælper det kun delvist at læse mere?", ["Fordi talt dansk lyder anderledes end skrevet dansk", "Fordi aviserne skriver for svært", "Fordi man glemmer ordene igen"], 0]
      ] },
    { title: "Fleksibel arbejdstid har også en pris",
      text: "Fleksibel arbejdstid bliver ofte fremhævet som et gode, og for mange er den det. Når man selv kan lægge sin dag, bliver det lettere at hente børn eller undgå myldretiden. Samtidig viser erfaringen, at grænsen mellem arbejde og fritid kan blive utydelig, når arbejdet altid ligger inden for rækkevidde. Fordelen forudsætter derfor, at man selv sætter et tidspunkt, hvor dagen slutter - og at arbejdspladsen respekterer det.",
      qs: [
        ["Hvad er tekstens forbehold?", ["Grænsen mellem arbejde og fritid kan blive utydelig", "Fleksibel arbejdstid gavner ingen", "Myldretiden bliver værre"], 0],
        ["Hvad forudsætter fordelen?", ["At man selv sætter et sluttidspunkt", "At man arbejder om aftenen", "At chefen lægger planen"], 0],
        ["Hvad betyder det, at arbejdet altid er inden for rækkevidde?", ["Man kan altid nå det, også i fritiden", "Man kan kun nå det på kontoret", "Det ligger tæt på hjemmet"], 0]
      ] }
  ]
};

const WRITING = {
  beginner: {
    title: "Skriv en venlig besked",
    prompt: "Din ven venter på dig. Skriv 3–4 korte sætninger: sig at du kommer sent, forklar hvorfor, og foreslå et nyt tidspunkt.",
    help: ["Hej …", "Jeg kommer …", "fordi …", "Vi ses klokken …"],
    minWords: 15,
    checks: [
      { test: t => /\bfordi\b/i.test(t), ok: "You used <b>fordi</b> to give a reason - check that the clause after it puts the subject before ikke.", miss: "Try adding a reason with <b>fordi</b>. It is the single most useful connector at this level." },
      { test: t => /\bklokken\b/i.test(t), ok: "Good - you proposed a specific time with <b>klokken</b>.", miss: "Suggest a concrete time using <b>klokken</b>, e.g. <i>Vi ses klokken seks</i>." }
    ]
  },
  intermediate: {
    title: "Skriv til din arbejdsplads",
    prompt: "Skriv en kort e-mail på 70–100 ord. Du vil gerne arbejde hjemme én dag om ugen. Forklar din grund og foreslå, hvordan du stadig samarbejder med teamet.",
    help: ["Kære …", "Jeg vil gerne foreslå …", "fordi …", "Derfor kan jeg …", "Venlig hilsen"],
    minWords: 50,
    checks: [
      { test: t => /^(kære|hej)/i.test(t.trim()), ok: "You opened with a greeting, which a Danish work email expects.", miss: "Open with <b>Kære</b> or <b>Hej</b> plus a name - a Danish work email without a greeting reads as abrupt." },
      { test: t => /(venlig hilsen|mvh|hilsen)/i.test(t), ok: "You closed properly with a hilsen.", miss: "Close with <b>Venlig hilsen</b> and your name." },
      { test: t => /\b(fordi|derfor|desuden|men)\b/i.test(t), ok: "You connected your reasoning with a connector rather than stacking short sentences.", miss: "Link your reasoning with <b>fordi</b>, <b>derfor</b> or <b>desuden</b> - at B1 this is what turns sentences into an argument." },
      { test: t => t.split(/[.!?]+/).some(s => /^\s*(i morgen|i dag|hver uge|om ugen|om morgenen|derfor|desuden|alligevel|når|hvis|da|efter|fordi)\b/i.test(s)),
        ok: "At least one sentence opens with something other than the subject - now check the verb sits immediately after it.",
        miss: "Open one sentence with a time expression, <b>derfor</b>, or a subordinate clause (<i>Når jeg …</i>), then check the verb comes straight after it. That is the V2 reflex, and it only builds under this kind of constraint." }
    ]
  },
  advanced: {
    title: "Skriv et nuanceret svar",
    prompt: "Skriv 120–160 ord om, hvordan en kommune kan gøre bæredygtig transport mere realistisk. Præsenter mindst to perspektiver og afslut med din anbefaling.",
    help: ["På den ene side …", "På den anden side …", "Desuden …", "Alligevel …", "Jeg anbefaler derfor …"],
    minWords: 90,
    checks: [
      { test: t => /(på den ene side|på den anden side|omvendt)/i.test(t), ok: "You framed two perspectives explicitly.", miss: "Signpost the two perspectives with <b>På den ene side … På den anden side …</b>" },
      { test: t => /(alligevel|imidlertid|dog)/i.test(t), ok: "You used a formal contrastive connector.", miss: "Add a qualifying contrast with <b>alligevel</b>, <b>imidlertid</b> or <b>dog</b> - at B2 these carry the argument." },
      { test: t => /(anbefaler|bør|foreslår)/i.test(t), ok: "You closed with a clear recommendation.", miss: "Finish with a recommendation - <b>Jeg anbefaler …</b> or <b>Kommunen bør …</b>" }
    ]
  }
};

const LISTENS = {
  // Spoken first, written second: the transcript is a check, not the exercise.
  // Themes follow DU3 Modul 3 - familie, transport, arbejde, sundhed, bolig.
  beginner: [
    { title: "En plan for i morgen",
      text: "Hej Sara. I morgen skal jeg på danskkursus klokken ti. Bagefter køber jeg ind, og om aftenen laver jeg mad hjemme. Vil du komme klokken seks?",
      qs: [
        ["Hvornår er danskkurset?", ["Klokken ti", "Klokken seks", "Om aftenen"], 0],
        ["Hvad gør personen bagefter?", ["Køber ind", "Går på arbejde", "Tager på ferie"], 0]
      ] },
    { title: "Toget er forsinket",
      text: "Der er en besked til passagerer mod Odense. Toget klokken syv er forsinket cirka tyve minutter. Vi beklager meget. Passagerer, der skal videre med bus, kan bruge den samme billet senere på dagen.",
      qs: [
        ["Hvor længe er toget forsinket?", ["Cirka tyve minutter", "Cirka en time", "Cirka fem minutter"], 0],
        ["Hvad gælder for passagerer med bus?", ["De kan bruge den samme billet senere", "De skal købe en ny billet", "De får pengene tilbage"], 0]
      ] },
    { title: "Min familie",
      text: "Jeg hedder Nadia, og jeg bor i Aarhus med min mand og to børn. Min datter går i skole, og min søn går i børnehave. Om lørdagen besøger vi tit min svigermor. Hun bor kun ti minutter væk, så vi går derhen.",
      qs: [
        ["Hvem bor Nadia sammen med?", ["Sin mand og to børn", "Sin svigermor", "Sin søster"], 0],
        ["Hvornår besøger de svigermoren?", ["Om lørdagen", "Hver dag", "Om søndagen"], 0]
      ] }
  ],
  intermediate: [
    { title: "En besked om mødet",
      text: "Hej alle. Vi flytter mødet fra torsdag til fredag, fordi flere kolleger skal besøge en kunde. Send gerne jeres punkter inden torsdag eftermiddag, så jeg kan lave en ny dagsorden. Mødet starter stadig klokken ni og foregår i lokale tre.",
      qs: [
        ["Hvorfor flyttes mødet?", ["Flere kolleger besøger en kunde", "Lokale tre er lukket", "Mødet varer for længe"], 0],
        ["Hvad skal deltagerne sende?", ["Punkter til dagsordenen", "En ny kunde", "En invitation"], 0]
      ] },
    { title: "Hos lægen",
      text: "Du har hostet i næsten tre uger nu, og det er længere end normalt. Jeg tror ikke, det er noget alvorligt, men vi tager en blodprøve for en sikkerheds skyld. Du får svar om et par dage. Hvis du får feber i mellemtiden, skal du ringe med det samme.",
      qs: [
        ["Hvad foreslår lægen?", ["En blodprøve", "En operation", "En uges ferie"], 0],
        ["Hvornår skal patienten ringe?", ["Hvis der kommer feber", "Hvis hosten stopper", "Om tre uger"], 0],
        ["Hvor længe har patienten hostet?", ["Næsten tre uger", "To dage", "Et par måneder"], 0]
      ] },
    { title: "En besked fra udlejeren",
      text: "Hej. Det er Peter fra udlejningen. Håndværkerne kommer på tirsdag mellem ni og tolv for at skifte vinduet i stuen. Du behøver ikke at være hjemme, hvis du lægger nøglen i postkassen. Ellers kan vi finde en anden dag, men så bliver det først i næste måned.",
      qs: [
        ["Hvad skal håndværkerne lave?", ["Skifte vinduet i stuen", "Male køkkenet", "Reparere døren"], 0],
        ["Hvad sker der, hvis dagen ikke passer?", ["Så bliver det først i næste måned", "Så kommer de alligevel", "Så koster det ekstra"], 0],
        ["Hvad skal man gøre, hvis man ikke er hjemme?", ["Lægge nøglen i postkassen", "Ringe til kommunen", "Lade døren stå åben"], 0]
      ] }
  ],
  advanced: [
    { title: "Kort podcast: byens fælles rum",
      text: "Mange byer investerer i parker og pladser, men kvaliteten afhænger ikke kun af arkitektur. Et fælles rum bliver først levende, når forskellige mennesker føler, at de kan bruge det på hver deres måde. Derfor bør planlægningen ikke afsluttes, når pladsen åbner. Den bør fortsætte som en samtale med dem, der faktisk opholder sig der.",
      qs: [
        ["Hvad er hovedargumentet?", ["Planlægningen bør fortsætte i dialog med brugerne", "Arkitektur er uden betydning", "Parker skal kun bruges til sport"], 0],
        ["Hvornår bliver et fælles rum levende ifølge teksten?", ["Når forskellige mennesker kan bruge det på hver deres måde", "Når arkitekturen er gennemtænkt", "Når kommunen har betalt for det"], 0]
      ] },
    { title: "Kort podcast: sproget på arbejdspladsen",
      text: "Et spørgsmål, vi får igen og igen, er, hvorfor kolleger skifter til engelsk, så snart man tøver. Det er sjældent ond vilje. De fleste danskere tror, de hjælper. Problemet er, at hjælpen fjerner præcis den øvelse, man har brug for. Et par sætninger sagt på forhånd flytter meget: Sig, at du gerne vil blive på dansk, og bed om at få det gentaget i stedet for oversat.",
      qs: [
        ["Hvorfor skifter kollegerne til engelsk?", ["De tror, de hjælper", "De vil ikke tale med en", "De kan ikke lide dansk"], 0],
        ["Hvad anbefales der?", ["At sige på forhånd, at man vil blive på dansk", "At tale engelsk med det samme", "At undgå frokoststuen"], 0],
        ["Hvad skal man bede om?", ["At få det gentaget", "At få det oversat", "At få det skrevet ned"], 0]
      ] },
    { title: "Kort podcast: Hvorfor prøver vi igen?",
      text: "Når man har læst en tekst én gang, føles den bekendt, og følelsen af genkendelse forveksles nemt med at kunne den. Men genkendelse og gengivelse er to forskellige ting. Det, der faktisk flytter noget, er at lukke bogen og forsøge at huske. Det er ubehageligt, fordi man opdager, hvor lidt der sidder fast - og netop derfor virker det.",
      qs: [
        ["Hvad forveksles let?", ["Genkendelse og gengivelse", "Læsning og lytning", "Ord og sætninger"], 0],
        ["Hvad virker ifølge teksten?", ["At lukke bogen og forsøge at huske", "At læse teksten mange gange", "At skrive teksten af"], 0],
        ["Hvorfor føles metoden ubehagelig?", ["Man opdager, hvor lidt der sidder fast", "Den tager for lang tid", "Den kræver en lærer"], 0]
      ] }
  ]
};
