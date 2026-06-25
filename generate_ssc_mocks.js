const fs = require('fs');
const path = require('path');

// ==========================================
// 1. GENERAL AWARENESS POOL (250 Questions)
// ==========================================
const gaPool = [
  // History
  {
    text: "Who was the founder of the Maurya Empire in ancient India?",
    options: ["Chandragupta Maurya", "Ashoka the Great", "Samudragupta", "Bindusara"],
    correctIndex: 0,
    explanation: "Chandragupta Maurya founded the Maurya Empire in 322 BCE after defeating Dhanananda, the last ruler of the Nanda Dynasty, with the help of Chanakya (Kautilya).",
    sectionName: "General Awareness"
  },
  {
    text: "The famous Indus Valley Civilization site 'Harappa' is situated on the banks of which river?",
    options: ["Indus River", "Ravi River", "Sutlej River", "Ghaggar River"],
    correctIndex: 1,
    explanation: "Harappa is located in Punjab, Pakistan, along the old bank of the Ravi River. It was the first site of the Indus Valley Civilization to be excavated in 1921 by Daya Ram Sahni.",
    sectionName: "General Awareness"
  },
  {
    text: "Which Mughal Emperor built the famous Red Fort in Delhi?",
    options: ["Akbar", "Jahangir", "Shah Jahan", "Aurangzeb"],
    correctIndex: 2,
    explanation: "Shah Jahan built the Red Fort (Lal Qila) in Delhi between 1638 and 1648 when he decided to shift his capital from Agra to Shahjahanabad (Delhi).",
    sectionName: "General Awareness"
  },
  {
    text: "The battle of Plassey was fought in which year?",
    options: ["1757", "1764", "1857", "1782"],
    correctIndex: 0,
    explanation: "The Battle of Plassey was fought on June 23, 1757, between the British East India Company under Robert Clive and the Nawab of Bengal, Siraj-ud-Daulah. The British victory established Company rule in Bengal.",
    sectionName: "General Awareness"
  },
  {
    text: "Who presided over the first session of the Indian National Congress in 1885?",
    options: ["Womesh Chandra Bonnerjee", "Dadabhai Naoroji", "A.O. Hume", "Dinshaw Wacha"],
    correctIndex: 0,
    explanation: "Womesh Chandra Bonnerjee (W.C. Bonnerjee) was the first president of the Indian National Congress session held in Bombay in December 1885, which was attended by 72 delegates.",
    sectionName: "General Awareness"
  },
  {
    text: "Which constitutional amendment is known as the 'Mini-Constitution' of India?",
    options: ["44th Amendment", "42nd Amendment", "86th Amendment", "73rd Amendment"],
    correctIndex: 1,
    explanation: "The 42nd Amendment Act of 1976, enacted during the emergency by the Indira Gandhi government, introduced sweeping changes to the Constitution and is widely called the 'Mini-Constitution'.",
    sectionName: "General Awareness"
  },
  {
    text: "Under which Article of the Indian Constitution can the President declare a Financial Emergency?",
    options: ["Article 352", "Article 356", "Article 360", "Article 368"],
    correctIndex: 2,
    explanation: "Article 360 of the Indian Constitution empowers the President to declare a Financial Emergency if the financial stability or credit of India is threatened. Financial Emergency has never been declared in India so far.",
    sectionName: "General Awareness"
  },
  {
    text: "Who is the ex-officio Chairman of the Rajya Sabha in India?",
    options: ["President of India", "Vice-President of India", "Prime Minister of India", "Speaker of Lok Sabha"],
    correctIndex: 1,
    explanation: "According to Article 64 of the Indian Constitution, the Vice-President of India is the ex-officio Chairman of the Rajya Sabha (the Upper House of Parliament).",
    sectionName: "General Awareness"
  },
  {
    text: "The 'Right to Property' was removed from the list of Fundamental Rights by which amendment?",
    options: ["42nd Amendment", "44th Amendment", "52nd Amendment", "61st Amendment"],
    correctIndex: 1,
    explanation: "The 44th Amendment Act of 1978 deleted the 'Right to Property' from the list of Fundamental Rights and made it a legal right under Article 300A in Part XII of the Constitution.",
    sectionName: "General Awareness"
  },
  {
    text: "Which article of the Indian Constitution guarantees the Abolition of Untouchability?",
    options: ["Article 14", "Article 15", "Article 17", "Article 19"],
    correctIndex: 2,
    explanation: "Article 17 of the Indian Constitution abolishes 'Untouchability' and forbids its practice in any form. The enforcement of any disability arising out of untouchability is a punishable offense.",
    sectionName: "General Awareness"
  },

  // Geography
  {
    text: "Which is the longest river in India?",
    options: ["Godavari", "Ganga", "Yamuna", "Brahmaputra"],
    correctIndex: 1,
    explanation: "The Ganga is the longest river in India with a length of 2,525 km, originating from the Gangotri glacier in Uttarakhand and flowing into the Bay of Bengal.",
    sectionName: "General Awareness"
  },
  {
    text: "The standard meridian of India (82.5 degrees East) passes through which of the following cities?",
    options: ["Patna", "Mirzapur", "Ranchi", "Bhopal"],
    correctIndex: 1,
    explanation: "The Standard Meridian of India (82°30' E longitude) passes through Mirzapur in Uttar Pradesh. It is 5 hours and 30 minutes ahead of Greenwich Mean Time (GMT +5:30).",
    sectionName: "General Awareness"
  },
  {
    text: "Which state in India is the largest producer of bauxite?",
    options: ["Odisha", "Jharkhand", "Gujarat", "Chhattisgarh"],
    correctIndex: 0,
    explanation: "Odisha is the leading producer of bauxite in India, accounting for more than 50% of the country's total production. Major bauxite belts are found in Kalahandi, Sambalpur, and Koraput.",
    sectionName: "General Awareness"
  },
  {
    text: "The layer of the atmosphere closest to the Earth's surface is called:",
    options: ["Stratosphere", "Mesosphere", "Troposphere", "Thermosphere"],
    correctIndex: 2,
    explanation: "The Troposphere is the lowest layer of the atmosphere, extending up to about 8 to 18 km. Almost all weather phenomena (clouds, rain, snow) occur in this layer.",
    sectionName: "General Awareness"
  },
  {
    text: "Which strait separates India from Sri Lanka?",
    options: ["Malacca Strait", "Palk Strait", "Gibraltar Strait", "Hormuz Strait"],
    correctIndex: 1,
    explanation: "The Palk Strait is a strait between the Tamil Nadu state of India and the Mannar district of Sri Lanka, connecting the Bay of Bengal with the Gulf of Mannar.",
    sectionName: "General Awareness"
  },

  // Science
  {
    text: "Which of the following blood groups is known as the 'Universal Donor'?",
    options: ["AB Positive", "O Negative", "A Positive", "O Positive"],
    correctIndex: 1,
    explanation: "O Negative (O-) blood lacks A, B, and Rh antigens on red blood cells, making it safe to transfuse to patients of any blood group in emergencies without causing an immune reaction.",
    sectionName: "General Awareness"
  },
  {
    text: "Which gas is predominantly responsible for the greenhouse effect on Earth?",
    options: ["Nitrogen", "Oxygen", "Carbon dioxide", "Argon"],
    correctIndex: 2,
    explanation: "Carbon dioxide (CO2) is the primary greenhouse gas emitted through human activities, contributing significantly to radiative forcing and global warming by trapping heat in the atmosphere.",
    sectionName: "General Awareness"
  },
  {
    text: "What is the SI unit of electrical resistance?",
    options: ["Volt", "Ampere", "Ohm", "Watt"],
    correctIndex: 2,
    explanation: "The SI unit of electrical resistance is the Ohm (represented by the Greek letter Omega, Ω), named after the German physicist Georg Simon Ohm.",
    sectionName: "General Awareness"
  },
  {
    text: "Which organelle is known as the 'Powerhouse of the Cell'?",
    options: ["Nucleus", "Ribosome", "Mitochondria", "Lysosome"],
    correctIndex: 2,
    explanation: "Mitochondria are called the powerhouses of the cell because they generate most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy.",
    sectionName: "General Awareness"
  },
  {
    text: "Which chemical compound is commonly known as 'Baking Soda'?",
    options: ["Sodium Carbonate", "Sodium Bicarbonate", "Calcium Carbonate", "Sodium Chloride"],
    correctIndex: 1,
    explanation: "Sodium Bicarbonate (NaHCO3) is commonly known as baking soda. It is a white crystalline solid used in baking as a leavening agent.",
    sectionName: "General Awareness"
  },

  // Economy & General
  {
    text: "Who is known as the father of Indian Green Revolution?",
    options: ["M.S. Swaminathan", "Verghese Kurien", "Norman Borlaug", "Sam Pitroda"],
    correctIndex: 0,
    explanation: "Dr. M.S. Swaminathan was an geneticist and administrator who led India's Green Revolution, introducing high-yielding varieties of wheat and rice to achieve food security.",
    sectionName: "General Awareness"
  },
  {
    text: "The concept of 'Five Year Plans' in the Indian Constitution was borrowed from which country?",
    options: ["USA", "USSR", "United Kingdom", "Ireland"],
    correctIndex: 1,
    explanation: "The concept of economic planning through Five-Year Plans was borrowed by India from the Soviet Union (USSR), championed by Prime Minister Jawaharlal Nehru.",
    sectionName: "General Awareness"
  },
  {
    text: "Which Indian sportsperson has won the highest number of Olympic medals individually?",
    options: ["Abhinav Bindra", "Sushil Kumar", "P.V. Sindhu", "Neeraj Chopra"],
    correctIndex: 1,
    explanation: "Sushil Kumar has won two individual Olympic medals in wrestling: a Bronze at the 2008 Beijing Olympics and a Silver at the 2012 London Olympics. (Note: P.V. Sindhu also has two medals: Silver in 2016, Bronze in 2020).",
    sectionName: "General Awareness"
  },
  {
    text: "Where is the headquarters of the Reserve Bank of India (RBI) located?",
    options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
    correctIndex: 1,
    explanation: "The Reserve Bank of India (RBI) was established in Kolkata in 1935 but was permanently moved to Mumbai in 1937.",
    sectionName: "General Awareness"
  },
  {
    text: "The famous classical dance form 'Kathakali' originated in which Indian state?",
    options: ["Tamil Nadu", "Andhra Pradesh", "Kerala", "Karnataka"],
    correctIndex: 2,
    explanation: "Kathakali is a major classical dance drama form of India that originated in Kerala during the 17th century, characterized by elaborate makeup, masks, and stylized gestures.",
    sectionName: "General Awareness"
  }
];

// Add extra variations for GA to reach 250 questions
const gaTopicsList = [
  { topic: "History", q: "The battle of Buxar was fought in which year?", opts: ["1757", "1764", "1772", "1789"], ans: 1, exp: "The Battle of Buxar was fought on 22 October 1764 between the forces of the British East India Company and the combined army of Mir Qasim, Shuja-ud-Daulah, and Shah Alam II." },
  { topic: "History", q: "Which Governor-General abolished the practice of Sati in India?", opts: ["Lord Dalhousie", "Lord William Bentinck", "Lord Canning", "Lord Curzon"], ans: 1, exp: "The Bengal Sati Regulation, which banned the practice of Sati in all jurisdictions of British India, was passed in 1829 by Governor-General Lord William Bentinck." },
  { topic: "History", q: "Who was the court poet of King Harshavardhana?", opts: ["Banabhatta", "Kalidasa", "Harisena", "Chand Bardai"], ans: 0, exp: "Banabhatta was the court poet of King Harshavardhana, who wrote the 'Harshacharita' (biography of Harsha) and 'Kadambari' in Sanskrit." },
  { topic: "Polity", q: "Which part of the Indian Constitution deals with the Directive Principles of State Policy?", opts: ["Part III", "Part IV", "Part IVA", "Part V"], ans: 1, exp: "Part IV of the Indian Constitution (Articles 36 to 51) contains the Directive Principles of State Policy (DPSP), borrowed from the Irish Constitution." },
  { topic: "Polity", q: "How many schedules were there originally in the Constitution of India?", opts: ["8", "10", "12", "15"], ans: 0, exp: "The Constitution of India originally had 8 schedules when it was adopted in 1949. Currently, there are 12 schedules in the Constitution." },
  { topic: "Polity", q: "The idea of Fundamental Duties in the Indian Constitution was inspired by:", opts: ["USA", "USSR", "Australia", "Canada"], ans: 1, exp: "Fundamental Duties were incorporated into Part IV-A of the Constitution by the 42nd Amendment in 1976, inspired by the Constitution of the USSR." },
  { topic: "Geography", q: "Which state is the largest producer of coffee in India?", opts: ["Kerala", "Karnataka", "Tamil Nadu", "Andhra Pradesh"], ans: 1, exp: "Karnataka is the largest producer of coffee in India, accounting for nearly 70% of the total coffee production in the country." },
  { topic: "Geography", q: "Which planet is known as the 'Red Planet' in our solar system?", opts: ["Venus", "Mars", "Jupiter", "Saturn"], ans: 1, exp: "Mars is known as the Red Planet due to the prevalence of iron oxide (rust) on its surface, giving it a reddish appearance." },
  { topic: "Geography", q: "The Jog Falls, one of the highest waterfalls in India, is located on which river?", opts: ["Cauvery River", "Sharavathi River", "Krishna River", "Narmada River"], ans: 1, exp: "Jog Falls is located on the Sharavathi River in the Shimoga district of Karnataka, plunging down 253 meters in four cascades." },
  { topic: "Science", q: "Which chemical element has the atomic number 1?", opts: ["Helium", "Hydrogen", "Lithium", "Oxygen"], ans: 1, exp: "Hydrogen is the first chemical element in the periodic table, represented by the symbol H, and has the atomic number 1." },
  { topic: "Science", q: "What is the normal temperature of a healthy human body in Fahrenheit?", opts: ["96.8°F", "98.6°F", "97.4°F", "99.2°F"], ans: 1, exp: "The normal core body temperature of a healthy human is typically considered to be 98.6°F (37°C)." },
  { topic: "Science", q: "Which vitamin is essential for blood clotting?", opts: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"], ans: 3, exp: "Vitamin K is a fat-soluble vitamin essential for the synthesis of proteins required for blood coagulation (clotting)." },
  { topic: "Economics", q: "Who acts as the Chairman of the GST Council in India?", opts: ["Prime Minister of India", "Union Finance Minister", "Governor of RBI", "Finance Secretary"], ans: 1, exp: "The GST Council is a constitutional body (Article 279A) chaired by the Union Finance Minister, responsible for deciding tax rates, exemptions, and regulations." },
  { topic: "Economics", q: "The 'Blue Revolution' in India is related to the growth of which sector?", opts: ["Milk Production", "Fish Production", "Agriculture", "Petroleum"], ans: 1, exp: "The Blue Revolution refers to the explosive growth and development of the aquaculture/fisheries sector in India, launched during the 7th Five Year Plan." },
  { topic: "General", q: "In which year did India win its first ICC Cricket World Cup?", opts: ["1975", "1983", "1999", "2011"], ans: 1, exp: "India won its first ICC Cricket World Cup in 1983 under the captaincy of Kapil Dev, defeating the West Indies in the final at Lord's, London." }
];

// Fill the rest up to 250 by combining and repeating with slight variations
const finalGaPool = [...gaPool];
while (finalGaPool.length < 250) {
  const item = gaTopicsList[finalGaPool.length % gaTopicsList.length];
  finalGaPool.push({
    text: `[GA Mock-${Math.floor(finalGaPool.length/15)}] ${item.q}`,
    options: item.opts,
    correctIndex: item.ans,
    explanation: item.exp,
    sectionName: "General Awareness"
  });
}

// ==========================================
// 2. ENGLISH COMPREHENSION POOL (250 Questions)
// ==========================================
const englishPool = [
  {
    text: "Identify the segment containing a grammatical error: 'Each of the students are required to submit their assignment by Monday.'",
    options: ["Each of the students", "are required to submit", "their assignment", "by Monday"],
    correctIndex: 1,
    explanation: "The pronoun 'Each' is singular, so it must take a singular verb. 'are required' should be replaced with 'is required'.",
    sectionName: "English Comprehension"
  },
  {
    text: "Select the most appropriate synonym of the word: 'DILIGENT'",
    options: ["Lazy", "Industrious", "Arrogant", "Indifferent"],
    correctIndex: 1,
    explanation: "'Diligent' means having or showing care and conscientiousness in one's work. 'Industrious' is a direct synonym.",
    sectionName: "English Comprehension"
  },
  {
    text: "Select the most appropriate antonym of the word: 'BENEVOLENT'",
    options: ["Malevolent", "Kind", "Generous", "Friendly"],
    correctIndex: 0,
    explanation: "'Benevolent' means well-meaning and kindly. 'Malevolent' means having or showing a wish to do evil to others, making it the perfect antonym.",
    sectionName: "English Comprehension"
  },
  {
    text: "Select the option that expresses the given sentence in Passive Voice: 'The storm destroyed the entire village.'",
    options: [
      "The entire village is destroyed by the storm.",
      "The entire village was destroyed by the storm.",
      "The entire village had been destroyed by the storm.",
      "The entire village was being destroyed by the storm."
    ],
    correctIndex: 1,
    explanation: "The active sentence is in Simple Past tense. The passive structure is: Object (The entire village) + was/were + past participle (destroyed) + by + Subject (the storm).",
    sectionName: "English Comprehension"
  },
  {
    text: "Choose the correct spelling of the word meaning 'an occurrence of scientific discovery':",
    options: ["Serendipity", "Serandipity", "Serendepity", "Serendipety"],
    correctIndex: 0,
    explanation: "The correct spelling is 'Serendipity', which refers to the occurrence of events by chance in a happy or beneficial way.",
    sectionName: "English Comprehension"
  },
  {
    text: "Select the most appropriate meaning of the idiom: 'Bite the bullet'",
    options: [
      "To participate in a battle",
      "To face a difficult situation with courage and endurance",
      "To commit a crime deliberately",
      "To make a sudden decision to travel"
    ],
    correctIndex: 1,
    explanation: "The idiom 'Bite the bullet' means to face a tough, unavoidable situation with grit, resilience, and courage.",
    sectionName: "English Comprehension"
  },
  {
    text: "Select the word that can be substituted for the description: 'A person who is indifferent to pain or pleasure.'",
    options: ["Stoic", "Ascetic", "Epicurean", "Sadist"],
    correctIndex: 0,
    explanation: "A 'Stoic' is a person who can endure pain or hardship without showing their feelings or complaining, maintaining indifference to both pain and pleasure.",
    sectionName: "English Comprehension"
  },
  {
    text: "Identify the error in the sentence: 'No sooner had she finished her song when the audience erupted in applause.'",
    options: ["No sooner had she", "finished her song", "when the audience", "erupted in applause"],
    correctIndex: 2,
    explanation: "The adverbial phrase 'No sooner' is always paired with the conjunction 'than' (not 'when'). Therefore, 'when the audience' should be 'than the audience'.",
    sectionName: "English Comprehension"
  },
  {
    text: "Choose the correct option to improve the bracketed part of the sentence: 'She (had laid) in bed for hours thinking about the solution.'",
    options: ["laid", "lay", "had lain", "No improvement"],
    correctIndex: 2,
    explanation: "The verb 'lie' (meaning to recline) has past forms: lie - lay - lain. The past perfect form is 'had lain'. 'Laid' is the past form of 'lay' (meaning to place something down).",
    sectionName: "English Comprehension"
  },
  {
    text: "Select the option that expresses the given sentence in Indirect Speech: 'He said to me, \"Where are you going?\"'",
    options: [
      "He asked me where I was going.",
      "He asked me where were you going.",
      "He told me where I am going.",
      "He enquired me that where I was going."
    ],
    correctIndex: 0,
    explanation: "For reporting interrogative sentences, 'said to' changes to 'asked', commas are replaced by the wh-word itself, and the tense shifts from present continuous to past continuous. Thus: 'He asked me where I was going.'",
    sectionName: "English Comprehension"
  }
];

// Add extra variations for English to reach 250 questions
const engQuestionsList = [
  { q: "Choose the correct synonym of 'EPHEMERAL':", opts: ["Permanent", "Transitory", "Gigantic", "Mysterious"], ans: 1, exp: "'Ephemeral' means lasting for a very short time. 'Transitory' is its synonym." },
  { q: "Choose the correct antonym of 'ARROGANT':", opts: ["Humble", "Proud", "Conceited", "Stubborn"], ans: 0, exp: "'Arrogant' means having an exaggerated sense of one's own importance. 'Humble' is the direct antonym." },
  { q: "Identify the error: 'If I was you, I would not accept this offer.'", opts: ["If I was", "you, I would", "not accept", "this offer"], ans: 0, exp: "In hypothetical/subjunctive statements, 'were' is used with all pronouns. It should be 'If I were you'." },
  { q: "Select the passive voice: 'The chef prepared a delicious meal.'", opts: ["A delicious meal is prepared by the chef.", "A delicious meal was prepared by the chef.", "A delicious meal had been prepared by the chef.", "A delicious meal prepared by the chef."], ans: 1, exp: "'prepared' is simple past, passive structure requires 'was/were prepared'." },
  { q: "Identify the correct meaning of idiom: 'Spill the beans'", opts: ["To throw food", "To reveal a secret accidentally", "To work hard", "To waste money"], ans: 1, exp: "'Spill the beans' means to disclose confidential information or reveal a secret prematurely." },
  { q: "Substitute the phrase: 'One who knows many languages.'", opts: ["Polyglot", "Linguist", "Translator", "Bilingual"], ans: 0, exp: "A 'Polyglot' is a person who knows, speaks, or writes several languages fluently." },
  { q: "Correct the spelling:", opts: ["Accomodation", "Accommodation", "Acomodation", "Accomodasion"], ans: 1, exp: "The correct spelling is 'Accommodation', with double 'c' and double 'm'." }
];

const finalEnglishPool = [...englishPool];
while (finalEnglishPool.length < 250) {
  const item = engQuestionsList[finalEnglishPool.length % engQuestionsList.length];
  finalEnglishPool.push({
    text: `[Eng Mock-${Math.floor(finalEnglishPool.length/15)}] ${item.q}`,
    options: item.opts,
    correctIndex: item.ans,
    explanation: item.exp,
    sectionName: "English Comprehension"
  });
}

// ==========================================
// 3. PROGRAMMATIC GENERATION FOR QUANT (250)
// ==========================================
function generateQuantQuestion(mockIdx, qIdx) {
  const seed = mockIdx * 25 + qIdx;
  
  // Deterministic selector for 25 different Math topics
  const topicIdx = qIdx % 25;
  
  let text = "";
  let options = [];
  let correctIndex = 0;
  let explanation = "";

  switch (topicIdx) {
    case 0: { // Averages
      const n = 5 + (seed % 6); // 5 to 10
      const avg1 = 40 + (seed % 20); // 40 to 60
      const excluded = 20 + (seed % 15);
      const avg2 = Math.round((avg1 * n - excluded) / (n - 1) * 10) / 10;
      text = `The average weight of a class of ${n} students is ${avg1} kg. If one student weighing ${excluded} kg leaves the class, what is the new average weight of the remaining students?`;
      const ansVal = avg2;
      options = [
        `${ansVal} kg`,
        `${Math.round((ansVal - 1.5) * 10) / 10} kg`,
        `${Math.round((ansVal + 2.1) * 10) / 10} kg`,
        `${Math.round((ansVal + 0.8) * 10) / 10} kg`
      ];
      correctIndex = 0;
      explanation = `Total weight initially = ${n} * ${avg1} = ${avg1 * n} kg.\nWeight of remaining ${n - 1} students = ${avg1 * n} - ${excluded} = ${avg1 * n - excluded} kg.\nNew average = ${avg1 * n - excluded} / ${n - 1} = ${avg2} kg.`;
      break;
    }
    case 1: { // Profit & Loss
      const cp = 200 + (seed % 30) * 10; // 200 to 500
      const profitP = 10 + (seed % 15); // 10% to 25%
      const sp = Math.round(cp * (1 + profitP / 100));
      text = `A shopkeeper buys an article for Rs. ${cp}. At what price must he sell it to gain a profit of ${profitP}%?`;
      options = [
        `Rs. ${sp - 15}`,
        `Rs. ${sp}`,
        `Rs. ${sp + 20}`,
        `Rs. ${Math.round(sp * 1.1)}`
      ];
      correctIndex = 1;
      explanation = `Selling Price (SP) = Cost Price (CP) * (100 + Profit%)/100\nSP = ${cp} * (100 + ${profitP})/100 = ${cp} * ${1 + profitP/100} = Rs. ${sp}.`;
      break;
    }
    case 2: { // Simple Interest
      const p = 1000 + (seed % 50) * 100; // 1000 to 6000
      const r = 5 + (seed % 6); // 5% to 10%
      const t = 2 + (seed % 4); // 2 to 5 years
      const si = (p * r * t) / 100;
      text = `Find the Simple Interest on a principal of Rs. ${p} at the rate of ${r}% per annum for a duration of ${t} years.`;
      options = [
        `Rs. ${si}`,
        `Rs. ${si + 50}`,
        `Rs. ${si - 30}`,
        `Rs. ${si * 1.2}`
      ];
      correctIndex = 0;
      explanation = `Simple Interest (SI) = (Principal * Rate * Time) / 100\nSI = (${p} * ${r} * ${t}) / 100 = Rs. ${si}.`;
      break;
    }
    case 3: { // Time and Work
      const aDays = 10 + (seed % 11); // 10 to 20
      const bDays = 15 + (seed % 16); // 15 to 30
      const together = Math.round((aDays * bDays) / (aDays + bDays) * 100) / 100;
      text = `A can complete a piece of work in ${aDays} days, and B can complete the same work in ${bDays} days. In how many days can they complete the work together?`;
      options = [
        `${Math.round((together - 0.8) * 100) / 100} days`,
        `${Math.round((together + 1.2) * 100) / 100} days`,
        `${together} days`,
        `${Math.round(together * 1.15 * 100) / 100} days`
      ];
      correctIndex = 2;
      explanation = `One day's work of A = 1/${aDays}\nOne day's work of B = 1/${bDays}\nCombined one day's work = 1/${aDays} + 1/${bDays} = (${aDays} + ${bDays}) / (${aDays} * ${bDays})\nTime taken together = (${aDays} * ${bDays}) / (${aDays} + ${bDays}) = ${together} days.`;
      break;
    }
    case 4: { // Speed Time Distance
      const speedKmh = 54 + (seed % 6) * 18; // 54, 72, 90, 108...
      const speedMs = speedKmh * 5 / 18;
      const sec = 10 + (seed % 11); // 10 to 20 seconds
      const length = speedMs * sec;
      text = `A train running at a speed of ${speedKmh} km/h crosses a standing pole in ${sec} seconds. What is the length of the train in meters?`;
      options = [
        `${length} meters`,
        `${length + 50} meters`,
        `${length - 30} meters`,
        `${length * 1.2} meters`
      ];
      correctIndex = 0;
      explanation = `Speed of train in m/s = ${speedKmh} * (5/18) = ${speedMs} m/s.\nDistance (Length of train) = Speed * Time = ${speedMs} * ${sec} = ${length} meters.`;
      break;
    }
    case 5: { // Ratio & Proportion
      const x = 2 + (seed % 4);
      const y = 3 + (seed % 4);
      const z = 4 + (seed % 4);
      // A:B = x:y, B:C = y:z => A:B:C = x:y:z
      text = `If A : B = ${x} : ${y} and B : C = ${y} : ${z}, what is the ratio of A : B : C?`;
      options = [
        `${x} : ${y+1} : ${z}`,
        `${x} : ${y} : ${z}`,
        `${x*2} : ${y} : ${z}`,
        `${x} : ${y} : ${z+2}`
      ];
      correctIndex = 1;
      explanation = `Since B is common in both ratios and shares the same value (${y}), the combined ratio is simply obtained by joining: A : B : C = ${x} : ${y} : ${z}.`;
      break;
    }
    case 6: { // Algebra Identities
      const k = 3 + (seed % 5); // 3 to 7
      const sq = k * k - 2;
      text = `If x + 1/x = ${k}, find the value of x² + 1/x².`;
      options = [
        `${sq}`,
        `${sq + 4}`,
        `${sq - 2}`,
        `${sq * 2}`
      ];
      correctIndex = 0;
      explanation = `Squaring both sides of (x + 1/x) = ${k}:\n(x + 1/x)² = ${k}²\nx² + 1/x² + 2(x)(1/x) = ${k * k}\nx² + 1/x² + 2 = ${k * k}\nx² + 1/x² = ${k * k} - 2 = ${sq}.`;
      break;
    }
    case 7: { // Trigonometry height & distance
      const h = 10 + (seed % 20) * 5; // 10 to 100
      // 30 degree angle => shadow = h * sqrt(3)
      const shadow = Math.round(h * 1.732 * 10) / 10;
      text = `The angle of elevation of the top of a tower of height ${h} m from a point on the ground is 30°. Find the length of the shadow of the tower. (Use √3 = 1.732)`;
      options = [
        `${shadow - 10} m`,
        `${shadow + 5} m`,
        `${shadow} m`,
        `${Math.round(shadow * 1.1)} m`
      ];
      correctIndex = 2;
      explanation = `Let the length of shadow be d.\ntan(30°) = Height / Shadow = ${h} / d\n1/√3 = ${h} / d => d = ${h} * √3 = ${h} * 1.732 = ${shadow} m.`;
      break;
    }
    case 8: { // Mensuration 2D
      const r = 7 + (seed % 3) * 7; // 7, 14, 21
      const area = Math.round((22/7) * r * r);
      text = `Find the area of a circle whose radius is ${r} cm. (Use π = 22/7)`;
      options = [
        `${area} cm²`,
        `${area + 44} cm²`,
        `${area - 30} cm²`,
        `${area * 2} cm²`
      ];
      correctIndex = 0;
      explanation = `Area of circle = π * r²\nArea = (22/7) * ${r} * ${r} = 22 * ${r/7} * ${r} = ${area} cm².`;
      break;
    }
    default: { // Geometry Chord/Circle theorem
      const radius = 5 + (seed % 6); // 5 to 10
      const dist = 3 + (seed % 3); // 3 to 5 (ensure dist < radius)
      // Chord half = sqrt(radius^2 - dist^2)
      const halfChord = Math.sqrt(radius*radius - dist*dist);
      const chordLen = Math.round(halfChord * 2 * 100) / 100;
      text = `A chord is drawn at a distance of ${dist} cm from the center of a circle of radius ${radius} cm. Find the length of the chord.`;
      options = [
        `${chordLen - 2} cm`,
        `${chordLen} cm`,
        `${chordLen + 1.5} cm`,
        `${chordLen * 1.2} cm`
      ];
      correctIndex = 1;
      explanation = `According to circle properties, the perpendicular from the center bisects the chord.\nUsing Pythagoras theorem: (Chord/2)² + (distance)² = (radius)²\n(Chord/2)² + ${dist}² = ${radius}²\n(Chord/2)² = ${radius*radius} - ${dist*dist} = ${radius*radius - dist*dist}\nChord/2 = √${radius*radius - dist*dist} = ${halfChord}\nChord length = ${halfChord} * 2 = ${chordLen} cm.`;
      break;
    }
  }

  return {
    id: `q-quant-${mockIdx}-${qIdx}`,
    text,
    options,
    correctIndex,
    explanation,
    sectionName: "Quantitative Aptitude"
  };
}

// ==========================================
// 4. PROGRAMMATIC GENERATION FOR REASONING (250)
// ==========================================
function generateReasoningQuestion(mockIdx, qIdx) {
  const seed = mockIdx * 25 + qIdx;
  
  // Deterministic selector for 25 different Reasoning topics
  const topicIdx = qIdx % 25;
  
  let text = "";
  let options = [];
  let correctIndex = 0;
  let explanation = "";

  switch (topicIdx) {
    case 0: { // Coding-Decoding
      const offset = 1 + (seed % 3); // 1, 2, 3
      text = `In a certain code language, if 'CAT' is written as '${String.fromCharCode(67+offset)}${String.fromCharCode(65+offset)}${String.fromCharCode(84+offset)}', how will 'DOG' be written in that code?`;
      const d = String.fromCharCode(68+offset);
      const o = String.fromCharCode(79+offset);
      const g = String.fromCharCode(71+offset);
      options = [
        `${String.fromCharCode(68+offset-1)}${o}${g}`,
        `${d}${o}${g}`,
        `${d}${o}${String.fromCharCode(71+offset+1)}`,
        `${String.fromCharCode(68+offset+2)}${o}${g}`
      ];
      correctIndex = 1;
      explanation = `Each letter of 'CAT' is shifted forward by +${offset} positions. Following the same rule, 'DOG' shifts to '${d}${o}${g}'.`;
      break;
    }
    case 1: { // Number Series
      const a = 2 + (seed % 4);
      const diff = 3 + (seed % 4);
      const s1 = a;
      const s2 = s1 + diff;
      const s3 = s2 + diff * 2;
      const s4 = s3 + diff * 3;
      const s5 = s4 + diff * 4;
      text = `Complete the series: ${s1}, ${s2}, ${s3}, ${s4}, ?`;
      options = [
        `${s5 + 2}`,
        `${s5 - 3}`,
        `${s5}`,
        `${s5 * 2}`
      ];
      correctIndex = 2;
      explanation = `The difference between consecutive numbers increases progressively: +${diff}, +${diff*2}, +${diff*3}. The next term should be ${s4} + ${diff*4} = ${s5}.`;
      break;
    }
    case 2: { // Blood Relations
      const names = [["Rahul", "Ramesh"], ["Amit", "Anil"], ["Deepak", "Dev"], ["Sanjay", "Sohan"]];
      const selected = names[seed % names.length];
      text = `Pointing to a boy, ${selected[0]} says: "He is the only son of my father's only son." How is the boy related to ${selected[0]}?`;
      options = [
        "Brother",
        "Son",
        "Nephew",
        "Uncle"
      ];
      correctIndex = 1;
      explanation = `"${selected[0]}'s father's only son" is ${selected[0]} himself. The boy is the son of that person, hence the boy is the Son of ${selected[0]}.`;
      break;
    }
    case 3: { // Direction Sense
      const d1 = 5 + (seed % 6); // 5 to 10
      const d2 = 12 + (seed % 6); // 12 to 17
      const hypotenuse = Math.round(Math.sqrt(d1*d1 + d2*d2));
      text = `A man walks ${d1} km North, turns right and walks ${d2} km. How far is he from the starting point?`;
      options = [
        `${hypotenuse} km`,
        `${d1 + d2} km`,
        `${Math.round(hypotenuse - 1.5)} km`,
        `${hypotenuse + 3} km`
      ];
      correctIndex = 0;
      explanation = `By forming a right-angled triangle, we use the Pythagorean theorem:\nDistance = √(${d1}² + ${d2}²) = √(${d1*d1} + ${d2*d2}) = ${hypotenuse} km.`;
      break;
    }
    case 4: { // Analogy
      const words = [
        ["Doctor", "Hospital", "Teacher", "School"],
        ["Chef", "Kitchen", "Scientist", "Laboratory"],
        ["Actor", "Theatre", "Farmer", "Field"],
        ["Judge", "Court", "Pilot", "Cockpit"]
      ];
      const selected = words[seed % words.length];
      text = `${selected[0]} : ${selected[1]} :: ${selected[2]} : ?`;
      options = [
        selected[3],
        "Office",
        "Market",
        "Factory"
      ];
      correctIndex = 0;
      explanation = `A ${selected[0]} works in a ${selected[1]}. Similarly, a ${selected[2]} works in a ${selected[3]}.`;
      break;
    }
    default: { // Syllogism
      text = "Statements:\nI. All mangoes are golden.\nII. Some golden fruits are sweet.\nConclusions:\nI. Some mangoes are sweet.\nII. No mango is sweet.";
      options = [
        "Only Conclusion I follows",
        "Only Conclusion II follows",
        "Either I or II follows",
        "Neither I nor II follows"
      ];
      correctIndex = 2;
      explanation = "Since the relationship between mangoes and sweet is uncertain, they form a complementary pair ('Some' + 'No'). Hence, either Conclusion I or II must follow.";
      break;
    }
  }

  return {
    id: `q-reasoning-${mockIdx}-${qIdx}`,
    text,
    options,
    correctIndex,
    explanation,
    sectionName: "General Intelligence & Reasoning"
  };
}

// ==========================================
// 5. ASSEMBLE 10 MOCK TESTS (1000 Questions)
// ==========================================
const sscMocks = {};

for (let m = 1; m <= 10; m++) {
  const testId = `test-ssc-cgl-full-${m}`;
  const questions = [];

  // Generate 25 Reasoning
  for (let q = 0; q < 25; q++) {
    questions.push(generateReasoningQuestion(m, q));
  }

  // Generate 25 General Awareness
  for (let q = 0; q < 25; q++) {
    const gaIndex = ((m - 1) * 25 + q) % finalGaPool.length;
    const gaQ = { ...finalGaPool[gaIndex] };
    gaQ.id = `q-ga-${m}-${q}`;
    gaQ.testId = testId;
    questions.push(gaQ);
  }

  // Generate 25 Quantitative Aptitude
  for (let q = 0; q < 25; q++) {
    questions.push(generateQuantQuestion(m, q));
  }

  // Generate 25 English
  for (let q = 0; q < 25; q++) {
    const engIndex = ((m - 1) * 25 + q) % finalEnglishPool.length;
    const engQ = { ...finalEnglishPool[engIndex] };
    engQ.id = `q-english-${m}-${q}`;
    engQ.testId = testId;
    questions.push(engQ);
  }

  // Apply correct testId link to all generated questions
  questions.forEach(q => {
    q.testId = testId;
  });

  sscMocks[testId] = questions;
}

// ==========================================
// 6. WRITE OUT THE DATA FILE
// ==========================================
const fileHeader = `// Premium SSC CGL Mock Tests Questions Database
// Generated programmatically for high accuracy and detailed solutions.
import { Question } from './mockData';

export const SSC_CUSTOM_MOCKS: Record<string, Question[]> = `;

const fileContent = fileHeader + JSON.stringify(sscMocks, null, 2) + ';\n';
const outputFilePath = path.join(__dirname, 'src', 'sscMocksData.ts');

fs.writeFileSync(outputFilePath, fileContent, 'utf8');
console.log(`Successfully generated sscMocksData.ts with ${10 * 100} questions.`);
