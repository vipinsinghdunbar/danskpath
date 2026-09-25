// Personal goals — for adult learner with job/family
// Used to weight recommendations and show "This helps your goal"

export const goals = [
  { id: "child_school", label: "Barnets skole / børnehave", desc: "Tale med læreren, forstå beskeder fra Aula, forældremøde", icon: "🏫", mapsTo: ["sin", "v2", "praep", "koen"], canDo: ["udlejer","kaffe"] },
  { id: "job_interview", label: "Jobsamtale / job", desc: "Fortæl om erfaring, forstå flad struktur, lønforhandling", icon: "💼", mapsTo: ["staerke", "bindeord", "v2", "praep"], canDo: ["job","kaffe"] },
  { id: "doctor", label: "Læge / sygehus", desc: "Beskriv symptomer, forstå medicin, ringe til læge", icon: "🏥", mapsTo: ["har_er", "praep", "flertal"], canDo: ["laege"] },
  { id: "kommune", label: "Kommune / borgerservice", desc: "Forstå breve, ringe til borgerservice uden transskript", icon: "🏛️", mapsTo: ["ledsaetning", "bindeord", "v2"], canDo: ["borger"] },
  { id: "dsb", label: "DSB / transport / dagligdag", desc: "Forstå annonceringer, forsinkelser, handle ind", icon: "🚆", mapsTo: ["ikke", "flertal", "praep"], canDo: ["dsb","sms"] },
  { id: "coffee", label: "Kaffepause / kolleger", desc: "Hold den på dansk: Vent lidt, hvad mener du, være enig/uenig", icon: "☕", mapsTo: ["refleksiv", "praep", "bindeord"], canDo: ["kaffe"] },
  { id: "landlord", label: "Udlejer / bolig", desc: "Skrive om håndværker, nøgle, klage over fejl", icon: "🏠", mapsTo: ["v2", "ledsaetning", "bindeord"], canDo: ["udlejer","klage"] },
  { id: "pd3", label: "Bestå PD3 / Modultest", desc: "150-200 ord struktur, debat, argumentation", icon: "🎓", mapsTo: ["bindeord", "ledsaetning", "v2", "sin"], canDo: ["debat","pd3"] },
];

export function getGoals() {
  try {
    const g = JSON.parse(localStorage.getItem('dansk_goals')||'[]');
    return goals.filter(x=>g.includes(x.id));
  } catch { return []; }
}

export function saveGoals(ids) {
  localStorage.setItem('dansk_goals', JSON.stringify(ids.slice(0,3)));
}

export function getAllGoals() { return goals; }

export function getGoalById(id) { return goals.find(g=>g.id===id); }

// Map goal to relevant grammar topics for weighting
export function getRelevantTopicsForGoals() {
  const selected = getGoals();
  if(selected.length===0) return [];
  const topics = new Set();
  selected.forEach(g=>g.mapsTo.forEach(t=>topics.add(t)));
  return Array.from(topics);
}

export function getGoalHelpText(topicId) {
  const selected = getGoals();
  if(selected.length===0) return null;
  const relevant = selected.filter(g=>g.mapsTo.includes(topicId));
  if(relevant.length===0) return null;
  return `Dette hjælper dit mål: ${relevant.map(r=>r.label).join(', ')}`;
}
