// Variable pools for template engine — Danish, authentic, PD3-relevant
// Each pool provides safe combinations that are grammatically correct together

export const pools = {
  // V2 fronted elements — time, place, attitude
  front: {
    tid: ["I morgen","I går","I dag","I weekenden","Om sommeren","Om vinteren","Om aftenen","Hver dag","Hver uge","Næste uge","Til sommer","Klokken otte","Om ti minutter","Hvert år"],
    attitude: ["Heldigvis","Desværre","Derfor","Bagefter","Så","Nu"],
    place: ["I København","På biblioteket","På arbejdet","I skolen","Derhjemme"]
  },
  subject: ["jeg","vi","hun","han","Anna","min kollega","bussen","børnene","min nabo","familien","mødet","toget","chefen","læreren"],
  verb: {
    present: ["skal","tager","cykler","kører","er","var","kommer","starter","ringer","drikker","spiller","lytter","forstår","bor"],
    past: ["arbejdede","lavede","ventede","købte","spiste","læste","tog","kom","var","blev"]
  },
  rest: ["på arbejde","til Norge","til skole","fra Aarhus","hjemme","mørkt klokken fire","i et nyt job","til lægen","til tiden","kaffe","fodbold","til radio","spørgsmålet","til Odense","i børnehaven"],
  // Nouns with gender
  nouns: [
    { da: "en bil", def: "bilen", pl: "biler", plDef: "bilerne", gender: "en", en: "car" },
    { da: "et hus", def: "huset", pl: "huse", plDef: "husene", gender: "et", en: "house" },
    { da: "en bog", def: "bogen", pl: "bøger", plDef: "bøgerne", gender: "en", en: "book" },
    { da: "et barn", def: "barnet", pl: "børn", plDef: "børnene", gender: "et", en: "child" },
    { da: "en dag", def: "dagen", pl: "dage", plDef: "dagene", gender: "en", en: "day" },
    { da: "et år", def: "året", pl: "år", plDef: "årene", gender: "et", en: "year" },
    { da: "en måned", def: "måneden", pl: "måneder", plDef: "månederne", gender: "en", en: "month" },
    { da: "et møde", def: "mødet", pl: "møder", plDef: "møderne", gender: "et", en: "meeting" },
    { da: "en opgave", def: "opgaven", pl: "opgaver", plDef: "opgaverne", gender: "en", en: "task" },
    { da: "et tog", def: "toget", pl: "tog", plDef: "togene", gender: "et", en: "train" },
    { da: "en bus", def: "bussen", pl: "busser", plDef: "busserne", gender: "en", en: "bus" },
    { da: "et værelse", def: "værelset", pl: "værelser", plDef: "værelserne", gender: "et", en: "room" },
  ],
  // Adjectives with full paradigm
  adjectives: [
    { base: "stor", t: "stort", e: "store", comp: "større", sup: "størst", en: "big" },
    { base: "god", t: "godt", e: "gode", comp: "bedre", sup: "bedst", en: "good" },
    { base: "ny", t: "nyt", e: "nye", comp: "nyere", sup: "nyest", en: "new" },
    { base: "gammel", t: "gammelt", e: "gamle", comp: "ældre", sup: "ældst", en: "old" },
    { base: "billig", t: "billigt", e: "billige", comp: "billigere", sup: "billigst", en: "cheap" },
    { base: "vigtig", t: "vigtigt", e: "vigtige", comp: "vigtigere", sup: "vigtigst", en: "important" },
    { base: "travl", t: "travlt", e: "travle", comp: "travlere", sup: "travlest", en: "busy" },
    { base: "rolig", t: "roligt", e: "rolige", comp: "roligere", sup: "roligst", en: "calm" },
  ],
  // Prepositions with fixed expressions
  praep: [
    { prep: "i", context: "Danmark", why: "Lande tager i" },
    { prep: "på", context: "Fyn", why: "Øer tager på" },
    { prep: "på", context: "mandag", why: "Enkel dag: på mandag" },
    { prep: "om", context: "sommeren", why: "Om + årstid = hver" },
    { prep: "i", context: "tre år", why: "Varighed: i tre år" },
    { prep: "om", context: "ti minutter", why: "Fremtid: om ti minutter" },
    { prep: "på", context: "arbejde", why: "Fast: på arbejde" },
    { prep: "i", context: "skole", why: "Fast: gå i skole" },
    { prep: "til", context: "København", why: "Bevægelse: til København" },
    { prep: "på", context: "bussen", why: "vente på" },
    { prep: "til", context: "ferien", why: "glæde sig til" },
    { prep: "for", context: "hjælpen", why: "tak for" },
  ],
  // Adverbials for ikke placement
  adverbials: ["ikke","aldrig","altid","ofte","sjældent","også","kun","måske","endelig"],
  // Connectors
  connectors: {
    leds: ["fordi","at","hvis","når","da","selvom","som","mens"],
    hoved: ["derfor","så","alligevel","desuden","bagefter","først"]
  },
  // Verbs full paradigm for nutid/datid
  verbParadigms: [
    { inf: "arbejde", nutid: "arbejder", datid: "arbejdede", førnutid: "har arbejdet", en: "work", group: "1" },
    { inf: "spise", nutid: "spiser", datid: "spiste", førnutid: "har spist", en: "eat", group: "2" },
    { inf: "tage", nutid: "tager", datid: "tog", førnutid: "har taget", en: "take", group: "strong" },
    { inf: "komme", nutid: "kommer", datid: "kom", førnutid: "er kommet", en: "come", group: "irreg", aux: "er" },
    { inf: "gå", nutid: "går", datid: "gik", førnutid: "er gået", en: "go", group: "irreg", aux: "er" },
  ]
};

export function pick(arr) { return arr[Math.floor(Math.random()*arr.length)]; }
export function pickMany(arr, n) { const copy=[...arr].sort(()=>0.5-Math.random()); return copy.slice(0,n); }
