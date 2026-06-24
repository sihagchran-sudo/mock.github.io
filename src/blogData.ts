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

export const BLOGS: BlogArticle[] = [
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
    slug: "ssc-cgl-tier-1-syllabus-exam-pattern",
    title: "SSC CGL Tier 1 Complete Syllabus & Subject Weightage 2026",
    description: "Prepare with the official SSC CGL Tier 1 exam scheme, marks distribution, negative marking details, and comprehensive topic-wise syllabus.",
    publishDate: "June 22, 2026",
    readTime: "5 min read",
    examSlug: "ssc-cgl",
    examName: "SSC CGL",
    category: "SSC Exams",
    icon: "✍️",
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
    slug: "sbi-po-prelims-syllabus-marks-weightage",
    title: "SBI PO Prelims Exam Syllabus & Sectional Timing Details",
    description: "Discover the detailed exam pattern for State Bank of India Probationary Officer (PO) Prelims, including sectional time limits and topic lists.",
    publishDate: "June 23, 2026",
    readTime: "5 min read",
    examSlug: "sbi-po",
    examName: "SBI PO",
    category: "Banking",
    icon: "🏛️",
    details: {
      postName: "Probationary Officer (PO)",
      authority: "State Bank of India (SBI)",
      totalMarks: 100,
      durationMinutes: 60,
      negativeMarking: "0.25 (1/4th) Marks deducted per wrong answer",
      eligibility: "Graduation in any discipline from a recognized University or equivalent.",
      ageLimit: "21 to 30 Years",
      subjects: [
        { name: "Reasoning Ability", marks: 35, questions: 35 },
        { name: "Quantitative Aptitude", marks: 35, questions: 35 },
        { name: "English Language", marks: 30, questions: 30 }
      ],
      fullSyllabus: [
        {
          section: "Reasoning Ability (Sectional Time: 20 mins)",
          topics: [
            "Seating Arrangements (Circular, Linear, Square)",
            "Puzzles (Floor, Box, Tabulation, Days/Months)",
            "Inequalities, Syllogism, Blood Relations, Directions",
            "Coding-Decoding, Alphanumeric Series, Input-Output",
            "Data Sufficiency"
          ]
        },
        {
          section: "Quantitative Aptitude (Sectional Time: 20 mins)",
          topics: [
            "Data Interpretation (Bar, Line, Pie charts, Caselet)",
            "Number Series (Missing & Wrong series)",
            "Quadratic Equations, Simplification/Approximation",
            "Arithmetic: Percentage, Average, Profit & Loss, Ratio",
            "Partnership, Mixture & Alligation, Probability"
          ]
        },
        {
          section: "English Language (Sectional Time: 20 mins)",
          topics: [
            "Reading Comprehension (including vocabulary questions)",
            "Cloze Test, Error Detection, Sentence Rearrangement",
            "Fillers, Word Swap, Phrase Replacement"
          ]
        }
      ],
      prepTips: [
        "Each section has a strict 20-minute limit. You cannot switch between sections, so practice sectional tests separately.",
        "Puzzles and Data Interpretation carry the highest marks. Dedicate ample time to mastering various puzzle types.",
        "Speed calculation is key. Practice mental math, squares, cubes, and tables to speed up calculations."
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

export function getBlogBySlug(slug: string): BlogArticle | undefined {
  return BLOGS.find(b => b.slug === slug);
}

export function getBlogsByExam(examSlug: string): BlogArticle[] {
  return BLOGS.filter(b => b.examSlug === examSlug);
}
