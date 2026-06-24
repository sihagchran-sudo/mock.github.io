import { HARYANA_POLICE_CUSTOM_MOCKS } from './haryanaPoliceMocksData';

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  examCount: number;
}

export interface Exam {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description: string;
  popular?: boolean;
}

export type TestType = 'FULL' | 'SUBJECT' | 'CHAPTER' | 'SECTIONAL';

export interface Test {
  id: string;
  title: string;
  duration: number; // in minutes
  totalMarks: number;
  testType: TestType;
  examId: string;
  questionCount: number;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sectionName: string;
  testId: string;
}

export interface UserResponse {
  questionId: string;
  selectedIndex: number; // -1 if unanswered
  isMarkedForReview: boolean;
}

export interface SectionTime {
  [sectionName: string]: number; // time spent in seconds
}

export interface Analytics {
  id: string;
  attemptId: string;
  sectionTimeTaken: SectionTime;
  weakChapters: string[];
  strongChapters: string[];
}

export interface TestAttempt {
  id: string;
  userId: string;
  testId: string;
  score: number;
  accuracy: number; // percentage
  percentile: number;
  status: 'IN_PROGRESS' | 'COMPLETED';
  startedAt: string;
  submittedAt?: string;
  responses: UserResponse[];
  analytics?: Analytics;
}

// 1. Categories
export const CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Banking & Insurance', slug: 'banking', icon: '🏛️', examCount: 15 },
  { id: 'cat-2', name: 'SSC Exams', slug: 'ssc', icon: '📝', examCount: 22 },
  { id: 'cat-3', name: 'UPSC & Civil Services', slug: 'upsc', icon: '🎖️', examCount: 8 },
  { id: 'cat-4', name: 'State PSC Exams', slug: 'state-psc', icon: '🗺️', examCount: 34 },
  { id: 'cat-5', name: 'Railways Exams', slug: 'railways', icon: '🚆', examCount: 12 },
];

// 2. Exams
export const EXAMS: Exam[] = [
  // Banking & Insurance
  { id: 'exam-sbi-po', name: 'SBI PO', slug: 'sbi-po', categoryId: 'cat-1', description: 'State Bank of India Probationary Officer Exam', popular: true },
  { id: 'exam-sbi-clerk', name: 'SBI Clerk', slug: 'sbi-clerk', categoryId: 'cat-1', description: 'State Bank of India Junior Associate Exam', popular: true },
  { id: 'exam-ibps-po', name: 'IBPS PO', slug: 'ibps-po', categoryId: 'cat-1', description: 'Institute of Banking Personnel Selection PO Exam', popular: true },
  { id: 'exam-ibps-clerk', name: 'IBPS Clerk', slug: 'ibps-clerk', categoryId: 'cat-1', description: 'Institute of Banking Personnel Selection Clerk Exam', popular: false },
  { id: 'exam-ibps-rrb-po', name: 'IBPS RRB PO', slug: 'ibps-rrb-po', categoryId: 'cat-1', description: 'Officer Scale-I Regional Rural Banks Exam', popular: true },
  { id: 'exam-ibps-rrb-clerk', name: 'IBPS RRB Clerk', slug: 'ibps-rrb-clerk', categoryId: 'cat-1', description: 'Office Assistant Regional Rural Banks Exam', popular: false },
  { id: 'exam-rbi-grade-b', name: 'RBI Grade B Officer', slug: 'rbi-grade-b', categoryId: 'cat-1', description: 'Reserve Bank of India Grade B Officers Exam', popular: true },
  { id: 'exam-rbi-assistant', name: 'RBI Assistant', slug: 'rbi-assistant', categoryId: 'cat-1', description: 'Reserve Bank of India Assistants Exam', popular: false },

  // SSC Exams
  { id: 'exam-ssc-cgl', name: 'SSC CGL', slug: 'ssc-cgl', categoryId: 'cat-2', description: 'Staff Selection Commission Combined Graduate Level', popular: true },
  { id: 'exam-ssc-chsl', name: 'SSC CHSL', slug: 'ssc-chsl', categoryId: 'cat-2', description: 'Staff Selection Commission Combined Higher Secondary Level', popular: false },
  { id: 'exam-ssc-mts', name: 'SSC MTS', slug: 'ssc-mts', categoryId: 'cat-2', description: 'Staff Selection Commission Multi Tasking Staff Exam', popular: true },
  { id: 'exam-ssc-gd', name: 'SSC GD Constable', slug: 'ssc-gd-constable', categoryId: 'cat-2', description: 'Staff Selection Commission General Duty Constable Exam', popular: true },
  { id: 'exam-ssc-cpo', name: 'SSC CPO', slug: 'ssc-cpo', categoryId: 'cat-2', description: 'Staff Selection Commission Central Police Organisation Exam', popular: false },
  { id: 'exam-ssc-steno', name: 'SSC Stenographer', slug: 'ssc-stenographer', categoryId: 'cat-2', description: 'Staff Selection Commission Grade C & D Stenographer', popular: false },

  // UPSC & Civil Services
  { id: 'exam-upsc-cse', name: 'UPSC Civil Services (CSE)', slug: 'upsc-cse', categoryId: 'cat-3', description: 'Union Public Service Commission Civil Services Prelims', popular: true },
  { id: 'exam-uppsc-pcs', name: 'UPPSC PCS', slug: 'uppsc-pcs', categoryId: 'cat-3', description: 'Uttar Pradesh Public Service Commission State Services', popular: true },
  { id: 'exam-bpsc', name: 'BPSC Civil Services', slug: 'bpsc', categoryId: 'cat-3', description: 'Bihar Public Service Commission State Services Exam', popular: false },
  { id: 'exam-hpsc-hcs', name: 'HPSC HCS', slug: 'hpsc-hcs', categoryId: 'cat-3', description: 'Haryana Public Service Commission Haryana Civil Services', popular: true },

  // State PSC & Police Exams
  { id: 'exam-hssc-police', name: 'HSSC Haryana Police Constable', slug: 'hssc-haryana-police', categoryId: 'cat-4', description: 'Haryana Staff Selection Commission Police Constable Exam', popular: true },
  { id: 'exam-hssc-cet', name: 'HSSC CET (Group C & D)', slug: 'hssc-cet', categoryId: 'cat-4', description: 'Haryana CET General Common Entrance Test', popular: true },
  { id: 'exam-up-police-constable', name: 'UP Police Constable', slug: 'up-police-constable', categoryId: 'cat-4', description: 'Uttar Pradesh Police Constable Recruitment Exam', popular: true },
  { id: 'exam-up-police-si', name: 'UP Police SI', slug: 'up-police-si', categoryId: 'cat-4', description: 'Uttar Pradesh Police Sub Inspector Exam', popular: false },
  { id: 'exam-delhi-police', name: 'Delhi Police Constable', slug: 'delhi-police-constable', categoryId: 'cat-4', description: 'Delhi Police Constable Executive Recruitment Exam', popular: true },
  { id: 'exam-bihar-police', name: 'Bihar Police Constable', slug: 'bihar-police-constable', categoryId: 'cat-4', description: 'Bihar Police Constable Recruitment Examination', popular: false },
  { id: 'exam-rajasthan-police', name: 'Rajasthan Police Constable', slug: 'rajasthan-police-constable', categoryId: 'cat-4', description: 'Rajasthan Police Constable Recruitment Exam', popular: false },
  { id: 'exam-ctet', name: 'CTET Paper 1 & 2', slug: 'ctet', categoryId: 'cat-4', description: 'Central Teacher Eligibility Test Prep Mock Exams', popular: true },
  { id: 'exam-htet', name: 'HTET Haryana Teacher', slug: 'htet', categoryId: 'cat-4', description: 'Haryana Teacher Eligibility Test Recruitment Exam', popular: false },

  // Railways Exams
  { id: 'exam-rrb-ntpc', name: 'RRB NTPC', slug: 'rrb-ntpc', categoryId: 'cat-5', description: 'Railway Recruitment Board Non-Technical Popular Categories', popular: true },
  { id: 'exam-rrb-group-d', name: 'RRB Group D', slug: 'rrb-group-d', categoryId: 'cat-5', description: 'Railway Recruitment Board Group D Level 1 Tracks', popular: true },
  { id: 'exam-rrb-alp', name: 'RRB ALP (Loco Pilot)', slug: 'rrb-alp', categoryId: 'cat-5', description: 'Railway Recruitment Board Assistant Loco Pilot Exam', popular: false },
  { id: 'exam-rpf-si', name: 'RPF SI & Constable', slug: 'rpf-si', categoryId: 'cat-5', description: 'Railway Protection Force Sub Inspector Recruitment Exam', popular: false },
];

// 3. Base Custom Tests
const BASE_MOCK_TESTS: Test[] = [
  // SBI PO Custom Tests
  { id: 'test-sbi-po-full-1', title: 'SBI PO Prelims - Full Mock Test 1', duration: 60, totalMarks: 100, testType: 'FULL', examId: 'exam-sbi-po', questionCount: 10 },
  { id: 'test-sbi-po-full-2', title: 'SBI PO Prelims - Full Mock Test 2', duration: 60, totalMarks: 100, testType: 'FULL', examId: 'exam-sbi-po', questionCount: 10 },
  { id: 'test-sbi-po-sub-quant', title: 'Quantitative Aptitude - Sectional Mock', duration: 20, totalMarks: 35, testType: 'SUBJECT', examId: 'exam-sbi-po', questionCount: 5 },
  { id: 'test-sbi-po-chap-si', title: 'Chapter Test: Simple & Compound Interest', duration: 15, totalMarks: 15, testType: 'CHAPTER', examId: 'exam-sbi-po', questionCount: 5 },
  { id: 'test-sbi-po-sec-reasoning', title: 'Reasoning Ability - Sectional Mock', duration: 20, totalMarks: 35, testType: 'SECTIONAL', examId: 'exam-sbi-po', questionCount: 5 },

  // SSC CGL Custom Tests
  { id: 'test-ssc-cgl-full-1', title: 'SSC CGL Tier I - Full Mock Test 1', duration: 60, totalMarks: 200, testType: 'FULL', examId: 'exam-ssc-cgl', questionCount: 10 },
  { id: 'test-ssc-cgl-sub-english', title: 'English Comprehension - Subject Mock', duration: 15, totalMarks: 50, testType: 'SUBJECT', examId: 'exam-ssc-cgl', questionCount: 5 },
  { id: 'test-ssc-cgl-chap-geo', title: 'Chapter Test: Geometry & Mensuration', duration: 15, totalMarks: 20, testType: 'CHAPTER', examId: 'exam-ssc-cgl', questionCount: 5 },

  // HSSC Haryana Police Custom Tests
  { id: 'test-hssc-police-full-1', title: 'HSSC Haryana Police Constable - Full Mock Test 1', duration: 90, totalMarks: 100, testType: 'FULL', examId: 'exam-hssc-police', questionCount: 100 },
  { id: 'test-hssc-police-full-2', title: 'HSSC Haryana Police Constable - Full Mock Test 2', duration: 90, totalMarks: 100, testType: 'FULL', examId: 'exam-hssc-police', questionCount: 100 },
  { id: 'test-hssc-police-full-3', title: 'HSSC Haryana Police Constable - Full Mock Test 3', duration: 90, totalMarks: 100, testType: 'FULL', examId: 'exam-hssc-police', questionCount: 100 },
  { id: 'test-hssc-police-full-4', title: 'HSSC Haryana Police Constable - Full Mock Test 4', duration: 90, totalMarks: 100, testType: 'FULL', examId: 'exam-hssc-police', questionCount: 100, difficulty: 'Hard' },
  { id: 'test-hssc-police-full-5', title: 'HSSC Haryana Police Constable - Full Mock Test 5', duration: 90, totalMarks: 100, testType: 'FULL', examId: 'exam-hssc-police', questionCount: 100, difficulty: 'Hard' },
  { id: 'test-hssc-police-full-6', title: 'HSSC Haryana Police Constable - Full Mock Test 6', duration: 90, totalMarks: 100, testType: 'FULL', examId: 'exam-hssc-police', questionCount: 100, difficulty: 'Hard' },
  { id: 'test-hssc-police-full-7', title: 'HSSC Haryana Police Constable - Full Mock Test 7', duration: 90, totalMarks: 100, testType: 'FULL', examId: 'exam-hssc-police', questionCount: 100, difficulty: 'Hard' },
  { id: 'test-hssc-police-sub-haryana-gk-1', title: 'Subject Test: Haryana GK - Mock 1 (हरियाणा सामान्य ज्ञान)', duration: 25, totalMarks: 25, testType: 'SUBJECT', examId: 'exam-hssc-police', questionCount: 25, difficulty: 'Medium' },
  { id: 'test-hssc-police-sub-haryana-gk-2', title: 'Subject Test: Haryana GK - Mock 2 (हरियाणा सामान्य ज्ञान)', duration: 25, totalMarks: 25, testType: 'SUBJECT', examId: 'exam-hssc-police', questionCount: 25, difficulty: 'Hard' },
  { id: 'test-hssc-police-sub-agriculture-1', title: 'Subject Test: Agriculture & Husbandry - Mock 1 (कृषि एवं पशुपालन)', duration: 25, totalMarks: 25, testType: 'SUBJECT', examId: 'exam-hssc-police', questionCount: 25, difficulty: 'Medium' },
  { id: 'test-hssc-police-sub-agriculture-2', title: 'Subject Test: Agriculture & Husbandry - Mock 2 (कृषि एवं पशुपालन)', duration: 25, totalMarks: 25, testType: 'SUBJECT', examId: 'exam-hssc-police', questionCount: 25, difficulty: 'Hard' },
  { id: 'test-hssc-police-sub-computer-1', title: 'Subject Test: Computer Knowledge - Mock 1 (कंप्यूटर ज्ञान)', duration: 25, totalMarks: 25, testType: 'SUBJECT', examId: 'exam-hssc-police', questionCount: 25, difficulty: 'Medium' },
  { id: 'test-hssc-police-sub-computer-2', title: 'Subject Test: Computer Knowledge - Mock 2 (कंप्यूटर ज्ञान)', duration: 25, totalMarks: 25, testType: 'SUBJECT', examId: 'exam-hssc-police', questionCount: 25, difficulty: 'Hard' },
  { id: 'test-hssc-police-sub-general-studies-1', title: 'Subject Test: General Studies & Science - Mock 1 (सामान्य अध्ययन एवं विज्ञान)', duration: 25, totalMarks: 25, testType: 'SUBJECT', examId: 'exam-hssc-police', questionCount: 25, difficulty: 'Medium' },
  { id: 'test-hssc-police-sub-general-studies-2', title: 'Subject Test: General Studies & Science - Mock 2 (सामान्य अध्ययन एवं विज्ञान)', duration: 25, totalMarks: 25, testType: 'SUBJECT', examId: 'exam-hssc-police', questionCount: 25, difficulty: 'Hard' },
  { id: 'test-hssc-police-sub-math-reasoning-1', title: 'Subject Test: Numerical Ability & Reasoning - Mock 1 (गणित एवं तर्कशक्ति)', duration: 25, totalMarks: 25, testType: 'SUBJECT', examId: 'exam-hssc-police', questionCount: 25, difficulty: 'Medium' },
  { id: 'test-hssc-police-sub-math-reasoning-2', title: 'Subject Test: Numerical Ability & Reasoning - Mock 2 (गणित एवं तर्कशक्ति)', duration: 25, totalMarks: 25, testType: 'SUBJECT', examId: 'exam-hssc-police', questionCount: 25, difficulty: 'Hard' },
  { id: 'test-hssc-police-sec-gk', title: 'Haryana General Knowledge - Sectional Mock', duration: 20, totalMarks: 25, testType: 'SECTIONAL', examId: 'exam-hssc-police', questionCount: 5 },
  { id: 'test-hssc-police-chap-history', title: 'Chapter Test: History of Haryana (हरियाणा का इतिहास)', duration: 15, totalMarks: 15, testType: 'CHAPTER', examId: 'exam-hssc-police', questionCount: 15, difficulty: 'Medium' },
  { id: 'test-hssc-police-chap-geography', title: 'Chapter Test: Geography & Environment (हरियाणा का भूगोल एवं पर्यावरण)', duration: 15, totalMarks: 15, testType: 'CHAPTER', examId: 'exam-hssc-police', questionCount: 15, difficulty: 'Hard' },
  { id: 'test-hssc-police-chap-polity', title: 'Chapter Test: Polity & Panchayati Raj (राजव्यवस्था एवं पंचायती राज)', duration: 15, totalMarks: 15, testType: 'CHAPTER', examId: 'exam-hssc-police', questionCount: 15, difficulty: 'Medium' },
  { id: 'test-hssc-police-chap-culture', title: 'Chapter Test: Art, Culture & Heritage (कला, संस्कृति एवं विरासत)', duration: 15, totalMarks: 15, testType: 'CHAPTER', examId: 'exam-hssc-police', questionCount: 15, difficulty: 'Hard' },
  { id: 'test-hssc-police-chap-economy', title: 'Chapter Test: Economy, Agri & Livestock (अर्थव्यवस्था, कृषि एवं पशुपालन)', duration: 15, totalMarks: 15, testType: 'CHAPTER', examId: 'exam-hssc-police', questionCount: 15, difficulty: 'Medium' },
];

// Dynamically generate mock test suites for all 31 exams
export const MOCK_TESTS: Test[] = [...BASE_MOCK_TESTS];

// Fill in standard mocks for every exam that doesn't have custom ones
EXAMS.forEach(exam => {
  const hasTests = BASE_MOCK_TESTS.some(t => t.examId === exam.id);
  if (!hasTests) {
    let duration = 90;
    let totalMarks = 105;
    let questionCount = 100;

    if (exam.slug === 'ssc-chsl' || exam.slug === 'ssc-cpo') {
      duration = 60;
      totalMarks = 200;
      questionCount = 100;
    } else if (exam.slug === 'up-police-constable') {
      duration = 120;
      totalMarks = 300;
      questionCount = 150;
    } else if (exam.slug === 'ssc-mts') {
      duration = 90;
      totalMarks = 270;
      questionCount = 90;
    } else if (['sbi-clerk', 'ibps-clerk', 'ibps-po', 'ibps-rrb-po', 'ibps-rrb-clerk', 'rbi-assistant'].includes(exam.slug)) {
      duration = 60;
      totalMarks = 100;
      questionCount = 100;
    } else if (exam.slug === 'rbi-grade-b') {
      duration = 120;
      totalMarks = 200;
      questionCount = 200;
    } else if (['upsc-cse', 'uppsc-pcs', 'bpsc', 'hpsc-hcs'].includes(exam.slug)) {
      duration = 120;
      totalMarks = 200;
      questionCount = 100;
    } else if (exam.slug === 'rrb-ntpc' || exam.slug === 'rrb-group-d' || exam.slug === 'rrb-alp') {
      duration = 90;
      totalMarks = 100;
      questionCount = 100;
    } else if (exam.slug === 'ctet' || exam.slug === 'htet') {
      duration = 150;
      totalMarks = 150;
      questionCount = 150;
    }

    MOCK_TESTS.push(
      {
        id: `test-${exam.slug}-full-1`,
        title: `${exam.name} - Full Mock Test 1`,
        duration,
        totalMarks,
        testType: 'FULL',
        examId: exam.id,
        questionCount
      },
      {
        id: `test-${exam.slug}-sub-gk`,
        title: `${exam.name} - General Studies Sectional Mock`,
        duration: Math.round(duration * 0.25) || 15,
        totalMarks: Math.round(totalMarks * 0.25) || 25,
        testType: 'SECTIONAL',
        examId: exam.id,
        questionCount: Math.round(questionCount * 0.25) || 25
      },
      {
        id: `test-${exam.slug}-chap-quant`,
        title: `${exam.name} - Quant Chapter Practice Test`,
        duration: 15,
        totalMarks: 15,
        testType: 'CHAPTER',
        examId: exam.id,
        questionCount: 15
      }
    );
  }
});

// 4. Questions (Standard 10 questions per full mock, 5 per other)
export const MOCK_QUESTIONS: Record<string, Question[]> = {
  'test-sbi-po-full-1': [
    {
      id: 'q-sbi-1',
      text: 'A sum of money invested at compound interest doubles itself in 5 years. In how many years will it become 8 times itself?',
      options: ['10 years', '15 years', '20 years', '25 years'],
      correctIndex: 1, // 15 years
      explanation: 'Let principal be P. It becomes 2P in 5 years. For it to become 8P (which is 2^3 P), it will take 3 * 5 = 15 years.',
      sectionName: 'Quantitative Aptitude',
      testId: 'test-sbi-po-full-1',
    },
    {
      id: 'q-sbi-2',
      text: 'A and B together can complete a piece of work in 12 days. A alone can complete it in 20 days. In how many days can B alone complete it?',
      options: ['25 days', '30 days', '35 days', '40 days'],
      correctIndex: 1, // 30 days
      explanation: 'Work rate of (A+B) = 1/12. Work rate of A = 1/20. B\'s work rate = 1/12 - 1/20 = (5-3)/60 = 2/60 = 1/30. Thus, B takes 30 days.',
      sectionName: 'Quantitative Aptitude',
      testId: 'test-sbi-po-full-1',
    },
    {
      id: 'q-sbi-3',
      text: 'In a certain code language, "TRUST" is written as "USVTV". How is "HONOR" written in that code?',
      options: ['IPOPS', 'IPNPS', 'IPNPU', 'IPNQS'],
      correctIndex: 1, // IPNPS
      explanation: 'Each letter is shifted by +1 (T->U, R->S, U->V, S->T, T->U). Applying the same to HONOR gives IPNPS.',
      sectionName: 'Reasoning Ability',
      testId: 'test-sbi-po-full-1',
    },
    {
      id: 'q-sbi-4',
      text: 'Read the statement: "Only a few circles are squares. No square is a triangle." Choose the logical conclusion.',
      options: [
        'All circles are triangles is a possibility',
        'Some circles are not triangles',
        'Some squares are circles',
        'No circle is a triangle'
      ],
      correctIndex: 2, // Some squares are circles
      explanation: 'Since "Only a few circles are squares", it implies some circles are squares, which also means some squares are circles.',
      sectionName: 'Reasoning Ability',
      testId: 'test-sbi-po-full-1',
    },
    {
      id: 'q-sbi-5',
      text: 'Identify the grammatically correct sentence from the following options.',
      options: [
        'Neither of the students have submitted their assignment.',
        'Neither of the students has submitted his assignment.',
        'Neither of the student have submitted his assignment.',
        'Neither of the students has submitted their assignment.'
      ],
      correctIndex: 1, // Has submitted his
      explanation: '"Neither" is singular, so it takes a singular verb ("has") and singular pronoun ("his").',
      sectionName: 'English Language',
      testId: 'test-sbi-po-full-1',
    },
    {
      id: 'q-sbi-6',
      text: 'Find the odd one out from the following number series: 2, 9, 28, 65, 126, 216, 344',
      options: ['28', '65', '126', '216'],
      correctIndex: 3, // 216
      explanation: 'The pattern is n^3 + 1. 1^3+1=2, 2^3+1=9, 3^3+1=28, 4^3+1=65, 5^3+1=126, 6^3+1=217 (not 216), 7^3+1=344. So 216 is wrong.',
      sectionName: 'Quantitative Aptitude',
      testId: 'test-sbi-po-full-1',
    },
    {
      id: 'q-sbi-7',
      text: 'Point A is 5m North of Point B. Point C is 10m East of Point B. Point D is 5m South of Point C. What is the shortest distance between A and D?',
      options: ['10m', '10.5m', '14.14m', '15m'],
      correctIndex: 2, // 14.14m
      explanation: 'Shortest distance = sqrt((vertical distance)^2 + (horizontal distance)^2). Vertical distance = 5m (North) + 5m (South) = 10m. Horizontal = 10m. distance = sqrt(100+100) = sqrt(200) = 14.14m.',
      sectionName: 'Reasoning Ability',
      testId: 'test-sbi-po-full-1',
    },
    {
      id: 'q-sbi-8',
      text: 'Choose the word that is most nearly OPPOSITE in meaning to: EPHEMERAL',
      options: ['Transient', 'Eternal', 'Fleeting', 'Ethereal'],
      correctIndex: 1, // Eternal
      explanation: 'Ephemeral means lasting for a very short time. Its opposite is Eternal (lasting forever).',
      sectionName: 'English Language',
      testId: 'test-sbi-po-full-1',
    },
    {
      id: 'q-sbi-9',
      text: 'The average weight of 8 persons increases by 2.5 kg when a new person comes in place of one of them weighing 65 kg. What is the weight of the new person?',
      options: ['70 kg', '75 kg', '80 kg', '85 kg'],
      correctIndex: 3, // 85 kg
      explanation: 'Total weight increase = 8 * 2.5 = 20 kg. Weight of new person = Weight of replaced person + increase = 65 + 20 = 85 kg.',
      sectionName: 'Quantitative Aptitude',
      testId: 'test-sbi-po-full-1',
    },
    {
      id: 'q-sbi-10',
      text: 'Statements: "All mangoes are fruits. All fruits are healthy." Conclusion I: All mangoes are healthy. Conclusion II: Some healthy things are mangoes.',
      options: ['Only I follows', 'Only II follows', 'Both I and II follow', 'Neither I nor II follows'],
      correctIndex: 2, // Both follow
      explanation: 'Since all mangoes are fruits and all fruits are healthy, all mangoes are healthy (I follows). Since all mangoes are healthy, at least some healthy things are mangoes (II follows).',
      sectionName: 'Reasoning Ability',
      testId: 'test-sbi-po-full-1',
    }
  ],
  'test-hssc-police-full-1': [
    {
      id: 'q-hssc-1',
      text: 'पंजाब पुनर्गठन अधिनियम, 1966 के तहत हरियाणा राज्य के गठन के लिए किस आयोग की सिफारिश की गई थी?',
      options: ['फजल अली आयोग', 'जे.सी. शाह आयोग', 'धर आयोग', 'कोठारी आयोग'],
      correctIndex: 1,
      explanation: "अप्रैल 1966 में न्यायमूर्ति जे.सी. शाह की अध्यक्षता में 'शाह आयोग' (जे.सी. शाह, एस. दत्त, और एम.एम. फिलिप) का गठन किया गया था। इसी आयोग की रिपोर्ट के आधार पर पंजाब पुनर्गठन अधिनियम पारित हुआ और 1 नवंबर 1966 को हरियाणा भारत का 17वां राज्य बना।",
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-2',
      text: 'हरियाणा के पंचकूला जिले में स्थित मोरनी पहाड़ियों (Morni Hills) की सबसे ऊँची चोटी कौन सी है?',
      options: ['करोह चोटी', 'ढोसी पहाड़ी', 'तोशाम पहाड़ी', 'कालेसर चोटी'],
      correctIndex: 0,
      explanation: 'करोह (Karoh) चोटी हरियाणा का सबसे ऊँचा बिंदु है। यह पंचकूला जिले में शिवालिक पर्वतमाला की मोरनी पहाड़ियों में स्थित है और इसकी समुद्र तल से ऊंचाई लगभग 1,467 मीटर (4,813 फीट) है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-3',
      text: "सिंधु घाटी सभ्यता का सबसे बड़ा ज्ञात स्थल 'राखीगढ़ी' हरियाणा के किस जिले में स्थित है?",
      options: ['फतेहाबाद', 'सिरसा', 'जींद', 'हिसार'],
      correctIndex: 3,
      explanation: "राखीगढ़ी हरियाणा के हिसार जिले में स्थित है। पुरातात्विक खुदाई में यह हड़प्पा सभ्यता का सबसे बड़ा शहर साबित हुआ है (मोहनजोदड़ो से भी बड़ा)। यहाँ से अन्नागार, कब्रिस्तान और हड़प्पा लिपि की मुहरें प्राप्त हुई हैं।",
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-4',
      text: 'हरियाणा के पहले मुख्यमंत्री पंडित भगवत दयाल शर्मा का संबंध किस राजनीतिक दल से था?',
      options: ['भारतीय जनता पार्टी', 'भारतीय राष्ट्रीय कांग्रेस', 'विशाल हरियाणा पार्टी', 'हरियाणा विकास पार्टी'],
      correctIndex: 1,
      explanation: 'पंडित भगवत दयाल शर्मा (जिन्हें पंडित जी भी कहा जाता है) 1 नवंबर 1966 को हरियाणा के पहले मुख्यमंत्री बने। वे भारतीय राष्ट्रीय कांग्रेस (INC) पार्टी से संबंधित थे।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-5',
      text: "हरियाणा पंचायती राज अधिनियम, 1994 का कौन सा अध्याय 'जिला परिषद' (Zila Parishad) के गठन से संबंधित है?",
      options: ['अध्याय 10', 'अध्याय 11', 'अध्याय 13', 'अध्याय 15'],
      correctIndex: 2,
      explanation: "हरियाणा पंचायती राज अधिनियम 1994 के अध्याय 13 (Chapter XIII) में जिला परिषद के गठन, उसकी संरचना और सदस्यों के चुनाव से संबंधित प्रावधान दिए गए हैं। HSSC पुलिस परीक्षा में पंचायती राज से सीधे धाराएं और अध्याय पूछे जाते हैं।",
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-6',
      text: "पशुपालन विज्ञान में, विश्व प्रसिद्ध 'मुर्रा' भैंस का औसत गर्भकाल (Gestation Period) लगभग कितने दिनों का होता है?",
      options: ['280-285 दिन', '310-315 दिन', '340-345 दिन', '150-155 दिन'],
      correctIndex: 1,
      explanation: "भैंस (विशेषकर मुर्रा नस्ल) का औसत गर्भकाल लगभग 310 दिन (10 महीने और 10 दिन) का होता है। तुलना के लिए, गाय का गर्भकाल लगभग 280-285 दिन होता है। मुर्रा भैंस को हरियाणा में 'काला सोना' भी कहा जाता है।",
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-7',
      text: "गेहूं की फसल में लगने वाला 'करनाल बंट' (Karnal Bunt) रोग किस रोगजनक (Pathogen) के कारण होता है?",
      options: ['टिल्लेटिया इंडिका (Tilletia indica)', 'पक्सिनिया ग्रैमिनिस', 'उसटीलागो ट्रीटीसाई', 'पायरिकुलेरिया ओराइजी'],
      correctIndex: 0,
      explanation: "करनाल बंट गेहूं का एक कवक (फंगल) रोग है जो Tilletia indica (टिल्लेटिया इंडिका) नामक कवक के कारण होता है। इस बीमारी की खोज पहली बार 1931 में करनाल, हरियाणा में हुई थी। इससे गेहूं के दानों से सड़ी हुई मछली जैसी दुर्गंध आती है।",
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-8',
      text: "मवेशियों में होने वाला 'ब्रूसेलोसिस' (Brucellosis) रोग मुख्य रूप से पशुओं में क्या प्रभाव डालता है?",
      options: ['खुर और मुंह में छाले', 'फेफड़ों में संक्रमण', 'गर्भावस्था के अंतिम चरण में गर्भपात (Abortion)', 'थनों में सूजन (Mastitis)'],
      correctIndex: 2,
      explanation: "ब्रूसेलोसिस एक संक्रामक बैक्टीरियल बीमारी है जो Brucella abortus के कारण होती है। इसे 'बैंग्स डिजीज' भी कहते हैं। डेयरी गायों और भैंसों में इसका मुख्य लक्षण गर्भावस्था के अंतिम तिमाही (Last trimester) में गर्भपात होना है।",
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-9',
      text: "मानव शरीर में किस विटामिन की भारी कमी से 'स्कर्वी' (Scurvy) रोग होता है, जिससे मसूड़ों से खून आने लगता है?",
      options: ['विटामिन A', 'विटामिन B12', 'विटामिन C', 'विटामिन D'],
      correctIndex: 2,
      explanation: 'स्कर्वी रोग विटामिन C (एस्कॉर्बिक एसिड) की कमी से होता है। इसके लक्षणों में थकान, मसूड़ों से खून आना और घावों का देरी से भरना शामिल है। खट्टे फल (आंवला, नींबू, संतरा) इसके सर्वोत्तम स्रोत हैं।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-10',
      text: "रसायन विज्ञान में निम्नलिखित में से किसे 'लाफिंग गैस' (Laughing Gas) के रूप में जाना जाता है?",
      options: ['नाइट्रिक ऑक्साइड', 'नाइट्रोजन डाइऑक्साइड', 'नाइट्रस ऑक्साइड', 'नाइट्रोजन पेंटोक्साइड'],
      correctIndex: 2,
      explanation: 'नाइट्रस ऑक्साइड (N2O) को लाफिंग गैस कहा जाता है। यह एक रंगहीन और गैर-ज्वलनशील गैस है जिसका उपयोग मुख्य रूप से दंत चिकित्सा और सर्जरी में इसके एनेस्थेटिक (बेहोश करने वाले) और एनाल्जेसिक (दर्द निवारक) गुणों के कारण किया जाता है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-11',
      text: "मानव शरीर की किस ग्रंथि (Gland) को 'आपातकालीन ग्रंथि' कहा जाता है जो तनाव के समय 'लड़ो या उड़ो' (Fight or Flight) हार्मोन स्रावित करती है?",
      options: ['पीयूष ग्रंथि (Pituitary)', 'थायरॉयड ग्रंथि', 'एड्रिनल ग्रंथि (Adrenal Gland)', 'अग्न्याशय (Pancreas)'],
      correctIndex: 2,
      explanation: "गुर्दे (Kidneys) के ठीक ऊपर स्थित एड्रिनल ग्रंथि (अधिवृक्क ग्रंथि) 'एड्रिनलीन' हार्मोन स्रावित करती है। यह हार्मोन डर, तनाव या खतरे के समय शरीर को तुरंत ऊर्जा प्रदान करके आपात स्थिति का सामना करने (लड़ने या भागने) के लिए तैयार करता है।",
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-12',
      text: "कंप्यूटर शब्दावली में, 'RAM' का पूर्ण रूप क्या है?",
      options: ['Read Access Memory', 'Random Access Memory', 'Run Active Memory', 'Rapid Action Memory'],
      correctIndex: 1,
      explanation: 'RAM का पूर्ण रूप Random Access Memory (रैंडम एक्सेस मेमोरी) है। यह कंप्यूटर की प्राथमिक और अस्थायी (Volatile) मेमोरी होती है। जब कंप्यूटर बंद कर दिया जाता है, तो RAM में मौजूद सारा डेटा नष्ट हो जाता है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-13',
      text: 'एक मानक कंप्यूटर की कीबोर्ड में कुल कितनी फंक्शन कुंजियां (Function Keys) होती हैं?',
      options: ['10', '12', '14', '16'],
      correctIndex: 1,
      explanation: 'कीबोर्ड की सबसे ऊपरी पंक्ति में F1 से लेकर F12 तक कुल 12 फंक्शन कुंजियां होती हैं। इनका उपयोग अलग-अलग सॉफ्टवेयर में विशिष्ट कार्यों या शॉर्टकट (जैसे F5 रिफ्रेश के लिए, F1 हेल्प के लिए) के रूप में किया जाता है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-14',
      text: 'एक व्यक्ति अपनी आय का 75% खर्च करता है। यदि उसकी आय में 20% की वृद्धि होती है और खर्च में 10% की वृद्धि होती है, तो उसकी बचत (Savings) में कितने प्रतिशत की वृद्धि होगी?',
      options: ['10%', '25%', '50%', '40%'],
      correctIndex: 2,
      explanation: 'मान लीजिए मूल आय = 100। खर्च = 75, तो बचत = 25। नई आय (20% वृद्धि) = 120। नया खर्च (10% वृद्धि) = 75 का 110% = 82.5। नई बचत = 120 - 82.5 = 37.5। बचत में कुल वृद्धि = 37.5 - 25 = 12.5। बचत में प्रतिशत वृद्धि = (12.5 / 25) * 100 = 50%.',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-15',
      text: 'दो पासे (Dice) एक साथ फेंके जाते हैं। दोनों पासों पर आने वाली संख्याओं का योग (Sum) एक अभाज्य संख्या (Prime Number) होने की प्रायिकता (Probability) क्या है?',
      options: ['1/2', '5/12', '1/3', '7/18'],
      correctIndex: 1,
      explanation: 'दो पासे फेंकने पर कुल संभव परिणाम = 6 * 6 = 36। संभावित अभाज्य योग: 2, 3, 5, 7, 11. अनुकूल परिणाम = 15. प्रायिकता = 15 / 36 = 5 / 12.',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-16',
      text: 'दी गई संख्या श्रृंखला में अगला पद ज्ञात करें: 3, 4, 12, 45, 196, ?',
      options: ['850', '985', '1005', '1024'],
      correctIndex: 2,
      explanation: 'यह श्रृंखला निम्नलिखित पैटर्न का पालन करती है: 3 * 1 + 1^2 = 4, 4 * 2 + 2^2 = 12, 12 * 3 + 3^2 = 45, 45 * 4 + 4^2 = 196, 196 * 5 + 5^2 = 980 + 25 = 1005.',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-17',
      text: 'यदि 15 अगस्त 1947 को शुक्रवार था, तो 26 जनवरी 1950 को सप्ताह का कौन सा दिन था?',
      options: ['मंगलवार', 'बुधवार', 'गुरुवार (बृहस्पतिवार)', 'शुक्रवार'],
      correctIndex: 2,
      explanation: '15 अगस्त 1947 से 15 अगस्त 1949 तक 2 सामान्य वर्ष = 2 विषम दिन। 15 अगस्त 1949 से 26 जनवरी 1950 तक 164 दिन (3 विषम दिन)। कुल विषम दिन = 2 + 3 = 5. शुक्रवार + 5 दिन = गुरुवार.',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-18',
      text: 'भारतीय संविधान का कौन सा अनुच्छेद संसद को नए राज्यों के निर्माण, और वर्तमान राज्यों के क्षेत्रों या सीमाओं में परिवर्तन करने की शक्ति प्रदान करता है?',
      options: ['अनुच्छेद 2', 'अनुच्छेद 3', 'अनुच्छेद 13', 'अनुच्छेद 368'],
      correctIndex: 1,
      explanation: 'संविधान के अनुच्छेद 3 (Article 3) के तहत भारतीय संसद को यह अधिकार है कि वह कानून बनाकर किसी राज्य में से उसका कुछ क्षेत्र अलग करके, या दो राज्यों को मिलाकर एक नया राज्य बना सकती है, तथा किसी भी राज्य की सीमा या नाम में परिवर्तन कर सकती है.',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-19',
      text: "भारतीय दंड संहिता (IPC) की कौन सी धारा 'दहेज मृत्यु' (Dowry Death) के अपराध से संबंधित है?",
      options: ['धारा 302', 'धारा 304B', 'धारा 307', 'धारा 498A'],
      correctIndex: 1,
      explanation: "IPC की धारा 304B 'दहेज मृत्यु' से संबंधित है. यदि विवाह के 7 वर्ष के भीतर किसी महिला की मृत्यु जलने, शारीरिक चोट या असामान्य परिस्थितियों में होती है और यह साबित होता है कि मृत्यु से ठीक पहले दहेज की मांग को लेकर क्रूरता की गई थी, तो इसे दहेज मृत्यु माना जाता है.",
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-20',
      text: 'पानीपत की पहली लड़ाई (1526) में मुग़ल शासक बाबर ने किसे पराजित किया था, जिसके परिणामस्वरूप भारत में दिल्ली सल्तनत का अंत हो गया?',
      options: ['सिकंदर लोदी', 'इब्राहिम लोदी', 'महाराणा प्रताप', 'हेमचंद्र विक्रमादित्य (हेमू)'],
      correctIndex: 1,
      explanation: '21 अप्रैल 1526 को पानीपत के प्रथम युद्ध में बाबर ने लोदी वंश के अंतिम शासक इब्राहिम लोदी को हराया था. युद्ध भूमि में इब्राहिम लोदी की मृत्यु हो गई, जिसके साथ ही दिल्ली सल्तनत समाप्त हुई और भारत में मुग़ल साम्राज्य की नींव पड़ी.',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-21',
      text: '1857 की क्रांति के समय झज्जर रियासत का नेतृत्व किसने किया था, जिन्हें बाद में अंग्रेजों ने दिल्ली के चांदनी चौक में फांसी दे दी थी?',
      options: ['राजा नाहर सिंह', 'नवाब अब्दुर रहमान खान', 'राव तुलाराम', 'सदरुद्दीन'],
      correctIndex: 1,
      explanation: '1857 के स्वतंत्रता संग्राम में नवाब अब्दुर रहमान खान ने झज्जर रियासत से विद्रोह का नेतृत्व किया था। क्रांति के दबने के बाद अंग्रेजों ने उन्हें पकड़ लिया और 23 दिसंबर 1857 को दिल्ली के लाल किले (चांदनी चौक की कोतवाली) के सामने फांसी दे दी थी।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-22',
      text: "ऋग्वेद काल में हरियाणा में बहने वाली 'चौटांग' (Chautang) नदी को प्राचीन काल में किस नाम से जाना जाता था?",
      options: ['सरस्वती', 'आपगा', 'दृषद्वती', 'कौशिकी'],
      correctIndex: 2,
      explanation: "प्राचीन काल में हरियाणा क्षेत्र में बहने वाली चौटांग नदी को 'दृषद्वती' (Drishadvati) के नाम से जाना जाता था। यह सरस्वती नदी की एक सहायक नदी थी और प्राचीन वैदिक ग्रंथों में सरस्वती और दृषद्वती के बीच के क्षेत्र को 'ब्रह्मावर्त' कहा गया है।",
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-23',
      text: 'पशुपालन विज्ञान में, निम्नलिखित में से किस भेड़ की नस्ल को "भारत की मेरिनो" (Merino of India) कहा जाता है, जो अपनी उच्च गुणवत्ता वाली ऊन के लिए प्रसिद्ध है?',
      options: ['मारवाड़ी', 'लोही', 'नाली', 'चोकला'],
      correctIndex: 3,
      explanation: "राजस्थान क्षेत्र (और हरियाणा के कुछ सीमावर्ती हिस्सों) में पाई जाने वाली 'चोकला' (Chokla) भेड़ को भारत की मेरिनो कहा जाता है। इसकी ऊन बहुत उच्च गुणवत्ता की होती है, जिसका उपयोग मुख्य रूप से बढ़िया कालीन और कपड़े बनाने में किया जाता है।",
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-24',
      text: 'कृषि विज्ञान के अनुसार, गेहूं के दानों के सुरक्षित भंडारण (Safe Storage) के लिए उनमें नमी (Moisture) की अधिकतम मात्रा कितने प्रतिशत होनी चाहिए?',
      options: ['16-18%', '10-12%', '20-22%', '5-7%'],
      correctIndex: 1,
      explanation: 'गेहूं (और अधिकांश अन्य अनाजों) के सुरक्षित भंडारण के लिए दानों में नमी की मात्रा 10% से 12% के बीच होनी चाहिए। यदि नमी इससे अधिक होगी, तो अनाज में फफूंद (Fungus) लगने या कीटों के हमले का खतरा काफी बढ़ जाता है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-25',
      text: "'हरियाणवी रामायण' की रचना किसने की थी, जो हरियाणा के साहित्यिक इतिहास में एक महत्वपूर्ण कृति मानी जाती है?",
      options: ['खुदाबख्श अहमद', 'राजाराम शास्त्री', 'पंडित लखमी चंद', 'अहमद बख्श'],
      correctIndex: 0,
      explanation: 'हरियाणवी रामायण की रचना खुदाबख्श अहमद (Khuda Bakhsh Ahmed) ने की थी। उन्होंने इस महाकाव्य को स्थानीय हरियाणवी बोली और संस्कृति के अनुरूप ढालकर प्रस्तुत किया।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-26',
      text: "भारतीय दंड संहिता (IPC) की कौन सी धारा 'डकैती' (Dacoity) को परिभाषित करती है?",
      options: ['धारा 378', 'धारा 390', 'धारा 391', 'धारा 395'],
      correctIndex: 2,
      explanation: 'IPC की धारा 391 डकैती को परिभाषित करती है। इसके अनुसार, जब 5 या 5 से अधिक व्यक्ति मिलकर लूट (Robbery) करते हैं या लूट करने का प्रयास करते हैं, तो उसे डकैती कहा जाता है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-27',
      text: "भारतीय संविधान के अनुच्छेद 32 के तहत सर्वोच्च न्यायालय द्वारा जारी की जाने वाली किस 'रिट' (Writ) का शाब्दिक अर्थ है \"शरीर को प्रस्तुत किया जाए\" (To have the body of)?",
      options: ['परमादेश (Mandamus)', 'बंदी प्रत्यक्षीकरण (Habeas Corpus)', 'अधिकार पृच्छा (Quo-Warranto)', 'उत्प्रेषण (Certiorari)'],
      correctIndex: 1,
      explanation: 'बंदी प्रत्यक्षीकरण (Habeas Corpus) लैटिन भाषा का शब्द है जिसका अर्थ है "शरीर को प्रस्तुत किया जाए"। यह रिट तब जारी की जाती है जब किसी व्यक्ति को अवैध रूप से हिरासत में रखा गया हो। इसके जरिए अदालत आदेश देती है कि बंदी को उसके सामने पेश किया जाए।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-28',
      text: 'मानव शरीर में चोट लगने पर रक्त का थक्का (Blood Clotting) जमाने में कौन सा विटामिन मुख्य भूमिका निभाता है?',
      options: ['विटामिन K', 'विटामिन E', 'विटामिन D', 'विटामिन B12'],
      correctIndex: 0,
      explanation: 'विटामिन K रक्त का थक्का जमने (Coagulation) के लिए एक आवश्यक विटामिन है। यह प्रोथ्रोम्बिन (Prothrombin) नामक protein के संश्लेषण में मदद करता है जो थक्का बनने की प्रक्रिया के लिए महत्वपूर्ण है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-29',
      text: 'भौतिक विज्ञान में, विद्युत प्रतिरोध (Electrical Resistance) की SI (अंतर्राष्ट्रीय प्रणाली) इकाई क्या है?',
      options: ['एम्पियर (Ampere)', 'वोल्ट (Volt)', 'ओम (Ohm)', 'वाट (Watt)'],
      correctIndex: 2,
      explanation: "विद्युत प्रतिरोध की SI इकाई ओम (Ohm) है, जिसे प्रतीक 'Ω' (ओमेगा) द्वारा दर्शाया जाता है। यह किसी चालक (Conductor) द्वारा विद्युत प्रवाह (Current) में उत्पन्न की जाने वाली बाधा का माप है।",
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-30',
      text: 'वर्तमान में हरियाणा विधानसभा (Vidhan Sabha) की कुल 90 सीटों में से कितनी सीटें अनुसूचित जाति (SC) के उम्मीदवारों के लिए आरक्षित हैं?',
      options: ['15', '17', '19', '21'],
      correctIndex: 1,
      explanation: 'हरियाणा विधानसभा में कुल 90 सीटें हैं, जिनमें से 17 सीटें अनुसूचित जाति (SC) के लिए आरक्षित हैं। हरियाणा में अनुसूचित जनजाति (ST) के लिए विधानसभा में कोई भी सीट आरक्षित नहीं है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-31',
      text: 'हरियाणा की सबसे बड़ी प्राकृतिक झील (Natural Lake) कौन सी है, जो लगभग 3000 एकड़ क्षेत्र में फैली हुई है?',
      options: ['दमदमा झील', 'सुल्तानपुर झील', 'बड़खल झील', 'भिंडावास झील'],
      correctIndex: 0,
      explanation: 'दमदमा झील हरियाणा की सबसे बड़ी प्राकृतिक झील है। यह गुरुग्राम जिले के सोहना (Sohna) में स्थित है और इसका निर्माण 1947 में अंग्रेजों द्वारा वर्षा जल संचयन के लिए किया गया था।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-32',
      text: 'विंडोज ऑपरेटिंग सिस्टम में किसी भी वर्तमान में सक्रिय विंडो (Active Window) या प्रोग्राम को तुरंत बंद करने के लिए किस शॉर्टकट कुंजी का उपयोग किया जाता है?',
      options: ['Ctrl + C', 'Alt + F4', 'Shift + Delete', 'Alt + Tab'],
      correctIndex: 1,
      explanation: 'Alt + F4 शॉर्टकट का उपयोग किसी भी खुले हुए सक्रिय एप्लिकेशन या विंडो को बंद करने के लिए किया जाता है। यदि कोई भी विंडो खुली नहीं है (डेस्कटॉप पर हैं), तो यह शॉर्टकट कंप्यूटर को शटडाउन/रीस्टार्ट करने का डायलॉग बॉक्स खोल देता है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-33',
      text: 'कंप्यूटर के सेंट्रल प्रोसेसिंग यूनिट (CPU) के दो मुख्य घटक (Components) कौन से हैं?',
      options: ['ALU और मदरबोर्ड', 'ALU और कंट्रोल यूनिट (CU)', 'RAM और ROM', 'हार्ड डिस्क और मॉनिटर'],
      correctIndex: 1,
      explanation: 'CPU (कंप्यूटर का मस्तिष्क) मुख्य रूप से दो भागों से बना होता है: 1. Arithmetic Logic Unit (ALU), जो सभी गणितीय और तार्किक गणनाएं करता है। 2. Control Unit (CU), जो कंप्यूटर के सभी ऑपरेशन्स को नियंत्रित और निर्देशित करता है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-34',
      text: 'A और B मिलकर एक काम को 12 दिनों में पूरा कर सकते हैं। B और C उसी काम को 15 दिनों में कर सकते हैं, तथा C और A उसे 20 दिनों में कर सकते हैं। यदि तीनों (A, B, C) एक साथ काम करें, तो काम कितने दिनों में पूरा होगा?',
      options: ['10 दिन', '12 दिन', '15 दिन', '8 दिन'],
      correctIndex: 0,
      explanation: 'A+B का 1 दिन का काम = 1/12. B+C का 1 दिन का काम = 1/15. C+A का 1 दिन का काम = 1/20. तीनों को जोड़ने पर: 2(A+B+C) = 1/12 + 1/15 + 1/20 = 12/60 = 1/5. A+B+C का 1 दिन का काम = 1/10. अतः तीनों मिलकर उस काम को 10 दिनों में पूरा करेंगे.',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-35',
      text: 'दो संख्याओं का अनुपात 3:4 है और उनका महत्तम समापवर्तक (HCF) 15 है। उन दोनों संख्याओं का लघुत्तम समापवर्त्य (LCM) क्या होगा?',
      options: ['60', '120', '180', '240'],
      correctIndex: 2,
      explanation: "यदि संख्याएँ 3x और 4x हैं, तो उनका HCF 'x' होगा। यहाँ HCF = 15 दिया गया है, इसलिए x = 15। संख्याएँ होंगी: 45 और 60। अब, 45 और 60 का LCM = 180। (LCM = HCF * अनुपातों का गुणनफल = 15 * 3 * 4 = 180)।",
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-36',
      text: 'एक तस्वीर की ओर इशारा करते हुए एक महिला ने कहा, "वह मेरे दादाजी के इकलौते बेटे का बेटा है।" वह तस्वीर वाला व्यक्ति उस महिला से किस प्रकार संबंधित है?',
      options: ['चाचा', 'भाई', 'पिता', 'चचेरा भाई'],
      correctIndex: 1,
      explanation: 'महिला के\'दादाजी का इकलौता बेटा\' उस महिला का पिता (Father) होगा। उस\'पिता का बेटा\' उस महिला का सगा भाई (Brother) होगा। अतः वह व्यक्ति महिला का भाई है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-37',
      text: "पशुओं में होने वाली अत्यंत भयंकर और संक्रामक बीमारी 'खुरपका और मुंहपका रोग' (Foot and Mouth Disease - FMD) मुख्य रूप से किसके कारण होती है?",
      options: ['जीवाणु (Bacteria)', 'विषाणु (Virus)', 'कवक (Fungi)', 'परजीवी (Parasite)'],
      correctIndex: 1,
      explanation: "खुरपका और मुंहपका रोग (FMD) एक अत्यधिक संक्रामक वायरल (विषाणु जनित) बीमारी है, जो 'पिकोर्नावाइरस' (Picornavirus) परिवार के एक वायरस के कारण होती है। यह मुख्य रूप से खुर वाले जानवरों (गाय, भैंस, सुअर, भेड़) को प्रभावित करती है।",
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-38',
      text: 'हरियाणा के पानीपत जिले के एथलीट नीरज चोपड़ा ने टोक्यो ओलंपिक 2020 में कितनी दूरी तक भाला (Javelin) फेंककर ऐतिहासिक स्वर्ण पदक जीता था?',
      options: ['87.58 मीटर', '88.06 मीटर', '86.43 मीटर', '89.30 मीटर'],
      correctIndex: 0,
      explanation: "नीरज चोपड़ा ने टोक्यो ओलंपिक में 7 अगस्त 2021 को 87.58 मीटर की दूरी तक भाला फेंककर गोल्ड मेडल जीता था। इसी ऐतिहासिक जीत की याद में भारत में 7 अगस्त को 'राष्ट्रीय भाला फेंक दिवस' (National Javelin Day) मनाया जाता है।",
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-39',
      text: 'हरियाणा पुलिस के प्रशासन के संदर्भ में, पुलिस कमिश्नरेट (Police Commissionerate) को छोड़कर, राज्य को कुल कितनी पुलिस रेंजों (Police Ranges) में बांटा गया है?',
      options: ['3', '4', '5', '6'],
      correctIndex: 2,
      explanation: 'हरियाणा को 5 पुलिस रेंजों में विभाजित किया गया है: 1. अम्बाला रेंज 2. हिसार रेंज 3. करनाल रेंज 4. रोहतक रेंज 5. साउथ रेंज (मुख्यालय रेवाड़ी)। इसके अलावा हरियाणा में 4 पुलिस कमिश्नरेट हैं (गुरुग्राम, फरीदाबाद, पंचकूला और हाल ही में बना सोनीपत)।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-40',
      text: 'मानव रक्त (Human Blood) का सामान्य pH मान (pH Value) कितना होता है?',
      options: ['6.4', '7.0', '7.4', '8.2'],
      correctIndex: 2,
      explanation: 'मानव रक्त का सामान्य pH मान लगभग 7.35 से 7.45 के बीच (औसतन 7.4) होता है। इसका मतलब है कि हमारा रक्त प्रकृति में थोड़ा क्षारीय (Slightly Basic/Alkaline) होता है.',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-41',
      text: "नारनौल में स्थित प्रसिद्ध 'जल महल' (Jal Mahal) का निर्माण 1591 ई. में किसने करवाया था?",
      options: ['इब्राहिम खान सूर', 'शाह कुली खान', 'फिरोज शाह तुगलक', 'राव तेज सिंह'],
      correctIndex: 1,
      explanation: 'नारनौल (महेंद्रगढ़) में स्थित ऐतिहासिक जल महल का निर्माण 1591 ईस्वी में अकबर के प्रसिद्ध सेनापति शाह कुली खान ने करवाया था। यह महल एक कृत्रिम झील (खान सरोवर) के बीच में स्थित है और मुगल वास्तुकला का एक बेहतरीन उदाहरण है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-42',
      text: "कुक्कुट (मुर्गियों) में होने वाली एक अत्यधिक संक्रामक और घातक बीमारी जिसे 'न्यूकैसल रोग' (Newcastle Disease) के नाम से भी जाना जाता है, भारत में किस नाम से प्रसिद्ध है?",
      options: ['बर्ड फ्लू (Bird Flu)', "मारेक्स रोग (Marek's Disease)", 'फाउल पॉक्स (Fowl Pox)', 'रानीखेत (Ranikhet)'],
      correctIndex: 3,
      explanation: "मुर्गियों में होने वाले 'न्यूकैसल रोग' को भारत में 'रानीखेत' बीमारी के नाम से जाना जाता है। यह एक भयंकर वायरल बीमारी है जिससे मुर्गियों के श्वसन तंत्र और तंत्रिका तंत्र (Nervous system) पर सीधा प्रभाव पड़ता है। यह भारत में पहली बार उत्तराखंड के रानीखेत में पाई गई थी।",
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-43',
      text: 'कृषि विज्ञान: सामान्य परिस्थितियों में एक हेक्टेयर भूमि में गेहूं (Wheat) की बुवाई के लिए औसतन कितने बीज (Seed rate) की आवश्यकता होती है?',
      options: ['40-50 किलोग्राम', '70-80 किलोग्राम', '100-125 किलोग्राम', '150-175 किलोग्राम'],
      correctIndex: 2,
      explanation: 'कृषि मानकों के अनुसार, सामान्य समय पर और सामान्य विधि से गेहूं की बुवाई करने के लिए प्रति हेक्टेयर लगभग 100 से 125 किलोग्राम बीज की आवश्यकता होती है। (यदि बुवाई पछेती/देर से की जा रही हो, तो बीज की मात्रा 20-25% बढ़ा दी जाती है)।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-44',
      text: "भारतीय दंड संहिता (IPC) की कौन सी धारा 'हत्या' (Murder) को स्पष्ट रूप से परिभाषित करती है?",
      options: ['धारा 299', 'धारा 300', 'धारा 302', 'धारा 304'],
      correctIndex: 1,
      explanation: "IPC की धारा 300 'हत्या' (Murder) की परिभाषा देती है। यह बताती है कि किन परिस्थितियों में कोई कृत्य हत्या माना जाएगा। जबकि धारा 302 'हत्या के लिए दंड' (Punishment for murder) का प्रावधान करती है। (धारा 299 आपराधिक मानव वध / Culpable Homicide से संबंधित है)।",
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-45',
      text: "MS Word में काम करते समय किसी भी चयनित टेक्स्ट या चित्र पर 'हाइपरलिंक' (Hyperlink) लगाने के लिए किस शॉर्टकट कुंजी (Shortcut Key) का उपयोग किया जाता है?",
      options: ['Ctrl + H', 'Ctrl + L', 'Ctrl + K', 'Alt + H'],
      correctIndex: 2,
      explanation: "Microsoft Word (और अन्य MS Office प्रोग्राम) में हाइपरलिंक इंसर्ट करने के लिए 'Ctrl + K' शॉर्टकट कुंजी का इस्तेमाल किया जाता है। (Ctrl + H का उपयोग 'Find and Replace' के लिए किया जाता है)।",
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-46',
      text: "विज्ञान: आंखों के 'निकट दृष्टि दोष' (Myopia) को दूर करने के लिए चश्मे में किस प्रकार के लेंस का उपयोग किया जाता है?",
      options: ['उत्तल लेंस (Convex Lens)', 'अवतल लेंस (Concave Lens)', 'बेलनाकार लेंस (Cylindrical Lens)', 'द्विफोकसी लेंस (Bifocal Lens)'],
      correctIndex: 1,
      explanation: 'निकट दृष्टि दोष (Myopia) में व्यक्ति को पास की वस्तुएं तो स्पष्ट दिखाई देती हैं, लेकिन दूर की वस्तुएं धुंधली दिखाई देती हैं। इसे ठीक करने के लिए अवतल लेंस (Concave Lens) का उपयोग किया जाता है, जो प्रकाश की किरणों को फैलाकर सही जगह (रेटिना) पर फोकस करता है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-47',
      text: '5000 रुपये की राशि पर 10% वार्षिक ब्याज की दर से 2 वर्ष के चक्रवृद्धि ब्याज (CI) और साधारण ब्याज (SI) के बीच का अंतर कितना होगा?',
      options: ['25 रुपये', '50 रुपये', '75 रुपये', '100 रुपये'],
      correctIndex: 1,
      explanation: '2 वर्ष के लिए CI और SI के अंतर का सीधा फॉर्मूला (Short Trick) है: अंतर (Difference) = P * (R / 100)^2. यहाँ, P = 5000 और R = 10 है। अंतर = 5000 * (10 / 100) * (10 / 100) = 50 रुपये।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-48',
      text: 'एक policeकर्मी अपने स्टेशन से उत्तर (North) दिशा की ओर 5 किमी चलता है। फिर वह दाईं (Right) ओर मुड़ता है और 3 किमी चलता है। इसके बाद वह फिर से दाईं ओर मुड़ता है और 5 किमी चलता है। अब वह अपने प्रारंभिक बिंदु से किस दिशा में और कितनी दूर है?',
      options: ['पूर्व दिशा में, 3 किमी', 'पश्चिम दिशा में, 3 किमी', 'उत्तर दिशा में, 5 किमी', 'south दिशा में, 3 किमी'],
      correctIndex: 0,
      explanation: 'उत्तर में 5 किमी (स्थान A)। दाएं मुड़ा (पूर्व की ओर) और 3 किमी चला (स्थान B)। फिर दाएं मुड़ा (दक्षिण की ओर) और 5 किमी चला (स्थान C)। चूँकि वह उत्तर और दक्षिण दोनों में 5-5 किमी चला है, इसलिए वह शुरुआती बिंदु की बिल्कुल क्षैतिज रेखा (Horizontal line) पर आ गया है। शुरुआती बिंदु से उसकी दूरी 3 किमी है और दिशा पूर्व (East) है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-49',
      text: 'हरियाणा का वह कौन सा जिला है, जिसकी भौगोलिक सीमाएं किसी भी अन्य राज्य या केंद्र शासित प्रदेश को नहीं छूती हैं?',
      options: ['हिसार', 'रोहतक', 'करनाल', 'सिरसा'],
      correctIndex: 1,
      explanation: 'हरियाणा में केवल दो जिले ऐसे हैं जो किसी भी अन्य राज्य या केंद्र शासित प्रदेश के साथ अपनी सीमा साझा नहीं करते हैं—रोहतक और चरखी दादरी। इन्हें हरियाणा के लैंडलॉक (Landlocked) या \'हृदय\' जिले भी कहा जाता है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-50',
      text: "हरियाणा में 'हरियाणा पंचायती राज अधिनियम, 1994' (Haryana Panchayati Raj Act) आधिकारिक रूप से किस तिथि को लागू किया गया था?",
      options: ['24 अप्रैल 1993', '1 नवंबर 1994', '22 अप्रैल 1994', '2 अक्टूबर 1994'],
      correctIndex: 2,
      explanation: 'हरियाणा में पंचायती राज अधिनियम 22 अप्रैल 1994 को लागू हुआ था। यह सवाल HSSC द्वारा अनगिनत बार पूछा जा चुका है। (ध्यान दें: पूरे भारत में 73वें संशोधन के तहत पंचायती राज 24 अप्रैल 1993 को लागू हुआ था, जिसे राष्ट्रीय पंचायती राज दिवस के रूप में मनाया जाता है)।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-51',
      text: 'पादप प्रजनन (Plant Breeding) विज्ञान में, एक द्विलिंगी (Bisexual) फूल में स्व-परागण (Self-pollination) को रोकने के लिए कली अवस्था में ही उसके नर भाग (पुंकेसर/Stamens) को काटकर हटाने की प्रक्रिया को क्या कहा जाता है?',
      options: ['इमास्कुलेशन (Emasculation)', 'बैगिंग (Bagging)', 'हाइब्रिडाइजेशन (Hybridization)', 'पार्थेनोकार्पी (Parthenocarpy)'],
      correctIndex: 0,
      explanation: 'इसे \'विपुंसन\' या \'Emasculation\' कहा जाता है। यह कृत्रिम संकरण (Artificial Hybridization) का एक बहुत महत्वपूर्ण कदम है, जिससे यह सुनिश्चित किया जाता है कि फूल केवल इच्छित (Desired) पराग कणों द्वारा ही परागित हो।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-52',
      text: 'पशुपालन विज्ञान: एक स्वस्थ सामान्य गाय (Cow) के शरीर का औसत तापमान (Normal Body Temperature) लगभग कितना होता है?',
      options: ['98.6 °F', '101.5 °F', '104.2 °F', '106.0 °F'],
      correctIndex: 1,
      explanation: 'एक स्वस्थ गाय के शरीर का सामान्य तापमान लगभग 101.5 °F (या 38.6 °C) होता है। मानव शरीर का सामान्य तापमान 98.6 °F (37 °C) होता है। मुर्गियों का शरीर का तापमान सबसे अधिक (लगभग 106 °F) होता है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-53',
      text: 'लाल चींटी के डंक (Ant\'s sting) या मधुमक्खी के डंक में मुख्य रूप से कौन सा अम्ल (Acid) पाया जाता है, जिसके कारण शरीर में तेज जलन और सूजन होती है?',
      options: ['एसिटिक अम्ल', 'लैक्टिक अम्ल', 'साइट्रिक अम्ल', 'फॉर्मिक अम्ल (मेथेनोइक अम्ल)'],
      correctIndex: 3,
      explanation: 'चींटी या मधुमक्खी के डंक में फॉर्मिक एसिड (Formic Acid) होता है, जिसका रासायनिक नाम \'मेथेनोइक एसिड\' (Methanoic acid) है। बेकिंग सोडा (क्षार) रगड़ने से इस अम्ल के प्रभाव को कम (Neutralize) किया जा सकता है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-54',
      text: "भारतीय संविधान की कौन सी अनुसूची (Schedule) 'दल-बदल विरोधी कानून' (Anti-Defection Law) से संबंधित है?",
      options: ['8वीं अनुसूची', '9वीं अनुसूची', '10वीं अनुसूची', '11वीं अनुसूची'],
      correctIndex: 2,
      explanation: '10वीं अनुसूची दल-बदल विरोधी कानून से संबंधित है। इसे 1985 में 52वें संविधान संशोधन अधिनियम द्वारा भारतीय संविधान में जोड़ा गया था। इसका उद्देश्य राजनीतिक अवसरवादिता के कारण जन-प्रतिनिधियों द्वारा पार्टी बदलने पर रोक लगाना था।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-55',
      text: "हरियाणा में मुख्य रूप से 'होली' के त्योहार पर महिलाओं और पुरुषों द्वारा सामूहिक रूप से कौन सा पारंपरिक नृत्य किया जाता है?",
      options: ['लूर नृत्य (Loor Dance)', 'खोरिया नृत्य (Khoria Dance)', 'फाग नृत्य (Phag Dance)', 'छठी नृत्य (Chhathi Dance)'],
      correctIndex: 2,
      explanation: 'फाग नृत्य (Phag Dance) फाल्गुन के महीने में, विशेषकर होली के अवसर पर किया जाता है। इसमें पुरुष और महिलाएं दोनों भाग लेते हैं। (लूर नृत्य भी होली के आसपास होता है, लेकिन यह मुख्य रूप से महिलाओं द्वारा किया जाता है जिसमें प्रश्न-उत्तर गाए जाते हैं)।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-56',
      text: "भारत का एकमात्र 'राष्ट्रीय मस्तिष्क अनुसंधान केंद्र' (NBRC - National Brain Research Centre) Haryana के किस शहर में स्थित है?",
      options: ['पंचकूला', 'मानेसर (गुरुग्राम)', 'रोहतक', 'फरीदाबाद'],
      correctIndex: 1,
      explanation: 'राष्ट्रीय मस्तिष्क अनुसंधान केंद्र (NBRC) हरियाणा के गुरुग्राम जिले के मानेसर (नैनवाल) में स्थित है। यह न्यूरोसाइंस (तंत्रिका विज्ञान) अनुसंधान के लिए भारत का प्रमुख (Nodal) संस्थान है जो सीधे विज्ञान और प्रौद्योगिकी मंत्रालय के अंतर्गत आता है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-57',
      text: "अपराधिक प्रक्रिया संहिता (CrPC) की किस धारा के तहत पुलिस स्टेशन के प्रभारी अधिकारी द्वारा संज्ञेय अपराधों (Cognizable Offences) में 'प्रथम सूचना रिपोर्ट' (FIR) दर्ज की जाती है?",
      options: ['धारा 144', 'धारा 154', 'धारा 161', 'धारा 173'],
      correctIndex: 1,
      explanation: 'CrPC (Code of Criminal Procedure) की धारा 154 के तहत पुलिस संज्ञेय अपराधों (गंभीर अपराध जहाँ पुलिस बिना वारंट के गिरफ्तार कर सकती है) के मामलों में FIR दर्ज करती है। हरियाणा पुलिस के सिलेबस के लिए यह सबसे महत्वपूर्ण धाराओं में से एक है। (वर्तमान में नए कानूनों के तहत यह बीएनएसएस - BNSS में बदल गई है, लेकिन पुराने प्रश्नपत्रों के आधार पर 154 पूछा जाता है)।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-58',
      text: "कंप्यूटर नेटवर्किंग में डिवाइस की पहचान करने के लिए उपयोग किए जाने वाले 'MAC Address' का पूर्ण रूप क्या है?",
      options: ['Memory Access Control', 'Main Access Computer', 'Media Access Control', 'Machine Access Code'],
      correctIndex: 2,
      explanation: 'MAC का पूर्ण रूप \'Media Access Control\' है। यह एक 48-बिट (6 बाइट्स) का अद्वितीय (Unique) हार्डवेयर एड्रेस होता है जिसे नेटवर्क इंटरफेस कार्ड (NIC) के निर्माता द्वारा असाइन किया जाता है। इसे डिवाइस का भौतिक (Physical) पता भी कहा जाता है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-59',
      text: 'A and B की वर्तमान आयु का अनुपात 3:4 है। 5 वर्ष पहले उनकी आयु का अनुपात 5:7 था। A की वर्तमान आयु ज्ञात कीजिए।',
      options: ['20 वर्ष', '24 वर्ष', '30 वर्ष', '40 वर्ष'],
      correctIndex: 2,
      explanation: 'मान लें A और B की वर्तमान आयु 3x और 4x है। 5 वर्ष पहले उनकी आयु (3x - 5) और (4x - 5) थी। प्रश्नानुसार: (3x - 5) / (4x - 5) = 5 / 7. क्रॉस-मल्टीप्लाई करने पर: 7(3x - 5) = 5(4x - 5) -> 21x - 35 = 20x - 25 -> x = 10. इसलिए, A की वर्तमान आयु = 3x = 3 * 10 = 30 वर्ष।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-60',
      text: 'जीव विज्ञान: मानव शरीर की कोशिका (Cell) के किस अंग को \'आत्महत्या की थैली\' (Suicide Bags) कहा जाता है?',
      options: ['राइबोसोम (Ribosomes)', 'माइटोकॉन्ड्रिया (Mitochondria)', 'लाइसोसोम (Lysosomes)', 'गॉल्जी काय (Golgi body)'],
      correctIndex: 2,
      explanation: 'लाइसोसोम को \'आत्महत्या की थैली\' कहा जाता है क्योंकि इनमें शक्तिशाली पाचक एंजाइम (Digestive enzymes) होते हैं। जब कोई कोशिका क्षतिग्रस्त या मृत हो जाती है, तो लाइसोसोम फट जाते हैं और उनके एंजाइम अपनी ही कोशिका को पचा (नष्ट कर) लेते हैं।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-61',
      text: "हरियाणा के किस ऐतिहासिक स्थल से 'इंडो-ग्रीक' (हिन्द-यवन) शासकों के सिक्के प्राप्त हुए हैं, जो प्राचीन काल में व्यापार और सत्ता का केंद्र था?",
      options: ['राखीगढ़ी (हिसार)', 'खोखराकोट (रोहतक)', 'कुणाल (फतेहाबाद)', 'बनावली (फतेहाबाद)'],
      correctIndex: 1,
      explanation: "रोहतक के 'खोखराकोट' से इंडो-ग्रीक (हिन्द-यवन) शासकों के सिक्के और सांचे प्राप्त हुए हैं। इसके अलावा, यहाँ से यौधेय गणराज्य की मुहरें भी मिली हैं, जो इस बात का प्रमाण है कि प्राचीन काल में रोहतक एक प्रमुख प्रशासनिक और व्यापारिक केंद्र था।",
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-62',
      text: "कृषि विज्ञान: भारत में 'क्षारीय मृदा' (Alkaline Soil / ऊसर भूमि) को सुधारने और खेती योग्य बनाने के लिए मुख्य रूप से किस रसायन का उपयोग किया जाता है?",
      options: ['यूरिया (Urea)', 'कैल्शियम कार्बोनेट (चूना)', 'जिप्सम (Gypsum)', 'सुपर फास्फेट'],
      correctIndex: 2,
      explanation: "क्षारीय या ऊसर मिट्टी (जिसका pH मान बहुत अधिक होता है) को सुधारने के लिए 'जिप्सम' (Calcium Sulfate Dihydrate) का उपयोग किया जाता है। जिप्सम मिट्टी में मौजूद अतिरिक्त सोडियम को हटा देता है, जिससे मिट्टी की संरचना में सुधार होता है। (अम्लीय मिट्टी को सुधारने के लिए चूने का प्रयोग किया जाता है)।",
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-63',
      text: "पशुपालन विज्ञान: दुधारू पशुओं (विशेषकर गाय और भैंस) में होने वाला 'थनैला रोग' (Mastitis) मुख्य रूप से पशु के किस अंग को प्रभावित करता है?",
      options: ['खुर (Hooves)', 'फेफड़े (Lungs)', 'अयन / थन (Udder)', 'आंत (Intestine)'],
      correctIndex: 2,
      explanation: "'थनैला रोग' (Mastitis) दुधारू पशुओं के अयन (Udder) और थनों का एक जीवाणु (बैक्टीरियल) संक्रमण है। इस रोग के कारण थनों में सूजन आ जाती है, दूध उत्पादन में भारी कमी होती है और दूध में खून या मवाद आने लगता है। यह डेयरी किसानों के लिए सबसे बड़ा आर्थिक नुकसान का कारण है।",
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-64',
      text: "भारतीय दंड संहिता (IPC): IPC की कौन सी धारा 'बलात्कार' (Rape) के अपराध के लिए सजा (Punishment) का प्रावधान करती है?",
      options: ['धारा 354', 'धारा 375', 'धारा 376', 'धारा 377'],
      correctIndex: 2,
      explanation: 'IPC की धारा 376 बलात्कार के अपराध के लिए दंड का प्रावधान करती है, जिसमें कठोर कारावास और जुर्माने की सजा शामिल है। (ध्यान दें: धारा 375 \'बलात्कार\' को परिभाषित करती है, जबकि धारा 376 उसकी सजा तय करती है)।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-65',
      text: "भूगोल (हरियाणा): प्रसिद्ध 'भाखड़ा नहर' (Bhakra Canal) हरियाणा राज्य में किस स्थान से प्रवेश करती है?",
      options: ['ताजेवाला (यमुनानगर)', 'टोहाना (फतेहाबाद)', 'ओखला (फरीदाबाद)', 'हथनीकुंड'],
      correctIndex: 1,
      explanation: 'भाखड़ा नहर पंजाब से बहते हुए हरियाणा के फतेहाबाद जिले के \'टोहाना\' नामक स्थान से प्रवेश करती है। टोहाना को अत्यधिक नहरों के जाल के कारण "नहरों का शहर" (City of Canals) भी कहा जाता है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-66',
      text: "कंप्यूटर: इंटरनेट नेटवर्किंग में उपयोग होने वाला नवीनतम 'IPv6' (Internet Protocol version 6) एड्रेस कितने बिट्स (Bits) का होता है?",
      options: ['32 बिट्स', '64 बिट्स', '128 बिट्स', '256 बिट्स'],
      correctIndex: 2,
      explanation: 'IPv6 एड्रेस 128-बिट्स का होता है, जिसे हेक्साडेसिमल (Hexadecimal) फॉर्मेट में लिखा जाता है (उदाहरण: 2001:0db8:85a3:0000:0000:8a2e:0370:7334)। यह पुराने IPv4 (जो 32-बिट का होता है) का उन्नत संस्करण है, जिसे आईपी एड्रेस की कमी को दूर करने के लिए बनाया गया है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-67',
      text: "विज्ञान (भौतिकी): किसी भी लेंस की 'क्षमता' (Power of a Lens) को मापने की SI (अंतर्राष्ट्रीय प्रणाली) इकाई क्या है?",
      options: ['कैंडेला (Candela)', 'डायोप्टर (Diopter)', 'ल्यूमेन (Lumen)', 'वेबर (Weber)'],
      correctIndex: 1,
      explanation: 'लेंस की क्षमता की SI इकाई डायोप्टर (Diopter - D) है। इसे लेंस की फोकल लंबाई (मीटर में) के व्युत्क्रम (Reciprocal) के रूप में परिभाषित किया जाता है (P = 1/f). उत्तल लेंस की क्षमता धनात्मक (+) और अवतल लेंस की ऋणात्मक (-) होती है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-68',
      text: "ताश के 52 पत्तों की एक अच्छी तरह से फेंटी गई गड्डी में से यादृच्छिक (randomly) रूप से एक पत्ता निकाला जाता है। उस पत्ते के 'लाल रंग का फेस कार्ड' (Red Face Card) होने की क्या प्रायिकता है?",
      options: ['3/26', '1/13', '1/26', '3/52'],
      correctIndex: 0,
      explanation: '52 पत्तों की गड्डी में कुल 12 फेस कार्ड (J, Q, K) होते हैं। इन 12 फेस कार्ड्स में से 6 काले (Spades, Clubs) and 6 लाल (Hearts, Diamonds) होते हैं। अनुकूल परिणाम (लाल फेस कार्ड) = 6. कुल परिणाम = 52. प्रायिकता = 6 / 52 = 3 / 26.',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-69',
      text: "भारतीय कानून: 'भारतीय साक्ष्य अधिनियम' (Indian Evidence Act), जो अदालतों में सबूतों की स्वीकार्यता को नियंत्रित करता है, मूल रूप से किस वर्ष पारित और लागू किया गया था?",
      options: ['1860', '1872', '1898', '1950'],
      correctIndex: 1,
      explanation: 'भारतीय साक्ष्य अधिनियम (Indian Evidence Act) 1 सितंबर 1872 को लागू किया गया था। इसे सर जेम्स फिट्ज़जेम्स स्टीफन द्वारा ड्राफ्ट किया गया था।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-70',
      text: 'हरियाणा GK: हरियाणा सरकार द्वारा खेलों के क्षेत्र में खिलाड़ियों को दिया जाने वाला राज्य का सर्वोच्च खेल पुरस्कार कौन सा है?',
      options: ['अर्जुन पुरस्कार', 'एकलव्य पुरस्कार', 'भीम पुरस्कार', 'विक्रमादित्य पुरस्कार'],
      correctIndex: 2,
      explanation: "'भीम पुरस्कार' हरियाणा राज्य का सर्वोच्च खेल सम्मान है। यह पुरस्कार राज्य के उन उत्कृष्ट खिलाड़ियों को दिया जाता है जिन्होंने राष्ट्रीय और अंतर्राष्ट्रीय स्तर पर शानदार प्रदर्शन किया हो। इसके तहत 5 लाख रुपये की नकद राशि, स्मृति चिह्न और सम्मान पत्र दिया जाता है।",
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-71',
      text: "एक निश्चित कूट भाषा में, यदि 'POLICE' को 'QPMJDF' लिखा जाता है, तो उसी कूट भाषा में 'ARREST' को कैसे लिखा जाएगा?",
      options: ['BSSFTU', 'ZQQDRS', 'BQQFSU', 'BSTFTV'],
      correctIndex: 0,
      explanation: "यहाँ प्रत्येक अक्षर को अंग्रेजी वर्णमाला (Alphabet) के ठीक अगले अक्षर से बदल दिया गया है (+1 पैटर्न)। P -> Q, O -> P, L -> M, I -> J, C -> D, E -> F. इसी तरह ARREST के लिए: A(+1) -> B, R(+1) -> S, R(+1) -> S, E(+1) -> F, S(+1) -> T, T(+1) -> U. सही उत्तर 'BSSFTU' है।",
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-72',
      text: "'गुल्ली डंडा' (Phalaris minor), जिसे 'कनकी' या 'मंडूसी' भी कहा जाता है, मुख्य रूप से हरियाणा में किस फसल का सबसे कुख्यात खरपतवार (Weed) है?",
      options: ['कपास (Cotton)', 'धान (Paddy)', 'गेहूं (Wheat)', 'गन्ना (Sugarcane)'],
      correctIndex: 2,
      explanation: "'गुल्ली डंडा' (Phalaris minor) गेहूं की फसल का सबसे प्रमुख और विनाशकारी खरपतवार है। यह दिखने में बिल्कुल गेहूं के पौधे जैसा होता है (Mimicry weed), इसलिए इसे शुरुआत में पहचानना बहुत मुश्किल होता है। इसे नष्ट करने के लिए 'आइसोप्रोट्यूरॉन' या 'सल्फोसल्फ्यूरॉन' जैसे खरपतवारनाशियों का उपयोग किया जाता है।",
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-73',
      text: 'पशुपालन: एक स्वस्थ मादा भेड़ (Sheep) का औसत गर्भकाल (Gestation Period) लगभग कितने दिनों का होता है?',
      options: ['114 दिन', '145-150 दिन', '280 दिन', '310 दिन'],
      correctIndex: 1,
      explanation: 'भेड़ का औसत गर्भकाल लगभग 145 से 150 दिन (लगभग 5 महीने) का होता है। (बकरी का गर्भकाल भी लगभग 150 दिन होता है, जबकि सुअर का लगभग 114 दिन होता है)।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-74',
      text: "हरियाणा लोक सेवा आयोग' (HPSC) के अध्यक्ष और सदस्यों की नियुक्ति भारतीय संविधान के अनुच्छेद 316 के तहत किसके द्वारा की जाती है?",
      options: ['भारत के राष्ट्रपति', 'हरियाणा के मुख्यमंत्री', 'हरियाणा के राज्यपाल', 'भारत के मुख्य न्यायाधीश'],
      correctIndex: 2,
      explanation: 'राज्य लोक सेवा आयोग (जैसे HPSC) के अध्यक्ष और सदस्यों की नियुक्ति राज्य के \'राज्यपाल\' (Governor) द्वारा की जाती है। हालांकि, उन्हें उनके पद से हटाने का अधिकार केवल भारत के \'राष्ट्रपति\' के पास होता है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-75',
      text: 'एक लंब वृत्तीय बेलन (Cylinder) के आधार की त्रिज्या (Radius) और ऊंचाई (Height) का अनुपात 1:3 है। यदि उसका आयतन (Volume) 3234 घन सेमी है, तो उस बेलन की त्रिज्या कितनी होगी? (मान लें \\(\\pi = 22/7\\))',
      options: ['5 सेमी', '7 सेमी', '14 सेमी', '21 सेमी'],
      correctIndex: 1,
      explanation: 'माना त्रिज्या r = x और ऊंचाई h = 3x है। बेलन का आयतन V = \\pi r^2 h. 3234 = (22/7) * (x)^2 * (3x) -> 3234 = (66/7) * x^3 -> x^3 = 343 -> x = 7 सेमी। अतः त्रिज्या 7 सेमी है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-76',
      text: "कंप्यूटर (डेटाबेस): SQL (Structured Query Language) के संदर्भ में, 'DML' का पूर्ण रूप क्या है?",
      options: ['Data Machine Language', 'Data Manipulation Language', 'Direct Memory Level', 'Domain Model Language'],
      correctIndex: 1,
      explanation: "DML का पूर्ण रूप 'Data Manipulation Language' है। इसका उपयोग डेटाबेस में मौजूद डेटा को प्रबंधित (Manipulate) करने के लिए किया जाता है। DML कमांड्स के प्रमुख उदाहरण हैं: SELECT, INSERT, UPDATE, और DELETE। (DDL का मतलब Data Definition Language होता है)।",
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-77',
      text: 'विज्ञान (जीव विज्ञान): एक सामान्य मानव शरीर की दैहिक कोशिका (Somatic Cell) में गुणसूत्रों (Chromosomes) की कुल संख्या कितनी होती है?',
      options: ['23', '44', '46', '48'],
      correctIndex: 2,
      explanation: 'एक सामान्य मानव कोशिका में कुल 46 गुणसूत्र होते हैं, जो 23 के जोड़े (Pairs) में व्यवस्थित होते हैं। इनमें से 22 जोड़े \'ऑटोसोम\' (Autosomes) होते हैं और 1 जोड़ा (23वां जोड़ा) \'सेक्स क्रोमोसोम\' (Sex chromosome - XX या XY) होता है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-78',
      text: "हरियाणा करंट / योजनाएं: हरियाणा सरकार की महत्वाकांक्षी 'मेरा पानी-मेरी विरासत' (Mera Pani-Meri Virasat) योजना का मुख्य उद्देश्य क्या है?",
      options: ['हर घर में स्वच्छ पेयजल पहुंचाना', 'प्राचीन बावड़ियों और कुओं का जीर्णोद्धार करना', 'धान (चावल) की खेती छोड़कर कम पानी वाली वैकल्पिक फसलें उगाना', 'ग्रामीण क्षेत्रों में वाटर ट्रीटमेंट प्लांट लगाना'],
      correctIndex: 2,
      explanation: "'मेरा पानी-मेरी विरासत' योजना का उद्देश्य जल संरक्षण है। इसके तहत किसानों को धान (Paddy) की फसल के बजाय कम पानी की खपत वाली फसलें (जैसे मक्का, दालें, कपास, बाजरा) उगाने के लिए प्रोत्साहित किया जाता है। ऐसा करने वाले किसानों को प्रति एकड़ 7,000 रुपये की वित्तीय प्रोत्साहन राशि दी जाती है।",
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-79',
      text: "भारतीय दंड संहिता (IPC): IPC का कौन सा अध्याय 'मानहानि' (Defamation) से संबंधित अपराधों और उनकी सजा का विवरण देता है?",
      options: ['अध्याय 16 (Chapter XVI)', 'अध्याय 20 (Chapter XX)', 'अध्याय 21 (Chapter XXI)', 'अध्याय 22 (Chapter XXII)'],
      correctIndex: 2,
      explanation: 'IPC का अध्याय 21 (Chapter XXI) मानहानि (Defamation) से संबंधित है। इसमें धारा 499 (मानहानि की परिभाषा) से लेकर धारा 502 तक शामिल हैं। (धारा 500 मानहानि के लिए 2 साल तक की सजा का प्रावधान करती है)।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-80',
      text: 'हरियाणा भूगोल: वर्तमान में क्षेत्रफल की दृष्टि से हरियाणा का सबसे बड़ा जिला कौन सा है?',
      options: ['भिवानी', 'हिसार', 'सिरसा', 'जींद'],
      correctIndex: 2,
      explanation: 'वर्तमान में क्षेत्रफल के हिसाब से \'सिरसा\' (4,277 वर्ग किमी) हरियाणा का सबसे बड़ा जिला है। चरखी दादरी के एक नए जिले के रूप में अलग होने से पहले भिवानी हरियाणा का सबसे बड़ा जिला हुआ करता था। क्षेत्रफल में सबसे छोटा जिला फरीदाबाद है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-81',
      text: '18वीं सदी के अंत में, आयरिश नागरिक \'जॉर्ज थॉमस\' (George Thomas) ने हरियाणा के किस शहर को अपनी स्वतंत्र राजधानी बनाया था और वहाँ अपनी खुद की टकसाल (Mint) भी स्थापित की थी?',
      options: ['जींद', 'हांसी', 'रेवाड़ी', 'झज्जर'],
      correctIndex: 1,
      explanation: 'आयरलैंड के निवासी जॉर्ज थॉमस (जिन्हें \'जहाज साहब\' भी कहा जाता था) ने 1797 ई. में हिसार जिले के \'हांसी\' को अपनी राजधानी बनाया था। उन्होंने हांसी के दुर्ग का पुनर्निर्माण करवाया और वहाँ अपनी टकसाल स्थापित करके अपने खुद के सिक्के (सिक्का-ए-साहिब) ढलवाए थे।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-82',
      text: 'पशुपालन विज्ञान: मुर्गियों की किस नस्ल (Breed) को दुनिया में \'अंडे देने वाली सर्वोत्तम नस्ल\' (Best egg layer) माना जाता है?',
      options: ['रोड आइलैंड रेड (RIR)', 'असील (Aseel)', 'व्हाइट लेगहॉर्न (White Leghorn)', 'कड़कनाथ (Kadaknath)'],
      correctIndex: 2,
      explanation: 'व्हाइट लेगहॉर्न (White Leghorn) मुर्गियों की भूमध्यसागरीय (Mediterranean) नस्ल है। यह दुनिया में सबसे अधिक अंडे (प्रति वर्ष लगभग 280-300 अंडे) देने वाली नस्ल के रूप में प्रसिद्ध है। व्यावसायिक पोल्ट्री फार्मिंग में सफेद अंडों के उत्पादन के लिए मुख्य रूप से इसी का उपयोग किया जाता है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-83',
      text: 'भारतीय कानून: आपराधिक प्रक्रिया संहिता (CrPC) की कौन सी धारा पुलिस को किसी व्यक्ति को \'बिना वारंट के गिरफ्तार करने\' (Arrest without warrant) का अधिकार देती है?',
      options: ['धारा 41', 'धारा 46', 'धारा 50', 'धारा 154'],
      correctIndex: 0,
      explanation: 'CrPC की धारा 41 (Section 41) पुलिस को यह अधिकार देती है कि वह किसी भी ऐसे व्यक्ति को बिना मजिस्ट्रेट के आदेश और बिना वारंट के गिरफ्तार कर सकती है जो किसी संज्ञेय अपराध (Cognizable offense) में शामिल हो, या जिसके खिलाफ उचित शिकायत मिली हो।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-84',
      text: 'कृषि विज्ञान: फसलों की अच्छी वृद्धि के लिए मुख्य पोषक तत्वों के संदर्भ में \'NPK\' का पूर्ण रूप क्या है?',
      options: ['नाइट्रोजन, फास्फोरस, पोटेशियम', 'नाइट्रोजन, प्रोटीन, काइनेटिन', 'नियॉन, फास्फोरस, क्रिप्टन', 'नाइट्रोजन, पोटाश, कैल्शियम'],
      correctIndex: 0,
      explanation: 'NPK का मतलब नाइट्रोजन (N), फास्फोरस (P) और पोटेशियम (K) है। ये पौधों के लिए प्राथमिक मैक्रोन्यूट्रिएंट्स (Primary macronutrients) हैं। भारतीय मिट्टियों में आमतौर पर नाइट्रोजन की भारी कमी होती है, इसीलिए NPK उर्वरकों का बड़े पैमाने पर उपयोग किया जाता है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-85',
      text: 'एक 200 मीटर लंबी रेलगाड़ी 72 किमी/घंटा की गति से चल रही है। वह एक 400 मीटर लंबे प्लेटफॉर्म को पार करने में कितना समय लेगी?',
      options: ['15 सेकंड', '20 सेकंड', '25 सेकंड', '30 सेकंड'],
      correctIndex: 3,
      explanation: 'सबसे पहले गति को मी/से (m/s) में बदलें: 72 * (5/18) = 20 मी/से। कुल तय की गई दूरी = रेलगाड़ी की लंबाई + प्लेटफॉर्म की लंबाई = 200 + 400 = 600 मीटर। समय = दूरी / गति = 600 / 20 = 30 सेकंड।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-86',
      text: 'हरियाणा GK: हरियाणा का वह कौन सा कस्बा है जहाँ राज्य में सबसे अधिक वर्षा होने के कारण उसे "हरियाणा का चेरापूंजी" (Cherrapunji of Haryana) कहा जाता है?',
      options: ['छछरौली (यमुनानगर)', 'ताजेवाला (यमुनानगर)', 'सोहना (गुरुग्राम)', 'पंचकूला'],
      correctIndex: 0,
      explanation: 'यमुनानगर जिले में स्थित \'छछरौली\' (Chhachhrauli) में शिवालिक पहाड़ियों की तलहटी में होने के कारण हरियाणा में सबसे अधिक औसत वर्षा होती है। इसी कारण इसे \'हरियाणा का चेरापूंजी\' कहा जाता है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-87',
      text: 'कंप्यूटर: निम्नलिखित में से कौन सी मेमोरी (Memory) कंप्यूटर के CPU (प्रोसेसर) और मुख्य मेमोरी (RAM) के बीच बफर (Buffer) का काम करती है और गति बढ़ाने में मदद करती है?',
      options: ['ROM', 'फ्लैश मेमोरी (Flash Memory)', 'कैश मेमोरी (Cache Memory)', 'वर्चुअल मेमोरी (Virtual Memory)'],
      correctIndex: 2,
      explanation: 'कैश मेमोरी (Cache Memory) एक बहुत ही तेज और छोटी अस्थिर (Volatile) मेमोरी है जो CPU और RAM के बीच स्थित होती. यह उन डेटा और निर्देशों को स्टोर करती है जिनका उपयोग प्रोसेसर द्वारा बार-बार किया जाता है, जिससे प्रोसेसिंग की गति काफी बढ़ जाती है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-88',
      text: 'विज्ञान: दूध के दही में जमने (Curdling of milk) के दौरान निम्नलिखित में से कौन सा अम्ल (Acid) बनता है?',
      options: ['साइट्रिक अम्ल (Citric Acid)', 'लैक्टिक अम्ल (Lactic Acid)', 'एसिटिक अम्ल (Acetic Acid)', 'टार्टरिक अम्ल (Tartaric Acid)'],
      correctIndex: 1,
      explanation: 'दूध में \'लैक्टोज\' (Lactose) नामक शर्करा होती है। जब दूध में Lactobacillus नामक जीवाणु पनपते हैं, तो वे इस लैक्टोज को \'लैक्टिक अम्ल\' (Lactic Acid) में बदल देते हैं। इसी अम्ल के कारण दूध खट्टा हो जाता है और दही में परिवर्तित हो जाता है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-89',
      text: 'दी गई श्रृंखला को पूरा करें: 5, 11, 24, 51, 106, ?',
      options: ['212', '215', '217', '221'],
      correctIndex: 2,
      explanation: 'श्रृंखला इस पैटर्न का पालन करती है: x * 2 + 1, x * 2 + 2, x * 2 + 3... 5 * 2 + 1 = 11, 11 * 2 + 2 = 24, 24 * 2 + 3 = 51, 51 * 2 + 4 = 106, 106 * 2 + 5 = 212 + 5 = 217.',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-90',
      text: 'भारतीय संविधान: भारत के संविधान का कौन सा अनुच्छेद \'भारत के नियंत्रक एवं महालेखा परीक्षक\' (CAG - Comptroller and Auditor General of India) के पद का प्रावधान करता है?',
      options: ['अनुच्छेद 76', 'अनुच्छेद 148', 'अनुच्छेद 280', 'अनुच्छेद 324'],
      correctIndex: 1,
      explanation: 'संविधान का अनुच्छेद 148 (Article 148) भारत के नियंत्रक और महालेखा परीक्षक (CAG) के स्वतंत्र पद का प्रावधान करता है। CAG भारत सरकार और राज्य सरकारों के खातों का ऑडिट करता है। (अनुच्छेद 76 महान्यायवादी / Attorney General से संबंधित है)।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-91',
      text: 'पशुपालन: मांस उत्पादन के संदर्भ में, बकरी के मांस (Goat meat) को वैज्ञानिक और व्यावसायिक शब्दावली में क्या कहा जाता है?',
      options: ['पोर्क (Pork)', 'बीफ (Beef)', 'शेवोन (Chevon)', 'मटन (Mutton)'],
      correctIndex: 2,
      explanation: 'बकरी (Goat) के मांस को \'शेवोन\' (Chevon) कहा जाता है। (भेड़/Sheep के मांस को मटन, सुअर/Pig के मांस को पोर्क, और गाय/भैंस के मांस को बीफ या बीफ/बफन कहा जाता है)। हरियाणा पुलिस कृषि/पशुपालन सेक्शन में ये शब्दावली बहुत आम है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-92',
      text: 'मारकंडा नदी (Markanda River) का प्राचीन या वैदिक नाम क्या था?',
      options: ['अरुणा (Aruna)', 'दृषद्वती (Drishadvati)', 'विपाशा (Vipasha)', 'परुष्णी (Parushni)'],
      correctIndex: 0, // अरुणा
      explanation: 'मारकंडा नदी का प्राचीन नाम \'अरुणा\' (Aruna) था। यह हिमाचल प्रदेश की धरतीधर पहाड़ियों से निकलकर हरियाणा के अंबाला जिले से प्रवेश करती है और अंततः सरस्वती नदी में मिल जाती है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-93',
      text: 'भारतीय कानून (IPC): भारतीय दंड संहिता की धारा 141 के अनुसार, \'गैर-कानूनी जमावड़ा\' (Unlawful Assembly) गठित करने के लिए न्यूनतम कितने व्यक्तियों का होना आवश्यक है?',
      options: ['2 व्यक्ति', '3 व्यक्ति', '5 व्यक्ति', '7 व्यक्ति'],
      correctIndex: 2,
      explanation: 'IPC की धारा 141 के अनुसार, 5 या 5 से अधिक व्यक्तियों के समूह को \'विधिविरुद्ध जमाव\' (Unlawful Assembly) कहा जाता है, यदि उनका सामान्य उद्देश्य (Common object) किसी कानून का विरोध करना, आपराधिक बल प्रयोग करना या किसी व्यक्ति को गैर-कानूनी काम करने के लिए मजबूर करना हो।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-94',
      text: 'एक दुकानदार किसी वस्तु के अंकित मूल्य पर लगातार 20% और 10% की दो क्रमिक छूट (Successive Discounts) देता है। उसकी कुल एकल छूट (Single equivalent discount) प्रतिशत कितनी होगी?',
      options: ['30%', '28%', '32%', '25%'],
      correctIndex: 1,
      explanation: 'दो क्रमिक छूट x% और y% के लिए समतुल्य एकल छूट का सूत्र है: x + y - (x * y)/100 = 20 + 10 - (20 * 10) / 100 = 30 - 2 = 28%.',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-95',
      text: 'हरियाणा करंट / विविध: भारत का पहला \'ग्रेन एटीएम\' (Grain ATM) - जहाँ राशन कार्ड धारक मशीन से सीधे अनाज प्राप्त कर सकते हैं - हरियाणा के किस जिले में स्थापित किया गया था?',
      options: ['फरीदाबाद', 'पंचकूला', 'गुरुग्राम', 'हिसार'],
      correctIndex: 2,
      explanation: 'देश का पहला \'ग्रेन एटीएम\' (अन्न पूर्ति एटीएम) गुरुग्राम जिले के फर्रुखनगर (Farrukhnagar) में पायलट प्रोजेक्ट के तौर पर स्थापित किया गया था। यह बायोमेट्रिक सिस्टम से लैस है और कुछ ही मिनटों में सटीक वजन के साथ अनाज निकालता है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-96',
      text: 'विटामिन B12 (Vitamin B12) का रासायनिक नाम क्या है, जिसमें कोबाल्ट धातु पाई जाती है?',
      options: ['थाइमिन (Thiamine)', 'राइबोफ्लेविन (Riboflavin)', 'सायनोकोबालामिन (Cyanocobalamin)', 'एस्कॉर्बिक एसिड (Ascorbic Acid)'],
      correctIndex: 2,
      explanation: 'विटामिन B12 का रासायनिक नाम \'सायनोकोबालामिन\' (Cyanocobalamin) है। यह एकमात्र विटामिन है जिसमें कोबाल्ट (Cobalt) नामक खनिज धातु पाई जाती है। इसकी कमी से \'पर्निसियस एनीमिया\' (Pernicious anemia) नामक खतरनाक रक्तक्षीणता रोग हो जाता है।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-97',
      text: 'हरियाणा पुलिस: हरियाणा राज्य की मुख्य पुलिस प्रशिक्षण अकादमी (Haryana Police Academy - HPA) कहाँ स्थित है?',
      options: ['भोंडसी (गुरुग्राम)', 'रोहतक', 'मधुबन (करनाल)', 'सुनारिया'],
      correctIndex: 2,
      explanation: 'हरियाणा पुलिस अकादमी (HPA) करनाल जिले के \'मधुबन\' (Madhuban) में स्थित है। इसे 1973 में राज्य पुलिस प्रशिक्षण कॉलेज के रूप में स्थापित किया गया था और बाद में इसे अकादमी का दर्जा दिया गया।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-98',
      text: 'कृषि विज्ञान: विश्व में \'हरित क्रांति\' (Green Revolution) का जनक किसे माना जाता है, जिन्हें उनके कृषि में योगदान के लिए 1970 में नोबेल शांति पुरस्कार भी मिला था?',
      options: ['एम.एस. स्वामीनाथन', 'नॉर्मन बोरलॉग (Norman Borlaug)', 'वर्गीज कुरियन', 'जी.एस. खुश'],
      correctIndex: 1,
      explanation: 'डॉ. नॉर्मन बोरलॉग को \'विश्व में हरित क्रांति का जनक\' माना जाता है। उन्होंने मेक्सिको में गेहूं की उच्च उपज वाली बौनी किस्मों (High-yielding dwarf varieties) का विकास किया। (ध्यान दें: एम.एस. स्वामीनाथन को \'भारत\' में हरित क्रांति का जनक माना जाता है)।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-99',
      text: 'हरियाणा साहित्य: हरियाणा के किस प्रसिद्ध लोककवि और सांगी (Saangi) को "हरियाणा का शेक्सपियर" (Shakespeare of Haryana) और "हरियाणा का तानसेन" कहा जाता है?',
      options: ['बाजे भगत', 'पंडित मांगेराम', 'दादा लखमी चंद', 'दीपचंद बहमन'],
      correctIndex: 2,
      explanation: 'पंडित लखमी चंद (दादा लखमी) को हरियाणा का शेक्सपियर, सूर्यकवि और हरियाणा का तानसेन कहा जाता है। उन्होंने हरियाणवी सांग (Saang) विधा को नई ऊंचाइयों पर पहुंचाया और बिना किसी औपचारिक स्कूली शिक्षा के अनेक वेदों-पुराणों पर आधारित उत्कृष्ट रचनाएँ कीं।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    },
    {
      id: 'q-hssc-100',
      text: 'Microsoft Windows में किसी भी डिलीट की गई फाइल या फोल्डर को स्थायी रूप से (Permanently) डिलीट करने के लिए (ताकि वह रीसायकल बिन में न जाए) किस शॉर्टकट की का उपयोग किया जाता है?',
      options: ['Ctrl + Delete', 'Alt + Delete', 'Shift + Delete', 'Windows + Delete'],
      correctIndex: 2,
      explanation: 'किसी भी फाइल को चुनकर \'Shift + Delete\' दबाने से वह फाइल स्थायी रूप से (Permanently) कंप्यूटर से डिलीट हो जाती है और वह Recycle Bin में नहीं जाती।',
      sectionName: 'HSSC Police Exam',
      testId: 'test-hssc-police-full-1',
    }
  ]
};

// Fill in other tests with default questions if not found
export function getQuestionsForTest(testId: string): Question[] {
  if (MOCK_QUESTIONS[testId]) {
    return MOCK_QUESTIONS[testId];
  }
  if (HARYANA_POLICE_CUSTOM_MOCKS[testId]) {
    return HARYANA_POLICE_CUSTOM_MOCKS[testId];
  }
  // Generate generic questions if none match
  const test = MOCK_TESTS.find(t => t.id === testId);
  const size = test ? test.questionCount : 5;
  const sections = ['Quantitative Aptitude', 'Reasoning Ability', 'English Language'];
  const questions: Question[] = [];
  
  for (let i = 1; i <= size; i++) {
    const sec = sections[(i - 1) % sections.length];
    questions.push({
      id: `q-gen-${testId}-${i}`,
      text: `This is Mock Question #${i} for Section: ${sec}. Read the passage/problem carefully and select the correct option.`,
      options: [`Option A (Correct answer representation)`, `Option B (Distractor choice)`, `Option C (Alternative answer)`, `Option D (None of the above)`],
      correctIndex: 0,
      explanation: `For Question #${i}, Option A is the correct answer because it satisfies all the constraint rules specified in the problem statement.`,
      sectionName: sec,
      testId: testId
    });
  }
  return questions;
}

// 5. Initial Test Attempts (Test attempts history in dashboard)
export const INITIAL_ATTEMPTS: TestAttempt[] = [
  {
    id: 'attempt-1',
    userId: 'user-default',
    testId: 'test-sbi-po-full-1',
    score: 78.5,
    accuracy: 85,
    percentile: 94.2,
    status: 'COMPLETED',
    startedAt: '2026-06-20T10:00:00Z',
    submittedAt: '2026-06-20T10:45:00Z',
    responses: [],
    analytics: {
      id: 'an-1',
      attemptId: 'attempt-1',
      sectionTimeTaken: {
        'Quantitative Aptitude': 1100,
        'Reasoning Ability': 950,
        'English Language': 650
      },
      weakChapters: ['Simple Interest', 'Sentence Correction'],
      strongChapters: ['Syllogism', 'Average', 'Direction Sense']
    }
  },
  {
    id: 'attempt-2',
    userId: 'user-default',
    testId: 'test-ssc-cgl-full-1',
    score: 145.0,
    accuracy: 72.5,
    percentile: 88.6,
    status: 'COMPLETED',
    startedAt: '2026-06-18T14:00:00Z',
    submittedAt: '2026-06-18T15:00:00Z',
    responses: [],
    analytics: {
      id: 'an-2',
      attemptId: 'attempt-2',
      sectionTimeTaken: {
        'Quantitative Aptitude': 1500,
        'General Intelligence': 1000,
        'English Language': 600,
        'General Awareness': 500
      },
      weakChapters: ['Geometry', 'History'],
      strongChapters: ['Coding-Decoding', 'Active-Passive Voice']
    }
  }
];

// Helper database operations simulated in-memory
export function getExamBySlug(slug: string): Exam | undefined {
  return EXAMS.find(e => e.slug === slug);
}

export function getTestsForExam(examId: string): Test[] {
  return MOCK_TESTS.filter(t => t.examId === examId);
}

export function getTestById(id: string): Test | undefined {
  return MOCK_TESTS.find(t => t.id === id);
}

// Function to grade a test attempt and calculate score and metrics
export function gradeTestAttempt(testId: string, userResponses: UserResponse[], durationSecondsUsed: number): TestAttempt {
  const questions = getQuestionsForTest(testId);
  const test = getTestById(testId)!;

  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  const finalResponses = questions.map(q => {
    const userRes = userResponses.find(r => r.questionId === q.id);
    const selected = userRes ? userRes.selectedIndex : -1;
    const marked = userRes ? userRes.isMarkedForReview : false;

    if (selected === -1) {
      unattemptedCount++;
    } else if (selected === q.correctIndex) {
      correctCount++;
    } else {
      incorrectCount++;
    }

    return {
      questionId: q.id,
      selectedIndex: selected,
      isMarkedForReview: marked
    };
  });

  // Calculate marks: +1 for correct, -0.25 for incorrect (typical exam grading)
  // Let's scale it to totalMarks
  const weight = test.totalMarks / questions.length;
  const rawScore = (correctCount * 1.0) - (incorrectCount * 0.25);
  const score = Math.max(0, Math.round(rawScore * weight * 10) / 10);

  const attemptedCount = correctCount + incorrectCount;
  const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
  
  // Percentile mock calculation: ranges between 70 to 99 based on accuracy
  const percentile = Math.min(99.9, Math.max(50.0, Math.round((70 + accuracy * 0.29) * 10) / 10));

  // Distribute time spent across sections
  const sections = Array.from(new Set(questions.map(q => q.sectionName)));
  const sectionTimeTaken: SectionTime = {};
  let remainingTime = durationSecondsUsed;
  
  sections.forEach((sec, idx) => {
    if (idx === sections.length - 1) {
      sectionTimeTaken[sec] = remainingTime;
    } else {
      const portion = Math.round(durationSecondsUsed / sections.length * (0.8 + Math.random() * 0.4));
      const allocated = Math.min(remainingTime, portion);
      sectionTimeTaken[sec] = allocated;
      remainingTime -= allocated;
    }
  });

  // Group chapters
  const weakChapters = accuracy < 75 ? ['Data Interpretation', 'Algebra Errors'] : ['Tricky Puzzles'];
  const strongChapters = accuracy >= 50 ? ['Basic Number Systems', 'Syllogism Logic', 'Vocabulary Basics'] : ['Reading Comprehension'];

  const attemptId = `attempt-${Date.now()}`;
  
  const newAttempt: TestAttempt = {
    id: attemptId,
    userId: 'user-default',
    testId: testId,
    score,
    accuracy,
    percentile,
    status: 'COMPLETED',
    startedAt: new Date(Date.now() - durationSecondsUsed * 1000).toISOString(),
    submittedAt: new Date().toISOString(),
    responses: finalResponses,
    analytics: {
      id: `an-${Date.now()}`,
      attemptId,
      sectionTimeTaken,
      weakChapters,
      strongChapters
    }
  };

  return newAttempt;
}
