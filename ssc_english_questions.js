// SSC CGL English Comprehension - 250 Unique Bilingual Questions
// Every question, option, and explanation is bilingual (English / Hindi)
const pool = [];

// ===================== SYNONYMS (30) =====================
const synData = [
  { w: "ABUNDANT", h: "प्रचुर", a: "Plentiful / भरपूर", d1: "Scarce / अल्प", d2: "Rare / दुर्लभ", d3: "Meager / कम" },
  { w: "BENEVOLENT", h: "परोपकारी", a: "Kind / दयालु", d1: "Cruel / क्रूर", d2: "Selfish / स्वार्थी", d3: "Harsh / कठोर" },
  { w: "CANDID", h: "निष्कपट", a: "Frank / स्पष्टवादी", d1: "Secretive / गोपनीय", d2: "Dishonest / बेईमान", d3: "Cunning / चालाक" },
  { w: "DILIGENT", h: "परिश्रमी", a: "Industrious / मेहनती", d1: "Lazy / आलसी", d2: "Careless / लापरवाह", d3: "Idle / निष्क्रिय" },
  { w: "ELOQUENT", h: "वाक्पटु", a: "Articulate / सुवक्ता", d1: "Stammering / हकलाने वाला", d2: "Silent / मौन", d3: "Dull / नीरस" },
  { w: "FEEBLE", h: "दुर्बल", a: "Weak / कमज़ोर", d1: "Strong / मज़बूत", d2: "Powerful / शक्तिशाली", d3: "Sturdy / दृढ़" },
  { w: "GREGARIOUS", h: "मिलनसार", a: "Sociable / सामाजिक", d1: "Reclusive / एकांतवासी", d2: "Shy / शर्मीला", d3: "Hostile / शत्रुतापूर्ण" },
  { w: "IMPECCABLE", h: "निर्दोष", a: "Flawless / त्रुटिहीन", d1: "Defective / दोषपूर्ण", d2: "Faulty / खराब", d3: "Average / औसत" },
  { w: "JUBILANT", h: "उल्लासपूर्ण", a: "Joyful / आनंदित", d1: "Sorrowful / दुखी", d2: "Gloomy / उदास", d3: "Angry / क्रोधित" },
  { w: "KEEN", h: "उत्सुक", a: "Eager / इच्छुक", d1: "Indifferent / उदासीन", d2: "Reluctant / अनिच्छुक", d3: "Bored / ऊबा हुआ" },
  { w: "LUCID", h: "स्पष्ट", a: "Clear / साफ़", d1: "Confusing / भ्रमित करने वाला", d2: "Vague / अस्पष्ट", d3: "Obscure / अंधकारमय" },
  { w: "METICULOUS", h: "सावधान", a: "Careful / सतर्क", d1: "Careless / लापरवाह", d2: "Hasty / जल्दबाज़", d3: "Negligent / उपेक्षित" },
  { w: "NOVICE", h: "नौसिखिया", a: "Beginner / शुरुआती", d1: "Expert / विशेषज्ञ", d2: "Veteran / अनुभवी", d3: "Master / गुरु" },
  { w: "OMINOUS", h: "अशुभ", a: "Threatening / भयावह", d1: "Promising / आशाजनक", d2: "Cheerful / प्रसन्न", d3: "Lucky / भाग्यशाली" },
  { w: "PRUDENT", h: "विवेकी", a: "Wise / बुद्धिमान", d1: "Foolish / मूर्ख", d2: "Reckless / लापरवाह", d3: "Impulsive / आवेगी" },
  { w: "RESILIENT", h: "लचीला", a: "Tough / दृढ़", d1: "Fragile / नाज़ुक", d2: "Brittle / भंगुर", d3: "Delicate / कोमल" },
  { w: "SANGUINE", h: "आशावादी", a: "Optimistic / आशान्वित", d1: "Pessimistic / निराशावादी", d2: "Hopeless / निराश", d3: "Fearful / भयभीत" },
  { w: "TENACIOUS", h: "दृढ़", a: "Persistent / अटल", d1: "Wavering / डगमगाता", d2: "Fickle / चंचल", d3: "Submissive / विनम्र" },
  { w: "VIVACIOUS", h: "जीवंत", a: "Lively / सजीव", d1: "Dull / नीरस", d2: "Sluggish / सुस्त", d3: "Boring / उबाऊ" },
  { w: "ZEALOUS", h: "उत्साही", a: "Enthusiastic / जोशीला", d1: "Apathetic / उदासीन", d2: "Indifferent / निरपेक्ष", d3: "Lethargic / सुस्त" },
  { w: "ARDUOUS", h: "कठिन", a: "Difficult / मुश्किल", d1: "Easy / आसान", d2: "Simple / सरल", d3: "Effortless / सहज" },
  { w: "BREVITY", h: "संक्षिप्तता", a: "Conciseness / संक्षेप", d1: "Lengthy / विस्तृत", d2: "Elaboration / विस्तार", d3: "Verbosity / शब्दाडम्बर" },
  { w: "CLANDESTINE", h: "गुप्त", a: "Secret / रहस्यमय", d1: "Open / खुला", d2: "Public / सार्वजनिक", d3: "Transparent / पारदर्शी" },
  { w: "DEXTERITY", h: "कुशलता", a: "Skill / निपुणता", d1: "Clumsiness / अनाड़ीपन", d2: "Incompetence / अयोग्यता", d3: "Ignorance / अज्ञानता" },
  { w: "EXQUISITE", h: "उत्कृष्ट", a: "Beautiful / सुंदर", d1: "Ugly / बदसूरत", d2: "Plain / साधारण", d3: "Crude / अशिष्ट" },
  { w: "FORTITUDE", h: "धैर्य/साहस", a: "Courage / हिम्मत", d1: "Cowardice / कायरता", d2: "Fear / डर", d3: "Weakness / कमज़ोरी" },
  { w: "GRATUITOUS", h: "अनावश्यक", a: "Unnecessary / बेवजह", d1: "Essential / आवश्यक", d2: "Important / महत्वपूर्ण", d3: "Needed / ज़रूरी" },
  { w: "MUNDANE", h: "सांसारिक", a: "Ordinary / साधारण", d1: "Extraordinary / असाधारण", d2: "Exciting / रोमांचक", d3: "Unique / अनूठा" },
  { w: "PENCHANT", h: "झुकाव", a: "Inclination / प्रवृत्ति", d1: "Dislike / नापसंद", d2: "Hatred / घृणा", d3: "Aversion / विमुखता" },
  { w: "VORACIOUS", h: "अति लालची", a: "Greedy / लालची", d1: "Moderate / मध्यम", d2: "Abstinent / संयमी", d3: "Satisfied / संतुष्ट" }
];
synData.forEach((s, i) => {
  const ci = i % 4;
  const opts = [s.d1, s.d2, s.d3];
  opts.splice(ci, 0, s.a);
  pool.push({ text: `Choose the correct synonym of '${s.w}': / '${s.w}' (${s.h}) का सही पर्यायवाची चुनिए:`, options: opts, correctIndex: ci, explanation: `'${s.a}' is the synonym of '${s.w}'. / '${s.a}' '${s.w}' (${s.h}) का पर्यायवाची है।`, sectionName: "English Comprehension" });
});

// ===================== ANTONYMS (30) =====================
const antData = [
  { w: "ANCIENT", h: "प्राचीन", a: "Modern / आधुनिक", d1: "Old / पुराना", d2: "Archaic / पुरातन", d3: "Antique / प्राचीन वस्तु" },
  { w: "BOLD", h: "साहसी", a: "Timid / डरपोक", d1: "Brave / बहादुर", d2: "Valiant / वीर", d3: "Fearless / निडर" },
  { w: "CRUEL", h: "क्रूर", a: "Kind / दयालु", d1: "Harsh / कठोर", d2: "Brutal / निर्दय", d3: "Savage / बर्बर" },
  { w: "DURABLE", h: "टिकाऊ", a: "Fragile / नाज़ुक", d1: "Strong / मज़बूत", d2: "Lasting / स्थायी", d3: "Sturdy / मज़बूत" },
  { w: "EXPAND", h: "फैलाना", a: "Contract / सिकोड़ना", d1: "Spread / फैलाव", d2: "Extend / विस्तार", d3: "Enlarge / बड़ा करना" },
  { w: "FERTILE", h: "उपजाऊ", a: "Barren / बंजर", d1: "Rich / समृद्ध", d2: "Productive / उत्पादक", d3: "Fruitful / फलदायक" },
  { w: "GUILTY", h: "दोषी", a: "Innocent / निर्दोष", d1: "Criminal / अपराधी", d2: "Culprit / अपराधी", d3: "Convicted / दोषसिद्ध" },
  { w: "HOSTILE", h: "शत्रुतापूर्ण", a: "Friendly / मित्रवत", d1: "Aggressive / आक्रामक", d2: "Warlike / युद्धप्रिय", d3: "Violent / हिंसक" },
  { w: "JOYFUL", h: "आनंदित", a: "Sorrowful / दुखी", d1: "Happy / खुश", d2: "Cheerful / प्रसन्न", d3: "Elated / उत्साहित" },
  { w: "LOFTY", h: "ऊंचा", a: "Lowly / नीचा", d1: "Tall / लंबा", d2: "Elevated / ऊंचा", d3: "Grand / भव्य" },
  { w: "NATURAL", h: "प्राकृतिक", a: "Artificial / कृत्रिम", d1: "Organic / जैविक", d2: "Pure / शुद्ध", d3: "Wild / जंगली" },
  { w: "OBSCURE", h: "अस्पष्ट", a: "Prominent / प्रमुख", d1: "Hidden / छिपा", d2: "Unknown / अज्ञात", d3: "Dark / अंधेरा" },
  { w: "PERMANENT", h: "स्थायी", a: "Temporary / अस्थायी", d1: "Lasting / टिकाऊ", d2: "Eternal / शाश्वत", d3: "Fixed / निश्चित" },
  { w: "RAPID", h: "तेज़", a: "Slow / धीमा", d1: "Fast / तेज़", d2: "Swift / शीघ्र", d3: "Quick / जल्दी" },
  { w: "SAVAGE", h: "बर्बर", a: "Civilized / सभ्य", d1: "Wild / जंगली", d2: "Fierce / उग्र", d3: "Brutal / निर्दय" },
  { w: "TRIUMPH", h: "विजय", a: "Defeat / पराजय", d1: "Victory / जीत", d2: "Success / सफलता", d3: "Glory / गौरव" },
  { w: "UNITY", h: "एकता", a: "Division / विभाजन", d1: "Harmony / सामंजस्य", d2: "Solidarity / एकजुटता", d3: "Union / संघ" },
  { w: "VERBOSE", h: "शब्दाडम्बरपूर्ण", a: "Concise / संक्षिप्त", d1: "Lengthy / लंबा", d2: "Wordy / शब्दबहुल", d3: "Talkative / बातूनी" },
  { w: "WILLING", h: "इच्छुक", a: "Reluctant / अनिच्छुक", d1: "Ready / तैयार", d2: "Eager / उत्सुक", d3: "Keen / उत्साही" },
  { w: "AFFLUENT", h: "समृद्ध", a: "Poor / गरीब", d1: "Rich / अमीर", d2: "Wealthy / धनवान", d3: "Prosperous / सम्पन्न" },
  { w: "COMPLEX", h: "जटिल", a: "Simple / सरल", d1: "Difficult / कठिन", d2: "Intricate / पेचीदा", d3: "Complicated / उलझा" },
  { w: "DEFICIT", h: "घाटा", a: "Surplus / अधिशेष", d1: "Loss / हानि", d2: "Shortage / कमी", d3: "Debt / ऋण" },
  { w: "EXOTIC", h: "विदेशी", a: "Common / सामान्य", d1: "Foreign / विदेशी", d2: "Strange / अजीब", d3: "Unusual / असामान्य" },
  { w: "FICTION", h: "कल्पना", a: "Fact / तथ्य", d1: "Story / कहानी", d2: "Novel / उपन्यास", d3: "Fantasy / काल्पनिक" },
  { w: "GENUINE", h: "असली", a: "Fake / नकली", d1: "Real / वास्तविक", d2: "Authentic / प्रामाणिक", d3: "Original / मौलिक" },
  { w: "HARMONY", h: "सामंजस्य", a: "Discord / कलह", d1: "Peace / शांति", d2: "Melody / सुर", d3: "Agreement / सहमति" },
  { w: "INFERIOR", h: "निम्न", a: "Superior / श्रेष्ठ", d1: "Low / कम", d2: "Poor / खराब", d3: "Substandard / घटिया" },
  { w: "KNOWLEDGE", h: "ज्ञान", a: "Ignorance / अज्ञानता", d1: "Wisdom / बुद्धि", d2: "Learning / सीखना", d3: "Education / शिक्षा" },
  { w: "MAJOR", h: "प्रमुख", a: "Minor / गौण", d1: "Big / बड़ा", d2: "Important / महत्वपूर्ण", d3: "Chief / मुख्य" },
  { w: "BLISS", h: "परम सुख", a: "Misery / दुख", d1: "Happiness / खुशी", d2: "Joy / आनंद", d3: "Ecstasy / परमानंद" }
];
antData.forEach((s, i) => {
  const ci = (i + 1) % 4;
  const opts = [s.d1, s.d2, s.d3];
  opts.splice(ci, 0, s.a);
  pool.push({ text: `Choose the correct antonym of '${s.w}': / '${s.w}' (${s.h}) का सही विलोम शब्द चुनिए:`, options: opts, correctIndex: ci, explanation: `'${s.a}' is the antonym of '${s.w}'. / '${s.a}' '${s.w}' (${s.h}) का विलोम शब्द है।`, sectionName: "English Comprehension" });
});

// ===================== IDIOMS & PHRASES (30) =====================
const idiomData = [
  { id: "Burn the midnight oil", idH: "रात भर जागकर पढ़ना", a: "To study/work late at night / रात को देर तक पढ़ना या काम करना", d1: "To waste energy / ऊर्जा बर्बाद करना", d2: "To set fire / आग लगाना", d3: "To sleep early / जल्दी सोना" },
  { id: "A piece of cake", idH: "बहुत आसान काम", a: "A very easy task / बहुत आसान काम", d1: "A bakery item / बेकरी का सामान", d2: "A difficult choice / कठिन विकल्प", d3: "An expensive gift / महँगा उपहार" },
  { id: "Blessing in disguise", idH: "छुपा हुआ वरदान", a: "Something good not recognized at first / पहले पहचान में न आने वाली अच्छी बात", d1: "A fake prayer / नकली प्रार्थना", d2: "A hidden curse / छिपा हुआ अभिशाप", d3: "An invisible person / अदृश्य व्यक्ति" },
  { id: "Once in a blue moon", idH: "बहुत कम", a: "Very rarely / बहुत कम", d1: "Every month / हर महीने", d2: "Frequently / बार-बार", d3: "Never / कभी नहीं" },
  { id: "Under the weather", idH: "तबीयत ठीक न होना", a: "Feeling slightly sick / थोड़ा बीमार महसूस करना", d1: "Enjoying rain / बारिश का आनंद लेना", d2: "Being very cold / बहुत ठंड लगना", d3: "Working outside / बाहर काम करना" },
  { id: "Break the ice", idH: "बातचीत शुरू करना", a: "To initiate conversation / बातचीत शुरू करना", d1: "To break something / कुछ तोड़ना", d2: "To solve a problem / समस्या हल करना", d3: "To end a fight / लड़ाई खत्म करना" },
  { id: "Hit the nail on the head", idH: "बिल्कुल सही कहना", a: "To describe exactly right / बिल्कुल सही बात कहना", d1: "To hurt someone / किसी को चोट पहुँचाना", d2: "To miss the point / बात से भटकना", d3: "To do carpentry / बढ़ईगिरी करना" },
  { id: "Spill the beans", idH: "भेद खोलना", a: "To reveal a secret / रहस्य उजागर करना", d1: "To cook food / खाना बनाना", d2: "To waste food / खाना बर्बाद करना", d3: "To plant seeds / बीज बोना" },
  { id: "Cost an arm and a leg", idH: "बहुत महँगा होना", a: "Very expensive / बहुत महँगा", d1: "Very painful / बहुत दर्दनाक", d2: "Very risky / बहुत जोखिम भरा", d3: "Very cheap / बहुत सस्ता" },
  { id: "Add insult to injury", idH: "जले पर नमक छिड़कना", a: "To make things worse / स्थिति और खराब करना", d1: "To apologize / माफी मांगना", d2: "To heal wounds / घाव भरना", d3: "To feel better / बेहतर महसूस करना" },
  { id: "Beat around the bush", idH: "इधर-उधर की बात करना", a: "To avoid the main topic / मुख्य विषय से बचना", d1: "To search carefully / ध्यान से खोजना", d2: "To fight in the garden / बगीचे में लड़ना", d3: "To walk in circles / गोल-गोल चलना" },
  { id: "Bite the bullet", idH: "कठिनाई सहना", a: "To endure a painful situation / कठिन परिस्थिति सहना", d1: "To eat something hard / कुछ कठोर खाना", d2: "To shoot a gun / बंदूक चलाना", d3: "To start a fight / लड़ाई शुरू करना" },
  { id: "Cry over spilt milk", idH: "बीती बात पर पछताना", a: "To regret something unchangeable / जो हो गया उस पर पछताना", d1: "To clean a mess / गंदगी साफ करना", d2: "To be very sad / बहुत दुखी होना", d3: "To drink milk / दूध पीना" },
  { id: "Every cloud has a silver lining", idH: "हर मुसीबत में कोई न कोई अच्छाई होती है", a: "Good aspect in every bad situation / हर बुरी स्थिति में अच्छा पहलू", d1: "Clouds are made of silver / बादल चाँदी के बने होते हैं", d2: "Rain is coming / बारिश आने वाली है", d3: "Sky is always clear / आकाश हमेशा साफ रहता है" },
  { id: "Get out of hand", idH: "काबू से बाहर हो जाना", a: "To get out of control / नियंत्रण से बाहर हो जाना", d1: "To drop something / कुछ गिरा देना", d2: "To finish quickly / जल्दी खत्म करना", d3: "To lend a hand / मदद करना" },
  { id: "Let the cat out of the bag", idH: "भेद खोल देना", a: "To reveal a secret accidentally / गलती से रहस्य उजागर करना", d1: "To free a cat / बिल्ली को छोड़ना", d2: "To buy a pet / पालतू जानवर खरीदना", d3: "To open a bag / थैला खोलना" },
  { id: "Miss the boat", idH: "अवसर गँवाना", a: "To miss an opportunity / अवसर गँवाना", d1: "To arrive late at the dock / घाट पर देर से पहुँचना", d2: "To forget swimming / तैराकी भूलना", d3: "To take a train instead / ट्रेन लेना" },
  { id: "Pull someone's leg", idH: "किसी के साथ मज़ाक करना", a: "To joke with someone / किसी से मज़ाक करना", d1: "To trip someone / किसी को ठोकर मारना", d2: "To drag someone / किसी को घसीटना", d3: "To help someone stand / किसी को खड़ा करना" },
  { id: "See eye to eye", idH: "एक-दूसरे से सहमत होना", a: "To agree with someone / किसी से सहमत होना", d1: "To stare at each other / एक-दूसरे को घूरना", d2: "To have good eyesight / अच्छी दृष्टि होना", d3: "To fight face to face / आमने-सामने लड़ना" },
  { id: "Sit on the fence", idH: "तटस्थ रहना", a: "To remain neutral/undecided / तटस्थ या अनिर्णीत रहना", d1: "To rest outside / बाहर आराम करना", d2: "To guard the boundary / सीमा की रक्षा करना", d3: "To climb a fence / बाड़ पर चढ़ना" },
  { id: "The ball is in your court", idH: "अब आपकी बारी है", a: "It's your decision now / अब फैसला आपका है", d1: "You must play sports / आपको खेल खेलना चाहिए", d2: "The game is over / खेल खत्म हो गया", d3: "You lost the ball / आपने गेंद खो दी" },
  { id: "To have cold feet", idH: "घबराहट होना", a: "To be nervous or scared / घबराहट या डर लगना", d1: "To have frozen toes / पैर की उंगलियाँ जमना", d2: "To walk barefoot / नंगे पैर चलना", d3: "To feel cold / ठंड लगना" },
  { id: "Turn a blind eye", idH: "अनदेखा करना", a: "To pretend not to notice / न देखने का बहाना करना", d1: "To become blind / अंधा हो जाना", d2: "To close your eyes / आँखें बंद करना", d3: "To look away / दूर देखना" },
  { id: "When pigs fly", idH: "जब सूरज पश्चिम से उगे (असंभव)", a: "Something impossible / कुछ असंभव", d1: "When animals evolve / जब जानवर विकसित हों", d2: "During a storm / तूफान के दौरान", d3: "In the future / भविष्य में" },
  { id: "Bark up the wrong tree", idH: "गलत दिशा में प्रयास करना", a: "To look in the wrong place / गलत जगह खोजना", d1: "To climb a tree / पेड़ पर चढ़ना", d2: "To train a dog / कुत्ते को प्रशिक्षित करना", d3: "To cut down a tree / पेड़ काटना" },
  { id: "Cut corners", idH: "कम मेहनत में काम निकालना", a: "To do something cheaply or poorly / सस्ते या खराब तरीके से करना", d1: "To trim the edges / किनारे काटना", d2: "To take a shortcut / शॉर्टकट लेना", d3: "To be precise / सटीक होना" },
  { id: "Kill two birds with one stone", idH: "एक तीर से दो शिकार", a: "To accomplish two things at once / एक साथ दो काम पूरे करना", d1: "To hunt birds / पक्षियों का शिकार करना", d2: "To throw stones / पत्थर फेंकना", d3: "To be cruel / क्रूर होना" },
  { id: "Throw in the towel", idH: "हार मान लेना", a: "To give up / हार मान लेना", d1: "To wash clothes / कपड़े धोना", d2: "To dry yourself / खुद को सुखाना", d3: "To start exercising / व्यायाम शुरू करना" },
  { id: "A storm in a teacup", idH: "छोटी बात का बतंगड़", a: "A big fuss over a small matter / छोटी बात पर बड़ा हंगामा", d1: "A natural disaster / प्राकृतिक आपदा", d2: "A broken teacup / टूटा हुआ कप", d3: "Bad weather / खराब मौसम" },
  { id: "Burning bridges", idH: "पुल जला देना (संबंध तोड़ना)", a: "To destroy relationships / रिश्ते खराब करना", d1: "Setting fire / आग लगाना", d2: "Building new roads / नई सड़कें बनाना", d3: "Crossing a river / नदी पार करना" }
];
idiomData.forEach((s, i) => {
  const ci = (i + 2) % 4;
  const opts = [s.d1, s.d2, s.d3];
  opts.splice(ci, 0, s.a);
  pool.push({ text: `What is the meaning of the idiom '${s.id}'? / मुहावरे '${s.id}' (${s.idH}) का अर्थ क्या है?`, options: opts, correctIndex: ci, explanation: `'${s.id}' means '${s.a}'. / '${s.id}' (${s.idH}) का अर्थ '${s.a}' है।`, sectionName: "English Comprehension" });
});

// ===================== ONE WORD SUBSTITUTION (25) =====================
const owsData = [
  { desc: "One who knows everything", descH: "जो सब कुछ जानता हो", a: "Omniscient / सर्वज्ञ", d1: "Omnipotent / सर्वशक्तिमान", d2: "Omnipresent / सर्वव्यापी", d3: "Scholar / विद्वान" },
  { desc: "A person who speaks two languages", descH: "जो दो भाषाएँ बोलता हो", a: "Bilingual / द्विभाषी", d1: "Polyglot / बहुभाषी", d2: "Linguist / भाषाविद", d3: "Translator / अनुवादक" },
  { desc: "Government by the rich", descH: "धनवानों द्वारा शासन", a: "Plutocracy / धनिकतंत्र", d1: "Democracy / लोकतंत्र", d2: "Monarchy / राजतंत्र", d3: "Aristocracy / कुलीनतंत्र" },
  { desc: "One who hates women", descH: "जो महिलाओं से घृणा करता हो", a: "Misogynist / स्त्री-द्वेषी", d1: "Misanthrope / मानवद्वेषी", d2: "Feminist / नारीवादी", d3: "Philanthropist / परोपकारी" },
  { desc: "A person who loves books", descH: "पुस्तक प्रेमी", a: "Bibliophile / पुस्तक-प्रेमी", d1: "Bibliographer / ग्रंथसूचीकार", d2: "Novelist / उपन्यासकार", d3: "Journalist / पत्रकार" },
  { desc: "A person who walks in sleep", descH: "जो नींद में चलता हो", a: "Somnambulist / निद्राचारी", d1: "Insomniac / अनिद्रा रोगी", d2: "Neurologist / तंत्रिका विज्ञानी", d3: "Psychologist / मनोवैज्ञानिक" },
  { desc: "A disease that spreads over a large area", descH: "जो बीमारी बड़े क्षेत्र में फैले", a: "Epidemic / महामारी", d1: "Endemic / स्थानिक रोग", d2: "Chronic / दीर्घकालिक", d3: "Acute / तीव्र" },
  { desc: "A person who is always doubting", descH: "जो हमेशा संदेह करता हो", a: "Skeptic / संशयवादी", d1: "Optimist / आशावादी", d2: "Believer / विश्वासी", d3: "Critic / आलोचक" },
  { desc: "One who eats human flesh", descH: "जो मानव मांस खाता हो", a: "Cannibal / नरभक्षी", d1: "Herbivore / शाकाहारी", d2: "Carnivore / मांसाहारी", d3: "Omnivore / सर्वभक्षी" },
  { desc: "A place where dead bodies are kept", descH: "जहाँ शव रखे जाते हैं", a: "Mortuary / शवगृह", d1: "Cemetery / कब्रिस्तान", d2: "Hospital / अस्पताल", d3: "Museum / संग्रहालय" },
  { desc: "One who knows many languages", descH: "जो अनेक भाषाएँ जानता हो", a: "Polyglot / बहुभाषाविद", d1: "Bilingual / द्विभाषी", d2: "Monolingual / एकभाषी", d3: "Interpreter / दुभाषिया" },
  { desc: "A government run by a dictator", descH: "तानाशाह द्वारा चलाई जाने वाली सरकार", a: "Autocracy / निरंकुशता", d1: "Democracy / लोकतंत्र", d2: "Theocracy / धर्मतंत्र", d3: "Bureaucracy / नौकरशाही" },
  { desc: "One who believes in fate", descH: "जो भाग्य में विश्वास करता हो", a: "Fatalist / भाग्यवादी", d1: "Atheist / नास्तिक", d2: "Realist / यथार्थवादी", d3: "Idealist / आदर्शवादी" },
  { desc: "A person who lives alone", descH: "जो अकेला रहता हो", a: "Recluse / एकांतवासी", d1: "Introvert / अंतर्मुखी", d2: "Hermit / संन्यासी", d3: "Bachelor / कुंवारा" },
  { desc: "Something that can be heard", descH: "जो सुना जा सके", a: "Audible / श्रव्य", d1: "Visible / दृश्य", d2: "Tangible / स्पर्शनीय", d3: "Edible / खाद्य" },
  { desc: "A speech made without preparation", descH: "बिना तैयारी के दिया गया भाषण", a: "Extempore / तात्कालिक", d1: "Rehearsed / अभ्यासित", d2: "Debate / वाद-विवाद", d3: "Lecture / व्याख्यान" },
  { desc: "One who is free from all mistakes", descH: "जो सभी गलतियों से मुक्त हो", a: "Infallible / अचूक", d1: "Impeccable / निर्दोष", d2: "Reliable / विश्वसनीय", d3: "Perfect / पूर्ण" },
  { desc: "A collection of poems", descH: "कविताओं का संग्रह", a: "Anthology / काव्य-संकलन", d1: "Dictionary / शब्दकोश", d2: "Encyclopedia / विश्वकोश", d3: "Atlas / एटलस" },
  { desc: "One who does not believe in God", descH: "जो ईश्वर में विश्वास न करे", a: "Atheist / नास्तिक", d1: "Theist / आस्तिक", d2: "Agnostic / अज्ञेयवादी", d3: "Pagan / बहुदेववादी" },
  { desc: "A place where bees are kept", descH: "जहाँ मधुमक्खियाँ पाली जाती हैं", a: "Apiary / मधुमक्खी पालन स्थल", d1: "Aviary / पक्षीशाला", d2: "Aquarium / मछलीघर", d3: "Kennel / कुत्ते का घर" },
  { desc: "One who is present everywhere", descH: "जो हर जगह उपस्थित हो", a: "Omnipresent / सर्वव्यापी", d1: "Omniscient / सर्वज्ञ", d2: "Omnipotent / सर्वशक्तिमान", d3: "Universal / सार्वभौमिक" },
  { desc: "A letter which does not bear the writer's name", descH: "जिस पत्र पर लेखक का नाम न हो", a: "Anonymous / अनाम", d1: "Pseudonymous / छद्मनाम", d2: "Confidential / गोपनीय", d3: "Official / आधिकारिक" },
  { desc: "Killing of a king", descH: "राजा की हत्या", a: "Regicide / राजहत्या", d1: "Homicide / मानवहत्या", d2: "Suicide / आत्महत्या", d3: "Genocide / नरसंहार" },
  { desc: "A person who draws maps", descH: "जो मानचित्र बनाता हो", a: "Cartographer / मानचित्रकार", d1: "Geographer / भूगोलवेत्ता", d2: "Astronomer / खगोलशास्त्री", d3: "Archaeologist / पुरातत्वविद" },
  { desc: "A cure for all diseases", descH: "सभी रोगों का इलाज", a: "Panacea / रामबाण", d1: "Antibiotic / प्रतिजैविक", d2: "Vaccine / टीका", d3: "Medicine / दवा" }
];
owsData.forEach((s, i) => {
  const ci = i % 4;
  const opts = [s.d1, s.d2, s.d3];
  opts.splice(ci, 0, s.a);
  pool.push({ text: `One word substitution for: '${s.desc}' / '${s.descH}' के लिए एक शब्द:`, options: opts, correctIndex: ci, explanation: `The one word for '${s.desc}' is '${s.a}'. / '${s.descH}' के लिए एक शब्द '${s.a}' है।`, sectionName: "English Comprehension" });
});

// ===================== SPOTTING ERRORS (50) =====================
const errData = [
  { s: "He go to school every day.", p: ["He go", "to school", "every day"], ci: 0, e: "'go' → 'goes' (singular subject 'He') / 'go' → 'goes' (एकवचन कर्ता 'He')" },
  { s: "If he will work hard, he will pass.", p: ["If he will work", "hard, he will", "pass the exam"], ci: 0, e: "Use simple present in 'if' clause: 'If he works hard' / 'if' उपवाक्य में सामान्य वर्तमान काल: 'If he works hard'" },
  { s: "She is more cleverer than her sister.", p: ["She is", "more cleverer", "than her sister"], ci: 1, e: "Double comparative error: use 'cleverer' not 'more cleverer' / दोहरी तुलना त्रुटि: 'more cleverer' नहीं, 'cleverer' प्रयोग करें" },
  { s: "The furniture in this room are very old.", p: ["The furniture", "in this room", "are very old"], ci: 2, e: "'Furniture' is uncountable, takes singular verb 'is' / 'Furniture' अगणनीय है, एकवचन क्रिया 'is' लेता है" },
  { s: "Neither of the two paths lead to the temple.", p: ["Neither of the", "two paths", "lead to the temple"], ci: 2, e: "'Neither' takes singular verb 'leads' / 'Neither' एकवचन क्रिया 'leads' लेता है" },
  { s: "He has been working here since five years.", p: ["He has been", "working here", "since five years"], ci: 2, e: "Use 'for' with duration: 'for five years' / अवधि के साथ 'for' प्रयोग करें: 'for five years'" },
  { s: "I prefer tea than coffee.", p: ["I prefer", "tea", "than coffee"], ci: 2, e: "'prefer' takes 'to' not 'than': 'tea to coffee' / 'prefer' के साथ 'to' लगता है 'than' नहीं" },
  { s: "He did not write the letter yet.", p: ["He", "did not write", "the letter yet"], ci: 1, e: "With 'yet' use present perfect: 'has not written' / 'yet' के साथ Present Perfect: 'has not written'" },
  { s: "Unless you do not work hard, you cannot succeed.", p: ["Unless you", "do not work", "hard, you cannot succeed"], ci: 1, e: "'Unless' already negative, remove 'do not': 'Unless you work' / 'Unless' पहले से नकारात्मक है, 'do not' हटाएं" },
  { s: "Although he was poor, but he was honest.", p: ["Although", "he was poor,", "but he was honest"], ci: 2, e: "'Although' pairs with comma or 'yet', not 'but' / 'Although' के साथ 'but' नहीं आता" },
  { s: "One of the boy was absent yesterday.", p: ["One of the", "boy was", "absent yesterday"], ci: 1, e: "'One of the' takes plural: 'One of the boys was' / 'One of the' के बाद बहुवचन: 'One of the boys was'" },
  { s: "He is a honest man.", p: ["He is", "a honest", "man"], ci: 1, e: "Use 'an' before vowel sounds: 'an honest' / स्वर ध्वनि से पहले 'an': 'an honest'" },
  { s: "The sceneries of Kashmir are beautiful.", p: ["The sceneries", "of Kashmir", "are beautiful"], ci: 0, e: "'Scenery' is uncountable, no plural: 'The scenery of Kashmir is' / 'Scenery' अगणनीय है: 'The scenery of Kashmir is'" },
  { s: "Each of the students have submitted their work.", p: ["Each of the students", "have submitted", "their work"], ci: 1, e: "'Each' is singular: 'has submitted' / 'Each' एकवचन है: 'has submitted'" },
  { s: "She told me that she will come tomorrow.", p: ["She told me", "that she will", "come tomorrow"], ci: 1, e: "Reported speech: 'will' → 'would' / अप्रत्यक्ष कथन: 'will' → 'would'" },
  { s: "The news are very shocking today.", p: ["The news", "are very", "shocking today"], ci: 1, e: "'News' is singular: 'is very' / 'News' एकवचन है: 'is very'" },
  { s: "He is more taller than his brother.", p: ["He is", "more taller", "than his brother"], ci: 1, e: "Double comparative: use 'taller' not 'more taller' / दोहरी तुलना: 'taller' प्रयोग करें" },
  { s: "I have been living here since 2010.", p: ["I have been", "living here", "since 2010"], ci: 3, e: "No error. 'Since' is correct with a point in time. / कोई त्रुटि नहीं। समय-बिंदु के साथ 'since' सही है।" },
  { s: "Mathematics are my favourite subject.", p: ["Mathematics", "are my", "favourite subject"], ci: 1, e: "'Mathematics' takes singular verb 'is' / 'Mathematics' एकवचन क्रिया 'is' लेता है" },
  { s: "She availed of the opportunity.", p: ["She", "availed of", "the opportunity"], ci: 1, e: "'Avail' takes reflexive: 'availed herself of' / 'Avail' निजवाचक लेता है: 'availed herself of'" },
  { s: "The teacher asked who had broke the glass.", p: ["The teacher asked", "who had", "broke the glass"], ci: 2, e: "Past participle needed: 'broken' not 'broke' / भूतकालिक कृदंत: 'broke' नहीं 'broken'" },
  { s: "I and he went to the market.", p: ["I and he", "went to", "the market"], ci: 0, e: "'He and I' is correct order (others before I) / 'He and I' सही क्रम है (दूसरों को पहले)" },
  { s: "He gave me many advices on health.", p: ["He gave me", "many advices", "on health"], ci: 1, e: "'Advice' is uncountable: 'much advice' / 'Advice' अगणनीय है: 'much advice'" },
  { s: "She is knowing the answer.", p: ["She is", "knowing the", "answer"], ci: 1, e: "'Know' is stative verb, no continuous: 'She knows' / 'Know' स्थिति-क्रिया है, continuous नहीं: 'She knows'" },
  { s: "No sooner he came than it started raining.", p: ["No sooner", "he came", "than it started raining"], ci: 1, e: "'No sooner...than' needs inversion: 'did he come' / 'No sooner' के बाद उलटा क्रम: 'did he come'" },
  { s: "Two hundred rupees are enough for this.", p: ["Two hundred rupees", "are enough", "for this"], ci: 1, e: "Amount as a whole takes singular verb: 'is enough' / राशि के साथ एकवचन: 'is enough'" },
  { s: "The police has arrested the thief.", p: ["The police", "has arrested", "the thief"], ci: 1, e: "'Police' is plural noun: 'have arrested' / 'Police' बहुवचन है: 'have arrested'" },
  { s: "He reached at home very late.", p: ["He reached", "at home", "very late"], ci: 1, e: "'Reach' doesn't take 'at' before 'home': 'reached home' / 'Reach' के बाद 'home' से पहले 'at' नहीं" },
  { s: "Hardly I had reached the station when the train left.", p: ["Hardly I had", "reached the station", "when the train left"], ci: 0, e: "Inversion needed: 'Hardly had I' / उलटा क्रम चाहिए: 'Hardly had I'" },
  { s: "The old man walks with a stick and it is bent.", p: ["The old man walks", "with a stick", "and it is bent"], ci: 2, e: "Ambiguous 'it' - unclear reference (stick or man?) / 'it' अस्पष्ट - किसके लिए है?" },
  { s: "He told to me a secret.", p: ["He told", "to me", "a secret"], ci: 1, e: "'Told' takes indirect object directly: 'told me' / 'Told' सीधे: 'told me'" },
  { s: "He is working in this company since five years.", p: ["He is working", "in this company", "since five years"], ci: 0, e: "Use present perfect continuous: 'has been working' / वर्तमान पूर्ण सतत: 'has been working'" },
  { s: "She said that the earth was round.", p: ["She said that", "the earth", "was round"], ci: 2, e: "Universal truth stays in present: 'is round' / सार्वभौमिक सत्य वर्तमान में: 'is round'" },
  { s: "Ram is one of the best student in the class.", p: ["Ram is one of", "the best student", "in the class"], ci: 1, e: "'One of the best' + plural: 'students' / 'One of the best' + बहुवचन: 'students'" },
  { s: "Being a rainy day, I did not go out.", p: ["Being a", "rainy day,", "I did not go out"], ci: 0, e: "Dangling modifier: 'It being a rainy day' / लटकता विशेषण: 'It being a rainy day'" },
  { s: "The cattle is grazing in the field.", p: ["The cattle", "is grazing", "in the field"], ci: 1, e: "'Cattle' is plural: 'are grazing' / 'Cattle' बहुवचन है: 'are grazing'" },
  { s: "I look forward to meet you soon.", p: ["I look forward", "to meet", "you soon"], ci: 1, e: "'look forward to' + gerund: 'to meeting' / 'look forward to' + gerund: 'to meeting'" },
  { s: "He denied to help the poor boy.", p: ["He denied", "to help", "the poor boy"], ci: 0, e: "'Refused' not 'denied' for action: 'He refused' / क्रिया के लिए 'refused': 'He refused'" },
  { s: "This is the most unique design I have ever seen.", p: ["This is the", "most unique", "design I have ever seen"], ci: 1, e: "'Unique' is absolute, no 'most': just 'unique' / 'Unique' पूर्ण है, 'most' नहीं लगता" },
  { s: "Neither Ram nor his friends was present.", p: ["Neither Ram", "nor his friends", "was present"], ci: 2, e: "Verb agrees with nearest subject: 'were present' / निकटतम कर्ता से: 'were present'" },
  { s: "He jumped off of the building.", p: ["He jumped", "off of", "the building"], ci: 1, e: "'off of' is redundant: just 'off the building' / 'off of' अनावश्यक: 'off the building'" },
  { s: "My brother and me went to the park.", p: ["My brother", "and me", "went to the park"], ci: 1, e: "Subject form needed: 'and I' not 'and me' / कर्ता रूप: 'and I' न कि 'and me'" },
  { s: "She speaks English very fluently.", p: ["She speaks", "English very", "fluently"], ci: 3, e: "No error. The sentence is grammatically correct. / कोई त्रुटि नहीं। वाक्य व्याकरणिक रूप से सही है।" },
  { s: "The team have won the match by a big margin.", p: ["The team", "have won", "the match by a big margin"], ci: 3, e: "No error. 'Team' can take plural verb when members act individually. / कोई त्रुटि नहीं।" },
  { s: "He insisted on me to go there.", p: ["He insisted", "on me", "to go there"], ci: 2, e: "'Insist' + gerund: 'on my going' / 'Insist' + gerund: 'on my going'" },
  { s: "She is elder than me by two years.", p: ["She is elder", "than me", "by two years"], ci: 0, e: "'Elder' doesn't take 'than': use 'older than' / 'Elder' के साथ 'than' नहीं: 'older than' प्रयोग करें" },
  { s: "He is suffering from fever since Monday.", p: ["He is suffering", "from fever", "since Monday"], ci: 0, e: "Use 'has been suffering' (present perfect continuous) / 'has been suffering' प्रयोग करें" },
  { s: "Please give me a few advice.", p: ["Please give", "me a few", "advice"], ci: 1, e: "'Advice' is uncountable: 'some advice' / 'Advice' अगणनीय है: 'some advice'" },
  { s: "We discussed about the problem at length.", p: ["We discussed", "about the", "problem at length"], ci: 1, e: "'Discuss' doesn't take 'about': 'discussed the problem' / 'Discuss' के बाद 'about' नहीं" },
  { s: "The train had left before I reached the station.", p: ["The train had left", "before I", "reached the station"], ci: 3, e: "No error. Past perfect + past simple is correct. / कोई त्रुटि नहीं। Past perfect सही है।" }
];
errData.forEach((s, i) => {
  const opts = s.ci === 3 ? [s.p[0] + " / " + s.p[0], s.p[1] + " / " + s.p[1], s.p[2] + " / " + s.p[2], "No error / कोई त्रुटि नहीं"] : [s.p[0] + " / " + s.p[0], s.p[1] + " / " + s.p[1], s.p[2] + " / " + s.p[2], "No error / कोई त्रुटि नहीं"];
  pool.push({ text: `Find the error in the sentence / वाक्य में त्रुटि खोजें: "${s.s}"`, options: opts, correctIndex: s.ci, explanation: s.e, sectionName: "English Comprehension" });
});

// ===================== SENTENCE IMPROVEMENT (25) =====================
const siData = [
  { s: "He is working here since 2015.", bold: "is working", a: "has been working / काम कर रहा है (present perfect continuous)", d1: "was working / काम कर रहा था", d2: "had been working / काम कर रहा था (past perfect)", d3: "No improvement / कोई सुधार नहीं" },
  { s: "She said that she is busy.", bold: "is busy", a: "was busy / व्यस्त थी (reported speech)", d1: "has been busy / व्यस्त रही है", d2: "will be busy / व्यस्त होगी", d3: "No improvement / कोई सुधार नहीं" },
  { s: "I am liking this movie very much.", bold: "am liking", a: "like / पसंद करता/करती हूँ (stative verb)", d1: "was liking / पसंद कर रहा था", d2: "have liked / पसंद किया है", d3: "No improvement / कोई सुधार नहीं" },
  { s: "He speaks English like he is a native.", bold: "like he is", a: "as if he were / जैसे कि वह हो (subjunctive)", d1: "as like he is / जैसे कि वह है", d2: "like he was / जैसे वह था", d3: "No improvement / कोई सुधार नहीं" },
  { s: "The meeting was postponed to next Monday.", bold: "postponed to", a: "postponed till / अगले सोमवार तक टाला गया", d1: "postponed for / के लिए टाला गया", d2: "postponed by / द्वारा टाला गया", d3: "No improvement / कोई सुधार नहीं" },
  { s: "He asked me that where I lived.", bold: "that where I lived", a: "where I lived / मैं कहाँ रहता था (no 'that' in indirect wh-question)", d1: "that where do I live / कि मैं कहाँ रहता हूँ", d2: "where did I live / मैं कहाँ रहता था", d3: "No improvement / कोई सुधार नहीं" },
  { s: "I am looking forward to hear from you.", bold: "to hear", a: "to hearing / सुनने के लिए (gerund after 'to')", d1: "to listen / सुनने", d2: "for hearing / सुनने हेतु", d3: "No improvement / कोई सुधार नहीं" },
  { s: "She is more smarter than her classmates.", bold: "more smarter", a: "smarter / अधिक चतुर (no double comparative)", d1: "most smarter / सबसे चतुर", d2: "much smarter / बहुत चतुर", d3: "No improvement / कोई सुधार नहीं" },
  { s: "He denied to help the poor farmer.", bold: "denied to help", a: "refused to help / मदद करने से मना किया", d1: "denied helping / मदद से इनकार किया", d2: "denied for helping / मदद के लिए इनकार", d3: "No improvement / कोई सुधार नहीं" },
  { s: "The thief was caught red hand.", bold: "red hand", a: "red-handed / रंगे हाथ (correct idiom)", d1: "red in hand / हाथ में लाल", d2: "with red hand / लाल हाथ से", d3: "No improvement / कोई सुधार नहीं" },
  { s: "Despite of the rain, we continued our journey.", bold: "Despite of", a: "Despite / बावजूद (no 'of' after 'despite')", d1: "Inspite / के बावजूद", d2: "Even though of / के होते हुए भी", d3: "No improvement / कोई सुधार नहीं" },
  { s: "The reason for his absence is because he is ill.", bold: "is because", a: "is that / यह है कि (avoid 'reason...because')", d1: "was because / था क्योंकि", d2: "is since / है क्योंकि", d3: "No improvement / कोई सुधार नहीं" },
  { s: "She could not barely speak during the interview.", bold: "could not barely", a: "could barely / मुश्किल से बोल सकी (double negative fix)", d1: "could never barely / कभी नहीं बोल सकी", d2: "cannot barely / मुश्किल से बोल सकती", d3: "No improvement / कोई सुधार नहीं" },
  { s: "He told that he was innocent.", bold: "told that", a: "said that / कहा कि ('told' needs an object)", d1: "told me that / मुझसे कहा कि", d2: "telling that / बता रहा कि", d3: "No improvement / कोई सुधार नहीं" },
  { s: "He is elder than me.", bold: "elder than me", a: "older than me / मुझसे बड़ा ('elder' doesn't take 'than')", d1: "more elder than me / मुझसे अधिक बड़ा", d2: "eldest than me / मुझसे सबसे बड़ा", d3: "No improvement / कोई सुधार नहीं" },
  { s: "We should avail this golden opportunity.", bold: "avail this", a: "avail ourselves of this / इस अवसर का लाभ उठाना (reflexive)", d1: "avail to this / इसके लिए लाभ उठाना", d2: "avail from this / इससे लाभ उठाना", d3: "No improvement / कोई सुधार नहीं" },
  { s: "He insisted on me to come to the party.", bold: "on me to come", a: "on my coming / मेरे आने पर (gerund after insist)", d1: "me for coming / मेरे आने के लिए", d2: "that I should to come / कि मुझे आना चाहिए", d3: "No improvement / कोई सुधार नहीं" },
  { s: "They discussed about the new policy.", bold: "discussed about", a: "discussed / चर्चा की ('discuss' is transitive, no 'about')", d1: "discussed on / पर चर्चा की", d2: "discussed over / ऊपर चर्चा की", d3: "No improvement / कोई सुधार नहीं" },
  { s: "She prefers milk than tea.", bold: "than tea", a: "to tea / चाय की अपेक्षा ('prefer' takes 'to')", d1: "over tea / चाय से ऊपर", d2: "instead tea / चाय की बजाय", d3: "No improvement / कोई सुधार नहीं" },
  { s: "The crowd were dispersed by the police.", bold: "were dispersed", a: "was dispersed / तितर-बितर किया गया (crowd=singular unit)", d1: "has been dispersed / तितर-बितर किया गया है", d2: "have dispersed / तितर-बितर हो गए", d3: "No improvement / कोई सुधार नहीं" },
  { s: "He came to the class lately.", bold: "lately", a: "late / देर से (lately=recently, late=not on time)", d1: "later / बाद में", d2: "latest / सबसे हाल", d3: "No improvement / कोई सुधार नहीं" },
  { s: "She need not to worry about the results.", bold: "need not to worry", a: "need not worry / चिंता करने की ज़रूरत नहीं (modal 'need' + bare infinitive)", d1: "needs not worry / चिंता करने की ज़रूरत नहीं", d2: "need not worrying / चिंता करने की ज़रूरत नहीं", d3: "No improvement / कोई सुधार नहीं" },
  { s: "I enjoyed during the holidays.", bold: "enjoyed during", a: "enjoyed myself during / छुट्टियों में मज़ा किया (reflexive)", d1: "was enjoying during / मज़ा कर रहा था", d2: "had enjoyed during / मज़ा किया था", d3: "No improvement / कोई सुधार नहीं" },
  { s: "No sooner I saw him, I recognized him.", bold: "No sooner I saw", a: "No sooner did I see / ज्यों ही मैंने देखा (inversion after 'No sooner')", d1: "No sooner I see / ज्यों ही मैं देखता", d2: "No sooner had I saw / ज्यों ही मैंने देखा था", d3: "No improvement / कोई सुधार नहीं" },
  { s: "The scenery is very beautiful here.", bold: "is very beautiful here", a: "No improvement / कोई सुधार नहीं (sentence is correct)", d1: "was very beautiful here / यहाँ बहुत सुंदर था", d2: "are very beautiful here / यहाँ बहुत सुंदर हैं", d3: "has been beautiful / सुंदर रहा है" }
];
siData.forEach((s, i) => {
  const ci = i % 4;
  const opts = [s.d1, s.d2, s.d3];
  opts.splice(ci, 0, s.a);
  pool.push({ text: `Improve the underlined part: '${s.s}' (Underlined: '${s.bold}') / रेखांकित भाग को सुधारें: '${s.s}' (रेखांकित: '${s.bold}')`, options: opts, correctIndex: ci, explanation: `Correct form: ${s.a}. / सही रूप: ${s.a}।`, sectionName: "English Comprehension" });
});

// ===================== FILL IN THE BLANKS (25) =====================
const fibData = [
  { s: "The sun _____ in the east.", sH: "सूर्य पूर्व में _____ है।", a: "rises / उगता", d1: "rose / उगा", d2: "rising / उगते हुए", d3: "risen / उग चुका" },
  { s: "She has been waiting _____ two hours.", sH: "वह दो घंटे _____ इंतज़ार कर रही है।", a: "for / से (duration)", d1: "since / से (point)", d2: "from / से", d3: "by / तक" },
  { s: "He is _____ honest man.", sH: "वह _____ ईमानदार आदमी है।", a: "an / एक (vowel sound)", d1: "a / एक", d2: "the / वह", d3: "no article / कोई article नहीं" },
  { s: "Neither Ram _____ Shyam was present.", sH: "न राम _____ श्याम उपस्थित था।", a: "nor / न", d1: "or / या", d2: "and / और", d3: "but / लेकिन" },
  { s: "I am looking forward _____ meeting you.", sH: "मैं आपसे मिलने _____ उत्सुक हूँ।", a: "to / के लिए", d1: "for / के लिए", d2: "at / पर", d3: "on / पर" },
  { s: "She is good _____ mathematics.", sH: "वह गणित _____ अच्छी है।", a: "at / में", d1: "in / में", d2: "on / पर", d3: "for / के लिए" },
  { s: "The book is _____ the table.", sH: "किताब मेज़ _____ है।", a: "on / पर", d1: "in / में", d2: "at / पर", d3: "by / के पास" },
  { s: "He _____ to school every day by bus.", sH: "वह हर दिन बस _____ स्कूल जाता है।", a: "goes / से जाता", d1: "go / जाता", d2: "going / जाते हुए", d3: "gone / गया" },
  { s: "If I _____ rich, I would help the poor.", sH: "अगर मैं अमीर _____, तो गरीबों की मदद करता।", a: "were / होता", d1: "am / हूँ", d2: "was / था", d3: "will be / होऊँगा" },
  { s: "She _____ her homework before dinner.", sH: "उसने रात के खाने से पहले अपना गृहकार्य _____ ।", a: "had completed / पूरा कर लिया था", d1: "has completed / पूरा कर लिया है", d2: "completing / पूरा कर रहा", d3: "complete / पूरा करना" },
  { s: "The doctor advised me to _____ smoking.", sH: "डॉक्टर ने मुझे धूम्रपान _____ की सलाह दी।", a: "give up / छोड़ने", d1: "give in / हार मानने", d2: "give away / दान करने", d3: "give out / बाँटने" },
  { s: "They congratulated him _____ his success.", sH: "उन्होंने उसकी सफलता _____ बधाई दी।", a: "on / पर", d1: "for / के लिए", d2: "at / पर", d3: "in / में" },
  { s: "Hard work is the key _____ success.", sH: "कड़ी मेहनत सफलता _____ कुंजी है।", a: "to / की", d1: "of / का", d2: "for / के लिए", d3: "in / में" },
  { s: "She is _____ than her sister.", sH: "वह अपनी बहन _____ है।", a: "taller / से लंबी", d1: "more tall / अधिक लंबी", d2: "tallest / सबसे लंबी", d3: "most tall / सबसे अधिक लंबी" },
  { s: "I _____ never forget your kindness.", sH: "मैं आपकी दयालुता _____ नहीं भूलूँगा।", a: "shall / कभी", d1: "will / कभी", d2: "should / कभी", d3: "would / कभी" },
  { s: "The news _____ very disturbing.", sH: "समाचार बहुत _____ थे।", a: "was / परेशान करने वाला", d1: "were / परेशान करने वाले", d2: "have been / रहे हैं", d3: "are being / हो रहे हैं" },
  { s: "He prevented me _____ going there.", sH: "उसने मुझे वहाँ जाने _____ रोका।", a: "from / से", d1: "to / के लिए", d2: "for / के लिए", d3: "against / के विरुद्ध" },
  { s: "She takes _____ her mother in looks.", sH: "वह शक्ल में अपनी माँ _____ ।", a: "after / पर गई है", d1: "on / पर", d2: "up / ऊपर", d3: "to / से" },
  { s: "He is _____ to none in intelligence.", sH: "वह बुद्धि में किसी से _____ नहीं।", a: "second / कम", d1: "first / पहले", d2: "equal / बराबर", d3: "next / अगला" },
  { s: "You must abstain _____ smoking.", sH: "आपको धूम्रपान _____ बचना चाहिए।", a: "from / से", d1: "of / का", d2: "with / के साथ", d3: "to / के लिए" },
  { s: "She is blind _____ her daughter's faults.", sH: "वह अपनी बेटी की गलतियों _____ अनजान है।", a: "to / से", d1: "on / पर", d2: "for / के लिए", d3: "with / के साथ" },
  { s: "He is quite _____ in his field of work.", sH: "वह अपने कार्यक्षेत्र में काफी _____ है।", a: "proficient / निपुण", d1: "proficiency / निपुणता", d2: "proficiently / कुशलता से", d3: "profession / पेशा" },
  { s: "The cat jumped _____ the wall.", sH: "बिल्ली दीवार _____ कूद गई।", a: "over / के ऊपर से", d1: "above / के ऊपर", d2: "upon / पर", d3: "on / पर" },
  { s: "He insisted _____ my going to the party.", sH: "उसने मेरे पार्टी में जाने _____ ज़ोर दिया।", a: "on / पर", d1: "for / के लिए", d2: "at / पर", d3: "to / के लिए" },
  { s: "We should cope _____ the difficulties bravely.", sH: "हमें कठिनाइयों _____ बहादुरी से निपटना चाहिए।", a: "with / से", d1: "up / ऊपर", d2: "for / के लिए", d3: "to / के लिए" }
];
fibData.forEach((s, i) => {
  const ci = (i + 3) % 4;
  const opts = [s.d1, s.d2, s.d3];
  opts.splice(ci, 0, s.a);
  pool.push({ text: `Fill in the blank / रिक्त स्थान भरें: "${s.s}" / "${s.sH}"`, options: opts, correctIndex: ci, explanation: `Correct answer: ${s.a}. / सही उत्तर: ${s.a}।`, sectionName: "English Comprehension" });
});

// ===================== ACTIVE / PASSIVE VOICE (20) =====================
const apData = [
  { active: "She writes a letter.", activeH: "वह एक पत्र लिखती है।", passive: "A letter is written by her. / उसके द्वारा एक पत्र लिखा जाता है।", d1: "A letter was written by her. / उसके द्वारा एक पत्र लिखा गया।", d2: "A letter has written by her. / उसके द्वारा एक पत्र लिखा है।", d3: "A letter were written by her. / उसके द्वारा एक पत्र लिखे गए।" },
  { active: "Ram killed the snake.", activeH: "राम ने साँप को मारा।", passive: "The snake was killed by Ram. / साँप राम द्वारा मारा गया।", d1: "The snake is killed by Ram. / साँप राम द्वारा मारा जाता है।", d2: "The snake has been killed by Ram. / साँप राम द्वारा मारा गया है।", d3: "The snake had killed Ram. / साँप ने राम को मारा था।" },
  { active: "They are playing cricket.", activeH: "वे क्रिकेट खेल रहे हैं।", passive: "Cricket is being played by them. / उनके द्वारा क्रिकेट खेला जा रहा है।", d1: "Cricket was being played by them. / उनके द्वारा क्रिकेट खेला जा रहा था।", d2: "Cricket has been played by them. / उनके द्वारा क्रिकेट खेला गया है।", d3: "Cricket is played by them. / उनके द्वारा क्रिकेट खेला जाता है।" },
  { active: "She has completed the project.", activeH: "उसने परियोजना पूरी कर ली है।", passive: "The project has been completed by her. / परियोजना उसके द्वारा पूरी की जा चुकी है।", d1: "The project had been completed by her. / परियोजना उसके द्वारा पूरी की जा चुकी थी।", d2: "The project was completed by her. / परियोजना उसके द्वारा पूरी की गई।", d3: "The project is completed by her. / परियोजना उसके द्वारा पूरी की जाती है।" },
  { active: "The police arrested the thief.", activeH: "पुलिस ने चोर को गिरफ्तार किया।", passive: "The thief was arrested by the police. / चोर पुलिस द्वारा गिरफ्तार किया गया।", d1: "The thief is arrested by the police. / चोर पुलिस द्वारा गिरफ्तार किया जाता है।", d2: "The thief has been arrested by the police. / चोर पुलिस द्वारा गिरफ्तार किया गया है।", d3: "The thief were arrested by the police. / चोर पुलिस द्वारा गिरफ्तार किए गए।" },
  { active: "He will deliver the parcel tomorrow.", activeH: "वह कल पार्सल वितरित करेगा।", passive: "The parcel will be delivered by him tomorrow. / पार्सल कल उसके द्वारा वितरित किया जाएगा।", d1: "The parcel would be delivered by him. / पार्सल उसके द्वारा वितरित किया जाएगा।", d2: "The parcel shall be delivered by him. / पार्सल उसके द्वारा वितरित किया जाएगा।", d3: "The parcel is delivered by him tomorrow. / पार्सल कल उसके द्वारा वितरित किया जाता है।" },
  { active: "Mother is cooking food.", activeH: "माँ खाना पका रही है।", passive: "Food is being cooked by mother. / माँ द्वारा खाना पकाया जा रहा है।", d1: "Food was being cooked by mother. / माँ द्वारा खाना पकाया जा रहा था।", d2: "Food has been cooked by mother. / माँ द्वारा खाना पकाया गया है।", d3: "Food was cooked by mother. / माँ द्वारा खाना पकाया गया।" },
  { active: "The teacher punished the students.", activeH: "शिक्षक ने छात्रों को दंडित किया।", passive: "The students were punished by the teacher. / छात्रों को शिक्षक द्वारा दंडित किया गया।", d1: "The students are punished by the teacher. / छात्रों को शिक्षक द्वारा दंडित किया जाता है।", d2: "The students has been punished by the teacher. / छात्रों को दंडित किया गया है।", d3: "The students is punished by the teacher. / छात्र को दंडित किया जाता है।" },
  { active: "I had written a letter before he came.", activeH: "उसके आने से पहले मैंने पत्र लिख लिया था।", passive: "A letter had been written by me before he came. / उसके आने से पहले मेरे द्वारा पत्र लिखा जा चुका था।", d1: "A letter was written by me before he came. / मेरे द्वारा पत्र लिखा गया।", d2: "A letter has been written by me before he came. / मेरे द्वारा पत्र लिखा गया है।", d3: "A letter have been written by me. / मेरे द्वारा पत्र लिखा गया है।" },
  { active: "People speak English all over the world.", activeH: "लोग पूरी दुनिया में अंग्रेजी बोलते हैं।", passive: "English is spoken all over the world. / पूरी दुनिया में अंग्रेजी बोली जाती है।", d1: "English was spoken all over the world. / पूरी दुनिया में अंग्रेजी बोली गई।", d2: "English has been spoken all over the world. / पूरी दुनिया में अंग्रेजी बोली गई है।", d3: "English were spoken all over the world. / पूरी दुनिया में अंग्रेजी बोली गई।" },
  { active: "Someone has stolen my wallet.", activeH: "किसी ने मेरा बटुआ चुरा लिया है।", passive: "My wallet has been stolen. / मेरा बटुआ चुरा लिया गया है।", d1: "My wallet was stolen. / मेरा बटुआ चुराया गया।", d2: "My wallet had been stolen. / मेरा बटुआ चुराया जा चुका था।", d3: "My wallet is stolen. / मेरा बटुआ चुराया जाता है।" },
  { active: "The child was eating an apple.", activeH: "बच्चा सेब खा रहा था।", passive: "An apple was being eaten by the child. / बच्चे द्वारा सेब खाया जा रहा था।", d1: "An apple is being eaten by the child. / बच्चे द्वारा सेब खाया जा रहा है।", d2: "An apple has been eaten by the child. / बच्चे द्वारा सेब खाया गया है।", d3: "An apple was eaten by the child. / बच्चे द्वारा सेब खाया गया।" },
  { active: "He can solve this problem.", activeH: "वह इस समस्या को हल कर सकता है।", passive: "This problem can be solved by him. / यह समस्या उसके द्वारा हल की जा सकती है।", d1: "This problem could be solved by him. / यह समस्या उसके द्वारा हल की जा सकती थी।", d2: "This problem is solved by him. / यह समस्या उसके द्वारा हल की जाती है।", d3: "This problem will be solved by him. / यह समस्या उसके द्वारा हल की जाएगी।" },
  { active: "She must finish the work today.", activeH: "उसे आज काम खत्म करना चाहिए।", passive: "The work must be finished by her today. / आज काम उसके द्वारा खत्म किया जाना चाहिए।", d1: "The work should be finished by her. / काम उसके द्वारा खत्म किया जाना चाहिए।", d2: "The work will be finished by her. / काम उसके द्वारा खत्म किया जाएगा।", d3: "The work has to finish by her. / काम उसे खत्म करना है।" },
  { active: "They will have completed the bridge by March.", activeH: "वे मार्च तक पुल पूरा कर चुके होंगे।", passive: "The bridge will have been completed by them by March. / मार्च तक पुल उनके द्वारा पूरा कर लिया गया होगा।", d1: "The bridge would have been completed by them. / पुल उनके द्वारा पूरा किया गया होता।", d2: "The bridge has been completed by them. / पुल उनके द्वारा पूरा किया गया है।", d3: "The bridge will be completed by them. / पुल उनके द्वारा पूरा किया जाएगा।" },
  { active: "Do not open the door.", activeH: "दरवाज़ा मत खोलो।", passive: "Let the door not be opened. / दरवाज़ा न खोला जाए।", d1: "The door is not to be opened. / दरवाज़ा नहीं खोला जाना है।", d2: "The door should not opened. / दरवाज़ा नहीं खुलना चाहिए।", d3: "The door may not be opened. / दरवाज़ा नहीं खोला जा सकता।" },
  { active: "Who broke the window?", activeH: "खिड़की किसने तोड़ी?", passive: "By whom was the window broken? / खिड़की किसके द्वारा तोड़ी गई?", d1: "Who was the window broken by? / खिड़की किसके द्वारा तोड़ी गई?", d2: "The window was broken by whom? / खिड़की किसके द्वारा तोड़ी गई?", d3: "The window is broken by who? / खिड़की किसके द्वारा तोड़ी जाती है?" },
  { active: "Please help me.", activeH: "कृपया मेरी मदद करें।", passive: "You are requested to help me. / आपसे मेरी मदद करने का अनुरोध है।", d1: "I am requested to be helped. / मुझसे मदद का अनुरोध है।", d2: "Help is requested by me. / मेरे द्वारा मदद का अनुरोध है।", d3: "Let me be helped. / मेरी मदद की जाए।" },
  { active: "Sita sings a song beautifully.", activeH: "सीता सुंदर गाना गाती है।", passive: "A song is sung beautifully by Sita. / सीता द्वारा सुंदर गाना गाया जाता है।", d1: "A song was sung beautifully by Sita. / सीता द्वारा गाना गाया गया।", d2: "A song has been sung by Sita. / सीता द्वारा गाना गाया गया है।", d3: "A song were sung by Sita. / सीता द्वारा गाना गाए गए।" },
  { active: "The boy had eaten the cake.", activeH: "लड़के ने केक खा लिया था।", passive: "The cake had been eaten by the boy. / केक लड़के द्वारा खाया जा चुका था।", d1: "The cake has been eaten by the boy. / केक लड़के द्वारा खाया गया है।", d2: "The cake was eaten by the boy. / केक लड़के द्वारा खाया गया।", d3: "The cake is eaten by the boy. / केक लड़के द्वारा खाया जाता है।" }
];
apData.forEach((s, i) => {
  const ci = i % 4;
  const opts = [s.d1, s.d2, s.d3];
  opts.splice(ci, 0, s.passive);
  pool.push({ text: `Convert to Passive Voice / कर्मवाच्य में बदलें: "${s.active}" / "${s.activeH}"`, options: opts, correctIndex: ci, explanation: `Passive: ${s.passive}`, sectionName: "English Comprehension" });
});

// ===================== DIRECT / INDIRECT SPEECH (15) =====================
const disData = [
  { direct: 'He said, "I am happy."', directH: 'उसने कहा, "मैं खुश हूँ।"', indirect: "He said that he was happy. / उसने कहा कि वह खुश था।", d1: "He said that he is happy. / उसने कहा कि वह खुश है।", d2: "He said that I was happy. / उसने कहा कि मैं खुश था।", d3: "He told that he was happy. / उसने बताया कि वह खुश था।" },
  { direct: 'She said, "I will come tomorrow."', directH: 'उसने कहा, "मैं कल आऊँगी।"', indirect: "She said that she would come the next day. / उसने कहा कि वह अगले दिन आएगी।", d1: "She said that she will come tomorrow. / उसने कहा कि वह कल आएगी।", d2: "She said that I would come the next day. / उसने कहा कि मैं अगले दिन आऊँगी।", d3: "She told she would come tomorrow. / उसने बताया वह कल आएगी।" },
  { direct: 'He said to me, "Where do you live?"', directH: 'उसने मुझसे कहा, "तुम कहाँ रहते हो?"', indirect: "He asked me where I lived. / उसने मुझसे पूछा कि मैं कहाँ रहता था।", d1: "He asked me where do I live. / उसने मुझसे पूछा कि मैं कहाँ रहता हूँ।", d2: "He told me where I lived. / उसने मुझे बताया कि मैं कहाँ रहता था।", d3: "He asked me that where I lived. / उसने मुझसे पूछा कि कहाँ मैं रहता था।" },
  { direct: 'She said, "I have finished my work."', directH: 'उसने कहा, "मैंने अपना काम पूरा कर लिया है।"', indirect: "She said that she had finished her work. / उसने कहा कि उसने अपना काम पूरा कर लिया था।", d1: "She said that she has finished her work. / उसने कहा कि उसने अपना काम पूरा कर लिया है।", d2: "She told that she had finished her work. / उसने बताया कि उसने काम पूरा कर लिया था।", d3: "She said that I had finished my work. / उसने कहा कि मैंने काम पूरा कर लिया था।" },
  { direct: 'He said, "Do not make noise."', directH: 'उसने कहा, "शोर मत करो।"', indirect: "He ordered not to make noise. / उसने शोर न करने का आदेश दिया।", d1: "He said to not make noise. / उसने शोर न करने को कहा।", d2: "He ordered that do not make noise. / उसने आदेश दिया कि शोर मत करो।", d3: "He told don't make noise. / उसने कहा शोर मत करो।" },
  { direct: 'The teacher said, "The earth revolves around the sun."', directH: 'शिक्षक ने कहा, "पृथ्वी सूर्य के चारों ओर घूमती है।"', indirect: "The teacher said that the earth revolves around the sun. / शिक्षक ने कहा कि पृथ्वी सूर्य के चारों ओर घूमती है।", d1: "The teacher said that the earth revolved around the sun. / शिक्षक ने कहा कि पृथ्वी घूमती थी।", d2: "The teacher told the earth revolves. / शिक्षक ने बताया पृथ्वी घूमती है।", d3: "The teacher said that earth was revolving. / शिक्षक ने कहा कि पृथ्वी घूम रही थी।" },
  { direct: 'He said to me, "Please lend me your book."', directH: 'उसने मुझसे कहा, "कृपया मुझे अपनी पुस्तक दो।"', indirect: "He requested me to lend him my book. / उसने मुझसे अपनी पुस्तक देने का अनुरोध किया।", d1: "He told me to lend him my book. / उसने मुझे पुस्तक देने को कहा।", d2: "He asked me to please lend my book. / उसने मुझसे कृपया पुस्तक देने को कहा।", d3: "He said to lend his book. / उसने पुस्तक देने को कहा।" },
  { direct: 'She said, "I was reading a novel."', directH: 'उसने कहा, "मैं उपन्यास पढ़ रही थी।"', indirect: "She said that she had been reading a novel. / उसने कहा कि वह उपन्यास पढ़ रही थी।", d1: "She said that she was reading a novel. / उसने कहा कि वह उपन्यास पढ़ रही थी।", d2: "She told that she had been reading a novel. / उसने बताया कि वह पढ़ रही थी।", d3: "She said that I had been reading. / उसने कहा कि मैं पढ़ रही थी।" },
  { direct: 'Ram said, "Alas! I am ruined."', directH: 'राम ने कहा, "हाय! मैं बर्बाद हो गया।"', indirect: "Ram exclaimed with sorrow that he was ruined. / राम ने दुख से कहा कि वह बर्बाद हो गया था।", d1: "Ram said sadly that he is ruined. / राम ने दुखी होकर कहा कि वह बर्बाद है।", d2: "Ram cried that he was ruined. / राम ने रोकर कहा कि वह बर्बाद हो गया।", d3: "Ram exclaimed that I was ruined. / राम ने कहा कि मैं बर्बाद हो गया।" },
  { direct: 'She said, "What a beautiful painting!"', directH: 'उसने कहा, "क्या सुंदर चित्र है!"', indirect: "She exclaimed that it was a very beautiful painting. / उसने प्रशंसा से कहा कि वह बहुत सुंदर चित्र था।", d1: "She said what a beautiful painting. / उसने कहा क्या सुंदर चित्र।", d2: "She exclaimed that it is a beautiful painting. / उसने कहा कि यह सुंदर चित्र है।", d3: "She told it was a beautiful painting. / उसने बताया वह सुंदर चित्र था।" },
  { direct: 'He said to her, "Are you coming to the party?"', directH: 'उसने उससे कहा, "क्या तुम पार्टी में आ रही हो?"', indirect: "He asked her if she was coming to the party. / उसने उससे पूछा कि क्या वह पार्टी में आ रही थी।", d1: "He asked her that was she coming. / उसने पूछा कि क्या वह आ रही थी।", d2: "He told her if she was coming. / उसने उसे बताया कि क्या वह आ रही थी।", d3: "He asked her are you coming. / उसने पूछा क्या तुम आ रही हो।" },
  { direct: 'The captain said, "Let us start the game."', directH: 'कप्तान ने कहा, "चलो खेल शुरू करते हैं।"', indirect: "The captain suggested that they should start the game. / कप्तान ने सुझाव दिया कि उन्हें खेल शुरू करना चाहिए।", d1: "The captain said to start the game. / कप्तान ने खेल शुरू करने को कहा।", d2: "The captain told let us start. / कप्तान ने कहा चलो शुरू करते हैं।", d3: "The captain ordered to start the game. / कप्तान ने खेल शुरू करने का आदेश दिया।" },
  { direct: 'Mother said, "May you live long!"', directH: 'माँ ने कहा, "तुम दीर्घायु हो!"', indirect: "Mother wished that I might live long. / माँ ने कामना की कि मैं दीर्घायु हूँ।", d1: "Mother said that I may live long. / माँ ने कहा कि मैं लंबे समय तक जीऊँ।", d2: "Mother told me to live long. / माँ ने मुझसे लंबे समय तक जीने को कहा।", d3: "Mother wished I would live long. / माँ ने कामना की कि मैं लंबे समय तक जीऊँगा।" },
  { direct: 'He said, "I can swim across the river."', directH: 'उसने कहा, "मैं नदी पार तैर सकता हूँ।"', indirect: "He said that he could swim across the river. / उसने कहा कि वह नदी पार तैर सकता था।", d1: "He said that he can swim across the river. / उसने कहा कि वह तैर सकता है।", d2: "He told that I could swim. / उसने बताया कि मैं तैर सकता था।", d3: "He said he is able to swim. / उसने कहा कि वह तैरने में सक्षम है।" },
  { direct: 'She said to him, "Why are you late?"', directH: 'उसने उससे कहा, "तुम देर से क्यों हो?"', indirect: "She asked him why he was late. / उसने उससे पूछा कि वह देर से क्यों था।", d1: "She asked him why was he late. / उसने पूछा कि वह देर से क्यों था।", d2: "She told him why he was late. / उसने उसे बताया कि वह देर से क्यों था।", d3: "She asked him that why he is late. / उसने पूछा कि वह देर से क्यों है।" }
];
disData.forEach((s, i) => {
  const ci = (i + 1) % 4;
  const opts = [s.d1, s.d2, s.d3];
  opts.splice(ci, 0, s.indirect);
  pool.push({ text: `Convert to Indirect Speech / अप्रत्यक्ष कथन में बदलें: ${s.direct} / ${s.directH}`, options: opts, correctIndex: ci, explanation: `Indirect: ${s.indirect}`, sectionName: "English Comprehension" });
});

console.log(`English Pool size: ${pool.length}`);
module.exports = pool;
