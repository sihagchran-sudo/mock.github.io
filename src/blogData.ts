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
  },
  {
    slug: "ssc-stenographer-syllabus-pattern",
    examSlug: "ssc-stenographer",
    examName: "SSC Stenographer",
    category: "SSC Exams",
    icon: "✍️",
    title: "SSC Stenographer Exam: Your Complete Guide to Grade C & D in 2026",
    description: "Want a stable central government job straight after Class 12? This guide breaks down everything you need to know: eligibility, exam pattern, syllabus, salary, and practical prep tips.",
    metaTitle: "SSC Stenographer Exam Guide 2026: Pattern, Syllabus, Salary & Eligibility",
    metaDescription: "Everything you need to crack the SSC Stenographer Grade C & D exam—eligibility, exam pattern, syllabus, salary, and smart prep tips. Start preparing today.",
    authorName: "Editorial Team",
    authorityBadge: "SSC",
    publishDate: "June 28, 2026",
    readTime: "5 min read",
    datePublishedISO: "2026-06-28T10:35:00Z",
    featuredImage: "/hero_composition_vector.png",
    featuredImageAlt: "SSC Stenographer Grade C & D Exam Prep",
    quickAnswer: "The SSC Stenographer exam is a national-level recruitment conducted by the Staff Selection Commission to fill Stenographer Grade C (Group B, Non-Gazetted) and Grade D (Group C) posts across central government ministries and departments. You need to have passed Class 12 and possess stenography skills to apply. Selection involves a computer-based test followed by a qualifying shorthand skill test—no interview.",
    sections: [
      {
        id: "about-exam",
        title: "What is the SSC Stenographer exam?",
        paragraphs: [
          "The SSC Stenographer exam is conducted annually by the Staff Selection Commission to recruit stenographers for central government departments. A stenographer's core job is to record speech rapidly and accurately using shorthand, then transcribe it—a role that remains essential wherever real-time documentation is required.",
          "The recruitment is offered at two levels:\nStenographer Grade C: A Group B (Non-Gazetted) post, typically attached to senior officers and ministries, with higher pay and responsibility.\nStenographer Grade D: A Group C post that handles shorthand, transcription, and clerical support across various government offices.",
          "Day-to-day duties for both grades usually include:\nShorthand dictation: Taking live dictation from senior officials, capturing instructions and remarks accurately at speed.\nSpeech transcription: Converting spoken words from meetings and proceedings into shorthand notes, then transcribing them later.\nExecutive support: Providing personal-assistant–level support to ministers and senior officers, managing schedules and communications.\nDocumentation and drafting: Preparing structured drafts of speeches, official statements, meeting summaries, and reports.",
          "These roles offer the stability, steady pay, and growth opportunities that make central government jobs so appealing—with the added advantage of being open to Class 12 pass candidates."
        ]
      },
      {
        id: "eligibility",
        title: "Who is eligible for SSC Stenographer?",
        paragraphs: [
          "Before you start prepping, make sure you tick the basic boxes.",
          "Educational qualification: You must have passed Class 12 (10+2) or an equivalent qualification from a recognized board or university on or before the cut-off date of 1 August 2026. You must also possess stenography skills to apply.",
          "Age limit: The age requirement differs by grade, calculated as on the crucial date of 1 August 2026.",
          "Age relaxation applies for reserved categories:\nSC/ST: 5 years\nOBC: 3 years\nPwBD (Unreserved): 10 years",
          "Nationality: You must be a citizen of India, a subject of Nepal or Bhutan, or a person of Indian origin who has migrated from specified countries with the intention of permanently settling in India."
        ],
        table: {
          headers: ["Post", "Minimum Age", "Maximum Age"],
          rows: [
            ["Stenographer Grade C", "18 years", "30 years"],
            ["Stenographer Grade D", "18 years", "27 years"]
          ]
        }
      },
      {
        id: "exam-pattern",
        title: "What is the SSC Stenographer exam pattern?",
        paragraphs: [
          "Selection happens across two main stages. You'll start with the Computer-Based Examination (CBE), and qualifying candidates progress to the shorthand skill test. There's no interview. Importantly, the final merit list is prepared solely on your CBE marks—the skill test is qualifying in nature."
        ],
        stepper: [
          { stepNumber: 1, title: "Computer-Based Examination (CBE)", description: "The written objective test that decides the final merit marks." },
          { stepNumber: 2, title: "Skill Test in Stenography", description: "A qualifying shorthand dictation and transcription test on computer." }
        ]
      },
      {
        id: "cbe-stage",
        title: "Stage 1: Computer-Based Examination",
        paragraphs: [
          "The CBE is a single objective test of 200 questions worth 200 marks, to be completed in 2 hours. From the 2026 cycle, SSC has introduced sectional timing for the first time—each subject now has a fixed time limit, and once it expires, you're automatically moved to the next section. There's also a negative marking of 0.25 marks for every wrong answer, so answer carefully.",
          "One thing to keep in mind: time saved in one section can't be carried over to another. You'll need to manage your pace within each individual timer."
        ],
        table: {
          headers: ["Part", "Subject", "Questions", "Marks", "Duration"],
          rows: [
            ["I", "General Intelligence & Reasoning", "50", "50", "30 minutes"],
            ["II", "General Awareness", "50", "50", "30 minutes"],
            ["III", "English Language & Comprehension", "100", "100", "60 minutes"],
            ["Total", "All Sections Combined", "200", "200", "120 minutes"]
          ]
        }
      },
      {
        id: "skill-test-stage",
        title: "Stage 2: Skill Test in Stenography",
        paragraphs: [
          "Candidates shortlisted from the CBE based on merit move on to the skill test. You'll be dictated a passage in either English or Hindi (chosen while filling the form), which you then transcribe on a computer.",
          "The dictation speeds are:\nStenographer Grade C: 100 words per minute (wpm) for 10 minutes\nStenographer Grade D: 80 words per minute (wpm) for 10 minutes",
          "Accuracy matters here. The permissible mistakes are 5% for Grade C (General) and 7% for Grade D (General), with OBC/SC/ST/Ex-servicemen candidates allowed up to 10% for Grade D."
        ],
        table: {
          headers: ["Post", "Language", "Transcription Time", "Time for Scribe Users"],
          rows: [
            ["Stenographer Grade D", "English", "50 minutes", "70 minutes"],
            ["Stenographer Grade D", "Hindi", "65 minutes", "90 minutes"],
            ["Stenographer Grade C", "English", "40 minutes", "55 minutes"],
            ["Stenographer Grade C", "Hindi", "55 minutes", "75 minutes"]
          ]
        }
      },
      {
        id: "syllabus",
        title: "What does the SSC Stenographer syllabus cover?",
        paragraphs: [
          "The CBE tests three broad domains. Here's what to study:",
          "General Intelligence & Reasoning: Analogies, similarities and differences, space visualization, problem solving, visual memory, coding-decoding, blood relations, direction and distance, order and ranking, puzzles, Venn diagrams, number series, and non-verbal reasoning.",
          "General Awareness: History, culture, geography, general polity, the Indian Constitution, economic scene, scientific research, science and technology, sports, and current affairs—covering India and its neighboring countries.",
          "English Language & Comprehension: Vocabulary, grammar, sentence structure, synonyms and antonyms, spellings, idioms and phrases, active and passive voice, direct and indirect speech, reading comprehension, fill in the blanks, error spotting, para jumbles, and sentence correction.",
          "For the skill test, dictation passages typically draw from topics of national interest such as the President's Speech, Budget Speech, Parliament proceedings, editorial columns, natural calamities, employment in India, and science and technology.",
          "A useful tip: since English carries 100 of the 200 marks, it's by far the highest-weightage section—consistent daily practice here pays off more than anywhere else."
        ],
        weightageChart: [
          { label: "English Language & Comprehension", percentage: 50 },
          { label: "General Intelligence & Reasoning", percentage: 25 },
          { label: "General Awareness", percentage: 25 }
        ]
      },
      {
        id: "salary-posts",
        title: "SSC Stenographer salary and posts",
        paragraphs: [
          "The compensation for an SSC Stenographer is set by the 7th Central Pay Commission, and varies between the two grades.",
          "Beyond the basic pay, both grades receive several allowances that depend on the city classification (X, Y, or Z) of your posting:\nDearness Allowance (DA): Periodically revised to account for inflation\nHouse Rent Allowance (HRA): Provided if government accommodation isn't availed\nTransport Allowance (TA): To cover daily commuting costs\nMedical facilities: Access to subsidized healthcare under the Central Government Health Scheme (CGHS)",
          "A quick note on the difference between grades: Grade C is the senior of the two, offering a higher pay level and greater responsibility, while Grade D is an entry-level Group C post—still a secure, respected role within central government offices."
        ],
        table: {
          headers: ["Component", "Stenographer Grade C", "Stenographer Grade D"],
          rows: [
            ["Pay Level", "Level 6", "Level 4"],
            ["Basic Pay", "₹35,400", "₹25,500"],
            ["Grade Pay", "₹4,200", "₹2,400"]
          ]
        }
      },
      {
        id: "how-to-prepare",
        title: "How to prepare for the SSC Stenographer exam",
        paragraphs: [
          "A clear plan beats random studying every time. Here's how to approach your prep, ideally over a three-month window:"
        ],
        strategyCards: [
          { title: "Know the syllabus and pattern inside out", description: "Understand exactly what each section tests and how the new sectional timer works. With fixed time per subject, you can't afford to get stuck on any one part." },
          { title: "Make English your priority", description: "English carries half the written marks, so treat it as your biggest scoring opportunity. Build daily grammar, vocabulary, and reading comprehension practice into your routine, and maintain an error notebook to avoid repeating mistakes." },
          { title: "Start shorthand practice early", description: "The skill test is mandatory for final selection, so don't leave it until after the CBE. Build dictation speed gradually—aim for steady accuracy before pushing for raw speed." },
          { title: "Solve previous year papers and take mock tests", description: "Past papers reveal recurring question patterns, while regular mocks train you to handle the sectional timers and computer-based format. Analyze every mock for accuracy, timing, and weak topics." },
          { title: "Play the negative marking smartly", description: "Each wrong answer costs 0.25 marks. Attempt questions you're confident about rather than guessing blindly." },
          { title: "Revise General Awareness with limited sources", description: "Stick to one or two reliable sources, make short notes, and revise weekly. Keep up with current affairs through a daily newspaper." },
          { title: "Follow a phased study plan", description: "A common approach splits 90 days into three phases—building fundamentals first, then focusing on practice and speed, and finally on full mocks and revision. Trusted books like S.P. Bakshi for English, Lucent for GK, and R.S. Aggarwal for reasoning can anchor your prep." }
        ]
      },
      {
        id: "next-steps",
        title: "Your next step toward a government job",
        paragraphs: [
          "The SSC Stenographer exam is one of the most accessible routes into a central government career for Class 12 pass candidates—and with focused effort, cracking it is well within reach. A clear grasp of the new sectional-timed pattern, a strong emphasis on English, early shorthand practice, and regular mock tests will set you up to walk into the exam hall ready.",
          "Start by downloading the official syllabus, gathering quality study material, and setting up your daily schedule. The sooner you begin—especially on shorthand—the more time you'll have to build the speed and accuracy that selection demands."
        ]
      }
    ],
    faqs: [
      { question: "What is the minimum qualification for SSC Stenographer?", answer: "You must have passed Class 12 (10+2) from a recognized board, along with possessing stenography skills. This makes it a great option for candidates who want a stable government job without needing a graduate degree." },
      { question: "Is there negative marking in the SSC Stenographer exam?", answer: "Yes. In the Computer-Based Examination, 0.25 marks are deducted for every wrong answer, so it pays to be selective about the questions you attempt." },
      { question: "What is the age limit for SSC Stenographer?", answer: "The age limit is 18 to 30 years for Grade C and 18 to 27 years for Grade D. Reserved categories receive relaxation—3 years for OBC, 5 years for SC/ST, and 10 years for PwBD (Unreserved)." },
      { question: "Is the skill test compulsory?", answer: "Yes. Only candidates who qualify the shorthand skill test—meeting the prescribed speed and accuracy norms—are considered for final selection. However, the final merit list is based solely on your Computer-Based Examination marks, as the skill test is qualifying in nature." },
      { question: "What is the salary of an SSC Stenographer?", answer: "Grade C falls under Pay Level 6 with a basic pay of ₹35,400, while Grade D falls under Pay Level 4 with a basic pay of ₹25,500. Both grades also receive allowances such as DA, HRA, and TA, along with CGHS medical benefits." },
      { question: "What is the difference between Stenographer Grade C and Grade D?", answer: "Grade C is a Group B (Non-Gazetted) post with a higher pay level (Level 6), greater responsibility, and a faster required dictation speed of 100 wpm. Grade D is a Group C post at Pay Level 4, with a dictation speed of 80 wpm." }
    ],
    relatedExams: ["ssc-cgl", "ssc-chsl", "ssc-mts"]
  }
];

export const BLOGS: BlogArticle[] = [...staticBlogs];

export function getBlogBySlug(slug: string): BlogArticle | undefined {
  return BLOGS.find(b => b.slug === slug);
}

export function getBlogsByExam(examSlug: string): BlogArticle[] {
  return BLOGS.filter(b => b.examSlug === examSlug);
}
