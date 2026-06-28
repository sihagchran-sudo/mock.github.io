export interface FreeResource {
  id: string;
  title: string;
  description?: string;
  url: string;
  category: string; // e.g. "SSC Exams", "HSSC Exams", "NCERT Books", "Notes", "Official Syllabus"
  fileSize?: string;
  source?: string;
  isApproved: boolean;
  createdAt?: string;
}

export const staticResources: FreeResource[] = [
  {
    id: "res-ncert-maths-10-en",
    title: "NCERT Class 10 Mathematics Textbook (English)",
    description: "Official NCERT Class 10 Maths book covering Arithmetic Progressions, Quadratic Equations, Trigonometry, and Geometry.",
    url: "https://ncert.nic.in/textbook/pdf/jemh1dd.pdf",
    category: "NCERT Books",
    fileSize: "8.5 MB",
    source: "NCERT Official",
    isApproved: true,
  },
  {
    id: "res-ncert-maths-10-hi",
    title: "NCERT Class 10 Mathematics Textbook (Hindi)",
    description: "आधिकारिक एनसीईआरटी कक्षा 10 गणित पाठ्यपुस्तक - वास्तविक संख्याएँ, बहुपद, द्विघात समीकरण, और त्रिकोणमिति।",
    url: "https://ncert.nic.in/textbook/pdf/jhmh1dd.pdf",
    category: "NCERT Books",
    fileSize: "9.2 MB",
    source: "NCERT Official",
    isApproved: true,
  },
  {
    id: "res-const-india",
    title: "The Constitution of India (Pocket Edition)",
    description: "Official text of the Constitution of India, including all amendments up to 2026, published by the Legislative Department.",
    url: "https://sansad.in/uploads/Constitution_of_India_3ad98711ba.pdf", // Active parliament portal PDF
    category: "Notes",
    fileSize: "3.4 MB",
    source: "Legislative Dept",
    isApproved: true,
  },
  {
    id: "res-ssc-cgl-syllabus",
    title: "SSC CGL Official Syllabus & Exam Scheme",
    description: "Official scheme of examination, tier-wise syllabus, and marking guidelines for the SSC CGL exam.",
    url: "https://ssc.gov.in", // Official portal reference
    category: "Official Syllabus",
    fileSize: "1.5 MB",
    source: "SSC Official",
    isApproved: true,
  },
  {
    id: "res-hssc-police-notification",
    title: "HSSC Haryana Police Constable Notification 2026",
    description: "Official HSSC recruitment notification detailing 5,500 vacancies, PMT/PST criteria, and syllabus breakdown.",
    url: "https://hssc.gov.in",
    category: "HSSC Exams",
    fileSize: "2.1 MB",
    source: "HSSC Official",
    isApproved: true,
  },
  {
    id: "res-maths-formula-sheet",
    title: "Quantitative Aptitude Formula Sheet",
    description: "Quick revision formula sheet covering Algebra, Trigonometry, Mensuration, and Arithmetic shortcuts for competitive exams.",
    url: "/downloads/Math_Formulas_Revision.pdf",
    category: "Notes",
    fileSize: "1.1 MB",
    source: "MockMaster Curated",
    isApproved: true,
  },
  {
    id: "res-english-grammar-guide",
    title: "English Grammar & Vocabulary Capsule",
    description: "Handy compilation of essential grammar rules, subject-verb agreement guides, and high-frequency antonyms/synonyms.",
    url: "/downloads/English_Grammar_Capsule.pdf",
    category: "Notes",
    fileSize: "1.8 MB",
    source: "MockMaster Curated",
    isApproved: true,
  },
  {
    id: "res-hssc-cet-syllabus",
    title: "HSSC CET Group C & D Official Syllabus",
    description: "Official HSSC Common Eligibility Test (CET) syllabus detailing section-wise weightage and Haryana GK guidelines.",
    url: "https://hssc.gov.in",
    category: "HSSC Exams",
    fileSize: "1.2 MB",
    source: "HSSC Official",
    isApproved: true,
  }
];

export const FREE_RESOURCES: FreeResource[] = [...staticResources];
