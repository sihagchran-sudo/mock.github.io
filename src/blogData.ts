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
          headers: [
            "Category",
            "Upper Age Relaxation"
          ],
          rows: [
            [
              "SC (DSC/OSC)/ BC/ EWS",
              "5 years"
            ],
            [
              "Ex-servicemen",
              "4 years"
            ]
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
          {
            stepNumber: 1,
            title: "Shortlisting through HSSC CET score",
            description: "Initial screen to qualify for the next rounds."
          },
          {
            stepNumber: 2,
            title: "Physical Measurement Test (PMT) — qualifying",
            description: "Height and chest checks according to standard measures."
          },
          {
            stepNumber: 3,
            title: "Physical Screening Test (PST) — qualifying",
            description: "Fitness check with a timed running distance test."
          },
          {
            stepNumber: 4,
            title: "Knowledge Test (Written Exam)",
            description: "The main written exam which decides the final merit score."
          },
          {
            stepNumber: 5,
            title: "Document Verification",
            description: "Scrutiny of academic transcripts, caste certificates, and age proof."
          },
          {
            stepNumber: 6,
            title: "Medical Examination",
            description: "Standard medical fitness checks before induction."
          }
        ]
      },
      {
        id: "pmt-details",
        title: "Physical Measurement Test (PMT)",
        paragraphs: [
          "The PMT verifies your height and chest measurements against prescribed standards. It's qualifying in nature, so you must meet the minimum criteria to move forward."
        ],
        table: {
          headers: [
            "Gender",
            "Category",
            "Height",
            "Chest (Unexpanded)",
            "Chest (Expanded)"
          ],
          rows: [
            [
              "Male",
              "General",
              "170 cm",
              "83 cm",
              "87 cm"
            ],
            [
              "Male",
              "Reserved",
              "168 cm",
              "81 cm",
              "85 cm"
            ],
            [
              "Female",
              "General",
              "158 cm",
              "Not applicable",
              "Not applicable"
            ],
            [
              "Female",
              "Reserved",
              "156 cm",
              "Not applicable",
              "Not applicable"
            ]
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
          headers: [
            "Candidate",
            "Race Distance",
            "Qualifying Time"
          ],
          rows: [
            [
              "Male",
              "2.5 km",
              "12 minutes"
            ],
            [
              "Female",
              "1.0 km",
              "6 minutes"
            ],
            [
              "Ex-servicemen",
              "1.0 km",
              "5 minutes"
            ]
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
          headers: [
            "Feature",
            "Details"
          ],
          rows: [
            [
              "Mode",
              "Offline (OMR-based)"
            ],
            [
              "Total Questions",
              "100"
            ],
            [
              "Total Marks",
              "97"
            ],
            [
              "Language",
              "Bilingual (Hindi and English)"
            ],
            [
              "Negative Marking",
              "None for wrong answers"
            ],
            [
              "Qualifying Marks",
              "50% (General), 40% (Reserved)"
            ]
          ]
        },
        weightageChart: [
          {
            label: "GS, Science, Aptitude, Agri & Animal Husbandry",
            percentage: 50
          },
          {
            label: "Haryana General Knowledge",
            percentage: 20
          },
          {
            label: "Basic Computer Knowledge",
            percentage: 10
          },
          {
            label: "Other Subjects (Languages, etc.)",
            percentage: 20
          }
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
          headers: [
            "Component",
            "Amount (in ₹)"
          ],
          rows: [
            [
              "Pay Level",
              "Level 3"
            ],
            [
              "Pay Scale",
              "21,700 – 69,100"
            ],
            [
              "Initial Basic Pay",
              "21,700"
            ],
            [
              "Dearness Allowance (DA)",
              "9,982 – 10,850"
            ],
            [
              "House Rent Allowance (HRA)",
              "1,800 – 4,000"
            ],
            [
              "Transport & Other Allowances",
              "1,500 – 3,000"
            ],
            [
              "Approximate Gross Monthly Salary",
              "34,000 – 42,000"
            ]
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
          {
            title: "Know the syllabus and pattern inside out",
            description: "Understand exactly what each subject tests and how the weightage is split. Since there's no negative marking for wrong answers but a penalty for blanks, plan to attempt every single question."
          },
          {
            title: "Prioritize Haryana GK",
            description: "With 20% of the paper dedicated to state-specific knowledge, this is one of your biggest scoring opportunities. Build a dedicated set of notes on Haryana's history, geography, economy, and culture, and revise them regularly."
          },
          {
            title: "Start physical training early",
            description: "The PMT and PST are mandatory qualifying stages, so don't leave fitness until the last minute. Begin running practice well in advance—male candidates need to cover 2.5 km in 12 minutes—and build your stamina gradually."
          },
          {
            title: "Build a strong general studies foundation",
            description: "Cover polity, history, geography, and science systematically, and keep up with current affairs through a daily newspaper. Stick to one or two reliable sources to avoid information overload."
          },
          {
            title: "Practice reasoning and numerical ability daily",
            description: "These sections reward consistency. Solve a fixed number of problems each day to build both speed and accuracy."
          },
          {
            title: "Solve previous year papers and take mock tests",
            description: "Past papers reveal recurring question patterns, while regular mocks train you for the OMR-based format and help you manage your time across all 100 questions."
          },
          {
            title: "Don't overlook bonus marks",
            description: "If you hold an NCC certificate or qualify under socio-economic criteria, ensure your documents are in order—those extra marks can make a real difference in a competitive cutoff."
          }
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
      {
        question: "What is the minimum qualification for the Haryana Police Constable exam?",
        answer: "You must have passed Class 12 (10+2) from a recognized board, having studied Hindi or Sanskrit as a subject at either the matriculation or higher level. You also need to have qualified the HSSC CET for Group C to apply."
      },
      {
        question: "Is there negative marking in the Haryana Police Constable exam?",
        answer: "There's no negative marking for wrong answers in the Knowledge Test. However, marks are deducted for unattempted or blank questions, so you should aim to attempt every question on the paper."
      },
      {
        question: "What is the age limit for the Haryana Police Constable exam?",
        answer: "The age limit is 18 to 25 years, calculated as on 1 January 2026. Reserved categories receive relaxation—5 years for SC/BC/EWS candidates and 4 years for ex-servicemen."
      },
      {
        question: "What are the physical standards for the Haryana Police Constable exam?",
        answer: "Male candidates (General) need a height of 170 cm and a chest of 83–87 cm, while reserved category males need 168 cm and 81–85 cm. Female candidates need a height of 158 cm (General) or 156 cm (Reserved). In the running test, males must complete 2.5 km in 12 minutes and females 1 km in 6 minutes."
      },
      {
        question: "What is the salary of a Haryana Police Constable?",
        answer: "The post falls under Pay Level 3 of the 7th Pay Commission, with an initial basic pay of ₹21,700 (rising up to ₹69,100). With allowances like DA, HRA, and TA, the approximate gross monthly salary ranges from ₹34,000 to ₹42,000."
      },
      {
        question: "Is there an interview for the Haryana Police Constable exam?",
        answer: "No. The selection process consists of CET-based shortlisting, the Physical Measurement Test, the Physical Screening Test, the Knowledge Test, document verification, and a medical examination—there's no interview round."
      }
    ],
    relatedExams: [
      "hssc-cet",
      "up-police-constable",
      "delhi-police-constable"
    ]
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
          headers: [
            "Post",
            "Minimum Age",
            "Maximum Age"
          ],
          rows: [
            [
              "Stenographer Grade C",
              "18 years",
              "30 years"
            ],
            [
              "Stenographer Grade D",
              "18 years",
              "27 years"
            ]
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
          {
            stepNumber: 1,
            title: "Computer-Based Examination (CBE)",
            description: "The written objective test that decides the final merit marks."
          },
          {
            stepNumber: 2,
            title: "Skill Test in Stenography",
            description: "A qualifying shorthand dictation and transcription test on computer."
          }
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
          headers: [
            "Part",
            "Subject",
            "Questions",
            "Marks",
            "Duration"
          ],
          rows: [
            [
              "I",
              "General Intelligence & Reasoning",
              "50",
              "50",
              "30 minutes"
            ],
            [
              "II",
              "General Awareness",
              "50",
              "50",
              "30 minutes"
            ],
            [
              "III",
              "English Language & Comprehension",
              "100",
              "100",
              "60 minutes"
            ],
            [
              "Total",
              "All Sections Combined",
              "200",
              "200",
              "120 minutes"
            ]
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
          headers: [
            "Post",
            "Language",
            "Transcription Time",
            "Time for Scribe Users"
          ],
          rows: [
            [
              "Stenographer Grade D",
              "English",
              "50 minutes",
              "70 minutes"
            ],
            [
              "Stenographer Grade D",
              "Hindi",
              "65 minutes",
              "90 minutes"
            ],
            [
              "Stenographer Grade C",
              "English",
              "40 minutes",
              "55 minutes"
            ],
            [
              "Stenographer Grade C",
              "Hindi",
              "55 minutes",
              "75 minutes"
            ]
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
          {
            label: "English Language & Comprehension",
            percentage: 50
          },
          {
            label: "General Intelligence & Reasoning",
            percentage: 25
          },
          {
            label: "General Awareness",
            percentage: 25
          }
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
          headers: [
            "Component",
            "Stenographer Grade C",
            "Stenographer Grade D"
          ],
          rows: [
            [
              "Pay Level",
              "Level 6",
              "Level 4"
            ],
            [
              "Basic Pay",
              "₹35,400",
              "₹25,500"
            ],
            [
              "Grade Pay",
              "₹4,200",
              "₹2,400"
            ]
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
          {
            title: "Know the syllabus and pattern inside out",
            description: "Understand exactly what each section tests and how the new sectional timer works. With fixed time per subject, you can't afford to get stuck on any one part."
          },
          {
            title: "Make English your priority",
            description: "English carries half the written marks, so treat it as your biggest scoring opportunity. Build daily grammar, vocabulary, and reading comprehension practice into your routine, and maintain an error notebook to avoid repeating mistakes."
          },
          {
            title: "Start shorthand practice early",
            description: "The skill test is mandatory for final selection, so don't leave it until after the CBE. Build dictation speed gradually—aim for steady accuracy before pushing for raw speed."
          },
          {
            title: "Solve previous year papers and take mock tests",
            description: "Past papers reveal recurring question patterns, while regular mocks train you to handle the sectional timers and computer-based format. Analyze every mock for accuracy, timing, and weak topics."
          },
          {
            title: "Play the negative marking smartly",
            description: "Each wrong answer costs 0.25 marks. Attempt questions you're confident about rather than guessing blindly."
          },
          {
            title: "Revise General Awareness with limited sources",
            description: "Stick to one or two reliable sources, make short notes, and revise weekly. Keep up with current affairs through a daily newspaper."
          },
          {
            title: "Follow a phased study plan",
            description: "A common approach splits 90 days into three phases—building fundamentals first, then focusing on practice and speed, and finally on full mocks and revision. Trusted books like S.P. Bakshi for English, Lucent for GK, and R.S. Aggarwal for reasoning can anchor your prep."
          }
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
      {
        question: "What is the minimum qualification for SSC Stenographer?",
        answer: "You must have passed Class 12 (10+2) from a recognized board, along with possessing stenography skills. This makes it a great option for candidates who want a stable government job without needing a graduate degree."
      },
      {
        question: "Is there negative marking in the SSC Stenographer exam?",
        answer: "Yes. In the Computer-Based Examination, 0.25 marks are deducted for every wrong answer, so it pays to be selective about the questions you attempt."
      },
      {
        question: "What is the age limit for SSC Stenographer?",
        answer: "The age limit is 18 to 30 years for Grade C and 18 to 27 years for Grade D. Reserved categories receive relaxation—3 years for OBC, 5 years for SC/ST, and 10 years for PwBD (Unreserved)."
      },
      {
        question: "Is the skill test compulsory?",
        answer: "Yes. Only candidates who qualify the shorthand skill test—meeting the prescribed speed and accuracy norms—are considered for final selection. However, the final merit list is based solely on your Computer-Based Examination marks, as the skill test is qualifying in nature."
      },
      {
        question: "What is the salary of an SSC Stenographer?",
        answer: "Grade C falls under Pay Level 6 with a basic pay of ₹35,400, while Grade D falls under Pay Level 4 with a basic pay of ₹25,500. Both grades also receive allowances such as DA, HRA, and TA, along with CGHS medical benefits."
      },
      {
        question: "What is the difference between Stenographer Grade C and Grade D?",
        answer: "Grade C is a Group B (Non-Gazetted) post with a higher pay level (Level 6), greater responsibility, and a faster required dictation speed of 100 wpm. Grade D is a Group C post at Pay Level 4, with a dictation speed of 80 wpm."
      }
    ],
    relatedExams: [
      "ssc-cgl",
      "ssc-chsl",
      "ssc-mts"
    ]
  },
  {
    slug: "ctet-syllabus-pattern",
    title: "CTET 2026: Complete Guide to Eligibility, Exam Pattern, Syllabus, Salary & Preparation Tips",
    description: "A comprehensive guide to the CTET 2026 exam, covering eligibility criteria, exam pattern, detailed syllabus for Paper 1 and Paper 2, salary expectations for various teaching posts, and effective preparation strategies.",
    examSlug: "ctet",
    examName: "CTET Paper 1 & 2",
    category: "Teaching Exams",
    icon: "📚",
    type: "info",
    metaTitle: "CTET 2026: Eligibility, Exam Pattern, Syllabus, Salary & Preparation Guide",
    metaDescription: "Everything you need to know about CTET 2026, including eligibility, exam structure, detailed syllabus, salary for KVS/NVS teachers, and a practical preparation plan to clear the exam.",
    authorName: "Editorial Team",
    authorityBadge: "Expert Verified",
    publishDate: "June 30, 2026",
    readTime: "5 min read",
    quickAnswer: "The CTET (Central Teacher Eligibility Test) is a national-level eligibility exam conducted by CBSE for aspiring teachers in central government schools. It has two papers: Paper 1 (Classes I-V) and Paper 2 (Classes VI-VIII). Clearing CTET makes you eligible to apply for teaching positions in KVS, NVS, DSSSB, and various state education boards. The certificate has lifetime validity, and there is no negative marking in the exam. Preparation should focus on NCERT textbooks, Child Development and Pedagogy, and extensive practice with previous year's question papers.",
    sections: [
      {
        id: "what-is-ctet",
        title: "1. What is CTET?",
        paragraphs: [
          "If you've ever wanted to teach in a central government school—a Kendriya Vidyalaya, a Navodaya Vidyalaya, or a DSSSB-affiliated institution—there's one exam that stands between you and that classroom: the CTET.",
          "The Central Teacher Eligibility Test is India's national benchmark for teaching quality. It's conducted by CBSE, recognized across the country, and carries a certificate that now has lifetime validity. Clearing CTET doesn't land you a job directly, but it opens every major central government teaching recruitment to you. Without it, those doors stay firmly shut.",
          "This is the ninth installment in our series of comprehensive exam guides. We've already covered RRB NTPC, RRB Group D, IBPS PO, IBPS Clerk, SBI PO, SBI Clerk, RBI Assistant, and NABARD Grade A. This guide covers everything you need to know about CTET 2026—eligibility, exam pattern, syllabus, salary, and a practical preparation strategy.",
          "Let's get into it.",
          "CTET stands for the Central Teacher Eligibility Test. It is conducted by the Central Board of Secondary Education (CBSE) and serves as a mandatory eligibility criterion for anyone wishing to teach in centrally administered schools across India.",
          "It's important to understand what CTET is—and what it isn't. CTET is not a job exam. It is an eligibility certificate exam. Clearing it means you meet the minimum standard required to apply for central government teaching positions. Actual recruitment happens through separate processes conducted by KVS, NVS, DSSSB, and various state education boards.",
          "CTET has two papers:",
          "Paper 1 qualifies you to teach Classes I to V (Primary Level)",
          "Paper 2 qualifies you to teach Classes VI to VIII (Upper Primary Level)",
          "If you want to teach at both levels, you must appear in and clear both papers."
        ],
        table: {
          headers: [
            "Detail",
            "Information"
          ],
          rows: [
            [
              "Exam Name",
              "Central Teacher Eligibility Test (CTET)"
            ],
            [
              "Conducting Body",
              "Central Board of Secondary Education (CBSE)"
            ],
            [
              "Level",
              "National"
            ],
            [
              "Frequency",
              "Twice a year (tentatively)"
            ],
            [
              "Mode",
              "Offline (OMR-based)"
            ],
            [
              "Papers",
              "Paper 1 (Classes I–V) and Paper 2 (Classes VI–VIII)"
            ],
            [
              "Exam Date",
              "6 September 2026 (tentative)"
            ],
            [
              "Total Questions",
              "150 per paper"
            ],
            [
              "Total Marks",
              "150 per paper"
            ],
            [
              "Duration",
              "2 hours 30 minutes per paper"
            ],
            [
              "Negative Marking",
              "None"
            ],
            [
              "Certificate Validity",
              "Lifetime"
            ],
            [
              "Official Website",
              "ctet.nic.in"
            ]
          ]
        }
      },
      {
        id: "who-is-eligible",
        title: "2. Who is Eligible?",
        paragraphs: [
          "CTET has separate eligibility requirements for Paper 1 and Paper 2. Before building a preparation plan, confirm that you meet the criteria for the paper you intend to appear in.",
          "Age Limit",
          "Minimum age: 17 years",
          "Maximum age: No upper age limit",
          "Number of attempts: Unlimited",
          "Educational Qualification — Paper 1 (Classes I to V)",
          "You must meet one of the following:",
          "Senior Secondary (Class 12) with a minimum of 50% marks AND a 2-year Diploma in Elementary Education (D.El.Ed), or appearing in the final year",
          "Senior Secondary with a minimum of 45% marks and a 2-year Diploma in Education under NCTE norms (2002)",
          "Senior Secondary with a minimum of 50% marks AND a 4-year Bachelor of Elementary Education (B.El.Ed)",
          "Senior Secondary with a minimum of 50% marks AND a 2-year Diploma in Education (Special Education)",
          "A graduation degree AND a 2-year D.El.Ed, or a B.Ed",
          "Educational Qualification — Paper 2 (Classes VI to VIII)",
          "You must meet one of the following:",
          "Graduation with a minimum of 45% marks AND a 2-year Diploma in Elementary Education (D.El.Ed)",
          "Graduation with a minimum of 50% marks AND a 1-year B.Ed",
          "Graduation with a minimum of 50% marks AND a B.Ed (Special Education)",
          "A 4-year B.Sc.Ed or B.A.Ed with a minimum of 50% marks",
          "Nationality",
          "Indian citizens only"
        ]
      },
      {
        id: "ctet-2026-selection-process",
        title: "3. CTET 2026 Selection Process",
        paragraphs: [
          "Unlike most competitive exams, CTET does not have multiple stages of shortlisting—there's no interview, no mains exam, and no merit list for jobs. The process is straightforward:",
          "Step 1: Appear in CTET Paper 1 and/or Paper 2",
          "Choose your paper based on which level you want to teach. You can appear in both if you intend to be eligible for Classes I to VIII.",
          "Step 2: Clear the qualifying cutoff",
          "This is the only threshold you need to cross. Qualifying marks are:",
          "Step 3: Receive your CTET certificate",
          "Once you qualify, CBSE issues a CTET eligibility certificate. This certificate is now valid for lifetime (a rule that came into effect in 2022). You can appear in subsequent CTET exams to improve your score if desired.",
          "Step 4: Apply for teaching recruitment",
          "With your CTET certificate in hand, you're now eligible to apply for teacher recruitment drives conducted by KVS, NVS, DSSSB, and participating state education boards. Each organization runs its own selection process, which typically includes a written test, interview, and document verification."
        ],
        table: {
          headers: [
            "Category",
            "Minimum Marks Required",
            "Percentage"
          ],
          rows: [
            [
              "General",
              "90 out of 150",
              "60%"
            ],
            [
              "OBC (Non-Creamy Layer)",
              "82–83 out of 150",
              "≈55%"
            ],
            [
              "SC / ST",
              "82–83 out of 150",
              "≈55%"
            ]
          ]
        }
      },
      {
        id: "expected-timeline-for-ctet-2026",
        title: "Expected Timeline for CTET 2026",
        paragraphs: [],
        table: {
          headers: [
            "Event",
            "Expected Date"
          ],
          rows: [
            [
              "Notification Release",
              "April–May 2026"
            ],
            [
              "Application Window",
              "≈30 days after notification"
            ],
            [
              "Application Correction Window",
              "To be announced"
            ],
            [
              "Admit Card Release",
              "2–3 weeks before exam"
            ],
            [
              "CTET Exam Date",
              "6 September 2026 (tentative)"
            ],
            [
              "Result Declaration",
              "6–8 weeks after exam"
            ]
          ]
        }
      },
      {
        id: "exam-pattern",
        title: "4. Exam Pattern",
        paragraphs: [
          "Both Paper 1 and Paper 2 follow an offline, OMR-based format. Each paper contains 150 multiple-choice questions for 150 marks, with a duration of 2 hours 30 minutes. There is no negative marking — a significant advantage that rewards attempting every question."
        ],
        table: {
          headers: [
            "Subject",
            "Number of Questions",
            "Marks"
          ],
          rows: [
            [
              "Child Development and Pedagogy",
              "30",
              "30"
            ],
            [
              "Language I (compulsory)",
              "30",
              "30"
            ],
            [
              "Language II (compulsory)",
              "30",
              "30"
            ],
            [
              "Mathematics",
              "30",
              "30"
            ],
            [
              "Environmental Studies",
              "30",
              "30"
            ],
            [
              "Total",
              "150",
              "150"
            ]
          ]
        }
      },
      {
        id: "paper-2-exam-pattern",
        title: "Paper 2 Exam Pattern (Classes VI to VIII)",
        paragraphs: [],
        table: {
          headers: [
            "Subject",
            "Number of Questions",
            "Marks"
          ],
          rows: [
            [
              "Child Development and Pedagogy",
              "30",
              "30"
            ],
            [
              "Language I (compulsory)",
              "30",
              "30"
            ],
            [
              "Language II (compulsory)",
              "30",
              "30"
            ],
            [
              "Mathematics and Science (for Maths/Science teachers) OR Social Studies/Social Science (for SST teachers)",
              "60",
              "60"
            ],
            [
              "Total",
              "150",
              "150"
            ]
          ]
        }
      },
      {
        id: "key-points-to-remember",
        title: "Key points to remember:",
        paragraphs: [
          "Language I is based on the medium of instruction you choose; Language II is a different language testing communication and pedagogy skills",
          "For Paper 2, Maths/Science and Social Studies/Social Science are separate options, not combined — choose based on the subject you intend to teach",
          "All questions are MCQs; there is no descriptive component in either paper"
        ]
      },
      {
        id: "syllabus",
        title: "5. Syllabus",
        paragraphs: [
          "The CTET syllabus tests both subject knowledge and teaching ability. This dual focus — content and pedagogy — is what makes CTET distinct from purely academic exams. Every section includes not just the subject itself but also how to teach it effectively."
        ]
      },
      {
        id: "paper-1-syllabus",
        title: "Paper 1 Syllabus (Primary Stage: Classes I–V)",
        paragraphs: [
          "Child Development and Pedagogy (30 Questions)",
          "This section covers how children grow, learn, and develop. Key topics include:",
          "Principles of child development and their link to learning",
          "Theories of Piaget (cognitive stages), Kohlberg (moral development), and Vygotsky (Zone of Proximal Development)",
          "Child-centered and progressive education",
          "Multiple intelligences and individual differences",
          "Inclusive education and children with special needs",
          "Motivation, cognition, and factors that affect learning",
          "Formative assessment and learning processes",
          "Language I (30 Questions)",
          "Tests your reading comprehension and knowledge of language pedagogy in your chosen medium of instruction. Topics include unseen prose and poetry passages, grammar and verbal ability, principles of language teaching, role of listening and speaking, and remedial teaching.",
          "Language II (30 Questions)",
          "A different language from Language I. Topics include unseen prose passages, grammar and comprehension, communication and language skills, and the pedagogy of language development.",
          "Mathematics (30 Questions)",
          "Content topics: Geometry, shapes and space, numbers, addition, subtraction, multiplication, division, measurement, fractions, data handling, and patterns.",
          "Pedagogy topics: Nature of mathematics, teaching challenges, error analysis, diagnostics, and remedial teaching strategies.",
          "Environmental Studies (30 Questions)",
          "Content topics: Family and friends, food, shelter, water, travel, things we make and do, plants, and animals.",
          "Pedagogy topics: Scope and concept of EVS, integrated learning, experimentation, Continuous and Comprehensive Evaluation (CCE), and teaching materials."
        ]
      },
      {
        id: "paper-2-syllabus",
        title: "Paper 2 Syllabus (Elementary Stage: Classes VI–VIII)",
        paragraphs: [
          "Child Development and Pedagogy (30 Questions)",
          "Same broad themes as Paper 1, but focused on the 11–14 age group. Topics include development theories, inclusive education, diverse learners, motivation, and classroom learning processes.",
          "Language I and Language II (30 Questions each)",
          "Same structure as Paper 1 — one language focused on the teaching medium, the other testing language communication and pedagogy.",
          "Mathematics and Science (60 Questions — for Maths/Science teachers)",
          "Mathematics: Number system, fractions, integers, algebra, ratio and proportion, geometry, mensuration, and data handling; plus pedagogy of mathematics.",
          "Science: Food, materials, the living world, electric circuits, magnets, natural phenomena, and natural resources; plus pedagogy of science.",
          "Social Studies/Social Science (60 Questions — for SST teachers)",
          "History: Ancient India, medieval India, colonial period, and post-independence India.",
          "Geography: Earth and its resources, globe, environment, water, air, agriculture.",
          "Social and Political Life: Democracy, government, media, gender, judiciary, and the Constitution.",
          "Pedagogy: Critical thinking, enquiry methods, sources, and classroom discussions."
        ]
      },
      {
        id: "posts-and-salary",
        title: "6. Posts and Salary",
        paragraphs: [
          "Clearing CTET gives you eligibility—not employment. Your actual salary depends on which organization hires you and at what post level. Here's a breakdown of the most common teaching posts available to CTET-qualified candidates and what they pay."
        ]
      },
      {
        id: "post-categories",
        title: "Post Categories",
        paragraphs: [],
        table: {
          headers: [
            "Post",
            "Teaching Level",
            "CTET Requirement"
          ],
          rows: [
            [
              "PRT (Primary Teacher)",
              "Classes I–V",
              "Paper 1 qualified"
            ],
            [
              "TGT (Trained Graduate Teacher)",
              "Classes VI–VIII",
              "Paper 2 qualified"
            ],
            [
              "PGT (Post Graduate Teacher)",
              "Classes IX–XII",
              "No CTET required (but beneficial in some states)"
            ]
          ]
        }
      },
      {
        id: "kvs-teacher-salary-2026",
        title: "KVS Teacher Salary 2026 (7th Pay Commission — DA at 55%)",
        paragraphs: [
          "Note: Gross salary figures above are based on X-city postings (HRA at 30%). Figures will vary by city classification."
        ],
        table: {
          headers: [
            "Post",
            "Pay Level",
            "Basic Pay",
            "Gross In-Hand (Approx.)"
          ],
          rows: [
            [
              "PRT",
              "Level 6",
              "₹35,400/month",
              "₹69,000–₹70,890/month"
            ],
            [
              "TGT",
              "Level 7",
              "₹44,900/month",
              "₹86,000–₹88,465/month"
            ],
            [
              "PGT",
              "Level 8",
              "₹47,600/month",
              "₹90,000–₹93,460/month"
            ]
          ]
        }
      },
      {
        id: "nvs-teacher-salary-2026",
        title: "NVS Teacher Salary 2026",
        paragraphs: [
          "NVS teachers often receive free residential accommodation on school campuses, which substantially increases the effective value of the package—particularly for postings in semi-urban or rural areas."
        ],
        table: {
          headers: [
            "Post",
            "Basic Pay",
            "Gross In-Hand (Approx.)",
            "Additional Benefit"
          ],
          rows: [
            [
              "TGT",
              "₹44,900 (Level 7)",
              "₹55,000–₹62,000/month",
              "Free on-campus accommodation"
            ],
            [
              "PGT",
              "₹47,600 (Level 8)",
              "₹60,000–₹68,000/month",
              "Free on-campus accommodation"
            ]
          ]
        }
      },
      {
        id: "salary-comparison",
        title: "Salary Comparison: KVS vs NVS vs State Government Schools",
        paragraphs: [],
        table: {
          headers: [
            "Organisation",
            "PRT In-Hand (Approx.)",
            "TGT In-Hand (Approx.)",
            "Key Advantage"
          ],
          rows: [
            [
              "KVS",
              "₹69,000–₹70,890",
              "₹86,000–₹88,465",
              "Strong job security, high HRA in metros"
            ],
            [
              "NVS",
              "₹45,000–₹50,000",
              "₹55,000–₹62,000",
              "Free campus accommodation"
            ],
            [
              "State Govt. Schools",
              "₹28,000–₹45,000",
              "₹35,000–₹48,000",
              "Posting near home state"
            ]
          ]
        }
      },
      {
        id: "allowances-and-perks",
        title: "Allowances and Perks (KVS/NVS)",
        paragraphs: [
          "Teachers in central government schools receive a comprehensive set of allowances:",
          "Dearness Allowance (DA): Currently 55% of basic pay (effective January 2026); revised twice yearly",
          "House Rent Allowance (HRA): 30% (X cities), 20% (Y cities), 10% (Z cities) of basic pay",
          "Transport Allowance: ₹3,600/month in high TPTA cities; ₹1,800/month elsewhere",
          "Children's Education Allowance (CEA): ₹2,812.50 per child per month",
          "Hostel Subsidy: ₹8,437.50/month (for children staying in hostels)",
          "CGHS: Comprehensive health coverage for the teacher and their family",
          "NPS: National Pension Scheme (central government employees)",
          "Long paid vacations aligned with school calendars (summer and winter)",
          "Career Progression",
          "A CTET certificate doesn't just get you hired—it supports a structured, long-term career in the central school system. In KVS, for example:",
          "PRT ➔ TGT (with additional qualification and years of service)",
          "TGT ➔ Vice Principal → Principal (through Departmental Promotion Committees)",
          "Annual increments within the pay matrix at each level"
        ]
      },
      {
        id: "how-to-prepare-for-ctet-2026",
        title: "7. How to Prepare for CTET 2026",
        paragraphs: [
          "With the exam tentatively scheduled for 6 September 2026, you have a clear preparation window. CTET is considered achievable with 3–4 months of consistent, focused study—but the quality of your preparation matters more than the hours logged.",
          "Start with the Syllabus and Exam Pattern",
          "Before opening any book, read the official CTET syllabus in full. Understand exactly which topics fall under content and which fall under pedagogy. Many candidates lose marks in pedagogy because they treat it as background knowledge—it needs direct, structured study.",
          "Use NCERT Books as Your Foundation",
          "This isn't optional advice—it's essential. CTET question papers are directly based on NCERT textbooks for Classes I to VIII. Study the subject content chapters carefully, especially for Mathematics, EVS, Science, and Social Studies. If you can understand and explain what's in those textbooks, you're already covering a large portion of the exam.",
          "Practice Previous Year Question Papers (PYQs)",
          "Go through at least the last 5 years of CTET question papers for the paper you're targeting. PYQs reveal the question style, topic weightage, and difficulty level more accurately than any guide or study plan. Let them shape your priorities from day one.",
          "Give Serious Attention to Child Development and Pedagogy",
          "This section appears in both papers for 30 marks and is consistently underestimated. It's not about memorizing definitions—it's about understanding how children learn and how teaching should respond to that. Study Piaget, Kohlberg, and Vygotsky with genuine depth, and practice applying those theories to scenario-based MCQs. This is where many candidates gain or lose decisive marks.",
          "Choose Your Languages Strategically",
          "Language I and Language II together account for 60 marks in both papers. Choose them based on your actual proficiency, not familiarity. If you're stronger in one language, make it Language I. Spend more preparation time on the one you're less confident in—both must be cleared.",
          "Take Timed Mock Tests",
          "After 4–5 weeks of content study, start taking full-length mock tests under timed conditions. CTET gives you 2.5 hours for 150 questions—that's 1 minute per question. Time pressure is real, and the only way to manage it is to simulate it in practice. After each mock test, analyze what went wrong and revisit those topics before the next test.",
          "Study 2–3 Hours Daily and Stay Consistent",
          "You don't need marathon study sessions. Candidates who study for 2–3 hours daily, six days a week, with a clear topic plan, consistently outperform those who cram sporadically. Build short notes as you study—these become invaluable for revision in the final 2–3 weeks before the exam."
        ]
      },
      {
        id: "your-next-step",
        title: "8. Your Next Step",
        paragraphs: [
          "The CTET September 2026 exam date is tentatively set for 6 September 2026. The notification has already been released, meaning the application window is either open or recently closed—check ctet.nic.in for the current status and the official correction window deadline.",
          "If you're starting preparation now, here's where to begin:",
          "1. Download the official CTET syllabus from ctet.nic.in",
          "2. Source NCERT textbooks (Classes 1–8) for your relevant subjects",
          "3. Go through 3–5 years of PYQs for your target paper",
          "4. Build a topic-wise weekly schedule, with extra time set aside for Child Development and Pedagogy",
          "5. Begin mock tests after the first month of study",
          "The CTET certificate carries lifetime validity and is accepted for recruitment by KVS, NVS, DSSSB, and dozens of state-level boards. Clearing it once gives you access to one of the most stable, well-compensated career paths available in India's public sector. The preparation investment is well worth it.",
          "For all official updates, notifications, and admit card releases, bookmark the official CTET website: ctet.nic.in."
        ]
      },
      {
        id: "frequently-asked-questions",
        title: "9. Frequently Asked Questions (FAQs)",
        paragraphs: [
          "What is the difference between CTET Paper 1 and Paper 2?",
          "Paper 1 qualifies you to teach Classes I to V (Primary Level). Paper 2 qualifies you to teach Classes VI to VIII (Upper Primary Level). If you want to teach at both levels, you must appear in and clear both papers. The exams are held on the same day, one after the other.",
          "How many times is CTET conducted in a year?",
          "CBSE tentatively conducts CTET twice a year, though the actual frequency depends on official announcements. Always verify through ctet.nic.in.",
          "Is there negative marking in CTET 2026?",
          "No. There is no negative marking in CTET. You receive 1 mark for each correct answer and 0 for wrong or unattempted answers. This means you should attempt every question.",
          "How long is the CTET certificate valid?",
          "Since 2022, the CTET qualifying certificate carries lifetime validity for all categories. There is no expiry date.",
          "Can I appear in CTET more than once?",
          "Yes. There is no limit on the number of attempts. Candidates can appear in multiple CTET cycles to improve their score.",
          "What is the qualifying score for CTET 2026?",
          "General category candidates must score 90 out of 150 (60%) to qualify. OBC (Non-Creamy Layer) and SC/ST candidates require approximately 82–83 out of 150 (55%). Final relaxation norms are confirmed in the official notification.",
          "Does clearing CTET guarantee a teaching job?",
          "No. CTET is an eligibility certificate, not a direct appointment. After clearing CTET, you must apply separately to organizations like KVS, NVS, or DSSSB when vacancies are notified and clear their own selection processes.",
          "Which organizations accept CTET scores for recruitment?",
          "The key recruiters who require CTET qualification include KVS (Kendriya Vidyalaya Sangathan), NVS (Navodaya Vidyalaya Samiti), DSSSB (Delhi Subordinate Services Selection Board), and several state government education boards across India.",
          "Which books should I use to prepare for CTET?",
          "NCERT textbooks for Classes 1 to 8 are the primary and most important resource—CTET questions are directly drawn from them. Supplement with a dedicated Child Development and Pedagogy guide, and practice PYQs from CTET's previous editions.",
          "What is the application fee for CTET 2026?",
          "Application fees vary by category and the number of papers. Typically, General/OBC candidates pay around ₹1,000 for both papers or ₹500 for one paper; SC/ST/PwBD candidates pay approximately ₹250–₹300. Confirm exact figures from the official CTET notification on ctet.nic.in.",
          "Can I appear in CTET while still completing my B.Ed or D.El.Ed?",
          "Candidates appearing in the final year of their qualifying degree or diploma are eligible to apply for CTET in most cases, subject to conditions stated in the notification. Verify your specific situation in the eligibility section of the official CTET Information Bulletin.",
          "What is the difference between CTET and state TET exams?",
          "CTET is a national-level exam conducted by CBSE and is valid for central government school recruitment across India. State TET exams (like UPTET, REET, TNTET) are conducted by individual states and are valid only for schools in that specific state. In many states, both a state TET and CTET score are required or accepted."
        ]
      }
    ]
  },
  {
    slug: "bihar-police-constable-syllabus-pattern",
    title: "Bihar Police Constable Exam Guide: Eligibility, Pattern, Syllabus, and Salary",
    description: "Dreaming of a stable government job in uniform with just a Class 12 pass? The Bihar Police Constable exam is one of the most accessible routes in, with a huge 19,838 vacancies announced in the most recent recruitment drive. This guide walks you through everything you need to know: who can apply, how the exam works, what's on the syllabus, what you'll earn, and how to prepare. Let's get into it.",
    examSlug: "bihar-police-constable",
    examName: "Bihar Police Constable",
    category: "Police Exams",
    icon: "👮",
    type: "info",
    metaTitle: "Bihar Police Constable Exam Guide: Eligibility, Pattern & Salary",
    metaDescription: "Your complete guide to the Bihar Police Constable exam. Learn about eligibility, exam pattern, syllabus, salary, and proven preparation tips for the latest CSBC recruitment.",
    authorName: "Editorial Team",
    authorityBadge: "Subject Matter Expert",
    publishDate: "June 30, 2026",
    readTime: "5 min read",
    quickAnswer: "The Bihar Police Constable exam is a state-level recruitment test conducted by the Central Selection Board of Constables (CSBC) to fill Constable posts in the Bihar Police and Special Armed Forces. It requires a Class 12 pass, has a written exam (100 questions, no negative marking), and a scored Physical Efficiency Test (PET). The starting salary is ₹21,700 (Pay Level 3) with gross pay between ₹30,000-₹40,000.",
    sections: [
      {
        id: "what-is-the-bihar-police-constable-exam",
        title: "What is the Bihar Police Constable Exam?",
        paragraphs: [
          "The Bihar Police Constable exam is a state-level recruitment test conducted by the Central Selection Board of Constables (CSBC) to fill Constable posts in the Bihar Police and Special Armed Forces.",
          "It's an entry-level law enforcement role that puts you at the heart of public safety—patrolling communities, supporting investigations, and maintaining order across the state. With nearly 20,000 vacancies in the latest cycle, it ranks among the largest state recruitment opportunities going right now.",
          "The selection runs across multiple stages and tests both your academic knowledge and physical fitness. You can find all official details at the board's website, csbc.bihar.gov.in."
        ]
      },
      {
        id: "who-is-eligible-for-bihar-police-constable",
        title: "Who is Eligible for Bihar Police Constable?",
        paragraphs: [
          "Before you apply, make sure you meet the eligibility requirements covering age, education, nationality, and physical standards."
        ]
      },
      {
        id: "age-limit",
        title: "Age Limit",
        paragraphs: [
          "The lower age limit is 18 years for everyone, but the upper limit varies by category:"
        ],
        table: {
          headers: [
            "Category",
            "Upper Age Limit (Male)",
            "Upper Age Limit (Female)"
          ],
          rows: [
            [
              "General",
              "25 years",
              "25 years"
            ],
            [
              "BC / EBC",
              "27 years",
              "28 years"
            ],
            [
              "SC / ST",
              "30 years",
              "30 years"
            ]
          ]
        }
      },
      {
        id: "educational-qualification",
        title: "Educational Qualification",
        paragraphs: [
          "You must have passed Class 12 (10+2) from a recognized board. Candidates who completed 10+2 from the Bihar State Madrasa Education Board, Bihar State Sanskrit Shiksha Board, or other equivalent recognized boards are also eligible."
        ]
      },
      {
        id: "nationality",
        title: "Nationality",
        paragraphs: [
          "Only Indian citizens are eligible to apply."
        ]
      },
      {
        id: "physical-standards",
        title: "Physical Standards",
        paragraphs: [
          "Since this is a police role, physical eligibility matters. Here's a breakdown of the minimum requirements:"
        ],
        table: {
          headers: [
            "Category",
            "Height",
            "Chest (Male only)"
          ],
          rows: [
            [
              "Male (General/BC)",
              "165 cm",
              "81–86 cm"
            ],
            [
              "Male (EBC)",
              "160 cm",
              "81–86 cm"
            ],
            [
              "Male (SC/ST)",
              "160 cm",
              "79–84 cm"
            ],
            [
              "Female (All categories)",
              "155 cm",
              "NA"
            ]
          ]
        }
      },
      {
        id: "what-is-the-bihar-police-constable-exam-pattern",
        title: "What is the Bihar Police Constable Exam Pattern?",
        paragraphs: [
          "The written exam is an offline, OMR-based test pitched at the Class 10 (Matric) level. It consists of 100 multiple-choice questions worth a total of 100 marks, to be completed in 2 hours.",
          "Here's the detail that shapes your strategy: there's no negative marking. Each correct answer earns you 1 mark, and wrong answers cost you nothing. That means you should attempt every single question—leaving any blank only limits your score.",
          "The written exam is qualifying in nature. You'll need to score at least 30% to clear it and move on to the physical tests. The questions are drawn from the following subjects:"
        ],
        table: {
          headers: [
            "Subject",
            "Questions",
            "Marks"
          ],
          rows: [
            [
              "Hindi",
              "—",
              "—"
            ],
            [
              "English",
              "—",
              "—"
            ],
            [
              "Mathematics",
              "—",
              "—"
            ],
            [
              "Social Science (History, Geography, Civics, Economics)",
              "—",
              "—"
            ],
            [
              "Science (Physics, Chemistry, Zoology, Botany)",
              "—",
              "—"
            ],
            [
              "General Studies & Current Affairs",
              "—",
              "—"
            ],
            [
              "Total",
              "100",
              "100"
            ]
          ]
        }
      },
      {
        id: "note-on-subject-distribution",
        title: "Note on Subject Distribution",
        paragraphs: [
          "Note that CSBC sets a combined total of 100 questions across all subjects rather than publishing a fixed number per subject, so coverage can vary between recruitment cycles."
        ]
      },
      {
        id: "selection-process",
        title: "Selection Process",
        paragraphs: [
          "Clearing the written exam is just the first step. The full process runs across these stages:",
          "1. Written Examination — the 100-question OMR test described above (qualifying only)",
          "2. Physical Standards Test (PST) — verifies your height, chest, and weight measurements",
          "3. Physical Efficiency Test (PET) — a scored fitness test worth 100 marks",
          "4. Document Verification & Medical Examination — the final checks before selection",
          "Unlike many state exams where the written score decides everything, the Bihar Police PET is scored out of 100 marks and plays a major role in the final merit list. Here's how those marks break down:"
        ],
        table: {
          headers: [
            "Event",
            "Male",
            "Female",
            "Max Marks"
          ],
          rows: [
            [
              "Running",
              "1.6 km in under 6 minutes",
              "1 km in under 5 minutes",
              "50"
            ],
            [
              "High Jump",
              "4 feet (minimum)",
              "3 feet (minimum)",
              "25"
            ],
            [
              "Shot Put (Gola Fek)",
              "16 lb thrown over 16 feet",
              "12 lb thrown over 12 feet",
              "25"
            ]
          ]
        }
      },
      {
        id: "physical-test-importance",
        title: "Physical Test Importance",
        paragraphs: [
          "Falling below the minimum standard in any event leads to disqualification, so the physical test deserves as much attention as the written paper."
        ]
      },
      {
        id: "what-does-the-bihar-police-constable-syllabus-cover",
        title: "What Does the Bihar Police Constable Syllabus Cover?",
        paragraphs: [
          "The syllabus spans several subjects, all pitched at the Class 10 level. It's broad, but completely manageable once you break it down section by section. Here's what to focus on:",
          "Hindi: संज्ञा, सर्वनाम, कारक, लिंग, वचन, काल, क्रिया, विशेषण, पर्यायवाची, विलोम शब्द, अनेकार्थक शब्द, and समानार्थी शब्द.",
          "English: Vocabulary, grammar, synonyms and antonyms, sentence structure, sentence correction, and English writing ability.",
          "Mathematics: Percentage, ratio and proportion, profit and loss, time and distance, time and work, averages, simple and compound interest, discount, number systems, mensuration, and relationships between numbers.",
          "Science (Physics): Motion, work and energy, electric current and circuits, magnets and magnetism, light, sound, natural phenomena, and sources of energy.",
          "Science (Chemistry): Molecules, mixtures, metals and non-metals, carbon, acids, bases and salts (and their daily-life uses), and the transformation of matter.",
          "Science (Biology): Natural resources, environmental concerns, and soil.",
          "Social Science — History: Ancient civilizations, the pre-historic world, the Revolt of 1857, the Nationalist movements (1918–1947), Partition and Independence, and the spread of modernization.",
          "Social Science — Geography: Fundamentals of physical geography, human geography, Indian geography (physical aspects and drainage systems), and economic geography.",
          "Social Science — Civics: Concept of politics, electoral systems in India, the Union and State Executives, State Legislature, Indian Judiciary, foreign policy, national integration, and local self-government with special reference to Bihar.",
          "Social Science — Economics: Introduction to economics, microeconomics, macroeconomics, the economic development of Bihar and India, and economic reforms since 1991.",
          "General Studies & Current Affairs: Current affairs, the Indian Constitution, awards and honours, history, culture, science, inventions and discoveries, and financial and economic news.",
          "The complete, official syllabus is available in the recruitment notification, so always cross-check with the latest version on csbc.bihar.gov.in."
        ]
      },
      {
        id: "bihar-police-constable-salary-and-posts",
        title: "Bihar Police Constable Salary and Posts",
        paragraphs: [
          "A career in the Bihar Police offers far more than a monthly paycheck—it brings job security, allowances, and a clear path up the ranks."
        ]
      },
      {
        id: "salary",
        title: "Salary",
        paragraphs: [
          "Under the 7th Pay Commission, a Bihar Police Constable starts at Pay Level 3 with an initial basic pay of ₹21,700 per month. Once allowances are added, the monthly gross salary typically lands between ₹30,000 and ₹40,000, and the pay scale can rise to around ₹69,100 over a long service period.",
          "On top of the basic pay, constables receive a range of allowances and benefits:",
          "Dearness Allowance (DA)",
          "House Rent Allowance (HRA)",
          "Travel Allowance (TA)",
          "Uniform Allowance",
          "Medical Aid",
          "Vehicle Allowance",
          "Ration Money Allowance"
        ]
      },
      {
        id: "job-responsibilities",
        title: "Job Responsibilities",
        paragraphs: [
          "The role of a constable is varied and hands-on. Day-to-day duties include patrolling assigned areas, maintaining law and order, registering First Information Reports (FIRs), recording witness statements, interrogating suspects, gathering evidence, making arrests, handling official paperwork, and responding quickly to emergencies."
        ]
      },
      {
        id: "career-growth",
        title: "Career Growth",
        paragraphs: [
          "The Bihar Police rewards experience and strong performance with steady promotions. Based on service and performance, constables become eligible for promotion to Assistant Sub-Inspector (ASI) after roughly 10–12 years, and can climb further from there. The typical career ladder looks like this:",
          "1. Constable",
          "2. Head Constable",
          "3. Assistant Sub-Inspector (ASI)",
          "4. Sub-Inspector (SI)",
          "5. Inspector",
          "In other words, the constable post is a starting point—not a ceiling."
        ]
      },
      {
        id: "how-to-prepare-for-the-bihar-police-constable-exam",
        title: "How to Prepare for the Bihar Police Constable Exam",
        paragraphs: [
          "With nearly 20,000 seats and heavy competition expected, smart preparation makes all the difference. These tips will help you build an effective strategy.",
          "Start with the syllabus and pattern. Understand exactly what's tested before you open a single book. Since everything is pitched at the Class 10 level, your old NCERT textbooks are a goldmine.",
          "Prioritize Bihar-specific content. Questions on Bihar's economy, civics, and local self-government appear regularly and are often overlooked by candidates who study only national material.",
          "Master high-frequency Maths topics. Percentage, profit and loss, time and work, and simple/compound interest show up consistently—nail these first.",
          "Stay current with affairs. Read a daily newspaper or a monthly current affairs digest, paying special attention to Bihar state news alongside national events.",
          "Revise Hindi and English grammar. Both language sections are scoring and tend to repeat topics across papers, so regular revision pays off.",
          "Attempt every question. With no negative marking, leaving questions blank only reduces your score. Make an educated guess if you must.",
          "Take regular mock tests. Aim for two to three full-length mocks a week in your final two months to build speed and accuracy, and review previous year papers to spot question trends.",
          "Train for the physical test early. Because the PET is scored, not just qualifying, every extra second on the run and every extra foot on the jump or throw adds to your final marks. Start running, jumping, and practicing shot put well in advance."
        ]
      },
      {
        id: "your-next-step",
        title: "Your Next Step",
        paragraphs: [
          "The Bihar Police Constable exam is a genuine opportunity—nearly 20,000 secure government posts, a respected role in uniform, and a clear path for career growth, all open to candidates with just a Class 12 qualification. And with no negative marking and a Class 10 difficulty level, the written exam is well within reach for focused aspirants.",
          "Now that you understand the eligibility, pattern, syllabus, and salary, the next move is yours. Download the official notification from csbc.bihar.gov.in, map out your study plan, and start practicing today."
        ]
      },
      {
        id: "frequently-asked-questions",
        title: "Frequently Asked Questions",
        paragraphs: []
      },
      {
        id: "how-many-questions-and-marks-are-in-the-bihar-police-constable-exam",
        title: "How many questions and marks are in the Bihar Police Constable exam?",
        paragraphs: [
          "The written exam has 100 multiple-choice questions for a total of 100 marks, with each correct answer worth 1 mark."
        ]
      },
      {
        id: "is-there-negative-marking-in-the-exam",
        title: "Is there negative marking in the exam?",
        paragraphs: [
          "No. There is no penalty for wrong answers, so you should attempt every question."
        ]
      },
      {
        id: "what-is-the-educational-qualification-required",
        title: "What is the educational qualification required?",
        paragraphs: [
          "You must have passed Class 12 (10+2) from a recognized board or an equivalent qualification."
        ]
      },
      {
        id: "what-is-the-age-limit",
        title: "What is the age limit?",
        paragraphs: [
          "The minimum age is 18 years. The upper limit is 25 years for General candidates, with relaxation up to 27–28 years for BC/EBC and 30 years for SC/ST candidates as per government norms."
        ]
      },
      {
        id: "what-is-the-duration-of-the-exam",
        title: "What is the duration of the exam?",
        paragraphs: [
          "The written exam is 2 hours long and is conducted offline in OMR-based mode at the Class 10 level."
        ]
      },
      {
        id: "what-is-the-selection-process",
        title: "What is the selection process?",
        paragraphs: [
          "There are four stages: the Written Examination (qualifying), the Physical Standards Test (PST), the Physical Efficiency Test (PET, scored out of 100 marks), and finally Document Verification and a Medical Examination."
        ]
      },
      {
        id: "what-is-the-starting-salary-of-a-bihar-police-constable",
        title: "What is the starting salary of a Bihar Police Constable?",
        paragraphs: [
          "The initial basic pay is ₹21,700 per month at Pay Level 3 of the 7th Pay Commission, with a gross monthly salary typically between ₹30,000 and ₹40,000 after allowances."
        ]
      }
    ]
  },
  {
    slug: "hssc-cet-exam-guide-syllabus-pattern",
    title: "HSSC CET (Group C & D) Exam Guide: Eligibility, Pattern, Syllabus, and Salary",
    description: "Dreaming of a stable Haryana government job? The HSSC CET is your single gateway to hundreds of Group C and Group D positions across the state. Instead of applying for each post separately, you take one common test—and a qualifying score stays valid for three years. This guide breaks down everything you need to know: who can apply, how the exam works, what's on the syllabus, what you'll earn, and how to prepare. Let's get into it.",
    examSlug: "hssc-cet",
    examName: "HSSC CET (Group C & D)",
    category: "HSSC Exams",
    icon: "📋",
    type: "info",
    metaTitle: "HSSC CET Group C & D Exam Guide: Eligibility, Pattern & Salary",
    metaDescription: "Your complete guide to the HSSC CET exam. Learn about eligibility, exam pattern, syllabus, salary, and proven preparation tips for Group C & D posts.",
    authorName: "Editorial Team",
    authorityBadge: "null",
    publishDate: "June 30, 2026",
    readTime: "5 min read",
    quickAnswer: "The HSSC CET (Common Eligibility Test) is a mandatory screening exam conducted by the Haryana Staff Selection Commission for recruitment to Group C and Group D government posts in Haryana. It assesses candidates' general knowledge, reasoning, quantitative ability, English, Hindi, and Haryana GK. A qualifying score is valid for three years, making candidates eligible for various positions.",
    sections: [
      {
        id: "what-is-the-hssc-cet-exam",
        title: "What is the HSSC CET Exam?",
        paragraphs: [
          "The HSSC CET, or Common Eligibility Test, is conducted by the Haryana Staff Selection Commission to recruit candidates for Group C and Group D posts in various state government departments.",
          "Think of it as a one-stop screening test. Rather than sitting for separate exams every time a department announces a vacancy, you clear the CET once and become eligible to apply for multiple roles. Group C posts are assessed at the Senior Secondary (10+2) level, while Group D posts are at the Matriculation (Class 10) level.",
          "The best part? Your CET score is valid for three years from the date of the exam. That means one strong performance opens doors to numerous opportunities over the next several years. You can find all official details at the commission's website, hssc.gov.in."
        ]
      },
      {
        id: "who-is-eligible-for-hssc-cet",
        title: "Who is Eligible for HSSC CET?",
        paragraphs: [
          "Before you apply, make sure you tick all the eligibility boxes. The criteria are straightforward, covering age, education, and nationality."
        ]
      },
      {
        id: "age-limit",
        title: "Age Limit",
        paragraphs: [
          "You must be between 18 and 42 years old. Candidates from reserved categories receive relaxation in the upper age limit:",
          "SC/ST/OBC: 5 years",
          "Ex-Servicemen: 3 years",
          "Persons with Benchmark Disability: 10 years",
          "Unmarried Women/Widows: Up to 47 years"
        ]
      },
      {
        id: "educational-qualification",
        title: "Educational Qualification",
        paragraphs: [
          "Group D posts: You must have passed at least Class 10 (Matriculation) from a recognized board, with Hindi or Sanskrit as one of the subjects.",
          "Group C posts: You must have completed at least Class 10+2 (Senior Secondary).",
          "Only Indian citizens are eligible. Candidates from any state across India can apply, as long as they meet all other criteria.",
          "A few more things to note: No prior work experience is required, so freshers are welcome. There's also no cap on the number of attempts—you can sit for the CET as many times as you like until you reach the maximum age limit."
        ]
      },
      {
        id: "what-is-the-hssc-cet-exam-pattern",
        title: "What is the HSSC CET Exam Pattern?",
        paragraphs: [
          "The CET is an offline, OMR-based test conducted in both Hindi and English. It consists of 100 multiple-choice questions worth a total of 100 marks, to be completed in 1 hour and 45 minutes.",
          "One detail worth highlighting: there's no negative marking for wrong answers. However, leaving a question unattempted results in a deduction of 1 mark, so it pays to attempt every question. To qualify, general category candidates need at least 50%, while reserved category candidates need 40%.",
          "The subject breakdown differs slightly between Group C and Group D."
        ]
      },
      {
        id: "group-c-exam-pattern",
        title: "Group C Exam Pattern",
        paragraphs: [],
        table: {
          headers: [
            "Subject",
            "Questions",
            "Marks"
          ],
          rows: [
            [
              "General Knowledge + Computer",
              "15",
              "15"
            ],
            [
              "Reasoning",
              "15",
              "15"
            ],
            [
              "Maths",
              "15",
              "15"
            ],
            [
              "English",
              "15",
              "15"
            ],
            [
              "Hindi",
              "15",
              "15"
            ],
            [
              "Haryana GK",
              "25",
              "25"
            ],
            [
              "Total",
              "100",
              "100"
            ]
          ]
        }
      },
      {
        id: "group-d-exam-pattern",
        title: "Group D Exam Pattern",
        paragraphs: [
          "Notice that Haryana GK carries the highest weightage in both exams—25 marks. That makes it a section you simply can't afford to ignore."
        ],
        table: {
          headers: [
            "Subject",
            "Questions",
            "Marks"
          ],
          rows: [
            [
              "Reasoning",
              "10",
              "10"
            ],
            [
              "Hindi",
              "10",
              "10"
            ],
            [
              "Quantitative Ability (Maths)",
              "15",
              "15"
            ],
            [
              "General Science",
              "15",
              "15"
            ],
            [
              "General Awareness",
              "15",
              "15"
            ],
            [
              "English",
              "10",
              "10"
            ],
            [
              "Haryana GK",
              "25",
              "25"
            ],
            [
              "Total",
              "100",
              "100"
            ]
          ]
        }
      },
      {
        id: "what-does-the-hssc-cet-syllabus-cover",
        title: "What Does the HSSC CET Syllabus Cover?",
        paragraphs: [
          "The syllabus is broad but manageable once you break it into subjects. Group C and Group D cover similar topics, though Group C questions are pitched at a slightly higher difficulty level. Here's what to focus on:",
          "General Awareness: Current events, history, polity and the Constitution, geography, economics, art and culture, the environment, and general science.",
          "Reasoning: Verbal and non-verbal reasoning, analogies, classification, series, coding-decoding, Venn diagrams, pattern folding, and problem solving.",
          "Quantitative Ability (Maths): Number systems, simplification, percentages, ratio and proportion, profit and loss, time and work, mensuration, algebra, geometry, and trigonometry.",
          "English Language: Spotting errors, fill in the blanks, synonyms and antonyms, idioms, one-word substitution, active/passive voice, tenses, cloze tests, and comprehension.",
          "Hindi Language: शब्द, विलोम, पर्यायवाची, मुहावरे, समास, संधि, काल, लिंग, वचन, कारक, and वर्तनी.",
          "Computer Knowledge: Computer basics (CPU, memory, I/O devices), MS Office (Word, Excel, PowerPoint), and internet usage.",
          "General Knowledge of Haryana: The state's history, literature, geography, economy, polity, art, culture, customs, and current affairs.",
          "The official syllabus is included in the exam notification under Appendix C, so always cross-check with the latest version on hssc.gov.in."
        ]
      },
      {
        id: "hssc-cet-salary-and-posts",
        title: "HSSC CET Salary and Posts",
        paragraphs: [
          "A government job through the CET offers more than just a paycheck—it brings job security, allowances, and clear paths for promotion."
        ]
      },
      {
        id: "group-c-salary",
        title: "Group C Salary",
        paragraphs: [
          "Group C positions come with a pay scale ranging from ₹9,300 to ₹34,800 per month, plus allowances such as Dearness Allowance (DA), House Rent Allowance (HRA), Travel Allowance, and medical benefits. Here's a look at some popular posts and their pay levels:",
          "Other Group C roles include clerks, tax assistants, typists, stenographers, and primary teachers."
        ],
        table: {
          headers: [
            "Post",
            "Pay Level",
            "Salary (₹)"
          ],
          rows: [
            [
              "Deputy Ranger",
              "Level 6",
              "35,400"
            ],
            [
              "Sub-Inspector",
              "Level 6",
              "35,400"
            ],
            [
              "Junior Coach",
              "Level 6",
              "35,400"
            ],
            [
              "Assistant Lineman (ALM)",
              "Level 4",
              "25,500"
            ],
            [
              "Constable",
              "Level 3",
              "21,700"
            ],
            [
              "Warder",
              "Level 2",
              "19,900"
            ]
          ]
        }
      },
      {
        id: "group-d-posts",
        title: "Group D Posts",
        paragraphs: [
          "Group D covers semi-skilled and support roles such as peons, sweepers, cooks, and guards. These positions also come with structured pay, government allowances, and steady job security."
        ]
      },
      {
        id: "career-growth",
        title: "Career Growth",
        paragraphs: [
          "Government service rewards experience. An Assistant Lineman can rise to Junior Engineer and beyond. A Constable can climb the ranks to Head Constable, ASI, SI, and Inspector. Promotions are based on performance, experience, and departmental assessments—so there's always room to grow."
        ]
      },
      {
        id: "how-to-prepare-for-the-hssc-cet-exam",
        title: "How to Prepare for the HSSC CET Exam",
        paragraphs: [
          "Clearing the CET is well within reach if you study smart. These tips will help you build an effective preparation strategy.",
          "Start with the syllabus. Read through the entire syllabus and understand the exam pattern before you open a single book. Knowing what to expect helps you spend time where it counts.",
          "Prioritize Haryana GK. With 25 marks on the line, this is your highest-scoring section. Dedicate consistent time to Haryana's history, geography, culture, and current affairs.",
          "Practice Maths and Reasoning daily. These subjects reward speed and accuracy, both of which improve only with regular practice.",
          "Strengthen your grammar. Work through English and Hindi grammar topics and practice comprehension questions to lock in easy marks.",
          "Solve previous year papers. Past papers reveal the real difficulty level and the types of questions you'll face. They're one of the best preparation tools available.",
          "Take mock tests. Simulate exam conditions, then analyze your mistakes carefully. This is where real improvement happens.",
          "Revise regularly. Set aside one day each week to revisit everything you've learned. Consistent revision keeps information fresh and builds confidence.",
          "A 60-day study plan works well for most candidates: spend the first two weeks on basics, the next two weeks on timed practice and previous papers, and the final stretch on full-length mock tests and targeted revision of weak areas."
        ]
      },
      {
        id: "your-next-step",
        title: "Your Next Step",
        paragraphs: [
          "The HSSC CET is one of the smartest investments you can make in your career. One exam, three years of validity, and access to hundreds of secure government posts across Haryana—that's a deal worth preparing for.",
          "Now that you understand the eligibility, pattern, syllabus, and salary, the next move is yours. Download the official notification from hssc.gov.in, map out your study plan, and start practicing today. Your government job journey begins with a single, focused effort."
        ]
      },
      {
        id: "frequently-asked-questions",
        title: "Frequently Asked Questions",
        paragraphs: [
          "What is the validity of the HSSC CET score?",
          "The CET score is valid for three years from the date of the examination.",
          "Is there negative marking in the HSSC CET exam?",
          "No, there is no negative marking for wrong answers. However, leaving a question unattempted results in a deduction of 1 mark, so attempt all questions.",
          "What is the minimum qualifying percentage?",
          "General category candidates need at least 50%, while reserved category candidates (both vertical and horizontal) need 40%.",
          "What is the educational qualification required?",
          "Group D posts require a Class 10 (Matriculation) pass, while Group C posts require Class 10+2 (Senior Secondary).",
          "Can candidates from other states apply for HSSC CET?",
          "Yes. Candidates from any state in India can apply, provided they meet all the eligibility criteria.",
          "How many times can I attempt the HSSC CET?",
          "There's no limit on attempts. You can sit for the exam as many times as you like until you reach the maximum age limit for your category.",
          "What is the selection process?",
          "For Group D, selection is based on the CET score along with socio-economic criteria and experience. For Group C, candidates go through the CET, a screening test, and the same additional criteria."
        ]
      }
    ]
  },
  {
    slug: "rrb-ntpc-syllabus-pattern",
    title: "RRB NTPC 2026: Complete Guide to Eligibility, Exam Pattern, Syllabus, Salary & Preparation Tips",
    description: "This comprehensive guide covers everything you need to know about the RRB NTPC 2026 exam, including eligibility criteria, selection process, exam pattern, detailed syllabus, post-wise salary, and a month-by-month preparation plan.",
    examSlug: "rrb-ntpc",
    examName: "RRB NTPC",
    category: "Railway Exams",
    icon: "🚂",
    type: "info",
    metaTitle: "RRB NTPC 2026: Eligibility, Exam Pattern, Syllabus, Salary & Preparation Guide",
    metaDescription: "Prepare for RRB NTPC 2026 with our complete guide on eligibility, exam pattern, detailed syllabus, post-wise salary, and effective preparation tips for a successful career in Indian Railways.",
    authorName: "Editorial Team",
    authorityBadge: "Subject Matter Expert",
    publishDate: "June 30, 2026",
    readTime: "5 min read",
    quickAnswer: "The RRB NTPC exam is a highly competitive recruitment drive by Indian Railways for various non-technical popular categories. It involves a multi-stage selection process including two Computer-Based Tests (CBT 1 and CBT 2), followed by skill tests (TST/CBAT) for specific posts, and document verification. Key areas covered are Mathematics, General Awareness, and General Intelligence & Reasoning.",
    sections: [
      {
        id: "what-is-rrb-ntpc",
        title: "1. What is RRB NTPC?",
        paragraphs: [
          "The Railway Recruitment Board – Non-Technical Popular Categories (RRB NTPC) exam is one of the most-applied-for competitive exams in India. It is conducted by India's Regional Railway Recruitment Boards to fill non-technical posts across various grades and departments of Indian Railways.",
          "Posts under NTPC are grouped into two broad categories:",
          "Undergraduate (UG) Posts — requiring a 10+2 (Class 12) qualification",
          "Graduate Posts — requiring a bachelor's degree from a recognized university",
          "The 2026 cycle has notified a total of 8,868 vacancies — 5,810 at the graduate level and 3,058 at the UG level. With tens of millions of candidates registering in each cycle, competition is steep. But with the right preparation strategy, clearing this exam is entirely achievable."
        ]
      },
      {
        id: "who-is-eligible",
        title: "2. Who is Eligible?",
        paragraphs: [
          "There is no fixed attempt limit for RRB NTPC. You can apply in every recruitment cycle as long as you fall within the applicable age limit."
        ],
        table: {
          headers: [
            "Post Category",
            "Posts Included",
            "Qualification Required"
          ],
          rows: [
            [
              "UG Posts",
              "Junior Clerk Cum Typist, Accounts Clerk Cum Typist, Trains Clerk",
              "10+2 (Class 12 pass) from a recognized board"
            ],
            [
              "Graduate Posts",
              "Station Master, Goods Guard, Senior Commercial Cum Ticket Clerk, Commercial Apprentice, Traffic Assistant",
              "Bachelor's degree from a recognized university"
            ]
          ]
        }
      },
      {
        id: "age-limit",
        title: "Age Limit",
        paragraphs: [],
        table: {
          headers: [
            "Category",
            "Age Limit"
          ],
          rows: [
            [
              "General (UR)",
              "18–33 years"
            ],
            [
              "OBC (NCL)",
              "Up to 36 years"
            ],
            [
              "SC/ST",
              "Up to 38 years"
            ],
            [
              "PwBD",
              "Additional 10-year relaxation"
            ]
          ]
        }
      },
      {
        id: "application-fee",
        title: "Application Fee",
        paragraphs: [],
        table: {
          headers: [
            "Category",
            "Fee",
            "Refund After CBT 1"
          ],
          rows: [
            [
              "General/OBC",
              "₹500",
              "₹400 refunded"
            ],
            [
              "SC/ST/EWS/Women/PwBD/Ex-Servicemen",
              "₹250",
              "Fully refunded"
            ]
          ]
        }
      },
      {
        id: "rrb-ntpc-2026-selection-process",
        title: "3. RRB NTPC 2026 Selection Process",
        paragraphs: [
          "RRB NTPC follows a multi-stage selection process. Clearing each stage is necessary to advance to the next.",
          "Stage 1 – Computer-Based Test 1 (CBT 1): A preliminary screening exam. It is qualifying in nature — marks from CBT 1 are not counted in the final merit. CBT 1 shortlists candidates for CBT 2 at roughly 20 times the number of available vacancies.",
          "Stage 2 – Computer-Based Test 2 (CBT 2): The main exam. This is where your final merit score is determined. CBT 2 marks form the basis of selection.",
          "Stage 3 – Typing Skill Test (TST) or Computer-Based Aptitude Test (CBAT): Applicable only to certain posts. Station Masters, for instance, must clear a CBAT. Clerical posts may require a TST.",
          "Stage 4 – Document Verification: The final step. Candidates who clear CBT 2 (and TST/CBAT where applicable) are called for document verification before final appointment."
        ]
      },
      {
        id: "key-dates-for-rrb-ntpc-2026",
        title: "Key Dates for RRB NTPC 2026",
        paragraphs: [],
        table: {
          headers: [
            "Event",
            "Date"
          ],
          rows: [
            [
              "UG CBT 1",
              "May 7, 8, 9 and June 13–21, 2026"
            ],
            [
              "Graduate CBT 2",
              "July 10, 2026"
            ],
            [
              "UG CBT 2",
              "September 17, 2026"
            ]
          ]
        }
      },
      {
        id: "exam-pattern",
        title: "4. Exam Pattern",
        paragraphs: []
      },
      {
        id: "cbt-1-preliminary-exam",
        title: "CBT 1 – Preliminary Exam",
        paragraphs: [
          "⚠ Negative Marking: 1/3rd mark is deducted for every wrong answer. Unattempted questions carry no penalty."
        ],
        table: {
          headers: [
            "Section",
            "Questions",
            "Marks",
            "Duration"
          ],
          rows: [
            [
              "Mathematics",
              "30",
              "30",
              "90 minutes"
            ],
            [
              "General Awareness",
              "40",
              "40",
              ""
            ],
            [
              "General Intelligence & Reasoning",
              "30",
              "30",
              ""
            ],
            [
              "Total",
              "100",
              "100",
              "90 minutes"
            ]
          ]
        }
      },
      {
        id: "cbt-2-main-exam",
        title: "CBT 2 – Main Exam",
        paragraphs: [
          "The same negative marking rule applies in CBT 2. With 90 minutes for 120 questions, time management is critical — you get an average of 45 seconds per question."
        ],
        table: {
          headers: [
            "Section",
            "Questions",
            "Marks",
            "Duration"
          ],
          rows: [
            [
              "Mathematics",
              "35",
              "35",
              "90 minutes"
            ],
            [
              "General Awareness",
              "50",
              "50",
              ""
            ],
            [
              "General Intelligence & Reasoning",
              "35",
              "35",
              ""
            ],
            [
              "Total",
              "120",
              "120",
              "90 minutes"
            ]
          ]
        }
      },
      {
        id: "syllabus",
        title: "5. Syllabus",
        paragraphs: []
      },
      {
        id: "mathematics",
        title: "Mathematics",
        paragraphs: [
          "Number Systems, BODMAS, LCM and HCF, Decimals and Fractions, Simple and Compound Interest, Profit and Loss, Time and Work, Time and Distance, Ratio and Proportion, Percentages, Algebra, Geometry, Mensuration, Trigonometry, Elementary Statistics.",
          "The difficulty level in CBT 1 is moderate; CBT 2 introduces slightly higher complexity within the same topic areas. NCERT Class 8–10 textbooks cover the foundation for nearly every topic listed here."
        ]
      },
      {
        id: "general-awareness",
        title: "General Awareness",
        paragraphs: [
          "Current Affairs (last 6 months), Indian History, Geography, Indian Polity and Constitution, Indian Economy, General Science, Science and Technology, Railways-specific GK (zones, history, locomotive types, important railway milestones), Sports, Awards and Honours, Books and Authors.",
          "The Railways GK component is unique to NTPC and often catches unprepared candidates off guard. Dedicated attention to this area can give you an edge."
        ]
      },
      {
        id: "general-intelligence-and-reasoning",
        title: "General Intelligence and Reasoning",
        paragraphs: [
          "Analogies, Coding-Decoding, Blood Relations, Venn Diagrams, Syllogism, Number Series, Alphabetical Series, Statement and Conclusion, Directions and Distances, Data Interpretation, Mathematical Operations, Puzzles, Mirror and Water Images.",
          "Reasoning is one of the highest-scoring sections if approached systematically. Regular practice with timed drills is more effective than passive reading."
        ]
      },
      {
        id: "posts-and-salary",
        title: "6. Posts and Salary",
        paragraphs: [
          "All RRB NTPC posts come with railway allowances including free travel passes, medical benefits under CGHS or Railway Health Service, pension under the National Pension System (NPS), and housing facilities in railway colonies."
        ]
      },
      {
        id: "graduate-level-posts",
        title: "Graduate-Level Posts",
        paragraphs: [],
        table: {
          headers: [
            "Post",
            "Pay Level",
            "Basic Pay",
            "Approx. In-Hand Salary (Metro)"
          ],
          rows: [
            [
              "Station Master",
              "Level 6",
              "₹35,400",
              "₹45,000–₹52,000"
            ],
            [
              "Goods Guard",
              "Level 5",
              "₹29,200",
              "₹38,000–₹45,000"
            ],
            [
              "Senior Commercial Cum Ticket Clerk",
              "Level 5",
              "₹29,200",
              "₹38,000–₹45,000"
            ],
            [
              "Traffic Assistant",
              "Level 4",
              "₹25,500",
              "₹34,000–₹40,000"
            ],
            [
              "Commercial Apprentice",
              "Level 4",
              "₹25,500",
              "₹34,000–₹40,000"
            ]
          ]
        }
      },
      {
        id: "undergraduate-level-posts",
        title: "Undergraduate-Level Posts",
        paragraphs: [
          "Promotions within Railways follow a time-bound departmental structure. Station Masters and Goods Guards, for instance, are in roles with clear upward pathways into senior operational and administrative grades over time."
        ],
        table: {
          headers: [
            "Post",
            "Pay Level",
            "Basic Pay",
            "Approx. In-Hand Salary (Metro)"
          ],
          rows: [
            [
              "Junior Clerk Cum Typist",
              "Level 2",
              "₹19,900",
              "₹26,000–₹32,000"
            ],
            [
              "Accounts Clerk Cum Typist",
              "Level 2",
              "₹19,900",
              "₹26,000–₹32,000"
            ],
            [
              "Trains Clerk",
              "Level 2",
              "₹19,900",
              "₹26,000–₹32,000"
            ],
            [
              "Commercial Cum Ticket Clerk",
              "Level 3",
              "₹21,700",
              "₹28,000–₹34,000"
            ]
          ]
        }
      },
      {
        id: "how-to-prepare-for-rrb-ntpc-2026",
        title: "7. How to Prepare for RRB NTPC 2026",
        paragraphs: [
          "A structured, phased approach works better than studying everything at once. Here is a practical six-month plan:"
        ]
      },
      {
        id: "month-1-2-foundation-building",
        title: "Month 1–2: Foundation Building",
        paragraphs: [
          "Start with Mathematics and Reasoning — the two sections that reward consistent practice above everything else. Use NCERT Class 8–10 textbooks to cover all core mathematical concepts. For Reasoning, focus on understanding the logic behind each question type before attempting speed drills.",
          "Set a daily study schedule of 3–4 hours. Do not attempt mock tests yet — this phase is about building solid conceptual foundations."
        ]
      },
      {
        id: "month-3-4-general-awareness-deep-dive",
        title: "Month 3–4: General Awareness Deep Dive",
        paragraphs: [
          "Static GK requires dedicated, structured coverage. Work through Lucent's General Knowledge for Indian History, Geography, Polity, and Economy. Give special attention to Railway-specific GK — zones of Indian Railways, important railway stations, the history of Indian Railways, and railway-related terminology. This sub-section is unique to NTPC and can make a meaningful score difference.",
          "For current affairs, use a reliable daily app or newspaper summary. Spend 20–30 minutes every morning on recent events, focusing especially on Science and Technology, Sports, and Government Schemes."
        ]
      },
      {
        id: "month-5-6-mock-tests-and-speed-drills",
        title: "Month 5–6: Mock Tests and Speed Drills",
        paragraphs: [
          "CBT 1 gives you 90 seconds per question. CBT 2 gives you just 45 seconds per question. Speed is as important as accuracy at this stage.",
          "Attempt full-length mock tests under timed conditions — at minimum, one mock test every two days. After each test, spend equal time reviewing every incorrect answer. Identify which topics keep costing you marks and revisit them immediately.",
          "Track your accuracy per section over time. If your Reasoning accuracy is consistently above 85% but your General Awareness is below 65%, you know exactly where to focus."
        ]
      },
      {
        id: "recommended-books",
        title: "Recommended Books",
        paragraphs: [],
        table: {
          headers: [
            "Subject",
            "Book",
            "Author"
          ],
          rows: [
            [
              "Mathematics",
              "Quantitative Aptitude",
              "R.S. Aggarwal"
            ],
            [
              "Reasoning",
              "Verbal and Non-Verbal Reasoning",
              "R.S. Aggarwal"
            ],
            [
              "General Awareness",
              "Lucent's General Knowledge",
              "Lucent Publications"
            ],
            [
              "Current Affairs",
              "Monthly GK digest or app",
              "Various"
            ]
          ]
        }
      },
      {
        id: "your-next-step",
        title: "8. Your Next Step",
        paragraphs: [
          "RRB NTPC 2026 is one of the few central government exams where a well-planned strategy — rather than years of preparation — can get you across the finish line. The syllabus is structured, the difficulty level is predictable, and the rewards are substantial: a stable career in Indian Railways with competitive pay, allowances, and long-term job security.",
          "With CBT 2 for graduate posts scheduled for July 10, 2026, and UG CBT 2 on September 17, 2026, the window to prepare is defined. Use it well.",
          "Start with the official RRB notification for your region, verify your eligibility, and build your preparation plan around the six-month framework outlined above. Every day of disciplined preparation puts distance between you and the competition."
        ]
      },
      {
        id: "frequently-asked-questions-faqs",
        title: "9. Frequently Asked Questions (FAQs)",
        paragraphs: [
          "Q1: What is the difference between RRB NTPC and RRB Group D?",
          "RRB NTPC covers non-technical clerical and commercial posts at Pay Level 2 and above, requiring either 10+2 or a graduation degree depending on the post. RRB Group D covers entry-level technical helper roles at Pay Level 1, requiring only Class 10 or an ITI qualification.",
          "Q2: Is CBT 1 score counted in the final merit list?",
          "No. CBT 1 is purely qualifying and used only to shortlist candidates for CBT 2. Only your CBT 2 marks determine your position in the final merit list.",
          "Q3: How many times can I attempt RRB NTPC?",
          "There is no fixed attempt limit. You can apply in every NTPC recruitment cycle as long as you remain within the applicable age limit for your category.",
          "Q4: Is there a physical test in RRB NTPC?",
          "No. RRB NTPC does not include a physical fitness test. However, certain posts such as Station Master require a Computer-Based Aptitude Test (CBAT), and clerical posts require a Typing Skill Test (TST).",
          "Q5: What is the approximate salary for a Station Master through NTPC?",
          "Station Masters recruited through RRB NTPC are placed at Pay Level 6 with a basic pay of ₹35,400. The approximate in-hand monthly salary, inclusive of allowances, is ₹45,000–₹52,000 in metro postings.",
          "Q6: Can I apply for both UG and Graduate-level posts in the same cycle?",
          "No. You can only apply based on your educational qualification at the time of application. Graduate-level posts require a completed bachelor's degree; UG-level posts require 10+2.",
          "Q7: What is the negative marking rule for RRB NTPC?",
          "1/3rd of a mark is deducted for every incorrect answer in both CBT 1 and CBT 2. Questions left unattempted carry no negative marking — so do not guess blindly."
        ]
      }
    ]
  },
  {
    slug: "rrb-group-d-syllabus-pattern",
    title: "RRB Group D 2026: Complete Guide to Eligibility, Exam Pattern, Syllabus, Salary & Preparation Tips",
    description: "This comprehensive guide covers everything you need to know about the RRB Group D 2026 exam, including eligibility criteria, selection process, exam pattern, detailed syllabus, post-wise salary, and effective preparation tips for aspiring candidates.",
    examSlug: "rrb-group-d",
    examName: "RRB Group D",
    category: "Railway Exams",
    icon: "🔧",
    type: "info",
    metaTitle: "RRB Group D 2026: Eligibility, Exam Pattern, Syllabus, Salary & Preparation",
    metaDescription: "Get a complete guide to RRB Group D 2026, covering eligibility, selection process, exam pattern, detailed syllabus, salary structure, and expert preparation tips to help you succeed.",
    authorName: "Editorial Team",
    authorityBadge: "Subject Matter Expert",
    publishDate: "June 30, 2026",
    readTime: "5 min read",
    quickAnswer: "RRB Group D is an entry-level recruitment exam for various operational and technical posts in Indian Railways. It involves a three-stage selection process: Computer-Based Test (CBT), Physical Efficiency Test (PET), and Document Verification/Medical Examination. The exam covers General Intelligence & Reasoning, General Science, Mathematics, and General Awareness & Current Affairs. Successful candidates receive a basic pay of ₹18,000 (Level 1, 7th CPC) plus allowances, with an approximate in-hand salary of ₹25,000-₹30,000.",
    sections: [
      {
        id: "what-is-rrb-group-d",
        title: "1. What is RRB Group D?",
        paragraphs: [
          "RRB Group D (officially referred to as Level 1 posts under the 7th CPC Pay Matrix) is a recruitment exam conducted jointly by Railway Recruitment Boards (RRBs) and Railway Recruitment Cells (RRCs) to fill entry-level positions across Indian Railways.",
          "Unlike RRB NTPC, which targets clerical and commercial roles, Group D posts are primarily operational and technical in nature — track maintenance, signal assistance, electrical helper roles, carriage and wagon support, and more. These are hands-on positions that keep the railway network running day to day.",
          "The current cycle — CEN 09/2025 — has announced 22,195 vacancies across posts including:",
          "Track Maintainer Grade IV",
          "Helper/Assistant in Electrical, Mechanical, and Signal & Telecommunication (S&T) departments",
          "Assistant Pointsman",
          "Cabinman, Keyman, Fitter, Gangman, Welder, Porter, Shunter, Switchman, Trackman, and Leverman",
          "These posts are distributed across all RRB zones in India. Because selection is region-specific, candidates apply through the RRB that covers their preferred posting location."
        ]
      },
      {
        id: "who-is-eligible",
        title: "2. Who is Eligible?",
        paragraphs: [
          "Both qualifications are treated as equivalent for eligibility purposes. Candidates who have appeared in their Class 10 board exam and are awaiting results are not eligible — the qualification must be complete at the time of application.",
          "Age is calculated as of January 1, 2025 for the current CEN 09/2025 cycle.",
          "There is no fixed attempt limit for RRB Group D. Candidates can apply in every cycle as long as they fall within the applicable age limit."
        ],
        table: {
          headers: [
            "Category",
            "Qualification Required"
          ],
          rows: [
            [
              "Academic Route",
              "Class 10 (Matriculation) pass from a recognized board"
            ],
            [
              "ITI Route",
              "ITI certificate in a relevant trade from a recognized institution"
            ]
          ]
        }
      },
      {
        id: "age-limit",
        title: "Age Limit",
        paragraphs: [],
        table: {
          headers: [
            "Category",
            "Age Limit"
          ],
          rows: [
            [
              "General / UR",
              "18–33 years"
            ],
            [
              "OBC (Non-Creamy Layer)",
              "Up to 36 years (3-year relaxation)"
            ],
            [
              "SC / ST",
              "Up to 38 years (5-year relaxation)"
            ],
            [
              "PwBD",
              "Additional 10-year relaxation"
            ]
          ]
        }
      },
      {
        id: "application-fee",
        title: "Application Fee",
        paragraphs: [],
        table: {
          headers: [
            "Category",
            "Fee"
          ],
          rows: [
            [
              "General / OBC / EWS",
              "₹500"
            ],
            [
              "SC / ST / EBC / Female / Transgender",
              "₹250"
            ]
          ]
        }
      },
      {
        id: "rrb-group-d-2026-selection-process",
        title: "3. RRB Group D 2026 Selection Process",
        paragraphs: [
          "RRB Group D follows a three-stage selection process. Every stage must be cleared to progress to the next.",
          "Stage 1 – Computer-Based Test (CBT): This is the primary screening exam and the only stage that contributes to your final merit score. Based on CBT performance, three times the number of vacancies (community-wise) are shortlisted for the PET.",
          "Stage 2 – Physical Efficiency Test (PET): A qualifying physical test. It does not carry any marks — passing or failing is the only outcome. Candidates who clear the PET are not automatically selected; PET results simply determine eligibility to proceed.",
          "Stage 3 – Document Verification (DV) and Medical Examination: Based on CBT merit and PET qualification, twice the number of vacancies are called for DV. Candidates who clear DV are sent for a medical examination as per the standards prescribed for their applied post.",
          "Final appointment is based entirely on CBT merit, subject to clearing PET, DV, and medical fitness requirements.",
          "Tie-breaking rule: If two or more candidates score identically in the CBT, the older candidate is ranked higher. If age is also identical, alphabetical order (A to Z) of names is applied."
        ]
      },
      {
        id: "exam-pattern",
        title: "4. Exam Pattern",
        paragraphs: []
      },
      {
        id: "cbt-computer-based-test",
        title: "CBT – Computer-Based Test",
        paragraphs: [
          "All questions are objective-type multiple-choice questions (MCQs). Every correct answer earns +1 mark. Every wrong answer incurs a penalty of –1/3 mark. Unattempted questions carry no penalty."
        ],
        table: {
          headers: [
            "Section",
            "No. of Questions",
            "Marks",
            "Weightage",
            "Duration"
          ],
          rows: [
            [
              "General Intelligence & Reasoning",
              "30",
              "30",
              "30%",
              "90 Minutes"
            ],
            [
              "General Science",
              "25",
              "25",
              "25%",
              ""
            ],
            [
              "Mathematics",
              "25",
              "25",
              "25%",
              ""
            ],
            [
              "General Awareness & Current Affairs",
              "20",
              "20",
              "20%",
              ""
            ],
            [
              "Total",
              "100",
              "100",
              "100%",
              "90 Minutes"
            ]
          ]
        }
      },
      {
        id: "qualifying-marks",
        title: "Qualifying Marks",
        paragraphs: [
          "The exam is conducted in 15 languages, including Hindi, English, Urdu, Bengali, Tamil, Telugu, Kannada, Gujarati, Marathi, and others — candidates choose their preferred medium during the application process.",
          "⚠ If the CBT is conducted across multiple sessions, marks are normalized before preparing the final shortlist. Normalization ensures fairness across different session difficulties."
        ],
        table: {
          headers: [
            "Category",
            "Minimum Marks Required"
          ],
          rows: [
            [
              "UR (Unreserved)",
              "40%"
            ],
            [
              "EWS (Economically Weaker Section)",
              "40%"
            ],
            [
              "OBC (Non-Creamy Layer)",
              "30%"
            ],
            [
              "SC (Scheduled Caste)",
              "30%"
            ],
            [
              "ST (Scheduled Tribe)",
              "30%"
            ]
          ]
        }
      },
      {
        id: "pet-physical-efficiency-test",
        title: "PET – Physical Efficiency Test",
        paragraphs: [
          "Both tasks must be completed in a single attempt. The PET is qualifying only — it does not add to your CBT score."
        ],
        table: {
          headers: [
            "Candidate",
            "Task 1",
            "Task 2"
          ],
          rows: [
            [
              "Male",
              "Lift and carry 35 kg for 100 metres in 2 minutes (without putting weight down)",
              "Run 1000 metres in 4 minutes 15 seconds"
            ],
            [
              "Female",
              "Lift and carry 20 kg for 100 metres in 2 minutes (without putting weight down)",
              "Run 1000 metres in 5 minutes 40 seconds"
            ]
          ]
        }
      },
      {
        id: "syllabus",
        title: "5. Syllabus",
        paragraphs: [
          "The Group D CBT is pitched at the Class 10 standard level. The four sections each cover distinct areas:"
        ]
      },
      {
        id: "general-intelligence-reasoning",
        title: "General Intelligence & Reasoning",
        paragraphs: [
          "Analogies, Relationships, Alphabetical and Number Series, Syllogism, Coding and Decoding, Jumbling, Mathematical Operations, Venn Diagrams, Similarities and Differences, Analytical Reasoning, Statement – Arguments and Assumptions, Classification, Conclusions and Decision-Making, Directions, Data Interpretation and Sufficiency.",
          "Reasoning carries the highest weightage in the paper at 30 marks. It is also one of the most learnable sections — once you understand the logic behind each question type, consistent practice directly translates into score gains."
        ]
      },
      {
        id: "general-science",
        title: "General Science",
        paragraphs: [
          "This section is divided into three sub-areas, all based on the NCERT Class 9–10 curriculum:"
        ],
        table: {
          headers: [
            "Physics",
            "Chemistry",
            "Life Sciences (Biology)"
          ],
          rows: [
            [
              "Force and Laws of Motion",
              "Matter and Atoms",
              "Heredity and Evolution"
            ],
            [
              "Gravitation",
              "Periodic Classification",
              "Classification of Organisms"
            ],
            [
              "Work, Energy and Power",
              "Chemical Reactions",
              "Human Organ Systems"
            ],
            [
              "Current Electricity",
              "Acids, Bases and Salts",
              "Photosynthesis"
            ],
            [
              "Magnetism",
              "Metals and Non-Metals",
              "Plant and Animal Tissues"
            ],
            [
              "Light – Reflection and Refraction",
              "Carbon and Its Compounds",
              "Human Diseases"
            ],
            [
              "Sound and Waves",
              "Combustion and Flame",
              "Human Eye and Natural Resources"
            ],
            [
              "Sources of Energy",
              "Electrolysis",
              "Ecology and Environmental Pollution"
            ]
          ]
        }
      },
      {
        id: "mathematics",
        title: "Mathematics",
        paragraphs: [
          "Number System, BODMAS, LCM and HCF, Decimals and Fractions, Simple and Compound Interest, Percentages, Profit and Loss, Time and Work, Time and Distance, Ratio and Proportion, Age Calculations, Algebra, Geometry and Trigonometry, Mensuration, Elementary Statistics, Calendar and Clock, Pipes and Cisterns, Square Root."
        ]
      },
      {
        id: "general-awareness-current-affairs",
        title: "General Awareness & Current Affairs",
        paragraphs: [
          "Science and Technology, Sports, Culture, Personalities, Economics, Politics, and other subjects of national and international importance. Questions typically draw from the last 4–6 months of current affairs, along with static GK covering Indian History, Geography, Polity, and Indian Railways."
        ]
      },
      {
        id: "posts-and-salary",
        title: "6. Posts and Salary",
        paragraphs: [
          "All RRB Group D posts fall under Level 1 of the 7th CPC Pay Matrix, with a basic pay of ₹18,000. Beyond the basic pay, employees receive Dearness Allowance (DA), House Rent Allowance (HRA), Transport Allowance (TA), and a range of additional perks specific to Indian Railways."
        ]
      },
      {
        id: "rrb-group-d-salary-structure",
        title: "RRB Group D Salary Structure",
        paragraphs: [
          "The average annual package for Group D posts ranges between ₹3 to ₹6 lakh, depending on the city of posting, applicable allowances, and length of service."
        ],
        table: {
          headers: [
            "Component",
            "Details"
          ],
          rows: [
            [
              "Pay Level",
              "Level 1 (7th CPC)"
            ],
            [
              "Basic Pay",
              "₹18,000"
            ],
            [
              "Dearness Allowance (DA)",
              "Greater than 40% of basic pay"
            ],
            [
              "House Rent Allowance (HRA)",
              "27% / 18% / 9% (X / Y / Z class cities)"
            ],
            [
              "Transport Allowance (TA)",
              "₹3,600 + DA on TA"
            ],
            [
              "Gross Salary (Approximate)",
              "₹25,000 – ₹30,000"
            ],
            [
              "Deductions (NPS, Tax, CGIS)",
              "₹2,000 – ₹3,000"
            ],
            [
              "In-Hand Salary (Approximate)",
              "₹25,000 (Tier 1 city)"
            ]
          ]
        }
      },
      {
        id: "post-wise-job-profile-and-promotion",
        title: "Post-wise Job Profile and Promotion",
        paragraphs: [
          "Career progression follows a structured path through departmental exams. After a minimum of three years of service, Group D employees become eligible to appear in these exams — opening the door to Group C roles such as Section Engineer and Superintendent. Employees who do not clear on the first attempt can reappear in subsequent cycles."
        ],
        table: {
          headers: [
            "Post",
            "Department Job Profile",
            "Promotion Path"
          ],
          rows: [
            [
              "Track Maintainer Grade IV",
              "Engineering Track maintenance and repair",
              "Section Engineer"
            ],
            [
              "Assistant Pointsman",
              "Traffic Operates switches, directs trains",
              "Superintendent"
            ],
            [
              "Helper-II (Electrical)",
              "Electrical Assists in electrical maintenance",
              "Section Engineer"
            ],
            [
              "Helper-II (Mechanical)",
              "Mechanical Coach and wagon maintenance support",
              "Section Engineer"
            ],
            [
              "Helper-II (S&T)",
              "Signal & Telecom Signal operations support",
              "Section Engineer"
            ],
            [
              "Assistant Bridge",
              "Engineering Bridge construction and maintenance",
              "Section Engineer"
            ],
            [
              "Assistant Loco Shed (Diesel)",
              "Mechanical Diesel locomotive overhaul",
              "Section Engineer"
            ],
            [
              "Assistant Depot (Stores)",
              "Stores Component procurement and supply",
              "Depot Material Superintendent Grade I"
            ],
            [
              "Hospital Assistant",
              "Medical Patient care and medical aid",
              "Superintendent"
            ]
          ]
        }
      },
      {
        id: "additional-perks-and-benefits",
        title: "Additional Perks and Benefits",
        paragraphs: [
          "Beyond the monthly salary, Group D employees are entitled to:",
          "Free railway travel passes for self and family",
          "Medical facilities under the Railway Health Service",
          "Pension under the National Pension System (NPS)",
          "Night Duty Allowance for late-shift work",
          "Overtime and Holiday Compensation",
          "Fixed Conveyance Allowance",
          "Special Allowances for postings in tribal or scheduled areas",
          "Female-specific perks, including preferred city postings and special child care allowances for women with disabilities"
        ]
      },
      {
        id: "how-to-prepare-for-rrb-group-d-2026",
        title: "7. How to Prepare for RRB Group D 2026",
        paragraphs: [
          "The Group D CBT is a 90-minute, 100-question paper pitched at the Class 10 level — which means the syllabus is finite and manageable. What separates successful candidates is not raw intelligence but consistency, structured coverage, and smart practice.",
          "Here is a practical four-month preparation plan:"
        ]
      },
      {
        id: "month-1-build-your-foundation-in-mathematics-and-science",
        title: "Month 1: Build Your Foundation in Mathematics and Science",
        paragraphs: [
          "Start with the two most content-heavy sections. For Mathematics, go back to NCERT Class 8–10 textbooks to solidify the core concepts — Number Systems, Fractions, Ratios, Percentages, and Basic Algebra. Work through 20–30 practice problems per topic before moving on.",
          "For General Science, follow the NCERT Class 9 and Class 10 textbooks chapter by chapter. Cover Physics, Chemistry, and Biology in parallel — not sequentially — to keep your preparation balanced. The Group D Science section is directly aligned with this curriculum, so this investment pays off disproportionately.",
          "Set a study target of 3–4 hours per day during this phase. Focus entirely on conceptual understanding — avoid mock tests until your fundamentals are solid."
        ]
      },
      {
        id: "month-2-tackle-reasoning-and-deepen-science-coverage",
        title: "Month 2: Tackle Reasoning and Deepen Science Coverage",
        paragraphs: [
          "Reasoning is the highest-weighted section (30 marks) and is highly learnable. Start with the more common question types — Analogies, Series, Coding-Decoding, and Directions — and practice each type until you can solve it quickly and confidently.",
          "Use this month to also complete your General Science revision, with a particular focus on high-yield Chemistry topics (Acids, Bases, Metals, Carbon Compounds) and Biology (Human Systems, Plant Biology, Diseases). These areas appear frequently in Group D papers.",
          "Continue with daily Math practice to maintain momentum."
        ]
      },
      {
        id: "month-3-general-awareness-and-current-affairs",
        title: "Month 3: General Awareness and Current Affairs",
        paragraphs: [
          "Static GK requires structured, dedicated effort. Work through Lucent's General Knowledge for History, Geography, Polity, and Economy. Spend at least 30–45 minutes daily on this section.",
          "For current affairs, maintain a daily habit — a good GK app or newspaper digest will do. Focus especially on Science and Technology updates, Sports (especially major tournaments and award winners), Government Schemes, and Railway-related news. Questions on Indian Railways history, zones, and milestones sometimes appear in the General Awareness section of Group D papers."
        ]
      },
      {
        id: "month-4-mock-tests-speed-drills-and-revision",
        title: "Month 4: Mock Tests, Speed Drills, and Revision",
        paragraphs: [
          "With the full syllabus covered, shift your focus entirely to exam simulation. Attempt at least one full-length mock test every two days under timed conditions. After each test, conduct a thorough error analysis — identify which topics caused the most mistakes and go back to review them immediately.",
          "Track your section-wise accuracy over time. If your Reasoning accuracy is consistently above 80% but your General Science is below 60%, you know exactly where to invest the remaining days.",
          "The Group D CBT gives you 54 seconds per question on average. Speed matters. Use the final two weeks to build pace through targeted timed drills on your weaker areas."
        ]
      },
      {
        id: "recommended-books",
        title: "Recommended Books",
        paragraphs: [],
        table: {
          headers: [
            "Subject",
            "Book",
            "Author"
          ],
          rows: [
            [
              "Mathematics",
              "Quantitative Aptitude",
              "R.S. Aggarwal"
            ],
            [
              "Mathematics",
              "Fast Track Mathematics",
              "Rajesh Verma"
            ],
            [
              "Reasoning",
              "Verbal and Non-Verbal Reasoning",
              "R.S. Aggarwal"
            ],
            [
              "General Science",
              "Science (NCERT Class 9 & 10)",
              "NCERT"
            ],
            [
              "General Science",
              "Lucent's Science",
              "Lucent Publications"
            ],
            [
              "General Awareness",
              "Lucent's General Knowledge",
              "Lucent Publications"
            ],
            [
              "Current Affairs",
              "Monthly GK digest or app",
              "Various"
            ]
          ]
        }
      },
      {
        id: "your-next-step",
        title: "8. Your Next Step",
        paragraphs: [
          "RRB Group D 2026 is one of the most accessible pathways into Indian Railways. The qualification bar is Class 10. The syllabus is structured and manageable. And the rewards — job security, regular pay, substantial allowances, and a defined career progression — are tangible and long-term.",
          "The competition is real. Millions of candidates apply every cycle. But with a four-month plan built around genuine conceptual understanding, consistent practice, and regular mock testing, clearing the CBT is an achievable target for any committed aspirant.",
          "Begin with the official CEN 09/2025 notification on your regional RRB website. Verify your eligibility, check the vacancy distribution for your preferred zone, and start building your preparation plan around the framework outlined above. Every day of focused effort compounds."
        ]
      },
      {
        id: "frequently-asked-questions-faqs",
        title: "9. Frequently Asked Questions (FAQs)",
        paragraphs: [
          "Q1: What is the difference between RRB Group D and RRB NTPC?",
          "RRB NTPC covers non-technical clerical and commercial posts at Pay Level 2 and above, requiring either a Class 12 or graduation qualification depending on the post. RRB Group D covers entry-level operational and technical helper roles at Pay Level 1, requiring only Class 10 or an ITI qualification. Group D posts are generally more physical in nature and include a mandatory Physical Efficiency Test (PET).",
          "Q2: Is the Physical Efficiency Test (PET) counted in the final merit?",
          "No. The PET is purely qualifying in nature. Passing or failing the PET determines whether you can proceed to Document Verification — but PET performance does not add to or subtract from your CBT score. Final merit is based entirely on CBT marks.",
          "Q3: How many times can I attempt RRB Group D?",
          "There is no fixed attempt limit. You can apply in every Group D recruitment cycle as long as you meet the age eligibility criteria — after accounting for any applicable relaxations for your category.",
          "Q4: Can I apply for RRB Group D with an ITI qualification but without a Class 10 certificate?",
          "Yes. An ITI certificate from a recognized institution is an accepted qualification in its own right. You do not need a separate Class 10 pass certificate if you hold a valid ITI certificate in a relevant trade.",
          "Q5: What is the approximate in-hand salary for a Track Maintainer Grade IV?",
          "All Group D posts — including Track Maintainer Grade IV — are placed at Pay Level 1 with a basic pay of ₹18,000. The approximate in-hand monthly salary, including DA, HRA, and TA, is around ₹25,000 for a Tier 1 city posting.",
          "Q6: After how many years can Group D employees get promoted?",
          "Employees become eligible to appear in departmental promotion exams after completing a minimum of three years of continuous service. Successful candidates can move into Group C positions such as Section Engineer or Superintendent, depending on their department.",
          "Q7: Is there negative marking in the RRB Group D CBT?",
          "Yes. 1/3rd of a mark is deducted for every incorrect answer. Questions left unattempted carry no penalty — so avoid guessing blindly, particularly when you have no real idea of the correct answer.",
          "Q8: Can a candidate apply for more than one RRB zone in a single Group D cycle?",
          "No. A candidate can apply only once and for only one RRB/Railway Zone per recruitment cycle. Submitting multiple applications may result in the cancellation of your candidature."
        ]
      }
    ]
  },
  {
    slug: "ssc-cpo-exam-guide-2026-syllabus-pattern",
    title: "SSC CPO Exam: Your Complete Guide to Becoming a Sub-Inspector in 2026",
    description: "Want a police officer's job that combines authority, respect, and a strong salary? The SSC CPO exam is one of the best routes in. With over 3,000 vacancies in the latest cycle and a Level 6 pay scale that puts you well above entry-level government roles, it draws lakhs of graduates every year. This guide breaks down everything you need to know: eligibility, exam pattern, syllabus, physical standards, salary, and practical prep tips. By the end, you'll have a clear roadmap to start your preparation with confidence.",
    examSlug: "ssc-cpo",
    examName: "SSC CPO",
    category: "SSC Exams",
    icon: "🛡️",
    type: "info",
    metaTitle: "SSC CPO Exam Guide 2026: Pattern, Syllabus, Salary & Eligibility",
    metaDescription: "Everything you need to crack the SSC CPO Sub-Inspector exam—eligibility, exam pattern, syllabus, physical standards, salary, and smart prep tips. Start today.",
    authorName: "Editorial Team",
    authorityBadge: "Subject matter expert",
    publishDate: "June 30, 2026",
    readTime: "5 min read",
    quickAnswer: "The SSC CPO (Central Police Organisations) exam is a national-level recruitment conducted by the Staff Selection Commission to fill Sub-Inspector posts in Delhi Police and the Central Armed Police Forces (CAPFs)—BSF, CRPF, CISF, ITBP, and SSB. You need a graduate degree to apply, and selection involves two written papers, physical tests, and a medical examination.",
    sections: [
      {
        id: "what-is-the-ssc-cpo-exam",
        title: "What is the SSC CPO exam?",
        paragraphs: [
          "The SSC CPO exam is conducted by the Staff Selection Commission to recruit candidates for the post of Sub-Inspector in Delhi Police and the Central Armed Police Forces. Unlike the constable-level exams, this is a graduate-level recruitment for a directly commissioned officer role, making it a prestigious entry point into India's police and paramilitary services.",
          "Successful candidates are deployed across several forces and posts:",
          "Delhi Police: Sub-Inspector (Executive), responsible for law and order in the national capital.",
          "BSF (Border Security Force): Sub-Inspector (GD), guarding India's borders.",
          "CRPF (Central Reserve Police Force): Sub-Inspector (GD), handling internal security and counter-insurgency.",
          "CISF (Central Industrial Security Force): Sub-Inspector (GD), securing airports, PSUs, and key infrastructure.",
          "ITBP (Indo-Tibetan Border Police): Sub-Inspector (GD), protecting the India-China border.",
          "SSB (Sashastra Seema Bal): Sub-Inspector (GD), guarding the Indo-Nepal and Indo-Bhutan borders.",
          "These roles offer the stability, steady pay, and growth opportunities that make government jobs so appealing—plus the authority and responsibility that come with an officer-level rank."
        ]
      },
      {
        id: "who-is-eligible-for-ssc-cpo",
        title: "Who is eligible for SSC CPO?",
        paragraphs: [
          "Before you start prepping, make sure you tick the basic boxes.",
          "Educational qualification: You must hold a bachelor's degree in any discipline from a recognized university by the cut-off date. Candidates from distance-learning programs are eligible too, as long as the university is recognized by the UGC.",
          "Age limit: Candidates must be between 20 and 25 years of age (for the General category) as on the crucial date set by the Commission.",
          "Age relaxation applies for reserved categories:",
          "OBC: 3 years",
          "SC/ST: 5 years",
          "Ex-Servicemen: as per government norms",
          "Physical standards: Since this is a police role, candidates must meet specific height and chest requirements:",
          "Standards are relaxed for candidates from hilly areas and Scheduled Tribes. For example, male candidates from hill areas need a height of 165 cm, and ST candidates need 162.5 cm. Female candidates from hilly areas need 155 cm and ST candidates need 154 cm.",
          "Nationality: You must be a citizen of India, or fall under the other eligible categories specified by the Commission."
        ],
        table: {
          headers: [
            "Criteria",
            "Male (General)",
            "Female (General)"
          ],
          rows: [
            [
              "Height",
              "170 cm",
              "157 cm"
            ],
            [
              "Chest",
              "80 cm unexpanded / 85 cm expanded",
              "Not applicable"
            ]
          ]
        }
      },
      {
        id: "what-is-the-ssc-cpo-exam-pattern",
        title: "What is the SSC CPO exam pattern?",
        paragraphs: [
          "Selection happens across multiple stages. You'll start with Paper I, and qualifying candidates progress through the physical tests, Paper II, and a medical examination.",
          "The full selection process is:",
          "1. Paper I (Computer-Based Test)",
          "2. Physical Standard Test (PST)",
          "3. Physical Efficiency Test (PET)",
          "4. Paper II (Computer-Based Test)",
          "5. Detailed Medical Examination",
          "6. Document Verification",
          "Both Paper I and Paper II count toward your final merit, so neither stage is one to take lightly."
        ]
      },
      {
        id: "paper-i",
        title: "Paper I",
        paragraphs: [
          "Paper I is an objective, computer-based test of 200 questions worth 200 marks, to be completed in 2 hours. From 2026 onwards, there's a sectional timer of 30 minutes for each of the four sections. There's also a negative marking of 0.25 marks for every wrong answer, so answer carefully."
        ],
        table: {
          headers: [
            "Section",
            "Questions",
            "Marks",
            "Duration"
          ],
          rows: [
            [
              "General Intelligence & Reasoning",
              "50",
              "50",
              "30 minutes"
            ],
            [
              "General Knowledge & General Awareness",
              "50",
              "50",
              "30 minutes"
            ],
            [
              "Quantitative Aptitude",
              "50",
              "50",
              "30 minutes"
            ],
            [
              "English Comprehension",
              "50",
              "50",
              "30 minutes"
            ],
            [
              "Total",
              "200",
              "200",
              "120 minutes"
            ]
          ]
        }
      },
      {
        id: "physical-standard-test-pst",
        title: "Physical Standard Test (PST)",
        paragraphs: [
          "The PST measures your height, chest (for male candidates), and weight against the standards listed in the eligibility section above. It's a qualifying stage—you either meet the requirements or you don't."
        ]
      },
      {
        id: "physical-efficiency-test-pet",
        title: "Physical Efficiency Test (PET)",
        paragraphs: [
          "The PET tests your endurance through running and field events, with standards that differ by gender:",
          "The PET is purely qualifying—it carries no extra marks toward your merit."
        ],
        table: {
          headers: [
            "Test",
            "Male",
            "Female"
          ],
          rows: [
            [
              "100 m race",
              "Within 16 seconds",
              "Within 18 seconds"
            ],
            [
              "1.6 km race",
              "Within 6.5 minutes",
              "Not applicable"
            ],
            [
              "800 m race",
              "Not applicable",
              "Within 4 minutes"
            ],
            [
              "Long Jump",
              "3.65 m (3 chances)",
              "2.7 m (3 chances)"
            ],
            [
              "High Jump",
              "1.2 m (3 chances)",
              "0.9 m (3 chances)"
            ],
            [
              "Shot Put (16 lbs)",
              "4.5 m (3 chances)",
              "Not applicable"
            ]
          ]
        }
      },
      {
        id: "paper-ii",
        title: "Paper II",
        paragraphs: [
          "Candidates who clear the PST and PET move on to Paper II, an objective test focused entirely on English Language & Comprehension. It consists of 200 questions worth 200 marks, to be completed in 2 hours, with a 30-minute sectional timer in the revised 2026 pattern. Since Paper II marks combine with Paper I for the final merit list, strong English skills can make or break your selection."
        ]
      },
      {
        id: "detailed-medical-examination",
        title: "Detailed Medical Examination",
        paragraphs: [
          "The final stage is a thorough medical examination to confirm your physical and mental fitness for the role, including vision standards of 6/6 or 6/9 for the better eye."
        ]
      },
      {
        id: "what-does-the-ssc-cpo-syllabus-cover",
        title: "What does the SSC CPO syllabus cover?",
        paragraphs: [
          "The exam spans two papers. Paper I tests four broad domains, while Paper II zeroes in on advanced English. Here's what to study:",
          "Paper I:",
          "General Intelligence & Reasoning: Classification, series, analogies, coding-decoding, blood relations, direction tests, syllogism, Venn diagrams, matrix problems, and non-verbal reasoning.",
          "General Knowledge & General Awareness: History, polity, geography, economy, science and technology, the Indian Constitution, government schemes, defence and police-related GK, and current affairs from the last six months.",
          "Quantitative Aptitude: Number systems, percentages, profit and loss, simple and compound interest, trigonometry, geometry, time and work, time and distance, and data interpretation.",
          "English Comprehension: Reading comprehension, fill in the blanks, synonyms and antonyms, idioms, one-word substitution, and error spotting.",
          "Paper II:",
          "English Language & Comprehension (advanced): Reading comprehension, cloze tests, para jumbles, error detection, sentence correction, and vocabulary including synonyms, antonyms, and idioms—all at a deeper level than Paper I.",
          "A useful tip: since Paper II is entirely English, dedicating consistent daily practice to comprehension and vocabulary pays off twice—once in each paper."
        ]
      },
      {
        id: "ssc-cpo-salary-and-posts",
        title: "SSC CPO salary and posts",
        paragraphs: [
          "The SSC CPO Sub-Inspector post falls under Pay Level 6 of the 7th Pay Commission, with a pay scale of ₹35,400 to ₹1,12,400. Once you factor in allowances, the in-hand salary typically ranges from ₹58,000 to ₹70,000 per month, depending on your posting and city.",
          "Here's a snapshot of the salary structure:",
          "Beyond the monthly pay, SSC CPO roles offer valuable long-term benefits:",
          "Accommodation perks, like police quarters in Delhi Police and force accommodation in the CAPFs",
          "Free ration during duty, medical facilities, and Leave Travel Concession (LTC) for CAPF personnel",
          "Risk allowance and uniform allowance",
          "Pension under the National Pension System (NPS)",
          "Strong career growth, with promotions to Inspector and beyond",
          "A quick note on postings: Delhi Police Sub-Inspectors enjoy a stable, city-based posting, while CAPF Sub-Inspectors may be deployed anywhere in India, including border and field areas."
        ],
        table: {
          headers: [
            "Component",
            "Details"
          ],
          rows: [
            [
              "Basic Pay",
              "₹35,400 (Level 6)"
            ],
            [
              "Dearness Allowance",
              "Around 53% of basic pay"
            ],
            [
              "House Rent Allowance",
              "₹3,200 – ₹9,000 (city-based)"
            ],
            [
              "Transport Allowance",
              "₹1,800 – ₹3,600"
            ],
            [
              "Total In-Hand Salary",
              "Approximately ₹58,000 – ₹70,000 per month"
            ]
          ]
        }
      },
      {
        id: "how-to-prepare-for-the-ssc-cpo-exam",
        title: "How to prepare for the SSC CPO exam",
        paragraphs: [
          "A clear plan beats random studying every time. Here's how to approach your prep over roughly four months:",
          "1. Know the syllabus and pattern inside out. Understand exactly what each paper tests and how the new sectional timer works. With 30 minutes per section, you can't afford to get stuck on one part.",
          "2. Build a balanced study schedule. Spread your time across all four Paper I subjects, then dedicate focused blocks to Paper II English. Give extra attention to weaker areas, and always include slots for revision.",
          "3. Prioritize high-scoring topics. Data interpretation in quant and reading comprehension in English tend to carry reliable marks. Master these early.",
          "4. Solve previous year papers and take mock tests. Past papers reveal recurring question patterns, while regular mocks train you to manage the sectional timers and the computer-based format. Aim for full-length mocks covering both papers as the exam nears.",
          "5. Play the negative marking smartly. Each wrong answer in Paper I costs 0.25 marks. Attempt questions you're confident about rather than guessing blindly.",
          "6. Stay current with affairs. Read a daily newspaper or a reliable current affairs source to sharpen the General Awareness section. Focus on the last six months before the exam.",
          "7. Start your physical training early. The PST and PET are just as decisive as the written papers. Build running, long jump, and shot put practice into your routine well in advance so you can clear the standards comfortably."
        ]
      },
      {
        id: "your-next-step-toward-an-officers-job",
        title: "Your next step toward an officer's job",
        paragraphs: [
          "The SSC CPO exam is one of the most rewarding routes into India's police and paramilitary forces—and with focused effort, cracking it is well within reach. A clear grasp of the two-paper pattern, a balanced study plan, regular mock tests, and steady physical training will set you up to walk into the exam hall ready.",
          "Start by downloading the official syllabus, gathering quality study material, and setting up your daily schedule. The sooner you begin, the more time you'll have to practice—and practice is what separates the candidates who clear it from those who fall short."
        ]
      },
      {
        id: "frequently-asked-questions",
        title: "Frequently asked questions",
        paragraphs: [
          "What is the minimum qualification for SSC CPO?",
          "You need a bachelor's degree in any discipline from a recognized university. Distance-learning graduates are eligible too, provided the university is UGC-recognized. Candidates who have only passed Class 12 should consider SSC GD Constable instead and apply for CPO after completing graduation.",
          "Is there negative marking in the SSC CPO exam?",
          "Yes. In Paper I, 0.25 marks are deducted for every wrong answer. Be sure to check the official notification for the exact marking scheme of Paper II before exam day.",
          "What is the age limit for SSC CPO?",
          "The age limit is 20 to 25 years for General category candidates. Reserved categories receive relaxation—3 years for OBC and 5 years for SC/ST.",
          "What is the salary of an SSC CPO Sub-Inspector?",
          "The post falls under Pay Level 6 of the 7th Pay Commission, with a pay scale of ₹35,400 to ₹1,12,400. After allowances, the in-hand salary typically ranges from ₹58,000 to ₹70,000 per month, depending on the posting.",
          "Which forces can I be posted to after clearing SSC CPO?",
          "Successful candidates can be posted as Sub-Inspectors in Delhi Police or as Sub-Inspectors (GD) in the BSF, CRPF, CISF, ITBP, or SSB, depending on vacancies and your preferences. CAPF personnel are liable to serve anywhere in India.",
          "What are the physical requirements for SSC CPO?",
          "Male candidates (General) need a height of 170 cm and a chest of 80 cm unexpanded with 85 cm expanded, while female candidates (General) need a height of 157 cm. The PET requires male candidates to complete a 1.6 km run in 6.5 minutes and female candidates to complete an 800 m run in 4 minutes, along with jump and shot put standards."
        ]
      }
    ]
  },
  {
    slug: "up-police-constable-syllabus-pattern",
    title: "UP Police Constable Exam Guide: Eligibility, Pattern, Syllabus, and Salary",
    description: "Dreaming of a uniform, a stable state government job, and a respected role in your community—all with just a Class 12 pass? The UP Police Constable exam is one of the biggest recruitment drives in the country, with a massive 32,679 vacancies on offer in the latest cycle conducted by the Uttar Pradesh Police Recruitment and Promotion Board (UPPRPB). This guide covers everything you need to know: who can apply, how the exam works, what's on the syllabus, what you'll earn, and how to prepare. Let's get into it.",
    examSlug: "up-police-constable",
    examName: "UP Police Constable",
    category: "Police Exams",
    icon: "👮",
    type: "info",
    metaTitle: "UP Police Constable Exam Guide: Eligibility, Pattern, Syllabus & Salary",
    metaDescription: "Your complete guide to the UP Police Constable exam. Learn about eligibility, exam pattern, syllabus, salary, physical standards, and proven preparation tips for the latest UPPRPB recruitment.",
    authorName: "Editorial Team",
    authorityBadge: "Subject matter expert",
    publishDate: "June 30, 2026",
    readTime: "5 min read",
    quickAnswer: "The UP Police Constable exam is a state-level recruitment exam conducted by the Uttar Pradesh Police Recruitment and Promotion Board (UPPRPB) to fill Constable posts. It's an entry-level role requiring a Class 12 pass, offering job security and a competitive salary. The selection process includes a written exam, document verification, Physical Standard Test (PST), and Physical Efficiency Test (PET).",
    sections: [
      {
        id: "what-is-the-up-police-constable-exam",
        title: "What is the UP Police Constable Exam?",
        paragraphs: [
          "The UP Police Constable exam is a state-level recruitment exam conducted by the Uttar Pradesh Police Recruitment and Promotion Board (UPPRPB) to fill the post of Constable in the Uttar Pradesh Police force.",
          "It's an entry-level role open to anyone who has passed Class 12, making it one of the most accessible routes into a secure and rewarding career in law enforcement. As a constable, you'll be on the front line of policing—maintaining law and order, assisting investigations, and serving the public directly.",
          "You can find all official details at the board's website, uppbpb.gov.in."
        ]
      },
      {
        id: "who-is-eligible-for-up-police-constable",
        title: "Who is Eligible for UP Police Constable?",
        paragraphs: [
          "Before you apply, make sure you meet the requirements covering nationality, education, age, and physical standards."
        ]
      },
      {
        id: "nationality",
        title: "Nationality",
        paragraphs: [
          "You must be an Indian citizen. Certain categories of Indian-origin migrants and refugees who have permanently settled in India are also eligible under defined conditions."
        ]
      },
      {
        id: "educational-qualification",
        title: "Educational Qualification",
        paragraphs: [
          "You must have passed Class 12 (Intermediate) or an equivalent qualification from a recognized board on or before the last date of application. A Class 10 (matriculation) qualification alone is not sufficient."
        ]
      },
      {
        id: "age-limit",
        title: "Age Limit",
        paragraphs: [
          "Candidates must meet the following age requirements, with relaxation for reserved categories:"
        ],
        table: {
          headers: [
            "Category",
            "Age Limit"
          ],
          rows: [
            [
              "Male (General)",
              "18 – 22 years"
            ],
            [
              "Female (General)",
              "18 – 25 years"
            ],
            [
              "Male (OBC/SC/ST)",
              "Up to 31 years"
            ],
            [
              "Female (OBC/SC/ST)",
              "Up to 34 years"
            ],
            [
              "Ex-Agniveers",
              "+3 years relaxation"
            ]
          ]
        }
      },
      {
        id: "physical-standards-pst",
        title: "Physical Standards (PST)",
        paragraphs: [
          "Candidates must meet the prescribed physical measurements during the Physical Standard Test:"
        ],
        table: {
          headers: [
            "Category",
            "Height",
            "Chest (Males Only)",
            "Weight (Females Only)"
          ],
          rows: [
            [
              "Male (Gen/OBC/SC)",
              "168 cm",
              "80 cm (unexpanded), 82 cm (expanded)",
              "NA"
            ],
            [
              "Male (ST)",
              "160 cm",
              "79 cm (unexpanded), 80 cm (expanded)",
              "NA"
            ],
            [
              "Female (Gen/OBC/SC)",
              "152 cm",
              "Not Applicable",
              "40 kg"
            ],
            [
              "Female (ST)",
              "147 cm",
              "Not Applicable",
              "40 kg"
            ]
          ]
        }
      },
      {
        id: "physical-efficiency-test-pet",
        title: "Physical Efficiency Test (PET)",
        paragraphs: [
          "Qualifying candidates must complete a running task within the set time limit:"
        ],
        table: {
          headers: [
            "Category",
            "Running Distance",
            "Time Limit"
          ],
          rows: [
            [
              "Male (General/OBC/SC)",
              "4.8 km",
              "25 minutes"
            ],
            [
              "Male (ST)",
              "4.8 km",
              "27 minutes"
            ],
            [
              "Female (General/OBC/SC)",
              "2.4 km",
              "14 minutes"
            ],
            [
              "Female (ST)",
              "2.4 km",
              "16 minutes"
            ]
          ]
        }
      },
      {
        id: "what-is-the-up-police-constable-exam-pattern",
        title: "What is the UP Police Constable Exam Pattern?",
        paragraphs: [
          "The written examination is the heart of the selection process, and understanding its structure is what shapes your strategy.",
          "The exam is an objective, multiple-choice paper consisting of 150 questions worth 300 marks, to be completed in 2 hours (120 minutes). The questions are spread across four sections:"
        ],
        table: {
          headers: [
            "Section",
            "Questions",
            "Marks"
          ],
          rows: [
            [
              "General Knowledge",
              "38",
              "76"
            ],
            [
              "General Hindi",
              "37",
              "74"
            ],
            [
              "Numerical & Mental Ability Test",
              "38",
              "76"
            ],
            [
              "Mental Aptitude / IQ / Reasoning",
              "37",
              "74"
            ],
            [
              "Total",
              "150",
              "300"
            ]
          ]
        }
      },
      {
        id: "no-negative-marking",
        title: "No Negative Marking",
        paragraphs: [
          "Here's a big advantage in the revised 2026 pattern: there is no negative marking. Each correct answer carries 2 marks, and no marks are deducted for wrong answers. This changes your strategy entirely—you should attempt every single question, since leaving any blank only reduces your scoring potential. The exam is conducted offline (OMR-based) and is available in both Hindi and English."
        ]
      },
      {
        id: "what-does-the-up-police-constable-syllabus-cover",
        title: "What Does the UP Police Constable Syllabus Cover?",
        paragraphs: [
          "The syllabus is pitched at a school level and is built around four sections. Here's what to focus on, section by section:",
          "General Knowledge: Indian history, geography of India and the world, the Indian Constitution, economy, culture, agriculture, commerce and trade, population, environment, and natural resources. Pay special attention to UP-specific topics—the education, culture, social practices, and revenue, police, and administrative systems of Uttar Pradesh. Also covered are human rights, internal security and terrorism, cybercrime, current affairs, awards, and India's relations with neighbouring countries.",
          "General Hindi: Hindi grammar (िलंग, वचन, कारक, िक्रया, काल), vocabulary (पयार् यवाची, िवलोम, अनेकार् थक शबद), one-word substitution, sentence correction (अशुद वाकयों को शुद करना), idioms and proverbs (मुहावरे एवं लोकोि कतयां), comprehension passages, रस, छद, अलंकार, and famous Hindi authors and their works.",
          "Numerical & Mental Ability: Number system, simplification, decimals and fractions, HCF and LCM, ratio and proportion, percentage, profit and loss, discount, simple and compound interest, partnership, average, time and work, time and distance, mensuration, and the use of tables and graphs. The mental ability portion adds logical diagrams, series, direction sense, and logical analysis of data.",
          "Mental Aptitude, IQ & Reasoning: Analogies, classification (odd one out), series completion, coding-decoding, blood relations, direction sense, Venn diagrams, arithmetic reasoning, visual memory, and the ability to work with abstract ideas and symbols. The mental aptitude segment also covers public interest, law and order, communal harmony, crime control, and gender sensitivity.",
          "The complete official syllabus is available in the recruitment notification, so always cross-check with the latest version on uppbpb.gov.in."
        ]
      },
      {
        id: "up-police-constable-salary-and-posts",
        title: "UP Police Constable Salary and Posts",
        paragraphs: [
          "A UP Police Constable job offers far more than a monthly paycheck—it brings job security, a strong allowance package, and a clear path up the ranks."
        ]
      },
      {
        id: "pay-scale",
        title: "Pay Scale",
        paragraphs: [
          "Under the latest pay commission norms, the salary structure is as follows:"
        ],
        table: {
          headers: [
            "Component",
            "Details"
          ],
          rows: [
            [
              "Starting Basic Pay",
              "₹21,700"
            ],
            [
              "Grade Pay",
              "₹2,000"
            ],
            [
              "Pay Band",
              "₹21,700 – ₹69,100"
            ],
            [
              "Gross Monthly Salary",
              "₹40,000 – ₹45,000"
            ],
            [
              "Annual Gross Salary",
              "₹4,80,000 – ₹5,40,000"
            ]
          ]
        }
      },
      {
        id: "in-hand-salary",
        title: "In-Hand Salary",
        paragraphs: [
          "The in-hand monthly salary for a UP Police Constable falls between ₹40,000 and ₹45,000, depending on the allowances received. On top of the basic pay, constables are entitled to:",
          "Dearness Allowance (DA)",
          "House Rent Allowance (HRA)",
          "Medical Allowance",
          "Travel Allowance (TA)",
          "City Compensatory Allowance",
          "Detachment Allowance",
          "High Altitude Allowance",
          "Leave Encashment"
        ]
      },
      {
        id: "job-responsibilities",
        title: "Job Responsibilities",
        paragraphs: [
          "A constable's duties are varied and hands-on. They include lodging First Information Reports (FIRs), assisting senior officers in investigations, performing patrolling duties, handling station paperwork, and supporting tasks such as police verification, traffic duty, and VIP security."
        ]
      },
      {
        id: "probation-and-career-growth",
        title: "Probation and Career Growth",
        paragraphs: [
          "New recruits serve a probation period of 2 years from the date of joining. The constable post is a starting point, not a ceiling—promotions follow a clear ladder based on seniority and eligibility:",
          "Constable → Head Constable → Assistant Sub Inspector (ASI) → Sub Inspector (SI) → Inspector"
        ]
      },
      {
        id: "how-to-prepare-for-the-up-police-constable-exam",
        title: "How to Prepare for the UP Police Constable Exam",
        paragraphs: [
          "With over 32,000 seats and lakhs of applicants, smart preparation makes all the difference. These tips will help you build an effective strategy.",
          "Start with the syllabus and pattern. Know exactly what's tested before you open a single book, and budget your time according to the weightage of each section.",
          "Attempt every question. Since there is no negative marking in 2026, never leave a question blank. Even an educated guess can add marks, so aim to attempt all 150 questions.",
          "Prioritize UP-specific GK. Topics on Uttar Pradesh's geography, culture, and administration carry real weight and are often overlooked by candidates who study only national GK. Don't make that mistake.",
          "Master high-frequency Maths topics. Percentage, profit and loss, time and work, and simple and compound interest appear consistently—nail these first.",
          "Strengthen your Hindi grammar. Practice grammar rules daily and revise idioms (मुहावरे) and one-word substitutions regularly. These are high-scoring and repeat across previous papers.",
          "Practice reasoning for speed. Since there's no penalty for wrong answers, speed matters more than caution here. Drill series, blood relations, and direction sense problems daily.",
          "Train for the physical test too. Clearing the written exam is only the first step. Start running regularly now to comfortably meet the PET standards—4.8 km in 25 minutes for men, 2.4 km in 14 minutes for women.",
          "Take regular mock tests. Aim for two to three full-length mocks a week in your final stretch to build speed and accuracy, and review previous year papers to spot recurring trends."
        ]
      },
      {
        id: "your-next-step",
        title: "Your Next Step",
        paragraphs: [
          "The UP Police Constable exam is a genuine opportunity—over 32,000 secure state government posts, a competitive salary package, and a clear path for career growth, all open to candidates with just a Class 12 qualification.",
          "Now that you understand the eligibility, pattern, syllabus, and salary, the next move is yours. Download the official notification from uppbpb.gov.in, map out your study plan, and start practicing today."
        ]
      },
      {
        id: "frequently-asked-questions",
        title: "Frequently Asked Questions",
        paragraphs: [
          "What is the minimum qualification for UP Police Constable?",
          "You must have passed Class 12 (Intermediate) or an equivalent exam from a recognized board. A Class 10 qualification alone is not sufficient.",
          "What is the age limit for UP Police Constable?",
          "For the General category, male candidates must be 18–22 years old and female candidates 18–25 years old. Reserved category candidates receive relaxation, with the upper limit extended to 31 years for OBC/SC/ST males and 34 years for OBC/SC/ST females.",
          "Is there negative marking in the UP Police Constable exam?",
          "No. As per the revised 2026 exam pattern, negative marking has been completely removed. Each correct answer carries 2 marks, and there is no penalty for wrong answers.",
          "What are the total marks for the written exam?",
          "The written exam consists of 150 objective-type questions for a total of 300 marks, to be completed in 2 hours.",
          "What is the selection process for UP Police Constable?",
          "The selection process has three stages: the Written Examination, followed by Document Verification and the Physical Standard Test (PST), and finally the Physical Efficiency Test (PET). The final merit list is based on the written exam scores.",
          "What is the salary of a UP Police Constable?",
          "The starting basic pay is ₹21,700 per month, with a pay band of ₹21,700–₹69,100 and a grade pay of ₹2,000. After allowances, the in-hand salary ranges from approximately ₹40,000 to ₹45,000 per month.",
          "What are the promotion opportunities for a UP Police Constable?",
          "A constable can rise through the ranks based on seniority and eligibility—first to Head Constable, then Assistant Sub Inspector (ASI), Sub Inspector (SI), and ultimately Inspector."
        ]
      }
    ]
  },
  {
    slug: "ssc-cgl-exam-guide-2026-syllabus-pattern",
    title: "SSC CGL Exam: Your Complete Guide to Crack It in 2026",
    description: "Want a respected central government job with a strong salary and real career growth? The SSC CGL exam is one of the best routes to get there. With 12,256 vacancies on offer and posts spread across top departments like the Income Tax Department, CBI, and the Comptroller and Auditor General, it's no surprise this is one of India's most sought-after graduate-level exams. This guide breaks down everything you need to know, from eligibility and exam pattern to syllabus and smart preparation tips. By the end, you'll have a clear roadmap to plan your prep and walk into the exam hall with confidence.",
    examSlug: "ssc-cgl",
    examName: "SSC CGL",
    category: "SSC Exams",
    icon: "🏛️",
    type: "info",
    metaTitle: "SSC CGL Exam Guide 2026: Pattern, Syllabus & Salary",
    metaDescription: "Everything you need to crack the SSC CGL exam—eligibility, pattern, syllabus, salary, and smart preparation tips. Start your government job journey today.",
    authorName: "Editorial Team",
    authorityBadge: "Subject Matter Expert",
    publishDate: "June 30, 2026",
    readTime: "5 min read",
    quickAnswer: "The SSC CGL is a national-level exam run by the Staff Selection Commission to fill Group B and Group C posts like Assistant Section Officer, Income Tax Inspector, and Auditor. You'll need a bachelor's degree and need to clear two tiers of computer-based tests, with Tier 2 deciding your final merit.",
    sections: [
      {
        id: "what-is-the-ssc-cgl-exam",
        title: "What is the SSC CGL exam?",
        paragraphs: [
          "The SSC CGL (Combined Graduate Level) exam is conducted by the Staff Selection Commission to recruit graduates for Group B and Group C posts in central government ministries, departments, and organizations.",
          "Some of the most popular posts include:",
          "Assistant Section Officer (ASO)",
          "Inspector of Income Tax",
          "Inspector (Central Excise, Preventive Officer, and Examiner)",
          "Sub Inspector (SI) in the CBI",
          "Junior Statistical Officer (JSO)",
          "Auditor, Accountant, and Tax Assistant",
          "These roles combine job security, competitive pay, and the chance to work in influential government departments—which is exactly why lakhs of graduates compete for them each year."
        ]
      },
      {
        id: "who-is-eligible-for-ssc-cgl",
        title: "Who is eligible for SSC CGL?",
        paragraphs: [
          "Before you start prepping, make sure you meet the basic requirements.",
          "Educational qualification: You must hold a bachelor's degree from a recognized university. Candidates from any stream are eligible, and there's no minimum percentage requirement. A few posts do have special conditions:",
          "Junior Statistical Officer (JSO): A bachelor's degree with Statistics as a subject, or 60% in Mathematics in Class 12.",
          "Statistical Investigator Grade II: Graduation with Statistics in all semesters.",
          "Assistant Audit Officer / Assistant Accounts Officer: Graduation is essential, with qualifications like CA, MBA, MCom, or ICWA considered desirable (but not mandatory).",
          "Age limit: This varies by post, generally falling within the 18 to 32 range:",
          "18–27 years: Auditor, Tax Assistant, Accountant, Junior Accountant",
          "20–30 years: Assistant Section Officer, Inspector posts, Sub Inspector",
          "18–30 years: Inspector (CBN), Divisional Accountant",
          "Up to 32 years: Junior Statistical Officer",
          "Age relaxation applies for reserved categories:",
          "OBC: 3 years",
          "SC/ST: 5 years",
          "PwBD: 10 years (and more in combination with other categories)",
          "Attempts and final-year students: There's no limit on the number of attempts—you can apply until you reach the maximum age for your category and post. Final-year students can also apply, provided they complete their degree before document verification.",
          "Nationality: You must be a citizen of India, or fall under the other eligible categories specified by the Commission."
        ]
      },
      {
        id: "what-is-the-ssc-cgl-exam-pattern",
        title: "What is the SSC CGL exam pattern?",
        paragraphs: [
          "The selection process runs in two tiers, both held as computer-based tests. Here's the key thing to remember: Tier 1 is qualifying, while Tier 2 decides your final merit.",
          "SSC CGL Tier 1",
          "Tier 1 is a 60-minute objective test with 100 questions worth 200 marks, split across four sections (each with a 15-minute sectional timer):"
        ],
        table: {
          headers: [
            "Section",
            "Questions",
            "Marks"
          ],
          rows: [
            [
              "General Intelligence & Reasoning",
              "25",
              "50"
            ],
            [
              "General Awareness",
              "25",
              "50"
            ],
            [
              "Quantitative Aptitude",
              "25",
              "50"
            ],
            [
              "English Comprehension",
              "25",
              "50"
            ]
          ]
        }
      },
      {
        id: "ssc-cgl-tier-2",
        title: "SSC CGL Tier 2",
        paragraphs: [
          "Watch out for negative marking—you lose 0.50 marks for every wrong answer.",
          "Tier 2 is the main merit-deciding stage. It includes Paper 1 (compulsory for all) and Paper 2 (only for JSO and Statistical Investigator Grade-II applicants).",
          "Paper 1 is conducted across two sessions:"
        ],
        table: {
          headers: [
            "Session",
            "Section",
            "Subjects",
            "Questions",
            "Marks"
          ],
          rows: [
            [
              "Session 1",
              "Section 1",
              "Mathematical Abilities + Reasoning & General Intelligence",
              "60",
              "180"
            ],
            [
              "Session 1",
              "Section 2",
              "English Language & Comprehension + General Awareness",
              "70",
              "210"
            ],
            [
              "Session 1",
              "Section 3",
              "Computer Knowledge (qualifying)",
              "20",
              "60"
            ],
            [
              "Session 2",
              "Section 4",
              "Data Entry Speed Test (qualifying)",
              "1 task",
              "—"
            ]
          ]
        }
      },
      {
        id: "what-does-the-ssc-cgl-syllabus-cover",
        title: "What does the SSC CGL syllabus cover?",
        paragraphs: [
          "The Data Entry Speed Test requires about 2,000 key depressions in 15 minutes.",
          "Paper 2 is only for JSO and Statistical Investigator roles and covers Statistics—100 questions worth 200 marks over two hours.",
          "Negative marking in Tier 2 is steeper: 1 mark per wrong answer in Sections 1, 2, and 3 of Paper 1, and 0.50 marks per wrong answer in Paper 2.",
          "The syllabus builds in difficulty from Tier 1 to Tier 2. Here's a quick overview of what to study:",
          "General Intelligence & Reasoning: Analogies, classification, series, coding-decoding, Venn diagrams, problem-solving, pattern folding, and embedded figures.",
          "General Awareness: History, culture, geography, the economic scene, general policy, scientific research, sports, static GK, and current affairs.",
          "Quantitative Aptitude: Number systems, percentages, ratio and proportion, profit and loss, algebra, geometry, mensuration, trigonometry, heights and distances, and data interpretation.",
          "English Comprehension: Reading comprehension, idioms and phrases, one-word substitution, sentence correction, active/passive voice, synonyms and antonyms, and cloze tests.",
          "Tier 2 covers the same core subjects at an advanced level and adds two more areas:",
          "Computer Proficiency: Computer basics, software, internet and email, networking, and cyber security.",
          "Statistics (Paper 2 only): Collection and presentation of data, measures of central tendency and dispersion, skewness, kurtosis, correlation, regression, and probability theory."
        ]
      },
      {
        id: "ssc-cgl-salary-and-posts",
        title: "SSC CGL salary and posts",
        paragraphs: [
          "One of the biggest draws of the SSC CGL is the pay—salaries range from roughly ₹25,500 to ₹1,51,100 per month, plus allowances like HRA, DA, and TA. Here's a look at some key posts:"
        ],
        table: {
          headers: [
            "Post",
            "Pay Level",
            "Pay Scale (₹)",
            "Department"
          ],
          rows: [
            [
              "Assistant Section Officer",
              "7",
              "44,900 – 1,42,400",
              "CSS, Railways, IB"
            ],
            [
              "Inspector of Income Tax",
              "7",
              "44,900 – 1,42,400",
              "CBDT"
            ],
            [
              "Inspector (Central Excise)",
              "7",
              "44,900 – 1,42,400",
              "CBIC"
            ],
            [
              "Sub Inspector",
              "6",
              "35,400 – 1,12,400",
              "CBI, NIA"
            ],
            [
              "Junior Statistical Officer",
              "6",
              "35,400 – 1,12,400",
              "M/o Statistics"
            ],
            [
              "Auditor",
              "5",
              "29,200 – 92,300",
              "C&AG, CGDA, CGA"
            ],
            [
              "Tax Assistant",
              "4",
              "25,500 – 81,100",
              "CBDT, CBIC"
            ]
          ]
        }
      },
      {
        id: "how-to-prepare-for-the-ssc-cgl-exam",
        title: "How to prepare for the SSC CGL exam",
        paragraphs: [
          "Beyond the starting pay, SSC CGL posts offer strong career growth. With experience, departmental exams, and consistent performance, you can climb to higher administrative and supervisory positions over time.",
          "A clear plan beats random studying every time. Here's how to approach your prep:",
          "1. Master the syllabus first. Knowing exactly what to study saves you from wasting time on low-priority topics. Since Tier 2 decides your final merit, plan to prepare for both tiers at the same time.",
          "2. Build a realistic study schedule. Divide your day across all four subjects. Consistency matters more than marathon sessions, so aim for steady daily progress.",
          "3. Practice previous year papers. They reveal the question style, difficulty level, and the topics that show up repeatedly. This is one of the smartest ways to prepare.",
          "4. Take regular mock tests. Mocks help you manage time, handle the sectional timers, and get comfortable with the computer-based format. They also highlight your weak spots well before exam day.",
          "5. Prioritize accuracy. With negative marking in both tiers, smart guessing can cost you. Focus on answering questions you're confident about rather than attempting everything.",
          "6. Stay current with affairs. Read a daily newspaper or follow a reliable current affairs source to stay sharp on General Awareness."
        ]
      },
      {
        id: "your-next-step-toward-a-government-job",
        title: "Your next step toward a government job",
        paragraphs: [
          "The SSC CGL exam rewards consistent, focused effort. With a clear understanding of the two-tier pattern, a structured study plan, and plenty of mock tests, cracking it is well within reach. Start by downloading the official syllabus, gathering quality study material, and setting up your daily schedule. The sooner you begin, the more time you'll have to practice—and practice is what separates the candidates who clear it from those who fall short."
        ]
      },
      {
        id: "frequently-asked-questions",
        title: "Frequently asked questions",
        paragraphs: [
          "What is the minimum qualification for SSC CGL?",
          "You need a bachelor's degree from a recognized university. Candidates from any stream are eligible, and there's no minimum percentage requirement, though a few posts like JSO have additional subject-specific conditions.",
          "Is there negative marking in SSC CGL?",
          "Yes. In Tier 1, you lose 0.50 marks for each wrong answer. In Tier 2, the penalty is 1 mark per wrong answer in Paper 1 sections and 0.50 marks in Paper 2.",
          "How many tiers does the SSC CGL exam have?",
          "The exam has two tiers, both computer-based. Tier 1 is qualifying, while Tier 2 is the main scoring stage that determines your final merit.",
          "What is the age limit for SSC CGL?",
          "The age limit generally ranges from 18 to 32 years, depending on the post. Reserved categories receive relaxation—3 years for OBC, 5 years for SC/ST, and 10 years for PwBD candidates.",
          "What is the salary for SSC CGL posts?",
          "Salaries range from about ₹25,500 to ₹1,51,100 per month. Group B posts like ASO and Income Tax Inspector fall under Pay Level 7 (₹44,900 – ₹1,42,400), while Group C posts range from Pay Level 4 to Level 6.",
          "Can final-year students apply for SSC CGL?",
          "Yes. Final-year students can apply, as long as they complete their degree before the document verification stage."
        ]
      }
    ]
  },
  {
    slug: "ssc-chsl-exam-guide-2026-syllabus-pattern",
    title: "SSC CHSL Exam: Your Complete Guide to Crack It in 2026",
    description: "Dreaming of a secure central government job after Class 12? The SSC CHSL exam might be your ticket. Every year, lakhs of candidates compete for a limited number of posts across various ministries and departments—and with the right strategy, you can be one of them. This guide breaks down everything you need to know, from eligibility and exam pattern to syllabus and smart preparation tips. By the end, you'll have a clear roadmap to plan your prep and walk into the exam hall with confidence.",
    examSlug: "ssc-chsl",
    examName: "SSC CHSL",
    category: "SSC Exams",
    icon: "📝",
    type: "info",
    metaTitle: "SSC CHSL Exam Guide 2026: Pattern, Syllabus & Tips",
    metaDescription: "Everything you need to crack the SSC CHSL exam—eligibility, pattern, syllabus, salary, and smart preparation tips. Start your government job journey today.",
    authorName: "Editorial Team",
    authorityBadge: "null",
    publishDate: "June 30, 2026",
    readTime: "5 min read",
    quickAnswer: "The SSC CHSL is a national-level exam run by the Staff Selection Commission to fill Group C posts like Lower Division Clerk, Junior Secretariat Assistant, and Data Entry Operator. You'll need a Class 12 pass and need to clear two tiers of computer-based tests plus a skill or typing test.",
    sections: [
      {
        id: "what-is-the-ssc-chsl-exam",
        title: "What is the SSC CHSL exam?",
        paragraphs: [
          "The SSC CHSL (Combined Higher Secondary Level) exam is conducted by the Staff Selection Commission to recruit candidates for Group C posts in central government ministries, departments, and offices.",
          "The main posts include:",
          "Lower Division Clerk (LDC)",
          "Junior Secretariat Assistant (JSA)",
          "Data Entry Operator (DEO) and DEO Grade 'A'",
          "Postal Assistant (PA) / Sorting Assistant (SA)",
          "These roles offer job stability, decent pay, and the kind of work-life balance that makes government jobs so attractive."
        ]
      },
      {
        id: "who-is-eligible-for-ssc-chsl",
        title: "Who is eligible for SSC CHSL?",
        paragraphs: [
          "Before you start prepping, make sure you meet the basic requirements.",
          "Educational qualification: You must have passed Class 12 (or an equivalent exam) from a recognized board or university. For DEO posts in specific departments—like the Ministry of Consumer Affairs, the Ministry of Culture, and the SSC itself—you'll need to have studied Science with Mathematics in Class 12.",
          "Age limit: Candidates must be between 18 and 27 years old (as of January 1, 2026). Age relaxation applies for reserved categories:",
          "SC/ST: 5 years",
          "OBC: 3 years",
          "PwBD (Unreserved): 10 years",
          "Nationality: You must be a citizen of India, or fall under the other eligible categories specified by the Commission."
        ]
      },
      {
        id: "what-is-the-ssc-chsl-exam-pattern",
        title: "What is the SSC CHSL exam pattern?",
        paragraphs: [
          "The selection process runs in two tiers, both held as computer-based tests."
        ]
      },
      {
        id: "ssc-chsl-tier-1",
        title: "SSC CHSL Tier 1",
        paragraphs: [
          "Tier 1 is the qualifying stage. It's a 60-minute objective test with 100 questions worth 200 marks, split across four sections:",
          "Watch out for negative marking—you lose 0.50 marks for every wrong answer."
        ],
        table: {
          headers: [
            "Section",
            "Questions",
            "Marks"
          ],
          rows: [
            [
              "General Intelligence",
              "25",
              "50"
            ],
            [
              "General Awareness",
              "25",
              "50"
            ],
            [
              "Quantitative Aptitude",
              "25",
              "50"
            ],
            [
              "English Language",
              "25",
              "50"
            ]
          ]
        }
      },
      {
        id: "ssc-chsl-tier-2",
        title: "SSC CHSL Tier 2",
        paragraphs: [
          "Tier 2 decides your final merit and is held in two sessions on the same day.",
          "Session I (2 hours 15 minutes) covers three sections:",
          "Section 1: Mathematical Abilities (30 questions) + Reasoning and General Intelligence (30 questions) — 180 marks",
          "Section 2: English Language and Comprehension (40 questions) + General Awareness (20 questions) — 180 marks",
          "Section 3: Computer Knowledge (15 questions) — 45 marks",
          "Negative marking in Tier 2 is steeper—1 mark per wrong answer.",
          "Session II is the Skill Test or Typing Test, which is qualifying in nature. DEO candidates need a typing speed of 8,000 to 15,000 key depressions per hour (depending on the department). For LDC/JSA roles, you'll need 35 words per minute in English or 30 words per minute in Hindi."
        ]
      },
      {
        id: "what-does-the-ssc-chsl-syllabus-cover",
        title: "What does the SSC CHSL syllabus cover?",
        paragraphs: [
          "The syllabus spans four core subjects. Here's a quick overview of what to study:",
          "General Intelligence and Reasoning: Analogies, coding-decoding, series, syllogisms, Venn diagrams, blood relations, and non-verbal reasoning.",
          "General Awareness: Current affairs, history, geography, polity, economics, and basic science.",
          "Quantitative Aptitude: Number systems, percentages, ratio and proportion, profit and loss, algebra, geometry, mensuration, and trigonometry.",
          "English Language: Reading comprehension, error spotting, vocabulary, idioms, sentence improvement, and grammar.",
          "Tier 1 questions on General Intelligence, English, and General Awareness are pitched at graduation level, while Quantitative Aptitude is at the Class 10 level. Tier 2 adds Computer Proficiency, covering computer basics, MS Office, internet usage, and cyber security."
        ]
      },
      {
        id: "ssc-chsl-salary-and-posts",
        title: "SSC CHSL salary and posts",
        paragraphs: [
          "One of the biggest draws of the SSC CHSL is the pay. Here's what you can expect:",
          "Keep in mind that selected candidates carry All India Service Liability, which means you could be posted anywhere in the country."
        ],
        table: {
          headers: [
            "Post",
            "Pay Level",
            "Pay Scale (₹)"
          ],
          rows: [
            [
              "LDC / JSA",
              "2",
              "19,900 – 63,200"
            ],
            [
              "Data Entry Operator",
              "4",
              "25,500 – 81,100"
            ],
            [
              "Data Entry Operator (higher grade)",
              "5",
              "29,200 – 92,300"
            ]
          ]
        }
      },
      {
        id: "how-to-prepare-for-the-ssc-chsl-exam",
        title: "How to prepare for the SSC CHSL exam",
        paragraphs: [
          "A clear plan beats random studying every time. Here's how to approach your prep:",
          "1. Master the syllabus first. Knowing exactly what to study saves you from wasting time on low-priority topics. English and Reasoning carry high weightage, so give them extra attention.",
          "2. Build a realistic study schedule. Divide your day across all four subjects. Consistency matters more than marathon sessions, so aim for steady daily progress.",
          "3. Practice previous year papers. They reveal the question style, difficulty level, and the topics that show up repeatedly. This is one of the smartest ways to prepare.",
          "4. Take regular mock tests. Mocks help you manage time, identify weak spots, and get comfortable with the computer-based format. The Commission may introduce sectional timing (around 15 minutes per section), so practice under timed conditions.",
          "5. Don't ignore the typing test. Many candidates clear the written stages but stumble on the Skill Test. Build your typing speed early so it never becomes a roadblock.",
          "6. Stay current with affairs. Read a daily newspaper or follow a reliable current affairs source to stay sharp on General Awareness."
        ]
      },
      {
        id: "your-next-step-toward-a-government-job",
        title: "Your next step toward a government job",
        paragraphs: [
          "The SSC CHSL exam rewards consistent, focused effort. With a clear understanding of the pattern, a structured study plan, and plenty of mock tests, cracking it is well within reach.",
          "Start by downloading the official syllabus, gathering quality study material, and setting up your daily schedule. The sooner you begin, the more time you'll have to practice—and practice is what separates the candidates who clear it from those who fall short."
        ]
      },
      {
        id: "frequently-asked-questions",
        title: "Frequently asked questions",
        paragraphs: [
          "What is the minimum qualification for SSC CHSL?",
          "You need to have passed Class 12 (or an equivalent exam) from a recognized board or university. DEO posts in certain departments require Class 12 with Science and Mathematics.",
          "Is there negative marking in SSC CHSL?",
          "Yes. In Tier 1, you lose 0.50 marks for each wrong answer. In Tier 2, the penalty is 1 mark per wrong answer.",
          "How many tiers does the SSC CHSL exam have?",
          "The exam has two tiers. Tier 1 is a qualifying computer-based test, while Tier 2 includes a computer-based test plus a Skill Test or Typing Test that determines your final selection.",
          "What is the age limit for SSC CHSL?",
          "Candidates must be between 18 and 27 years old. Reserved categories receive age relaxation—5 years for SC/ST, 3 years for OBC, and 10 years for PwBD (Unreserved).",
          "What is the salary for SSC CHSL posts?",
          "LDC and JSA roles fall under Pay Level 2 (₹19,900 – ₹63,200), while DEO posts range from Pay Level 4 (₹25,500 – ₹81,100) to Pay Level 5 (₹29,200 – ₹92,300).",
          "How can I prepare for the SSC CHSL typing test?",
          "Practice typing daily to build speed and accuracy. LDC/JSA candidates need 35 words per minute in English or 30 in Hindi, while DEO candidates need 8,000 to 15,000 key depressions per hour depending on the department."
        ]
      }
    ]
  },
  {
    slug: "ssc-gd-constable-exam-guide-2026-syllabus-pattern",
    title: "SSC GD Constable Exam: Your Complete Guide to Crack It in 2026",
    description: "Dreaming of a job in uniform that comes with stability, respect, and the chance to serve the nation? The SSC GD Constable exam is one of the most popular routes in. With over 25,000 vacancies in the latest recruitment cycle—and the bonus of strong job security, solid pay, and lifelong perks—it's no wonder lakhs of candidates apply each year. This guide walks you through everything you need to know: eligibility, exam pattern, syllabus, physical standards, salary, and practical preparation tips. By the end, you'll have a clear plan to start your prep with confidence.",
    examSlug: "ssc-gd-constable",
    examName: "SSC GD Constable",
    category: "SSC Exams",
    icon: "💂",
    type: "info",
    metaTitle: "SSC GD Constable Exam Guide 2026: Pattern, Syllabus & Salary",
    metaDescription: "Everything you need to crack the SSC GD Constable exam—eligibility, pattern, syllabus, physical standards, salary, and smart prep tips. Start preparing today.",
    authorName: "Editorial Team",
    authorityBadge: "Subject matter expert",
    publishDate: "June 30, 2026",
    readTime: "5 min read",
    quickAnswer: "The SSC GD Constable is a national-level exam run by the Staff Selection Commission to recruit constables into India's Central Armed Police Forces (CAPFs), including the BSF, CISF, CRPF, ITBP, SSB, and Assam Rifles. You only need to have passed Class 10, and selection is based on a computer-based test followed by physical and medical tests.",
    sections: [
      {
        id: "what-is-the-ssc-gd-constable-exam",
        title: "What is the SSC GD Constable exam?",
        paragraphs: [
          "The SSC GD (General Duty) Constable exam is conducted by the Staff Selection Commission to recruit candidates for the post of Constable (General Duty) in the Central Armed Police Forces and other security organizations.",
          "Successful candidates are deployed across several forces, each with its own role:",
          "BSF (Border Security Force): Guards the Indo-Pakistan and Indo-Bangladesh borders.",
          "CISF (Central Industrial Security Force): Secures airports, PSUs, and key government infrastructure.",
          "CRPF (Central Reserve Police Force): Handles internal security and counter-insurgency operations.",
          "ITBP (Indo-Tibetan Border Police): Protects the India-China border from Ladakh to Arunachal Pradesh.",
          "SSB (Sashastra Seema Bal): Guards the Indo-Nepal and Indo-Bhutan borders.",
          "Assam Rifles: Manages internal security and border operations in the Northeast.",
          "SSF (Secretariat Security Force): Protects central government secretariat premises.",
          "These roles come with the security, steady pay, and growth opportunities that make government jobs so appealing."
        ]
      },
      {
        id: "who-is-eligible-for-ssc-gd-constable",
        title: "Who is eligible for SSC GD Constable?",
        paragraphs: [
          "Before you start prepping, make sure you tick the basic boxes.",
          "Educational qualification: You must have passed the Matriculation (Class 10) examination from a recognized board or university by the cut-off date. That's it—no degree required.",
          "Age limit: Candidates must be between 18 and 23 years of age (for the General category) as on the crucial date set by the Commission.",
          "Age relaxation applies for reserved categories:",
          "OBC: 3 years",
          "SC/ST: 5 years",
          "Ex-Servicemen: 3 years (after deducting military service)",
          "Children and dependents of 1984 riot victims and 2002 Gujarat riot victims: 5 years (UR), 8 years (OBC), 10 years (SC/ST)",
          "J&K domicile (1980–1989): 5 years (UR), 8 years (OBC), 10 years (SC/ST)",
          "Nationality: You must be a citizen of India, or fall under the other eligible categories specified by the Commission—such as a subject of Nepal or Bhutan, a Tibetan refugee who arrived in India before January 1, 1962, or a person of Indian origin who migrated from specified countries."
        ]
      },
      {
        id: "what-is-the-ssc-gd-constable-exam-pattern",
        title: "What is the SSC GD Constable exam pattern?",
        paragraphs: [
          "Selection happens in stages. You'll start with a Computer-Based Test (CBT), and qualifying candidates move on to the physical tests, medical examination, and document verification.",
          "The full selection process is:",
          "1. Computer-Based Examination (CBE)",
          "2. Physical Efficiency Test (PET)",
          "3. Physical Standard Test (PST)",
          "4. Detailed Medical Examination",
          "5. Document Verification",
          "The CBT is offered in 15 languages—English, Hindi, and 13 regional languages—making it accessible to candidates across India."
        ]
      },
      {
        id: "computer-based-test-cbt",
        title: "Computer-Based Test (CBT)",
        paragraphs: [
          "The CBT consists of 80 MCQ-based questions worth 160 marks, to be completed in 60 minutes. Each correct answer earns 2 marks, while 0.25 marks are deducted for every wrong answer—so answer carefully."
        ],
        table: {
          headers: [
            "Part",
            "Subject",
            "Questions",
            "Marks"
          ],
          rows: [
            [
              "A",
              "General Intelligence & Reasoning",
              "20",
              "40"
            ],
            [
              "B",
              "General Knowledge & General Awareness",
              "20",
              "40"
            ],
            [
              "C",
              "Elementary Mathematics",
              "20",
              "40"
            ],
            [
              "D",
              "English/Hindi",
              "20",
              "40"
            ],
            [
              "Total",
              "",
              "80",
              "160"
            ]
          ]
        }
      },
      {
        id: "qualifying-marks",
        title: "Qualifying marks",
        paragraphs: [
          "To clear the CBT, you'll need to hit these minimum percentages:",
          "General (UR): 30%",
          "OBC/EWS: 25%",
          "SC/ST: 20%"
        ]
      },
      {
        id: "physical-standard-test-pst",
        title: "Physical Standard Test (PST)",
        paragraphs: [
          "The PST measures your height, chest (for male candidates), and weight. Here are the general standards:"
        ],
        table: {
          headers: [
            "Criteria",
            "Male",
            "Female"
          ],
          rows: [
            [
              "Height",
              "170 cm",
              "157 cm"
            ],
            [
              "Chest",
              "80 cm unexpanded (min. 5 cm expansion)",
              "Not applicable"
            ]
          ]
        }
      },
      {
        id: "physical-standard-test-pst-continued",
        title: "Physical Standard Test (PST) Continued",
        paragraphs: [
          "Height and chest standards are relaxable for several categories, including Scheduled Tribes, candidates from the North-Eastern states, Garhwalis, Kumaonis, Dogras, Marathas, and candidates from J&K, Himachal Pradesh, Assam, and Ladakh.",
          "A recent update is worth noting: candidates are no longer rejected on the basis of weight during the PST. Weight is now assessed during the Medical Examination using BMI criteria, with a qualifying range of 18 to 25."
        ]
      },
      {
        id: "physical-efficiency-test-pet",
        title: "Physical Efficiency Test (PET)",
        paragraphs: [
          "The PET tests your endurance through a running test, with standards that differ by gender and region:"
        ],
        table: {
          headers: [
            "Test Category",
            "Male",
            "Female"
          ],
          rows: [
            [
              "Race (except Ladakh)",
              "5 km in 24 minutes",
              "1.6 km in 8½ minutes"
            ],
            [
              "Race (Ladakh region)",
              "1.6 km in 7 minutes",
              "800 m in 4 minutes"
            ]
          ]
        }
      },
      {
        id: "physical-efficiency-test-pet-continued",
        title: "Physical Efficiency Test (PET) Continued",
        paragraphs: [
          "Ex-servicemen are exempted from the PET but must still attend the PST and clear the medical exam."
        ]
      },
      {
        id: "what-does-the-ssc-gd-constable-syllabus-cover",
        title: "What does the SSC GD Constable syllabus cover?",
        paragraphs: [
          "The CBT tests four core areas, all at the Matriculation (Class 10) level. Here's a quick overview of what to study:",
          "General Intelligence & Reasoning: Analogies, similarities and differences, coding-decoding, arithmetic number series, spatial visualization and orientation, figure classification, non-verbal series, visual memory, relationship concepts, and arithmetical reasoning.",
          "General Knowledge & General Awareness: Indian Constitution, history, culture, geography, economic scene, general policy, scientific research, sports, and current affairs.",
          "Elementary Mathematics: Number systems, computation of whole numbers, decimals and fractions, percentages, ratio and proportion, averages, profit and loss, discount, simple and compound interest, mensuration, and time and distance.",
          "English/Hindi: Spot the error, fill in the blanks, synonyms and antonyms, idioms and phrases, one-word substitution, sentence improvement, active/passive voice, direct/indirect narration, cloze passage, and detecting misspelled words.",
          "A useful tip: General Awareness carries the most predictable weightage, with static GK and current affairs making up a big chunk of that section. Reading current affairs daily can give you an easy edge here."
        ]
      },
      {
        id: "ssc-gd-constable-salary-and-posts",
        title: "SSC GD Constable salary and posts",
        paragraphs: [
          "The SSC GD Constable post falls under Pay Level 3 of the 7th Pay Commission, with a basic pay ranging from ₹21,700 to ₹69,100. Once you factor in allowances, the in-hand salary typically ranges from ₹30,000 to ₹35,000 per month, depending on your posting and duty area.",
          "Here's a snapshot of the salary structure:"
        ],
        table: {
          headers: [
            "Component",
            "Details"
          ],
          rows: [
            [
              "Pay Scale",
              "₹21,700 – ₹69,100 (Level 3)"
            ],
            [
              "Gross Salary",
              "Approximately ₹35,000 – ₹40,000"
            ],
            [
              "Dearness Allowance",
              "Around 50% of basic pay"
            ],
            [
              "House Rent Allowance",
              "Up to 27% of basic pay (X-category cities)"
            ],
            [
              "Total In-Hand Salary",
              "Approximately ₹30,000 – ₹35,000 per month"
            ]
          ]
        }
      },
      {
        id: "ssc-gd-constable-salary-and-posts-continued",
        title: "SSC GD Constable salary and posts Continued",
        paragraphs: [
          "Pay can vary by force and posting. Constables in border forces like the BSF often receive higher Risk and Hardship Allowances, while those posted in metro cities tend to receive higher HRA.",
          "Beyond the monthly pay, SSC GD roles offer valuable long-term benefits:",
          "Allowances like Dearness Allowance, House Rent Allowance, Transport Allowance, and risk allowances",
          "Medical facilities, uniform allowance, and annual increments",
          "Strong career growth, with promotions from Constable to Head Constable, Assistant Sub Inspector, Sub Inspector, and Inspector",
          "After five years of service, with annual increments and DA hikes, the in-hand salary can climb to roughly ₹45,000 to ₹55,000 per month."
        ]
      },
      {
        id: "how-to-prepare-for-the-ssc-gd-constable-exam",
        title: "How to prepare for the SSC GD Constable exam",
        paragraphs: [
          "A clear plan beats random studying every time. Here's how to approach your prep:",
          "1. Know the syllabus and pattern inside out. Understanding exactly what's tested—and how the marking scheme works—helps you focus your energy where it counts. Remember that each wrong answer costs you 0.25 marks.",
          "2. Build a balanced study schedule. Divide your time across all four subjects, giving extra attention to your weaker areas. Consistency matters more than long, exhausting sessions.",
          "3. Practice previous year papers. While direct questions rarely repeat, the question formats and logic often do. Solving past papers reveals the topics that show up year after year.",
          "4. Take regular mock tests. Mocks help you manage the 60-minute time limit, get comfortable with the computer-based format, and pinpoint your weak spots before exam day.",
          "5. Play the negative marking smartly. Attempt questions you're confident about rather than guessing blindly. A handful of careless wrong answers can quietly drag down your score.",
          "6. Stay current with affairs. Read a daily newspaper or follow a reliable current affairs source to sharpen your General Knowledge and General Awareness.",
          "7. Start your physical training early. The PET and PST are just as important as the written test. Build running practice into your routine well in advance so you're ready to meet the endurance and standard requirements."
        ]
      },
      {
        id: "your-next-step-toward-a-job-in-uniform",
        title: "Your next step toward a job in uniform",
        paragraphs: [
          "The SSC GD Constable exam is one of the most achievable routes into India's armed forces—and with focused effort, cracking it is well within reach. With a clear grasp of the exam pattern, a balanced study plan, regular mock tests, and steady physical training, you can walk into the exam hall ready.",
          "Start by downloading the official syllabus, gathering quality study material, and setting up your daily schedule. The sooner you begin, the more time you'll have to practice—and practice is what separates the candidates who clear it from those who fall short."
        ]
      },
      {
        id: "frequently-asked-questions",
        title: "Frequently asked questions",
        paragraphs: [
          "What is the minimum qualification for SSC GD Constable?",
          "You need to have passed the Matriculation (Class 10) examination from a recognized board or university. No degree is required, which makes this one of the most accessible government exams.",
          "Is there negative marking in the SSC GD Constable exam?",
          "Yes. For every wrong answer in the Computer-Based Test, 0.25 marks are deducted. Each correct answer earns 2 marks, so it pays to answer carefully.",
          "What is the age limit for SSC GD Constable?",
          "The age limit is 18 to 23 years for General category candidates. Reserved categories receive relaxation—3 years for OBC, 5 years for SC/ST, and 3 years for ex-servicemen after deducting military service.",
          "What is the salary of an SSC GD Constable?",
          "The post falls under Pay Level 3 of the 7th Pay Commission, with a basic pay ranging from ₹21,700 to ₹69,100. After allowances, the in-hand salary is typically ₹30,000 to ₹35,000 per month, depending on the posting.",
          "Which forces can I be posted to after clearing SSC GD?",
          "Successful candidates can be posted to the BSF, CISF, CRPF, ITBP, SSB, Assam Rifles, or the Secretariat Security Force, depending on vacancies and your preferences.",
          "What are the physical requirements for SSC GD Constable?",
          "Male candidates generally need a height of 170 cm and a chest of 80 cm (unexpanded), while female candidates need a height of 157 cm. The PET requires male candidates to run 5 km in 24 minutes and female candidates to run 1.6 km in 8½ minutes, with relaxed standards for the Ladakh region."
        ]
      }
    ]
  },
  {
    slug: "ssc-mts-exam-guide-2026-syllabus-pattern",
    title: "SSC MTS Exam: Your Complete Guide to Crack It in 2026",
    description: "Looking for a stable central government job that you can apply for right after Class 10? The SSC MTS exam is one of the most accessible routes in. With posts spread across central government ministries and departments—and the bonus of strong job security, solid pay, and lifelong perks—it's no wonder lakhs of candidates apply each year. This guide walks you through everything you need to know: eligibility, exam pattern, syllabus, salary, and practical preparation tips. By the end, you'll have a clear plan to start your prep with confidence.",
    examSlug: "ssc-mts",
    examName: "SSC MTS",
    category: "SSC Exams",
    icon: "🧹",
    type: "info",
    metaTitle: "SSC MTS Exam Guide 2026: Pattern, Syllabus & Salary",
    metaDescription: "Everything you need to crack the SSC MTS exam—eligibility, pattern, syllabus, salary, and smart preparation tips. Start your government job journey today.",
    authorName: "Editorial Team",
    authorityBadge: "authority-badge.svg",
    publishDate: "June 30, 2026",
    readTime: "5 min read",
    quickAnswer: "The SSC MTS is a national-level exam run by the Staff Selection Commission to fill Group C posts like Multi-Tasking Staff and Havaldar across central government departments. You only need to have passed Class 10, and selection is based on a single computer-based test (plus a physical test for Havaldar roles).",
    sections: [
      {
        id: "what-is-the-ssc-mts-exam",
        title: "What is the SSC MTS exam?",
        paragraphs: [
          "The SSC MTS (Multi-Tasking Staff) exam is conducted by the Staff Selection Commission to recruit candidates for Group C, non-gazetted, non-ministerial posts in various central government departments and ministries.",
          "The exam fills two main categories of posts:",
          "Multi-Tasking Staff (MTS): Roles such as Peon, Daftary, Jamadar, Junior Gestetner Operator, Chowkidar, Safaiwala, and Mali.",
          "Havaldar: Posts in the Central Board of Indirect Taxes and Customs (CBIC) and the Central Bureau of Narcotics (CBN).",
          "These roles involve general support and routine office duties, but they come with the security, steady pay, and growth opportunities that make government jobs so appealing."
        ]
      },
      {
        id: "who-is-eligible-for-ssc-mts",
        title: "Who is eligible for SSC MTS?",
        paragraphs: [
          "Before you start prepping, make sure you tick the basic boxes.",
          "Educational qualification: You must have passed the Matriculation (Class 10) examination or its equivalent from a recognized board by the application closing date. That's it—no degree required.",
          "Age limit: The age requirement depends on the post:",
          "18–25 years: MTS posts",
          "18–27 years: Havaldar posts",
          "Age relaxation applies for reserved categories:",
          "OBC: 3 years",
          "SC/ST: 5 years",
          "PwD (Unreserved): 10 years",
          "PwD (OBC): 13 years",
          "PwD (SC/ST): 15 years",
          "Ex-Servicemen: 3 years (after deducting military service)",
          "Nationality: You must be a citizen of India, or fall under the other eligible categories specified by the Commission (such as citizens of Nepal or Bhutan)."
        ]
      },
      {
        id: "what-is-the-ssc-mts-exam-pattern",
        title: "What is the SSC MTS exam pattern?",
        paragraphs: [
          "The selection process centers on a single Computer-Based Test (Paper 1), conducted in two compulsory sessions. Missing either session leads to disqualification, so plan to sit through both.",
          "The exam is offered in 15 languages—including English, Hindi, and several regional languages—making it accessible to candidates across India.",
          "Session 1 has no negative marking, so attempt every question:"
        ],
        table: {
          headers: [
            "Subject",
            "Questions",
            "Marks"
          ],
          rows: [
            [
              "Numerical and Mathematical Ability",
              "20",
              "60"
            ],
            [
              "Reasoning Ability & Problem-Solving",
              "20",
              "60"
            ],
            [
              "Total",
              "40",
              "120"
            ]
          ]
        }
      },
      {
        id: "session-2",
        title: "Session 2",
        paragraphs: [
          "You'll have 45 minutes to complete this session.",
          "Session 2 carries negative marking—1 mark is deducted for each wrong answer, so answer carefully:"
        ],
        table: {
          headers: [
            "Subject",
            "Questions",
            "Marks"
          ],
          rows: [
            [
              "General Awareness",
              "25",
              "75"
            ],
            [
              "English Language & Comprehension",
              "25",
              "75"
            ],
            [
              "Total",
              "50",
              "150"
            ]
          ]
        }
      },
      {
        id: "physical-test-havaldar-posts-only",
        title: "Physical test (Havaldar posts only)",
        paragraphs: [
          "This session also runs for 45 minutes. In total, the exam has 90 questions worth 270 marks.",
          "If you're applying for Havaldar posts in CBIC or CBN, you'll also need to clear a Physical Efficiency Test (PET) and Physical Standard Test (PST):"
        ],
        table: {
          headers: [
            "Criteria",
            "Male",
            "Female"
          ],
          rows: [
            [
              "Walking (PET)",
              "1600 meters in 15 minutes",
              "1 kilometer in 20 minutes"
            ],
            [
              "Height (PST)",
              "157.5 cm",
              "152 cm"
            ],
            [
              "Chest (PST)",
              "81 cm fully expanded (min. 5 cm expansion)",
              "Not applicable"
            ],
            [
              "Weight (PST)",
              "Not applicable",
              "48 kg"
            ]
          ]
        }
      },
      {
        id: "passing-marks",
        title: "Passing marks",
        paragraphs: [
          "Height and weight standards are relaxable for Garhwalis, Assamese, Gorkhas, and members of Scheduled Tribes.",
          "To qualify, you'll need to hit these minimum percentages:",
          "Unreserved (UR): 30%",
          "OBC/EWS: 25%",
          "All other categories: 20%"
        ]
      },
      {
        id: "what-does-the-ssc-mts-syllabus-cover",
        title: "What does the SSC MTS syllabus cover?",
        paragraphs: [
          "The exam tests four core areas. Here's a quick overview of what to study:",
          "Numerical and Mathematical Ability: Number system, HCF & LCM, percentage, average, time and work, profit and loss, ratio and proportion, simple and compound interest, mixture and allegation, time-speed-distance, geometry, mensuration, trigonometry, algebra, and data interpretation.",
          "Reasoning Ability and Problem-Solving: Number and alphabetical series, coding-decoding, analogy, odd one out, syllogism, direction sense, ranking, blood relations, matrix, mirror images, and non-verbal reasoning like paper folding and figure counting.",
          "General Awareness: Indian Constitution, history and culture, economy and polity, current affairs, general science, awards and honours, and important financial awareness topics.",
          "English Language and Comprehension: Spotting errors, fill in the blanks, synonyms and antonyms, spelling correction, idioms and phrases, one-word substitution, sentence improvement, and reading comprehension.",
          "A useful tip: English and Reasoning are generally considered the more scoring and easier sections, so use them to build a strong foundation while you work on Maths and General Awareness."
        ]
      },
      {
        id: "ssc-mts-salary-and-posts",
        title: "SSC MTS salary and posts",
        paragraphs: [
          "The SSC MTS post falls under Pay Level 1 of the 7th Pay Commission, with a basic pay of ₹18,000 per month. Once you factor in allowances, the in-hand salary ranges from roughly ₹25,000 to ₹35,000, depending on your posting city.",
          "Here's how the in-hand salary varies by city category:"
        ],
        table: {
          headers: [
            "Posting Category",
            "Basic Pay",
            "In-Hand Salary"
          ],
          rows: [
            [
              "X Cities (Delhi, Mumbai)",
              "₹18,000",
              "₹32,000 – ₹35,000"
            ],
            [
              "Y Cities (Chennai, Kolkata)",
              "₹18,000",
              "₹28,000 – ₹31,000"
            ],
            [
              "Z Cities (Other Tier-3)",
              "₹18,000",
              "₹24,000 – ₹27,000"
            ]
          ]
        }
      },
      {
        id: "beyond-the-monthly-pay",
        title: "Beyond the monthly pay",
        paragraphs: [
          "On top of the basic pay, employees receive allowances like Dearness Allowance (DA), House Rent Allowance (HRA), and Transport Allowance (TA). Havaldar posts come with a slightly higher basic pay of ₹21,700 and an in-hand salary of around ₹28,000 to ₹40,000.",
          "Beyond the monthly pay, SSC MTS roles offer valuable long-term benefits:",
          "Pension and retirement perks, including provident fund and gratuity",
          "Healthcare coverage for you and your family",
          "Job stability with timely promotions and opportunities to sit departmental exams for higher posts"
        ]
      },
      {
        id: "how-to-prepare-for-the-ssc-mts-exam",
        title: "How to prepare for the SSC MTS exam",
        paragraphs: [
          "A clear plan beats random studying every time. Here's how to approach your prep:",
          "1. Know the syllabus and pattern inside out. Understanding exactly what's tested—and how the two sessions differ—helps you focus your energy where it counts. Remember that Session 1 has no negative marking, while Session 2 does.",
          "2. Build a balanced study schedule. Divide your time across all four subjects, giving extra attention to your weaker areas. Consistency matters more than long, exhausting sessions.",
          "3. Practice previous year papers. While direct questions rarely repeat, the question formats and logic often do. Solving past papers reveals the topics that show up year after year.",
          "4. Take regular mock tests. Mocks help you manage the 45-minute sessions, get comfortable with the computer-based format, and pinpoint your weak spots before exam day.",
          "5. Play the negative marking smartly. In Session 2, a wrong answer costs you a mark. Attempt questions you're confident about rather than guessing blindly. In Session 1, attempt everything—there's no penalty.",
          "6. Stay current with affairs. Read a daily newspaper or follow a reliable current affairs source to stay sharp on General Awareness and general science.",
          "7. Train for the physical test (Havaldar applicants). If you're targeting a Havaldar post, build the PET/PST into your routine early with regular walking practice."
        ]
      },
      {
        id: "your-next-step-toward-a-government-job",
        title: "Your next step toward a government job",
        paragraphs: [
          "The SSC MTS exam is one of the most achievable government job opportunities out there—and with focused effort, cracking it is well within reach. With a clear grasp of the exam pattern, a balanced study plan, and plenty of mock tests, you can walk into the exam hall ready.",
          "Start by downloading the official syllabus, gathering quality study material, and setting up your daily schedule. The sooner you begin, the more time you'll have to practice—and practice is what separates the candidates who clear it from those who fall short."
        ]
      },
      {
        id: "frequently-asked-questions",
        title: "Frequently asked questions",
        paragraphs: [
          "What is the minimum qualification for SSC MTS?",
          "You need to have passed the Matriculation (Class 10) examination or its equivalent from a recognized board. No degree is required, which makes this one of the most accessible government exams.",
          "Is there negative marking in SSC MTS?",
          "Yes, but only in Session 2, where 1 mark is deducted for each wrong answer. Session 1 has no negative marking, so you can attempt every question without risk.",
          "What is the age limit for SSC MTS?",
          "The age limit is 18–25 years for MTS posts and 18–27 years for Havaldar posts. Reserved categories receive relaxation—3 years for OBC, 5 years for SC/ST, and up to 15 years for PwD candidates.",
          "What is the salary for SSC MTS posts?",
          "The basic pay is ₹18,000 per month under Pay Level 1 of the 7th Pay Commission. After allowances, the in-hand salary ranges from ₹25,000 to ₹35,000, depending on your posting city.",
          "Is there a physical test in SSC MTS?",
          "A Physical Efficiency Test (PET) and Physical Standard Test (PST) apply only to Havaldar posts in CBIC and CBN. MTS posts do not require any physical test.",
          "Can I prepare for SSC MTS in two months?",
          "Yes. With the right plan, consistent practice, and regular mock tests, it's possible to crack the SSC MTS exam in two months. Just be sure to give extra time to the physical test if you're applying for Havaldar posts."
        ]
      }
    ]
  }
];

export const BLOGS: BlogArticle[] = [...staticBlogs];

export function getBlogBySlug(slug: string): BlogArticle | undefined {
  return BLOGS.find(b => b.slug === slug);
}

export function getBlogsByExam(examSlug: string): BlogArticle[] {
  return BLOGS.filter(b => b.examSlug === examSlug);
}
