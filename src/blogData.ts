export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  examSlug: string;
  examName: string;
  category: string;
  icon: string;
  type?: 'syllabus' | 'salary' | 'cutoff' | 'info';
  
  // Metadata & SEO (Optional)
  metaTitle?: string;
  metaDescription?: string;
  authorName?: string;
  authorityBadge?: string;
  publishDate: string;
  readTime: string;
  datePublishedISO?: string; // for JSON-LD
  
  // Media (Optional)
  featuredImage?: string;
  featuredImageAlt?: string;
  
  // Content Slots (Optional)
  quickAnswer?: string;
  
  // Rich Body Sections
  sections: {
    id?: string;
    title: string; // H2 Heading
    paragraphs: string[];
    table?: {
      headers: string[];
      rows: string[][];
    };
    stepper?: {
      stepNumber: number;
      title: string;
      description: string;
    }[];
    weightageChart?: {
      label: string;
      percentage: number;
    }[];
    strategyCards?: {
      title: string;
      description: string;
    }[];
    sectionCtaText?: string;
    sectionCtaLink?: string;
  }[];
  
  // FAQ accordion (Optional)
  faqs?: {
    question: string;
    answer: string;
  }[];
  
  // Related exams (Optional)
  relatedExams?: string[]; // array of exam slugs (e.g. ['ssc-chsl', 'ssc-mts'])
}

const staticBlogs: BlogArticle[] = [
  {
    slug: "hssc-haryana-police-constable-syllabus-pattern",
    examSlug: "hssc-haryana-police",
    examName: "HSSC Haryana Police Constable",
    category: "HSSC Exams",
    icon: "👮",
    title: "HSSC Haryana Police Constable Exam: Your Complete Guide for 2026",
    description: "Dreaming of a uniform and a stable government job in Haryana? This guide breaks down everything you need to know: eligibility, physical standards, exam pattern, syllabus, salary, and practical prep tips.",
    metaTitle: "HSSC Haryana Police Constable Exam Guide 2026: Pattern, Syllabus & Salary",
    metaDescription: "Everything you need to crack the HSSC Haryana Police Constable exam—eligibility, physical standards, exam pattern, syllabus, and salary. Start preparing today.",
    authorName: "Editorial Team",
    authorityBadge: "HSSC",
    publishDate: "June 28, 2026",
    readTime: "6 min read",
    datePublishedISO: "2026-06-28T10:19:00Z",
    featuredImage: "/hero_prep_vector.png",
    featuredImageAlt: "HSSC Haryana Police Constable Exam Prep",
    quickAnswer: "The HSSC Haryana Police Constable exam is a state-level recruitment conducted by the Haryana Staff Selection Commission to fill General Duty (GD) and Government Railway Police (GRP) constable posts in the Haryana Police force. You need to have passed Class 12 and cleared the HSSC CET to be eligible. Selection involves physical tests, a written knowledge test, document verification, and a medical examination—with no interview.",
    sections: [
      {
        id: "about-exam",
        title: "What is the HSSC Haryana Police Constable exam?",
        paragraphs: [
          "The HSSC Haryana Police Constable exam is a state-level recruitment process conducted by the Haryana Staff Selection Commission (HSSC) to appoint eligible candidates as constables in the Haryana Police. The recruitment fills vacancies across two main units, and selection is based on a combination of physical fitness and written knowledge.",
          "The 5,500 vacancies in the 2026 cycle are distributed across: \nMale Constable (GD): 4,500 posts — the General Duty force responsible for law and order, patrolling, and public safety. \nFemale Constable (GD): 600 posts — the same General Duty responsibilities, with separate physical standards. \nMale Constable (GRP): 400 posts — the Government Railway Police, which handles security and policing duties across railway stations and trains.",
          "Day-to-day duties for a Haryana Police Constable typically include: \nMaintaining law and order: Patrolling assigned areas, responding to incidents, and ensuring public safety. \nCrime prevention: Monitoring suspicious activity, assisting in investigations, and supporting senior officers. \nPublic assistance: Helping citizens during emergencies, managing crowds, and providing first response. \nTraffic and event management: Regulating traffic and ensuring security at public gatherings and events.",
          "These roles offer the stability, steady pay, and respect that make government jobs so appealing—with the added advantage of being open to Class 12 pass candidates."
        ]
      },
      {
        id: "eligibility",
        title: "Who is eligible for the HSSC Haryana Police Constable exam?",
        paragraphs: [
          "Before you start prepping, make sure you tick the basic boxes.",
          "Educational qualification: You must have passed Class 12 (10+2) or an equivalent qualification from a recognized board or institution. You must also have studied Hindi or Sanskrit as a subject, either at the matriculation level or during higher education.",
          "HSSC CET: Only candidates who have qualified the HSSC Common Eligibility Test (CET) for Group C can apply, as initial shortlisting is based on your CET score.",
          "Age limit: You must be between 18 and 25 years of age, calculated as on 1 January 2026.",
          "Nationality: You must be a citizen of India. Candidates from Nepal, Bhutan, and Tibetan refugees who came to India before 1 January 1962 with the intention of permanent settlement are also eligible, as per Government of India rules."
        ],
        table: {
          headers: ["Category", "Upper Age Relaxation"],
          rows: [
            ["SC (DSC/OSC)/ BC/ EWS", "5 years"],
            ["Ex-servicemen", "4 years"]
          ]
        }
      },
      {
        id: "exam-pattern",
        title: "What is the HSSC Haryana Police Constable exam pattern?",
        paragraphs: [
          "Selection happens across multiple stages, blending physical fitness checks with a written knowledge test. There's no interview at any point."
        ],
        stepper: [
          { stepNumber: 1, title: "Shortlisting through HSSC CET score", description: "Initial screen to qualify for the next rounds." },
          { stepNumber: 2, title: "Physical Measurement Test (PMT) — qualifying", description: "Height and chest checks according to standard measures." },
          { stepNumber: 3, title: "Physical Screening Test (PST) — qualifying", description: "Fitness check with a timed running distance test." },
          { stepNumber: 4, title: "Knowledge Test (Written Exam)", description: "The main written exam which decides the final merit score." },
          { stepNumber: 5, title: "Document Verification", description: "Scrutiny of academic transcripts, caste certificates, and age proof." },
          { stepNumber: 6, title: "Medical Examination", description: "Standard medical fitness checks before induction." }
        ]
      },
      {
        id: "pmt-details",
        title: "Physical Measurement Test (PMT)",
        paragraphs: [
          "The PMT verifies your height and chest measurements against prescribed standards. It's qualifying in nature, so you must meet the minimum criteria to move forward."
        ],
        table: {
          headers: ["Gender", "Category", "Height", "Chest (Unexpanded)", "Chest (Expanded)"],
          rows: [
            ["Male", "General", "170 cm", "83 cm", "87 cm"],
            ["Male", "Reserved", "168 cm", "81 cm", "85 cm"],
            ["Female", "General", "158 cm", "Not applicable", "Not applicable"],
            ["Female", "Reserved", "156 cm", "Not applicable", "Not applicable"]
          ]
        }
      },
      {
        id: "pst-details",
        title: "Physical Screening Test (PST)",
        paragraphs: [
          "Candidates who clear the PMT proceed to the PST, which assesses physical fitness through a timed run. It carries no marks and is purely qualifying."
        ],
        table: {
          headers: ["Candidate", "Race Distance", "Qualifying Time"],
          rows: [
            ["Male", "2.5 km", "12 minutes"],
            ["Female", "1.0 km", "6 minutes"],
            ["Ex-servicemen", "1.0 km", "5 minutes"]
          ]
        }
      },
      {
        id: "written-exam",
        title: "Knowledge Test (Written Exam)",
        paragraphs: [
          "The Knowledge Test is the only stage that carries merit-deciding marks. It's an offline, OMR-based written examination with objective-type questions.",
          "One important quirk: while there's no penalty for wrong answers, marks are deducted for unattempted or blank questions—so it pays to attempt every question. You can also earn bonus marks: NCC certificate holders receive 1, 2, or 3 marks for A, B, and C level certificates respectively, and up to 2.5 marks are available under socio-economic criteria."
        ],
        table: {
          headers: ["Feature", "Details"],
          rows: [
            ["Mode", "Offline (OMR-based)"],
            ["Total Questions", "100"],
            ["Total Marks", "97"],
            ["Language", "Bilingual (Hindi and English)"],
            ["Negative Marking", "None for wrong answers"],
            ["Qualifying Marks", "50% (General), 40% (Reserved)"]
          ]
        },
        weightageChart: [
          { label: "GS, Science, Aptitude, Agri & Animal Husbandry", percentage: 50 },
          { label: "Haryana General Knowledge", percentage: 20 },
          { label: "Basic Computer Knowledge", percentage: 10 },
          { label: "Other Subjects (Languages, etc.)", percentage: 20 }
        ]
      },
      {
        id: "syllabus",
        title: "What does the HSSC Haryana Police Constable syllabus cover?",
        paragraphs: [
          "The Knowledge Test draws from a broad range of subjects, pitched at the level expected of a Class 12 pass candidate. Here's what to study:",
          "General Studies: Polity, Indian Constitution, history and geography of the country, art and culture, Indian National Movements, Indian culture and economy, national and international events, dates and events, and authors/awards/books. A significant chunk also covers facts about Haryana—its language, economy, and culture.",
          "General Science: Scientific methodology, physics, chemistry, biology, space science, and environmental sciences.",
          "General Reasoning: Alphanumeric series, coding-decoding, blood relations, analogies, classification, direction test, puzzles, syllogism, and seating arrangements.",
          "Numerical Ability: Number system, average, ratio and proportion, HCF and LCM, profit and loss, discounts, mensuration, percentages, time/work/distance, geometry, and problems on ages.",
          "Agriculture: Ecology and ecological balance, soil, farm management, cropping patterns, food production, horticulture, and types of agriculture.",
          "Animal Husbandry: Animal nutrition and physiology, livestock production and management, animal breeding, healthcare, and animal welfare.",
          "Basic Computer Knowledge: Role of computers in modern society, information technology, applications across different fields, and the history of computers.",
          "A useful tip: with Haryana GK carrying 20% weightage, dedicating focused study time to state-specific topics—history, geography, culture, and current affairs of Haryana—can give you a clear edge over candidates who only prepare general topics."
        ]
      },
      {
        id: "salary-posts",
        title: "HSSC Haryana Police Constable salary and posts",
        paragraphs: [
          "The compensation for a Haryana Police Constable is set by the 7th Pay Commission, falling under Pay Level 3.",
          "Beyond the basic pay and standard allowances, constables also enjoy several additional benefits: \nProvident Fund: Long-term savings security \nOvertime Allowance: Compensation for extra duty hours \nRation Allowance: Support toward daily provisions \nDress Allowance: For uniform upkeep \nTravel and transfer allowances: Covering official movement and postings.",
          "A quick note on the posts: GD constables form the backbone of the state's law-and-order machinery, while GRP constables specialize in railway security—both offer the same pay structure and a clear path for career growth within the force."
        ],
        table: {
          headers: ["Component", "Amount (in ₹)"],
          rows: [
            ["Pay Level", "Level 3"],
            ["Pay Scale", "21,700 – 69,100"],
            ["Initial Basic Pay", "21,700"],
            ["Dearness Allowance (DA)", "9,982 – 10,850"],
            ["House Rent Allowance (HRA)", "1,800 – 4,000"],
            ["Transport & Other Allowances", "1,500 – 3,000"],
            ["Approximate Gross Monthly Salary", "34,000 – 42,000"]
          ]
        }
      },
      {
        id: "how-to-prepare",
        title: "How to prepare for the HSSC Haryana Police Constable exam",
        paragraphs: [
          "A clear plan beats random studying every time. Here's how to approach your prep, balancing both the written and physical components:"
        ],
        strategyCards: [
          { title: "Know the syllabus and pattern inside out", description: "Understand exactly what each subject tests and how the weightage is split. Since there's no negative marking for wrong answers but a penalty for blanks, plan to attempt every single question." },
          { title: "Prioritize Haryana GK", description: "With 20% of the paper dedicated to state-specific knowledge, this is one of your biggest scoring opportunities. Build a dedicated set of notes on Haryana's history, geography, economy, and culture, and revise them regularly." },
          { title: "Start physical training early", description: "The PMT and PST are mandatory qualifying stages, so don't leave fitness until the last minute. Begin running practice well in advance—male candidates need to cover 2.5 km in 12 minutes—and build your stamina gradually." },
          { title: "Build a strong general studies foundation", description: "Cover polity, history, geography, and science systematically, and keep up with current affairs through a daily newspaper. Stick to one or two reliable sources to avoid information overload." },
          { title: "Practice reasoning and numerical ability daily", description: "These sections reward consistency. Solve a fixed number of problems each day to build both speed and accuracy." },
          { title: "Solve previous year papers and take mock tests", description: "Past papers reveal recurring question patterns, while regular mocks train you for the OMR-based format and help you manage your time across all 100 questions." },
          { title: "Don't overlook bonus marks", description: "If you hold an NCC certificate or qualify under socio-economic criteria, ensure your documents are in order—those extra marks can make a real difference in a competitive cutoff." }
        ]
      },
      {
        id: "next-steps",
        title: "Your next step toward a career in uniform",
        paragraphs: [
          "The HSSC Haryana Police Constable exam is one of the most accessible routes into the state police force for Class 12 pass candidates—and with focused effort across both the written and physical stages, cracking it is well within reach. A strong grasp of the exam pattern, dedicated attention to Haryana GK, early physical training, and regular mock tests will set you up to perform when it counts.",
          "Start by downloading the official notification, gathering quality study material, and setting up a daily schedule that balances books and fitness. The sooner you begin—especially on your running practice—the more prepared you'll be when the call comes."
        ]
      }
    ],
    faqs: [
      { question: "What is the minimum qualification for the Haryana Police Constable exam?", answer: "You must have passed Class 12 (10+2) from a recognized board, having studied Hindi or Sanskrit as a subject at either the matriculation or higher level. You also need to have qualified the HSSC CET for Group C to apply." },
      { question: "Is there negative marking in the Haryana Police Constable exam?", answer: "There's no negative marking for wrong answers in the Knowledge Test. However, marks are deducted for unattempted or blank questions, so you should aim to attempt every question on the paper." },
      { question: "What is the age limit for the Haryana Police Constable exam?", answer: "The age limit is 18 to 25 years, calculated as on 1 January 2026. Reserved categories receive relaxation—5 years for SC/BC/EWS candidates and 4 years for ex-servicemen." },
      { question: "What are the physical standards for the Haryana Police Constable exam?", answer: "Male candidates (General) need a height of 170 cm and a chest of 83–87 cm, while reserved category males need 168 cm and 81–85 cm. Female candidates need a height of 158 cm (General) or 156 cm (Reserved). In the running test, males must complete 2.5 km in 12 minutes and females 1 km in 6 minutes." },
      { question: "What is the salary of a Haryana Police Constable?", answer: "The post falls under Pay Level 3 of the 7th Pay Commission, with an initial basic pay of ₹21,700 (rising up to ₹69,100). With allowances like DA, HRA, and TA, the approximate gross monthly salary ranges from ₹34,000 to ₹42,000." },
      { question: "Is there an interview for the Haryana Police Constable exam?", answer: "No. The selection process consists of CET-based shortlisting, the Physical Measurement Test, the Physical Screening Test, the Knowledge Test, document verification, and a medical examination—there's no interview round." }
    ],
    relatedExams: ["hssc-cet", "up-police-constable", "delhi-police-constable"]
  }
];

export const BLOGS: BlogArticle[] = [...staticBlogs];

export function getBlogBySlug(slug: string): BlogArticle | undefined {
  return BLOGS.find(b => b.slug === slug);
}

export function getBlogsByExam(examSlug: string): BlogArticle[] {
  return BLOGS.filter(b => b.examSlug === examSlug);
}
