import { EXAMS } from './mockData';

export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  readTime: string;
  examSlug: string;
  examName: string;
  category: string;
  icon: string;
  type?: 'syllabus' | 'salary' | 'cutoff' | 'info';
  sections?: { title: string; paragraphs: string[] }[];
  details: {
    postName: string;
    authority: string;
    totalMarks: number;
    durationMinutes: number;
    negativeMarking: string;
    eligibility: string;
    ageLimit: string;
    subjects: { name: string; marks: number; questions: number }[];
    fullSyllabus: { section: string; topics: string[] }[];
    prepTips: string[];
  };
}

const staticBlogs: BlogArticle[] = [
  {
    slug: "hssc-haryana-police-constable-syllabus-pattern",
    title: "HSSC Haryana Police Constable Syllabus & Exam Pattern 2026",
    description: "Get the complete detailed subject-wise syllabus, marks weightage, eligibility, and preparation guidelines for Haryana Police Constable Recruitment.",
    publishDate: "June 20, 2026",
    readTime: "6 min read",
    examSlug: "hssc-haryana-police",
    examName: "HSSC Haryana Police",
    category: "State Police",
    icon: "👮",
    details: {
      postName: "Haryana Police Constable (Male & Female)",
      authority: "Haryana Staff Selection Commission (HSSC)",
      totalMarks: 100,
      durationMinutes: 90,
      negativeMarking: "No Negative Marking",
      eligibility: "10+2 (Intermediate) from a recognized board. Matric with Hindi or Sanskrit as one of the subjects.",
      ageLimit: "18 to 25 Years (Relaxation as per Haryana Govt rules)",
      subjects: [
        { name: "Haryana General Knowledge", marks: 20, questions: 20 },
        { name: "General Knowledge & Current Affairs", marks: 20, questions: 20 },
        { name: "Numerical Ability (Mathematics)", marks: 15, questions: 15 },
        { name: "Reasoning Ability", marks: 15, questions: 15 },
        { name: "General Science", marks: 10, questions: 10 },
        { name: "Computer Knowledge", marks: 10, questions: 10 },
        { name: "Agriculture & Animal Husbandry", marks: 10, questions: 10 }
      ],
      fullSyllabus: [
        {
          section: "Haryana General Knowledge (20% Weightage)",
          topics: [
            "History, Geography, Culture, and Heritage of Haryana",
            "State Policies, Welfare Schemes, and Administration",
            "Haryana Budget, Economy, and Current Affairs of the state",
            "Famous Places, Rivers, Lakes, and Monuments in Haryana"
          ]
        },
        {
          section: "Numerical Ability (Mathematics)",
          topics: [
            "Number Systems, Simplification, Decimals, and Fractions",
            "Percentage, Ratio and Proportion, Average",
            "Profit & Loss, Simple and Compound Interest",
            "Time and Work, Time, Speed & Distance",
            "Basic Mensuration, Tables, and Graphs"
          ]
        },
        {
          section: "Computer Knowledge (10% Weightage)",
          topics: [
            "Fundamentals of Computers & Computer Architecture",
            "Operating Systems (Windows, Linux basics)",
            "MS Office Suite (Word, Excel, PowerPoint)",
            "Internet, Emails, Web Browsers, and Cybersecurity",
            "Networking basics and Keyboard shortcuts"
          ]
        },
        {
          section: "Agriculture & Animal Husbandry",
          topics: [
            "Types of Crops, Soil, Irrigation, and Farming practices",
            "Common agricultural terms and crop diseases (e.g. Karnal Bunt)",
            "Different breeds of cattle and buffalo (e.g. Murra buffalo)",
            "Animal diseases, gestation periods, and dairy farming",
            "National and state agricultural schemes"
          ]
        }
      ],
      prepTips: [
        "Focus heavily on Haryana GK and Computer basics as they carry 30% of total marks and are highly scoring.",
        "Solve mock tests regularly to manage time, keeping in mind there is no negative marking, so try to attempt all questions.",
        "Prepare fundamental concepts of Agriculture and Animal Husbandry, as standard textbooks often miss these state-specific questions."
      ]
    }
  },
  {
    slug: "ssc-cgl-info",
    title: "SSC CGL Recruitment 2026: 12,256 Posts, Dates, Eligibility, and How to Prepare",
    description: "The Staff Selection Commission has reopened applications for 12,256 Group B and Group C posts. Here is the complete breakdown of vacancies, dates, eligibility, and preparation.",
    publishDate: "May 21, 2026",
    readTime: "6 min read",
    examSlug: "ssc-cgl",
    examName: "SSC CGL",
    category: "SSC Exams",
    icon: "✍️",
    type: "info",
    sections: [
      {
        title: "SSC CGL 2026 at a Glance",
        paragraphs: [
          "The Staff Selection Commission has reopened applications for the Combined Graduate Level Exam, and this year the scale is hard to ignore. SSC CGL Recruitment 2026 covers 12,256 posts across Group-B and Group-C. If you are a graduate hoping for a stable central government job, this is one of the strongest openings on the calendar.",
          "Here is the quick snapshot before the details. Keep this table handy while you fill your form:",
          "[TABLE]\nDetail | Information\nConducting body | Staff Selection Commission (SSC)\nExam name | Combined Graduate Level (CGL) 2026\nTotal vacancies | 12,256\nApplication starts | 21 May 2026\nApplication last date | 25 June 2026\nFee payment last date | 26 June 2026\nAge limit | 18-32 years (as on 01 August 2026)\nEligibility | Graduation in any stream\nSelection | Tier-I and Tier-II exams\nOfficial website | ssc.gov.in",
          "With more than 12,000 seats, this is a large recruitment cycle. But the application window is short, so treat the deadline seriously."
        ]
      },
      {
        title: "SSC CGL 2026 Important Dates",
        paragraphs: [
          "Miss one date, and you lose a full attempt. Here is the complete timeline so nothing slips past you:",
          "• Application starts: 21 May 2026\n• Application last date: 25 June 2026\n• Last date for fee payment: 26 June 2026\n• Correction window: 01-03 July 2026\n• Tier-I exam: August–September 2026\n• Tier-II exam: December 2026\n• Admit card: Released before each exam\n• Result: Announced on the official website",
          "Pay attention to the correction window. If you make a mistake on your form, you have from 1 to 3 July 2026 to fix it. After that, your details are locked. Apply before 25 June and use the correction window to double-check everything."
        ]
      },
      {
        title: "SSC CGL 2026 Vacancy Details",
        paragraphs: [
          "The 12,256 posts are split across two groups, each with its own set of roles. Knowing them helps you understand what job you are actually competing for.",
          "Key Group-B Posts (These are the higher-profile, more competitive roles):\n• Assistant Audit Officer (Central and State Cadre)\n• Assistant Accounts Officer\n• Assistant Section Officer (ASO)\n• Inspector of Income Tax\n• Inspector (Central Excise, Preventive Officer, Examiner)\n• Assistant Enforcement Officer\n• Sub-Inspector (CBI and NIA)\n• Junior Statistical Officer (JSO)\n• Research Assistant and Divisional Accountant",
          "Key Group-C Posts (These roles usually carry a higher number of openings):\n• Auditor\n• Accountant / Junior Accountant\n• Tax Assistant\n• Senior Secretariat Assistant / Upper Division Clerk (UDC)\n• Postal Assistant / Sorting Assistant",
          "Your target depends on your rank and post preference. Group-B roles bring more responsibility and pay. Group-C roles often have more seats and slightly lower cut-offs. Decide your post preferences early."
        ]
      },
      {
        title: "SSC CGL 2026 Eligibility",
        paragraphs: [
          "Eligibility is the first filter. Miss any condition here, and your form gets rejected, so read this part carefully.",
          "• Educational Qualification: For most posts, you need a graduation degree in any stream from a recognized university. B.A., B.Com, B.Sc, or B.Tech all count equally. The only exception is the Junior Statistical Officer (JSO) post, which has a special requirement: 60% marks in Mathematics at the 12th standard level, or a Bachelor's degree with Statistics as one of the subjects.",
          "• Age Limit (as on 01 August 2026): Minimum age: 18 years, Maximum age: 32 years. SSC offers age relaxation to reserved categories under government rules. SC, ST, OBC, PwD, and ex-servicemen get extra years above the upper limit."
        ]
      },
      {
        title: "SSC CGL 2026 Application Fee",
        paragraphs: [
          "The fee is low, and many candidates pay nothing at all:",
          "• General, OBC, EWS: ₹100\n• Female candidates (all categories): Free\n• PwD candidates: Free",
          "You can pay online using debit card, credit card, internet banking, IMPS, or mobile wallets."
        ]
      },
      {
        title: "SSC CGL 2026 Selection Process",
        paragraphs: [
          "You will not clear this exam in a single sitting. SSC selects candidates through two main stages, and both matter:",
          "1. Tier-I (August–September 2026): An online objective test. It covers General Intelligence and Reasoning, General Awareness, Quantitative Aptitude, and English Comprehension. This stage is qualifying. It decides who moves to Tier-II.\n2. Tier-II (December 2026): The deciding stage. It goes deeper into quantitative ability, reasoning, English, statistics, and, for some posts, computer knowledge. Your final merit comes from here.",
          "In plain terms: Tier-I gets you through the door, and Tier-II decides your rank and post. Build your strategy around Tier-II, but remember you cannot reach it without a strong Tier-I score."
        ]
      },
      {
        title: "How to Fill the SSC CGL 2026 Online Form",
        paragraphs: [
          "Filling the form is straightforward when you follow the right order. Here are the steps:",
          "1. Go to the official SSC website at ssc.gov.in.\n2. Complete your One-Time Registration (OTR) if you have not already.\n3. Log in and open the SSC CGL 2026 application.\n4. Fill in your personal, educational, and category details carefully.\n5. Upload your photo and signature in the correct format.\n6. Pay the application fee, if it applies to you.\n7. Submit the form before 25 June 2026 and save a printout.",
          "One habit before you start: read the official notification from beginning to end. Pay close attention to the last date, age limit, and qualification sections. Apply only through ssc.gov.in."
        ]
      },
      {
        title: "Why Mock Tests Decide Your SSC CGL Result",
        paragraphs: [
          "Here is a truth most candidates learn too late. Knowing the syllabus and performing under a clock are two very different skills. SSC CGL tests speed and accuracy at the same time, and that pressure is what trips people up.",
          "Regular mock test practice fixes this in four ways:\n• Builds exam-day stamina. You stay sharp across the full paper, not just the first 20 minutes.\n• Sharpens time management. You learn which sections eat your clock, and how to stop them.\n• Exposes weak spots early. Each test shows where you lose marks, so you fix it before it counts.\n• Cuts exam stress. Once the format feels familiar, the real paper stops feeling like a surprise.",
          "The candidates who clear SSC CGL are rarely the ones who studied the longest. They are the ones who practiced the smartest."
        ]
      },
      {
        title: "Start With Free SSC CGL Mock Tests",
        paragraphs: [
          "You can begin today. Our website offers free SSC CGL mock tests built around the latest exam pattern, covering both Tier-I and Tier-II. Each test matches the real difficulty level, gives you an instant score, and points out your weak topics.",
          "Take a few full-length mocks, track how your scores move, and turn vague preparation into measurable progress. Practice now, and you will walk into the exam hall with confidence instead of guesswork."
        ]
      },
      {
        title: "SSC CGL 2026: Frequently Asked Questions",
        paragraphs: [
          "Q: When does the SSC CGL 2026 application start?\nA: The application started on 21 May 2026, and the form has been reopened.",
          "Q: What is the last date to apply?\nA: You can apply until 25 June 2026. The last date for fee payment is 26 June 2026.",
          "Q: How many vacancies are there?\nA: There are 12,256 posts in total, across Group-B and Group-C.",
          "Q: What is the age limit?\nA: You must be between 18 and 32 years as on 01 August 2026. Reserved categories get relaxation as per SSC rules.",
          "Q: What is the eligibility?\nA: A graduation degree in any stream from a recognized university. JSO post needs 60% in Maths at the 12th level, or Statistics as a degree subject.",
          "Q: What is the application fee?\nA: ₹100 for General, OBC, and EWS candidates. Female and PwD candidates apply free.",
          "Q: What is the selection process?\nA: Two stages: Tier-I and Tier-II. Tier-II decides your final merit and post.",
          "Q: When is the correction window?\nA: You can edit your form between 01 and 03 July 2026.",
          "Q: Where can I take SSC CGL mock tests?\nA: On our website. The free SSC CGL mock tests follow the latest pattern and give you instant feedback."
        ]
      }
    ],
    details: {
      postName: "SSC Combined Graduate Level (CGL) Group B & C",
      authority: "Staff Selection Commission (SSC)",
      totalMarks: 200,
      durationMinutes: 60,
      negativeMarking: "0.50 Marks deducted per wrong answer",
      eligibility: "Bachelor's Degree in any discipline from a recognized University.",
      ageLimit: "18 to 32 Years (Varies based on post profile)",
      subjects: [
        { name: "General Intelligence & Reasoning", marks: 50, questions: 25 },
        { name: "Quantitative Aptitude (Mathematics)", marks: 50, questions: 25 },
        { name: "General Awareness", marks: 50, questions: 25 },
        { name: "English Comprehension", marks: 50, questions: 25 }
      ],
      fullSyllabus: [
        {
          section: "Quantitative Aptitude",
          topics: [
            "Arithmetic: Percentage, Profit & Loss, Ratio, Interest, Average, Time & Work",
            "Algebra: Basic algebraic identities, graphs of linear equations",
            "Geometry: Triangle, Circle, Quadrilateral, tangents, and theorems",
            "Mensuration: Area & Volume of 2D/3D shapes",
            "Trigonometry: Trigonometric ratios, heights, and distances",
            "Data Interpretation: Histograms, Frequency polygons, Bar diagrams, Pie charts"
          ]
        },
        {
          section: "General Intelligence & Reasoning",
          topics: [
            "Analogy, Classification, Coding-Decoding",
            "Blood Relations, Direction Sense, Venn Diagrams",
            "Syllogism, Statement-Conclusion, Decision Making",
            "Non-Verbal: Paper cutting & folding, Mirror images, Embedded figures",
            "Series completion (Number, Alphabet, Alpha-numeric)"
          ]
        },
        {
          section: "English Comprehension",
          topics: [
            "Spot the Error, Fill in the Blanks, Synonyms & Antonyms",
            "Spelling errors, Idioms & Phrases, One-word substitution",
            "Sentence Improvement, Active/Passive Voice, Direct/Indirect speech",
            "Cloze Test, Reading Comprehension passages"
          ]
        }
      ],
      prepTips: [
        "Speed is crucial since you have to attempt 100 questions in 60 minutes. Practice shortcut techniques for Quant and Reasoning.",
        "Be careful with negative marking (0.50 marks per error). Accuracy should be your top priority.",
        "Daily revision of English grammar rules and vocabulary is essential for high scores in the language section."
      ]
    }
  },
  {
    slug: "hssc-cet-info",
    title: "HSSC CET Group C Recruitment 2026: 1238 पदों पर भर्ती की पूरी जानकारी",
    description: "Haryana Staff Selection Commission (HSSC) ने CET Group C के तहत जेल विभाग में 1238 Warder और Assistant Superintendent Jail पदों के लिए नोटिफिकेशन जारी किया है।",
    publishDate: "June 24, 2026",
    readTime: "5 min read",
    examSlug: "hssc-cet",
    examName: "HSSC CET (Group C & D)",
    category: "State Exams",
    icon: "🌾",
    type: "info",
    sections: [
      {
        title: "HSSC CET Group C 2026: एक नज़र में",
        paragraphs: [
          "Haryana Staff Selection Commission (HSSC) ने Common Eligibility Test (CET) Group C के तहत 1238 पदों के लिए notification जारी कर दिया है। अगर आप Haryana में सरकारी नौकरी की तैयारी कर रहे हैं, तो यह आपके लिए एक बड़ा मौका है। इस article में आपको vacancy, eligibility, age limit, application fee, selection process और apply करने का तरीका — सब कुछ step-by-step मिलेगा।",
          "Advertisement Number है 06/2026। Online application 24 June 2026 से शुरू हो चुकी है और last date 30 June 2026 है।",
          "नीचे दी गई जानकारी आपको पूरी भर्ती का overview देगी:",
          "[TABLE]\nभर्ती संस्था | Haryana Staff Selection Commission (HSSC)\nAdvertisement No. | 06/2026\nकुल पद | 1238\nPost Name | Warder और Assistant Superintendent Jail\nApplication शुरू | 24 June 2026\nApplication की अंतिम तिथि | 30 June 2026\nSelection Process | Written Exam, Document Verification, Medical Exam\nOfficial Website | hssc.gov.in"
        ]
      },
      {
        title: "Important Dates: कौन सी तारीख याद रखनी है",
        paragraphs: [
          "तारीखें भूल जाना सबसे बड़ी गलती होती है। नीचे हर ज़रूरी date दी गई है:",
          "[TABLE]\nEvent | Date\nOnline Apply Start Date | 24 June 2026\nOnline Apply Last Date | 30 June 2026\nFee Payment की अंतिम तिथि | 30 June 2026\nCorrection Date | 01 - 02 July 2026\nExam Date | जल्द घोषित होगी\nAdmit Card | Exam से पहले\nResult Date | बाद में update होगा",
          "Takeaway: Form 30 June 2026 तक ही भरा जा सकता है, इसलिए आखिरी दिन का इंतज़ार न करें।"
        ]
      },
      {
        title: "Haryana Group C Vacancy 2026: पद का पूरा ब्यौरा",
        paragraphs: [
          "आप किस पद के लिए apply कर सकते हैं, यह जानना सबसे पहले ज़रूरी है। कुल 1238 पदों का विवरण इस प्रकार है:",
          "[TABLE]\nPost Name | पदों की संख्या\nAssistant Superintendent Jail (Male) | 30\nAssistant Superintendent Jail (Female) | 03\nWarder (Male) | 1093\nWarder (Female) | 112",
          "जैसा कि आप देख सकते हैं, सबसे ज्यादा vacancy Warder (Male) पद के लिए है — 1093 पद। यानी 10+2 pass उम्मीदवारों के लिए यह भर्ती सबसे बड़ा अवसर है."
        ]
      },
      {
        title: "Eligibility Criteria: आप योग्य हैं या नहीं",
        paragraphs: [
          "हर पद के लिए educational qualification अलग है। Apply करने से पहले यह ज़रूर check करें ताकि आपका form reject न हो.",
          "Warder के लिए योग्यता:\n• किसी मान्यता प्राप्त board से 10+2 (Intermediate) pass होना चाहिए.\n• उम्मीदवार ने CET (Group C) / Preliminary Eligibility Test (PET) qualify किया हो.",
          "Assistant Superintendent Jail के लिए योग्यता:\n• किसी मान्यता प्राप्त university से Graduation Degree होनी चाहिए.\n• उम्मीदवार ने CET (Group C) / PET qualify किया हो.",
          "Takeaway: अगर आपके पास सिर्फ 12वीं है, तो आप Warder के लिए apply कर सकते हैं। Graduate उम्मीदवार दोनों पदों पर विचार कर सकते हैं."
        ]
      },
      {
        title: "Age Limit: उम्र सीमा (30 June 2026 के अनुसार)",
        paragraphs: [
          "उम्र सीमा पद के हिसाब से बदलती है। नीचे दोनों पदों की age limit दी गई है:",
          "• Warder: 18 - 25 वर्ष\n• Assistant Superintendent Jail: 21 - 27 वर्ष",
          "HSSC अपने नियमों के अनुसार reserved categories को age relaxation यानी उम्र में छूट देता है। यह छूट SC, BC, EWS, PH और अन्य श्रेणियों पर लागू होती है। सही छूट का विवरण official notification में दिया गया है."
        ]
      },
      {
        title: "Application Fee: कितनी फीस देनी होगी",
        paragraphs: [
          "Application fee इस बात पर निर्भर करती है कि आपने PPP (Parivar Pehchan Patra) / Aadhaar verify किया है या नहीं:",
          "[TABLE]\nCategory | With PPP / Aadhaar | Without PPP / Aadhaar\nGeneral (Male) / Other State | ₹500/- | ₹1000/-\nSC / BC / EWS / PH | ₹250/- | ₹500/-\nESM / सभी महिलाएं | ₹250/- | ₹500/-",
          "Fee आप Debit Card, Credit Card, Internet Banking, IMPS या Mobile Wallet/Cash Card से online जमा कर सकते हैं. PPP / Aadhaar verify होने पर आपकी fee आधी हो जाती है, इसलिए apply करने से पहले verification पूरा कर लें."
        ]
      },
      {
        title: "Selection Process: चयन कैसे होगा",
        paragraphs: [
          "आपका final selection एक भी step पर नहीं, बल्कि तीन चरणों पर निर्भर करता है। हर stage clear करना ज़रूरी है:",
          "1. Written Examination — आपके subject knowledge और reasoning को परखने वाला मुख्य पेपर.\n2. Document Verification — आपके सभी original documents की जांच.\n3. Medical Examination — आपकी physical fitness की जांच, जो jail department के पदों के लिए ज़रूरी है.",
          "Takeaway: सिर्फ written exam pass करना काफी नहीं — documents और medical दोनों भी पूरे करने होंगे."
        ]
      },
      {
        title: "HSSC Bharti 2026 का Online Form कैसे भरें",
        paragraphs: [
          "Form भरना मुश्किल नहीं है, बशर्ते आप क्रम से चलें। नीचे दिए steps follow करें:",
          "1. HSSC की official website hssc.gov.in पर जाएं या सीधे apply link खोलें.\n2. नया registration करें और अपनी जानकारी सही-सही भरें.\n3. educational qualification, category और personal details ध्यान से दर्ज करें.\n4. ज़रूरी documents, photo और signature scan करके upload करें.\n5. अपनी category के अनुसार application fee जमा करें.\n6. Form submit करने से पहले पूरी जानकारी एक बार दोबारा check करें.\n7. भरा हुआ form 30 June 2026 से पहले submit करें और print निकाल कर रखें.",
          "ध्यान दें: Form भरने से पहले official notification को ध्यान से ज़रूर पढ़ें — खासकर last date, age limit और education qualification के section। इससे गलती की संभावना कम हो जाती है."
        ]
      },
      {
        title: "क्यों यह भर्ती आपके लिए अहम है",
        paragraphs: [
          "Haryana Group C Vacancy 2026 कई कारणों से एक मजबूत अवसर है:",
          "• बड़ी संख्या में पद: 1238 vacancy होने से selection की संभावना बेहतर है.\n• कम qualification: Warder के लिए सिर्फ 12वीं पास होना काफी है.\n• स्थिर सरकारी नौकरी: Jail department में स्थायी रोज़गार और तय salary structure मिलता है.\n• महिलाओं के लिए अलग पद: Warder (Female) और Asst. Superintendent (Female) के पद महिला उम्मीदवारों को सीधा मौका देते हैं.",
          "अगर आप eligibility पूरी करते हैं, तो देरी किए बिना apply करना समझदारी है."
        ]
      },
      {
        title: "FAQ: अक्सर पूछे जाने वाले सवाल",
        paragraphs: [
          "Q1. HSSC CET Group C Recruitment 2026 के लिए online application कब शुरू हुई?\nA1. Online application 24 June 2026 से शुरू हो चुकी है.",
          "Q2. Apply करने की अंतिम तिथि क्या है?\nA2. Online form भरने की last date 30 June 2026 है.",
          "Q3. HSSC CET Group C 2026 के लिए age limit क्या है?\nA3. Warder के लिए 18 - 25 वर्ष और Assistant Superintendent Jail के लिए 21 - 27 वर्ष है (30 June 2026 के अनुसार)। Reserved categories को नियमानुसार छूट मिलती है.",
          "Q4. इस भर्ती के लिए eligibility क्या है?\nA4. Warder के लिए 10+2 pass और Assistant Superintendent Jail के लिए Graduation ज़रूरी है। दोनों पदों के लिए CET (Group C) / PET qualify होना चाहिए.",
          "Q5. कुल कितने पदों पर भर्ती है?\nA5. कुल 1238 पद हैं — Warder (Male) 1093, Warder (Female) 112, Asst. Superintendent Jail (Male) 30 और (Female) 03.",
          "Q6. HSSC Haryana की official website कौन सी है?\nA6. HSSC की official website hssc.gov.in है."
        ]
      }
    ],
    details: {
      postName: "Warder & Assistant Superintendent Jail",
      authority: "Haryana Staff Selection Commission (HSSC)",
      totalMarks: 100,
      durationMinutes: 90,
      negativeMarking: "No Negative Marking",
      eligibility: "10+2 (Intermediate) for Warder, Graduation for Assistant Superintendent. Must have qualified CET Group C.",
      ageLimit: "18 to 25 Years (Warder) / 21 to 27 Years (Assistant Superintendent)",
      subjects: [
        { name: "Haryana GK & Culture", marks: 25, questions: 25 },
        { name: "General Awareness & Current Affairs", marks: 15, questions: 15 },
        { name: "Quantitative Ability & Reasoning", marks: 30, questions: 30 },
        { name: "English & Hindi Languages", marks: 20, questions: 20 },
        { name: "Computer Knowledge", marks: 10, questions: 10 }
      ],
      fullSyllabus: [
        {
          section: "Haryana GK (25% Weightage)",
          topics: ["History, Geography, Culture, Folk dances of Haryana", "Famous personalities, administrative divisions, districts", "Haryana Govt welfare schemes and annual budget"]
        },
        {
          section: "Quantitative & Reasoning Ability",
          topics: ["Simplification, Percentage, Ratio, Average, Interest", "Coding-Decoding, Series, Venn Diagrams, Seating Arrangement"]
        }
      ],
      prepTips: [
        "Haryana General Knowledge carries 25 marks. Prepare state GK thoroughly using standard HSSC GK books.",
        "Hindi and English are simple and high-scoring. Revise basic grammar rules of both languages.",
        "Attempt all questions since there is no negative marking."
      ]
    }
  },
  {
    slug: "rrb-ntpc-cbt-1-syllabus-exam-scheme",
    title: "RRB NTPC CBT 1 Detailed Syllabus & Marks Weightage",
    description: "Get the complete Railway Recruitment Board Non-Technical Popular Categories CBT 1 syllabus, section weightage, and negative marking structure.",
    publishDate: "June 24, 2026",
    readTime: "4 min read",
    examSlug: "rrb-ntpc",
    examName: "RRB NTPC",
    category: "Railways",
    icon: "🚆",
    details: {
      postName: "NTPC (Non-Technical Popular Categories)",
      authority: "Railway Recruitment Board (RRB)",
      totalMarks: 100,
      durationMinutes: 90,
      negativeMarking: "1/3rd (0.33) Marks deducted per wrong answer",
      eligibility: "12th Pass or Graduate depending on the specific post level applied.",
      ageLimit: "18 to 33 Years (Varies for Undergraduate & Graduate posts)",
      subjects: [
        { name: "General Awareness", marks: 40, questions: 40 },
        { name: "Mathematics", marks: 30, questions: 30 },
        { name: "General Intelligence & Reasoning", marks: 30, questions: 30 }
      ],
      fullSyllabus: [
        {
          section: "General Awareness (40 Questions)",
          topics: [
            "Current Events of National and International Importance",
            "Games and Sports, Art and Culture of India",
            "Indian Literature, Monuments and Places of India",
            "General Science and Life Science (up to 10th CBSE)",
            "History of India and Freedom Struggle",
            "Physical, Social and Economic Geography of India & World",
            "Indian Polity and Constitution",
            "General Scientific & Technological Developments (e.g. Space, Nuclear)"
          ]
        },
        {
          section: "Mathematics (30 Questions)",
          topics: [
            "Number System, Decimals, Fractions, LCM, HCF",
            "Ratio and Proportion, Percentage, Mensuration",
            "Time and Work, Time and Distance, Simple and Compound Interest",
            "Profit and Loss, Elementary Algebra, Geometry, Trigonometry",
            "Elementary Statistics"
          ]
        }
      ],
      prepTips: [
        "General Awareness carries 40% weightage. Focus on current affairs of the last 1 year and Indian Railways static GK.",
        "There is a 1/3rd negative marking which is higher than banking exams. Avoid wild guesses.",
        "Take online mocks to handle 100 questions within the 90-minute limit, especially optimizing time on GA questions."
      ]
    }
  }
];

function getCategoryAndIcon(categoryId: string, slug: string): { category: string; icon: string } {
  if (categoryId === 'cat-ssc') {
    if (slug === 'ssc-mts') return { category: "SSC Exams", icon: "📋" };
    if (slug === 'ssc-stenographer') return { category: "SSC Exams", icon: "✍️" };
    if (slug.includes('constable') || slug.includes('cpo')) return { category: "SSC Exams", icon: "👮" };
    return { category: "SSC Exams", icon: "📝" };
  } else if (categoryId === 'cat-hssc') {
    return { category: "HSSC Exams", icon: "📋" };
  } else if (categoryId === 'cat-police') {
    return { category: "State Police", icon: "👮" };
  } else if (categoryId === 'cat-teaching') {
    return { category: "Teacher Exams", icon: "🎓" };
  } else if (categoryId === 'cat-railways') {
    return { category: "Railways", icon: "🚆" };
  } else if (categoryId === 'cat-defence') {
    return { category: "Defence", icon: "⚔️" };
  } else {
    return { category: "State Exams", icon: "🗺️" };
  }
}

function getDynamicDetails(examSlug: string, examName: string, categoryId: string) {
  let authority = "";
  let postName = examName;
  let totalMarks = 100;
  let durationMinutes = 90;
  let negativeMarking = "No Negative Marking";
  let eligibility = "Bachelor's Degree in any discipline from a recognized University or equivalent.";
  let ageLimit = "18 to 30 Years";
  let subjects: { name: string; marks: number; questions: number }[] = [];
  let fullSyllabus: { section: string; topics: string[] }[] = [];
  let prepTips: string[] = [];

  if (examSlug.startsWith('sbi-')) {
    authority = "State Bank of India (SBI)";
    postName = examSlug === 'sbi-clerk' ? "Junior Associate (Customer Support & Sales)" : "Probationary Officer (PO)";
    ageLimit = examSlug === 'sbi-clerk' ? "20 to 28 Years" : "21 to 30 Years";
  } else if (examSlug.startsWith('ibps-rrb-')) {
    authority = "Institute of Banking Personnel Selection (IBPS)";
    postName = examSlug === 'ibps-rrb-po' ? "Officer Scale-I (Regional Rural Banks)" : "Office Assistant (Multipurpose)";
    ageLimit = examSlug === 'ibps-rrb-po' ? "18 to 30 Years" : "18 to 28 Years";
  } else if (examSlug.startsWith('ibps-')) {
    authority = "Institute of Banking Personnel Selection (IBPS)";
    postName = examSlug === 'ibps-po' ? "Probationary Officer (PO)" : "Clerk";
    ageLimit = examSlug === 'ibps-po' ? "20 to 30 Years" : "20 to 28 Years";
  } else if (examSlug.startsWith('rbi-')) {
    authority = "Reserve Bank of India (RBI)";
    postName = examSlug === 'rbi-grade-b' ? "Officers in Grade 'B' (General)" : "Assistant";
    ageLimit = examSlug === 'rbi-grade-b' ? "21 to 30 Years" : "20 to 28 Years";
    eligibility = examSlug === 'rbi-grade-b' ? "Bachelor's Degree with minimum 60% marks (50% for SC/ST/PwBD) or equivalent." : "Bachelor's Degree in any discipline with a minimum of 50% marks.";
  } else if (examSlug.startsWith('ssc-')) {
    authority = "Staff Selection Commission (SSC)";
    if (examSlug === 'ssc-chsl') {
      postName = "Lower Divisional Clerk (LDC) / Data Entry Operator (DEO)";
      ageLimit = "18 to 27 Years";
      eligibility = "12th Standard or equivalent exam from a recognized Board.";
    } else if (examSlug === 'ssc-mts') {
      postName = "Multi Tasking Staff (Non-Technical) & Havaldar";
      ageLimit = "18 to 25/27 Years";
      eligibility = "Matriculation (10th Class) pass from a recognized Board.";
    } else if (examSlug === 'ssc-gd-constable') {
      postName = "Constable (General Duty) in CAPFs & SSF";
      ageLimit = "18 to 23 Years";
      eligibility = "Matriculation or 10th Class pass from a recognized Board.";
    } else if (examSlug === 'ssc-cpo') {
      postName = "Sub-Inspector (SI) in Delhi Police and CAPFs";
      ageLimit = "20 to 25 Years";
      eligibility = "Bachelor's degree from a recognized university.";
    } else if (examSlug === 'ssc-stenographer') {
      postName = "Stenographer Grade 'C' & 'D'";
      ageLimit = "18 to 30 Years (Grade C) / 18 to 27 Years (Grade D)";
      eligibility = "12th Standard or equivalent exam from a recognized Board.";
    }
  } else if (examSlug === 'upsc-cse') {
    authority = "Union Public Service Commission (UPSC)";
    postName = "Civil Services Examination (IAS, IPS, IFS, etc.)";
    ageLimit = "21 to 32 Years";
  } else if (examSlug === 'uppsc-pcs') {
    authority = "Uttar Pradesh Public Service Commission (UPPSC)";
    postName = "Combined State / Upper Subordinate Services (PCS)";
    ageLimit = "21 to 40 Years";
  } else if (examSlug === 'bpsc') {
    authority = "Bihar Public Service Commission (BPSC)";
    postName = "Combined Competitive Examination (CCE)";
    ageLimit = "20/21/22 to 37 Years";
  } else if (examSlug === 'hpsc-hcs') {
    authority = "Haryana Public Service Commission (HPSC)";
    postName = "Haryana Civil Services (HCS) & Allied Services";
    ageLimit = "18 to 42 Years";
  } else if (examSlug === 'hssc-cet') {
    authority = "Haryana Staff Selection Commission (HSSC)";
    postName = "Group C & D Various Posts";
    ageLimit = "18 to 42 Years";
    eligibility = "Matriculation / 10+2 / Graduation depending on post profile.";
  } else if (examSlug === 'up-police-constable') {
    authority = "Uttar Pradesh Police Recruitment Board (UPPRPB)";
    postName = "Constable Civil Police";
    ageLimit = "18 to 22 Years (Relaxation for female candidates)";
    eligibility = "12th Pass from a recognized Board or equivalent.";
  } else if (examSlug === 'up-police-si') {
    authority = "Uttar Pradesh Police Recruitment Board (UPPRPB)";
    postName = "Sub Inspector (SI) Civil Police";
    ageLimit = "21 to 28 Years";
  } else if (examSlug === 'delhi-police-constable') {
    authority = "Staff Selection Commission (SSC) & Delhi Police";
    postName = "Constable (Executive) Male/Female";
    ageLimit = "18 to 25 Years";
    eligibility = "10+2 (Senior Secondary) pass from a recognized Board.";
  } else if (examSlug === 'bihar-police-constable') {
    authority = "Central Selection Board of Constables (CSBC), Bihar";
    postName = "Constable in Bihar Police";
    ageLimit = "18 to 25 Years";
    eligibility = "10+2 (Intermediate) pass from a recognized Board.";
  } else if (examSlug === 'rajasthan-police-constable') {
    authority = "Rajasthan Police Department";
    postName = "Constable (General/Driver/etc.)";
    ageLimit = "18 to 23 Years";
    eligibility = "12th Standard Pass from a recognized Board.";
  } else if (examSlug === 'ctet') {
    authority = "Central Board of Secondary Education (CBSE)";
    postName = "Primary & Elementary School Teacher";
    ageLimit = "No Age Limit";
    eligibility = "Senior Secondary with 50% marks & D.El.Ed / Graduation with B.Ed.";
  } else if (examSlug === 'htet') {
    authority = "Board of School Education Haryana (BSEH)";
    postName = "Haryana Teacher Eligibility Test (PRT, TGT, PGT)";
    ageLimit = "18 to 42 Years";
    eligibility = "Senior Secondary / Graduation with B.Ed or D.El.Ed & HTET criteria.";
  } else if (examSlug === 'rrb-group-d') {
    authority = "Railway Recruitment Board (RRB)";
    postName = "Level 1 (Track Maintainer, Assistant, Pointsman)";
    ageLimit = "18 to 33 Years";
    eligibility = "10th Pass or ITI from institutions recognized by NCVT/SCVT.";
  } else if (examSlug === 'rrb-alp') {
    authority = "Railway Recruitment Board (RRB)";
    postName = "Assistant Loco Pilot (ALP)";
    ageLimit = "18 to 30 Years";
    eligibility = "Matriculation/SSLC plus ITI or Diploma in Engineering.";
  } else if (examSlug === 'rpf-si') {
    authority = "Railway Recruitment Board & RPF";
    postName = "Sub Inspector & Constable in Railway Protection Force";
    ageLimit = "18 to 25 Years";
    eligibility = "Graduation for SI / 10th Pass for Constable from a recognized Board.";
  } else {
    authority = "Central/State Recruitment Board";
    postName = examName;
    ageLimit = "18 to 30 Years";
  }

  if (categoryId === 'cat-1') {
    negativeMarking = "0.25 (1/4th) Marks deducted per wrong answer";
    if (examSlug === 'rbi-grade-b') {
      totalMarks = 200;
      durationMinutes = 120;
      subjects = [
        { name: "General Awareness", marks: 80, questions: 80 },
        { name: "Reasoning Ability", marks: 60, questions: 60 },
        { name: "Quantitative Aptitude", marks: 30, questions: 30 },
        { name: "English Language", marks: 30, questions: 30 }
      ];
      fullSyllabus = [
        {
          section: "General Awareness (80 Questions)",
          topics: ["Banking & Financial awareness", "Economic & Social Issues", "Union Budget & Economic Survey", "Current Affairs of last 6 months", "Important Govt Schemes & Policies"]
        },
        {
          section: "Reasoning Ability (60 Questions)",
          topics: ["Advance Puzzles (Floor, Box, Tabulation)", "Seating Arrangement (Linear, Circular, Square)", "Syllogisms & Inequalities", "Input-Output & Coding-Decoding", "Data Sufficiency & Critical Reasoning"]
        },
        {
          section: "Quantitative Aptitude (30 Questions)",
          topics: ["Data Interpretation (Bar, Line, Caselet)", "Data Sufficiency", "Arithmetic: Percentages, Profit & Loss, Ratios", "Quadratic Equations & Number Series"]
        },
        {
          section: "English Language (30 Questions)",
          topics: ["Reading Comprehension", "Cloze Test & Error Spotting", "Para Jumbles & Sentence Starters", "Vocabulary & Word Substitution"]
        }
      ];
    } else {
      totalMarks = 100;
      durationMinutes = 60;
      subjects = [
        { name: "Quantitative Aptitude", marks: 35, questions: 35 },
        { name: "Reasoning Ability", marks: 35, questions: 35 },
        { name: "English Language", marks: 30, questions: 30 }
      ];
      fullSyllabus = [
        {
          section: "Quantitative Aptitude (35 Questions)",
          topics: ["Data Interpretation (Table, Line, Bar)", "Simplification & Approximation", "Number Series (Missing & Wrong)", "Quadratic Equations", "Arithmetic: Percentage, Profit/Loss, Average, Ratio"]
        },
        {
          section: "Reasoning Ability (35 Questions)",
          topics: ["Syllogism & Inequalities", "Seating Arrangement & Puzzles", "Coding-Decoding & Blood Relations", "Direction Sense & Alpha-numeric Series"]
        },
        {
          section: "English Language (30 Questions)",
          topics: ["Reading Comprehension", "Cloze Test & Error Detection", "Sentence Rearrangement & Fillers", "Phrase Replacement"]
        }
      ];
    }
    prepTips = [
      "Speed Calculation is critical. Memorize tables up to 30, squares up to 50, and cubes up to 20.",
      "Identify high-scoring topics first (Simplification, Number Series, Syllogism) to secure quick marks.",
      "Practice daily sectional mock tests to build speed within the 20-minute sectional timers."
    ];
  } else if (categoryId === 'cat-2') {
    negativeMarking = "0.50 Marks deducted per wrong answer";
    if (examSlug === 'ssc-mts') {
      totalMarks = 270;
      durationMinutes = 90;
      subjects = [
        { name: "Numerical & Mathematical Ability", marks: 60, questions: 20 },
        { name: "Reasoning Ability & Problem Solving", marks: 60, questions: 20 },
        { name: "General Awareness", marks: 75, questions: 25 },
        { name: "English Language & Comprehension", marks: 75, questions: 25 }
      ];
      fullSyllabus = [
        {
          section: "Numerical & Mathematical Ability (Session 1)",
          topics: ["Integers & Whole Numbers, LCM & HCF", "Decimals & Fractions, Percentages", "Ratio & Proportions, Average", "Profit & Loss, Simple Interest, Time & Work"]
        },
        {
          section: "Reasoning Ability (Session 1)",
          topics: ["Alpha-numeric Series, Coding-Decoding", "Analogy, Classification, Venn Diagrams", "Direction Sense, Non-verbal reasoning", "Age calculations & simple puzzles"]
        },
        {
          section: "General Awareness (Session 2 - Negative Marking Applies)",
          topics: ["Indian History, Art & Culture", "Geography, Civics & Economics", "Environmental Studies & General Science", "Current Affairs & Static GK"]
        },
        {
          section: "English Language & Comprehension (Session 2)",
          topics: ["English Grammar: Noun, Pronoun, Tense, Verb", "Synonyms, Antonyms & Spellings", "Sentence Correction, Cloze Test", "Reading Comprehension"]
        }
      ];
    } else if (examSlug === 'ssc-chsl') {
      totalMarks = 200;
      durationMinutes = 60;
      subjects = [
        { name: "General Intelligence & Reasoning", marks: 50, questions: 25 },
        { name: "Quantitative Aptitude (Mathematics)", marks: 50, questions: 25 },
        { name: "General Awareness", marks: 50, questions: 25 },
        { name: "English Comprehension", marks: 50, questions: 25 }
      ];
      fullSyllabus = [
        {
          section: "Quantitative Aptitude (25 Questions)",
          topics: ["Arithmetic Operations: Ratio, Percentage, Avg", "Algebra: Basic identities & linear equations", "Geometry: Triangle, Circle, Quadrilaterals", "Mensuration: Area & Volume of 2D/3D shapes", "Trigonometry & Trigonometric ratios"]
        },
        {
          section: "General Intelligence & Reasoning (25 Questions)",
          topics: ["Analogy & Classification", "Venn Diagrams & Blood Relations", "Series completion (Number, Alphabet)", "Non-Verbal: Mirror & water images, Paper folding"]
        },
        {
          section: "English Comprehension (25 Questions)",
          topics: ["Spot the Error & Fill in the Blanks", "Synonyms & Antonyms, One-word substitution", "Idioms & Phrases, Cloze Test", "Active/Passive voice, Direct/Indirect speech"]
        },
        {
          section: "General Awareness (25 Questions)",
          topics: ["History, Culture, Geography of India", "Economic Scene, General Policy & Polity", "General Science (Physics, Chemistry, Biology)", "Current National & International News"]
        }
      ];
    } else if (examSlug === 'ssc-cpo') {
      totalMarks = 200;
      durationMinutes = 60;
      subjects = [
        { name: "General Intelligence & Reasoning", marks: 50, questions: 25 },
        { name: "Quantitative Aptitude", marks: 50, questions: 25 },
        { name: "General Awareness", marks: 50, questions: 25 },
        { name: "English Comprehension", marks: 50, questions: 25 }
      ];
      fullSyllabus = [
        {
          section: "General Intelligence & Reasoning",
          topics: ["Analogies, Spatial Orientation & Visualization", "Venn Diagrams, Syllogisms", "Coding-Decoding, Blood Relations, Directions", "Paper Folding & Embedded Figures"]
        },
        {
          section: "Quantitative Aptitude",
          topics: ["Number System, Percentage, Ratio, Average", "Profit & Loss, Interest, Time & Distance", "Algebraic Identities, Geometry, Mensuration", "Trigonometry & Height and Distance"]
        },
        {
          section: "English Comprehension",
          topics: ["Grammar: Parts of speech, error spotting", "Vocabulary: Synonyms, Antonyms, Idioms", "Sentence completion & correction", "Reading Comprehension passages"]
        },
        {
          section: "General Awareness",
          topics: ["History & Culture of India", "Indian Geography & Economy", "Polity, Constitution & Civics", "General Science, Environmental Science"]
        }
      ];
    } else {
      totalMarks = 105;
      durationMinutes = 90;
      negativeMarking = "0.25 Marks deducted per wrong answer";
      subjects = [
        { name: "General Intelligence & Reasoning", marks: 25, questions: 25 },
        { name: "Quantitative Aptitude / Maths", marks: 25, questions: 25 },
        { name: "General Awareness", marks: 25, questions: 25 },
        { name: "English / Hindi Language", marks: 30, questions: 25 }
      ];
      fullSyllabus = [
        {
          section: "General Intelligence & Reasoning (25 Questions)",
          topics: ["Analogies, Similarities and Differences", "Spatial Visualization, Spatial Orientation", "Arithmetical Reasoning and Figural Classification", "Relationship Concepts and Coding-Decoding"]
        },
        {
          section: "Quantitative Aptitude / Maths (25 Questions)",
          topics: ["Number Systems, Simplification, Percentages", "Ratio and Proportion, Averages, Profit & Loss", "Simple & Compound Interest, Mensuration", "Time & Work, Time & Distance"]
        },
        {
          section: "General Awareness (25 Questions)",
          topics: ["History, Culture, Geography of India & neighbours", "Economic Scene, General Polity, Constitution", "General Science & Static General Knowledge", "Current Events of National importance"]
        },
        {
          section: "English / Hindi Language (25 Questions)",
          topics: ["Grammar: Error spotting, Fill in the blanks", "Vocabulary: Synonyms, Antonyms, Idioms", "One-word substitution, Spelling errors", "Comprehension passage checks"]
        }
      ];
    }
    prepTips = [
      "Previous Years' Questions (PYQs) are highly repeated in SSC exams. Solve the last 5 years' papers.",
      "Work on vocabulary and grammar rules daily, as English section is highly scoring.",
      "Improve your speed in Quantitative Aptitude by learning Vedic Math calculations and arithmetic formulas."
    ];
  } else if (categoryId === 'cat-3') {
    totalMarks = 200;
    durationMinutes = 120;
    negativeMarking = "1/3rd (0.33) Marks deducted per wrong answer";
    subjects = [
      { name: "History & Culture of India", marks: 40, questions: 20 },
      { name: "Geography & Environment", marks: 50, questions: 25 },
      { name: "Polity & Constitution", marks: 40, questions: 20 },
      { name: "Indian Economy", marks: 30, questions: 15 },
      { name: "Science & Technology", marks: 20, questions: 10 },
      { name: "Current Affairs & GK", marks: 20, questions: 10 }
    ];
    fullSyllabus = [
      {
        section: "History & Culture of India (20 Questions)",
        topics: ["Ancient India: Indus Valley, Vedic Age, Maurya, Gupta", "Medieval India: Delhi Sultanate, Mughals, Maratha", "Modern India: British conquest, 1857 revolt, National Movement", "Indian Art forms, Literature, and Architecture"]
      },
      {
        section: "Geography & Environment (25 Questions)",
        topics: ["Physical Geography of India and the World", "Rivers, Climate, Soil, Minerals, and Vegetation", "Ecology: Biodiversity, National Parks, Climate change", "International environmental protocols and conventions"]
      },
      {
        section: "Polity & Constitution (20 Questions)",
        topics: ["Constitution: Preamble, Fundamental Rights, DPSP", "Union & State Executives, Parliament, State Legislature", "Local Self Government (Panchayati Raj & Municipalities)", "Constitutional and Non-Constitutional Bodies"]
      },
      {
        section: "Indian Economy (15 Questions)",
        topics: ["National Income Accounting (GDP, GNP)", "Inflation, Fiscal Policy, Monetary Policy & RBI", "Banking System, Capital Markets, Poverty & Unemployment", "Foreign Trade, Balance of Payments, WTO & IMF"]
      },
      {
        section: "Science & Technology (10 Questions)",
        topics: ["General Physics, Chemistry, and Biology (Class 10 level)", "Space Technology & Satellite programs of ISRO", "Defense Technology: Missiles, Submarines, Aircraft", "Biotechnology, Nanotechnology, and Cybersecurity"]
      }
    ];
    prepTips = [
      "Read standard reference books like Laxmikanth (Polity), Ramesh Singh (Economy), and Spectrum (Modern History).",
      "Read a national newspaper (The Hindu or Indian Express) daily to keep up with current affairs and editorial analyses.",
      "Understand core concepts instead of rote learning, as questions are analytical in nature."
    ];
  } else if (categoryId === 'cat-5') {
    totalMarks = 100;
    durationMinutes = 90;
    negativeMarking = "1/3rd (0.33) Marks deducted per wrong answer";
    subjects = [
      { name: "General Awareness & Current Affairs", marks: 40, questions: 40 },
      { name: "Mathematics", marks: 30, questions: 30 },
      { name: "General Intelligence & Reasoning", marks: 30, questions: 30 }
    ];
    if (examSlug === 'rrb-group-d') {
      subjects = [
        { name: "General Science", marks: 25, questions: 25 },
        { name: "Mathematics", marks: 25, questions: 25 },
        { name: "General Intelligence & Reasoning", marks: 30, questions: 30 },
        { name: "General Awareness & Current Affairs", marks: 20, questions: 20 }
      ];
    }
    fullSyllabus = [
      {
        section: "Mathematics (30 Questions)",
        topics: ["Number System, Decimals & Fractions, LCM & HCF", "Ratio & Proportion, Percentages, Mensuration", "Time & Work, Time & Distance, Profit & Loss", "Simple & Compound Interest, Basic Algebra & Geometry", "Trigonometry and Elementary Statistics"]
      },
      {
        section: "General Intelligence & Reasoning (30 Questions)",
        topics: ["Analogies, Series completion (Numbers & Alphabets)", "Coding & Decoding, Mathematical Operations", "Blood Relations, Syllogisms, Venn Diagrams", "Data Interpretation, Puzzle Solving, Classification"]
      },
      {
        section: "General Awareness & Science (40 Questions)",
        topics: ["General Science (Physics, Chemistry, Biology up to 10th CBSE)", "Current Affairs (National & International, Sports)", "Art & Culture of India, Indian Literature", "Indian History, Geography, Polity & Constitution", "Railway GK and Static General Knowledge"]
      }
    ];
    prepTips = [
      "Focus heavily on General Science (Physics, Chemistry, Biology) as it carries a major chunk of questions in Railway exams.",
      "Learn and review Railway Static GK, including important routes, announcements, budgets, and historic milestones.",
      "Manage time carefully; 100 questions in 90 minutes is a reasonable pace, but accuracy is key due to 1/3rd negative marking."
    ];
  } else {
    if (examSlug === 'ctet' || examSlug === 'htet') {
      totalMarks = 150;
      durationMinutes = 150;
      negativeMarking = "No Negative Marking";
      subjects = [
        { name: "Child Development & Pedagogy", marks: 30, questions: 30 },
        { name: "Language I (English/Hindi)", marks: 30, questions: 30 },
        { name: "Language II (Hindi/Regional)", marks: 30, questions: 30 },
        { name: "Mathematics", marks: 30, questions: 30 },
        { name: "Environmental Studies (EVS)", marks: 30, questions: 30 }
      ];
      fullSyllabus = [
        {
          section: "Child Development & Pedagogy (30 Questions)",
          topics: ["Concept of Development & learning relations", "Piaget, Kohlberg and Vygotsky theories", "Concepts of progressive & child-centered education", "Addressing diverse learners, learning difficulties", "Formative & Summative Evaluation, Pedagogy principles"]
        },
        {
          section: "Languages (60 Questions total)",
          topics: ["Reading unseen passages (prose & poetry)", "Grammar: Tense, Voice, Word formation", "Pedagogy of Language: Language acquisition, skills", "Role of listening & speaking, evaluating comprehension"]
        },
        {
          section: "Mathematics & EVS (60 Questions total)",
          topics: ["Maths: Shapes, Numbers, Addition/Subtraction, Volume, Data", "Maths Pedagogy: Nature of logical thinking, curriculum", "EVS Content: Family, Friends, Food, Shelter, Water, Travel", "EVS Pedagogy: Concept & scope, EVS significance, activities"]
        }
      ];
      prepTips = [
        "Focus heavily on Pedagogy concepts in all subjects. It makes up 50% of the total questions.",
        "Solve CTET/HTET previous year question papers. The types of pedagogy questions are highly repetitive.",
        "There is no negative marking, so ensure you attempt all 150 questions."
      ];
    } else if (examSlug === 'hssc-cet') {
      totalMarks = 105;
      durationMinutes = 90;
      negativeMarking = "No Negative Marking";
      subjects = [
        { name: "Haryana GK & Culture", marks: 25, questions: 25 },
        { name: "General Awareness & Current Affairs", marks: 15, questions: 15 },
        { name: "Quantitative Ability (Maths)", marks: 15, questions: 15 },
        { name: "Reasoning Ability", marks: 15, questions: 15 },
        { name: "English Language", marks: 10, questions: 10 },
        { name: "Hindi Language (व्याकरण)", marks: 10, questions: 10 },
        { name: "Computer Knowledge", marks: 10, questions: 10 }
      ];
      fullSyllabus = [
        {
          section: "Haryana GK (25% Weightage)",
          topics: ["History, Geography, Culture, Folk dances of Haryana", "Famous personalities, administrative divisions, districts", "Haryana Govt welfare schemes and annual budget", "Forest cover, rivers, lakes, wildlife sanctuaries in Haryana"]
        },
        {
          section: "General Awareness, Hindi & English (35 Questions)",
          topics: ["History, Geography, Polity, General Science of India", "Hindi Grammar: Sandhi, Samas, Muhavare, Vilom Shabd", "English Grammar: Active/Passive, Spot the Error, Synonyms"]
        },
        {
          section: "Quantitative & Reasoning Ability (30 Questions)",
          topics: ["Simplification, Percentage, Ratio, Average, Interest", "Coding-Decoding, Series, Venn Diagrams, Seating Arrangement"]
        }
      ];
      prepTips = [
        "Haryana General Knowledge carries 25 marks. Prepare state GK thoroughly using standard HSSC GK books.",
        "Hindi and English are simple and high-scoring. Revise basic grammar rules of both languages.",
        "Attempt all questions since there is no negative marking in the CET exam."
      ];
    } else if (examSlug === 'up-police-constable') {
      totalMarks = 300;
      durationMinutes = 120;
      negativeMarking = "0.50 Marks deducted per wrong answer";
      subjects = [
        { name: "General Knowledge (सामान्य ज्ञान)", marks: 76, questions: 38 },
        { name: "General Hindi (सामान्य हिन्दी)", marks: 74, questions: 37 },
        { name: "Numerical & Mental Ability", marks: 76, questions: 38 },
        { name: "Mental Aptitude & Reasoning", marks: 74, questions: 37 }
      ];
      fullSyllabus = [
        {
          section: "General Knowledge (38 Questions)",
          topics: ["Indian History, Culture, Geography, Economy, Agriculture", "UP State General Knowledge, Culture, Social Practices", "Human Rights, Internal Security & Terrorism, Cybercrime", "General Science, Indian Constitution, Current Affairs"]
        },
        {
          section: "General Hindi (37 Questions)",
          topics: ["हिन्दी व्याकरण: वर्णमाला, तद्भव-तत्सम, पर्यायवाची, विलोम", "अनेकार्थक, वाक्यांश के लिए एक शब्द, सन्धि, समास, मुहावरे", "हिन्दी भाषा में पुरस्कार, प्रसिद्ध कवि और लेखक"]
        },
        {
          section: "Numerical & Mental Ability (38 Questions)",
          topics: ["Number System, Simplification, Decimals & Fractions", "Ratio and Proportion, Percentage, Profit and Loss, Discount", "Simple & Compound Interest, Average, Time & Work, Mensuration"]
        },
        {
          section: "Reasoning & Mental Aptitude (37 Questions)",
          topics: ["Public Interest, Law & Order, Communal Harmony, Crime Control", "Ability of Adaptability, Professional Information, Reasoning Analogies", "Blood Relations, Direction Sense, Coding-Decoding, Venn Diagrams"]
        }
      ];
      prepTips = [
        "General Hindi is extremely high-scoring. Master the grammar rules and learn names of famous UP writers.",
        "Be careful of the negative marking (-0.50 marks per incorrect answer). Accuracy is paramount.",
        "Focus on UP General Knowledge and Police System/Aptitude questions."
      ];
    } else if (examSlug === 'up-police-si') {
      totalMarks = 105;
      durationMinutes = 90;
      negativeMarking = "No Negative Marking";
      subjects = [
        { name: "General Hindi (सामान्य हिन्दी)", marks: 25, questions: 25 },
        { name: "Law, Constitution & GK (मूलविधि)", marks: 30, questions: 25 },
        { name: "Numerical & Mental Ability", marks: 25, questions: 25 },
        { name: "Mental Aptitude / Reasoning", marks: 25, questions: 25 }
      ];
      fullSyllabus = [
        {
          section: "General Hindi (25 Questions)",
          topics: ["Hindi & other Indian languages history", "Grammar: Pronoun, Adjective, Tense, Sandhi, Samas", "Synonyms, Antonyms, One-word substitution, Idioms"]
        },
        {
          section: "Law, Constitution & GK (25 Questions)",
          topics: ["Mool Vidhi (IPC, CrPC, Motor Vehicle Act, Environmental Law)", "Indian Constitution, Fundamental Rights, Directive Principles", "General Knowledge, Economy, Geography, History, Science"]
        },
        {
          section: "Numerical & Reasoning (50 Questions total)",
          topics: ["Simplification, Percentage, Profit/Loss, Average, Work/Time", "Analogies, Coding-Decoding, Blood Relations, Syllogisms"]
        }
      ];
      prepTips = [
        "Mool Vidhi (Law & Constitution) is unique to UP SI. Pay special attention to IPC/CrPC sections and environmental/human rights acts.",
        "There is no negative marking, so ensure you attempt all questions in the test series.",
        "Maintain speed as you have to solve 100 questions within 90 minutes."
      ];
    } else if (examSlug === 'delhi-police-constable') {
      totalMarks = 105;
      durationMinutes = 90;
      negativeMarking = "0.25 Marks deducted per wrong answer";
      subjects = [
        { name: "General Knowledge & Current Affairs", marks: 50, questions: 50 },
        { name: "Reasoning Ability", marks: 25, questions: 25 },
        { name: "Numerical Ability (Mathematics)", marks: 15, questions: 15 },
        { name: "Computer Knowledge & MS Office", marks: 15, questions: 10 }
      ];
      fullSyllabus = [
        {
          section: "General Knowledge & Current Affairs (50 Questions)",
          topics: ["National & International Current Affairs of last 1 year", "Sports, History, Culture, Geography, Economic Scene", "General Polity, Indian Constitution, Scientific Research"]
        },
        {
          section: "Reasoning Ability & Maths (40 Questions total)",
          topics: ["Reasoning: Analogies, Venn Diagrams, Spatial reasoning, Series", "Maths: Number systems, Decimals, Fractions, Percentage, Averages, Interest"]
        },
        {
          section: "Computer Knowledge (10 Questions)",
          topics: ["Elements of Word Processing, MS Excel spreadsheets", "Communication: Web browsing, Emails, Internet search", "Computer fundamentals and keyboard shortcuts"]
        }
      ];
      prepTips = [
        "GK & Current Affairs is 50% of the exam. Focus extensively on daily current affairs and static GK facts.",
        "Computer section is small but highly scoring. Practice MS Word and Excel shortcuts.",
        "Be careful with negative marking (0.25 marks per wrong response)."
      ];
    } else if (examSlug === 'bihar-police-constable') {
      totalMarks = 105;
      durationMinutes = 90;
      negativeMarking = "No Negative Marking";
      subjects = [
        { name: "General GK & Social Studies", marks: 40, questions: 40 },
        { name: "General Science (भौतिकी, रसायन, जीव विज्ञान)", marks: 30, questions: 30 },
        { name: "Hindi & English Language", marks: 20, questions: 20 },
        { name: "Mathematics (गणित)", marks: 15, questions: 10 }
      ];
      fullSyllabus = [
        {
          section: "General GK & Social Studies (40 Questions)",
          topics: ["Indian History, Bihar State History & Freedom struggle", "Geography (India & World), Civics & Polity, Indian Economy", "Bihar Geography, administration, and famous personalities"]
        },
        {
          section: "General Science (30 Questions)",
          topics: ["Physics: Light, electricity, force, mechanics", "Chemistry: Elements, reactions, carbon, metals & non-metals", "Biology: Cells, human body, plants, nutrition & diseases"]
        },
        {
          section: "Languages & Mathematics (30 Questions total)",
          topics: ["Hindi Grammar: Vilom, Paryayvachi, Muhavare, Karak, Samas", "English: Grammar basics, error correction, fill in the blanks", "Mathematics: Number system, basic algebra, geometry, mensuration"]
        }
      ];
      prepTips = [
        "General Science carries 30 marks. Prepare from Class 9 & 10 NCERT science textbooks.",
        "Read Bihar-specific GK, including the history, geography, and current developments of the state.",
        "There is no negative marking, so attempt all questions."
      ];
    } else if (examSlug === 'rajasthan-police-constable') {
      totalMarks = 105;
      durationMinutes = 90;
      negativeMarking = "0.25 Marks deducted per wrong answer";
      subjects = [
        { name: "Reasoning & Computer Ability", marks: 30, questions: 30 },
        { name: "General GK, Science & Current Affairs", marks: 30, questions: 30 },
        { name: "Rajasthan GK: History, Art & Culture", marks: 45, questions: 40 }
      ];
      fullSyllabus = [
        {
          section: "Rajasthan GK & Culture (40 Questions)",
          topics: ["History of Rajasthan, Major dynasties, monuments", "Geography of Rajasthan, Climate, Agriculture, Soil", "Art, Culture, Folk songs, Folk dances, fairs & festivals of Rajasthan", "Administrative structure and policies of Rajasthan Government"]
        },
        {
          section: "Reasoning & Computer (30 Questions)",
          topics: ["Reasoning: Coding-Decoding, series, family tree, logic", "Computer: Hardware, software, operating systems, MS Office"]
        },
        {
          section: "General GK & Science (30 Questions)",
          topics: ["Indian Constitution & Polity, History & Geography of India", "General Science concepts, Environmental issues, Current events"]
        }
      ];
      prepTips = [
        "Rajasthan GK is the most critical section carrying 45% weightage. Study state geography, history, and festivals in detail.",
        "Computer basics are scoring. Spend time practicing keyboard shortcuts and MS Office tools.",
        "Avoid making wild guesses as there is a 0.25 negative marking penalty."
      ];
    } else {
      totalMarks = 100;
      durationMinutes = 90;
      negativeMarking = "No Negative Marking";
      subjects = [
        { name: "General GK & Current Affairs", marks: 40, questions: 40 },
        { name: "Reasoning Ability", marks: 30, questions: 30 },
        { name: "Numerical Ability (Mathematics)", marks: 30, questions: 30 }
      ];
      fullSyllabus = [
        {
          section: "General GK & Current Affairs (40 Questions)",
          topics: ["History, Geography, Economy and Polity of India", "State-specific GK, monuments, administration", "National current affairs of the past 12 months", "General Science (Physics, Chemistry, Biology)"]
        },
        {
          section: "Maths & Reasoning (60 Questions total)",
          topics: ["Maths: Simplification, average, percentage, ratio, profit/loss", "Reasoning: Series, analogies, coding-decoding, relationships"]
        }
      ];
      prepTips = [
        "Focus on state GK and current affairs to gain a competitive edge.",
        "Attempt all questions since there is no negative marking.",
        "Regularly attempt mock tests to manage your time effectively."
      ];
    }
  }

  return {
    postName,
    authority,
    totalMarks,
    durationMinutes,
    negativeMarking,
    eligibility,
    ageLimit,
    subjects,
    fullSyllabus,
    prepTips
  };
}

const dynamicBlogs: BlogArticle[] = [];

EXAMS.forEach(exam => {
  const { category, icon } = getCategoryAndIcon(exam.categoryId, exam.slug);
  
  // Clean dynamic info article (only 1 article per exam)
  const hasStaticSyllabus = staticBlogs.some(sb => sb.examSlug === exam.slug);
  if (!hasStaticSyllabus) {
    const details = getDynamicDetails(exam.slug, exam.name, exam.categoryId);
    dynamicBlogs.push({
      slug: `${exam.slug}-info`,
      title: `${exam.name} Information`,
      description: "",
      publishDate: "June 24, 2026",
      readTime: "5 min read",
      examSlug: exam.slug,
      examName: exam.name,
      category,
      icon,
      type: 'info',
      sections: [],
      details
    });
  }
});

export const BLOGS: BlogArticle[] = [...staticBlogs, ...dynamicBlogs];

export function getBlogBySlug(slug: string): BlogArticle | undefined {
  return BLOGS.find(b => b.slug === slug);
}

export function getBlogsByExam(examSlug: string): BlogArticle[] {
  return BLOGS.filter(b => b.examSlug === examSlug);
}
