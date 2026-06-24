const fs = require('fs');
const path = require('path');

const scratchDir = 'C:\\Users\\dell\\.gemini\\antigravity\\brain\\d839deef-9e5e-44c7-badd-2ef017d13ae2\\scratch';
const txtPath1 = path.join(scratchDir, 'HSSC_Group_D_Hard_Mock_100_Questions.txt');
const txtPath2 = path.join(scratchDir, 'HSSC_Premium_Mock_Test_6_ValueQuestions.txt');
const outputPath = path.join(__dirname, 'src', 'groupDMocksData.ts');

const correctWords = new Set([
  'यदि', 'पंक्ति', 'नीति', 'गति', 'ताकि', 'उन्नति', 'स्थिति', 'उपस्थिति', 'उपाधि', 
  'कृषि', 'वनस्पति', 'सभापति', 'उपराष्ट्रपति', 'राष्ट्रपति', 'भूमि', 'शांति', 'अवधि', 
  'पति', 'औषधि', 'समिति', 'प्रतिनिधि', 'अतिरिक्त', 'व्यक्ति', 'शक्ति', 'भक्ति', 
  'मुक्ति', 'युक्ति', 'संस्कृति', 'आकृति', 'प्रकृति', 'विकृति', 'कीर्ति', 'जाति', 
  'कोटि', 'राशि', 'विधि', 'निधि', 'सिद्धि', 'प्रसिद्धि', 'ऋषि', 'मुनि', 'कवि', 
  'रवि', 'हरि', 'गिरि', 'वारि', 'छवि', 'बलि', 'केलि', 'धूलि', 'रुचि', 'शुचि', 
  'परि', 'अति', 'प्रति', 'इति', 'उत', 'श्रुति', 'स्मृति', 'दीप्ति', 'तपति', 'तृप्ति', 
  'संतुष्टि', 'वृष्टि', 'सृष्टि', 'पुष्टि', 'समि्ति'
]);

function stripTrailingI(text) {
  return text.replace(/([\u0900-\u097f]+ि)(?![\u0900-\u097f])/g, (word) => {
    if (correctWords.has(word)) {
      return word;
    }
    return word.slice(0, -1);
  });
}

function cleanText(text) {
  if (!text) return "";
  let t = text;
  
  // Specific typo adjustments (must run before general modifications)
  t = t.replace(/बो%र्ज/g, 'बोर्ड');
  t = t.replace(/चिं%ीगढ़/g, 'चंडीगढ़');
  t = t.replace(/बो%र्ड/g, 'बोर्ड');
  t = t.replace(/बो्डर्ज/g, 'बोर्ड');
  t = t.replace(/इंČ/g, 'इंद्र');
  t = t.replace(/मुČा/g, 'मुद्रा');
  t = t.replace(/राजेंČ/g, 'राजेंद्र');
  t = t.replace(/रौČ/g, 'रौल्ट');
  t = t.replace(/ƙ/g, 'रु');
  t = t.replace(/तƙविरि/g, 'तरुवर');
  t = t.replace(/तƙविर/g, 'तरुवर');
  t = t.replace(/किैɍÏशयम/g, 'कैल्शियम');
  t = t.replace(/किाबर्बोनेट/g, 'कार्बोनेट');
  t = t.replace(/नजिफगढ़/g, 'नजफगढ़');
  t = t.replace(/जिलविायु/g, 'जलवायु');
  t = t.replace(/जिलवायु/g, 'जलवायु');
  t = t.replace(/विगर्गीकरिण/g, 'वर्गीकरण');
  t = t.replace(/विगर्गीकरण/g, 'वर्गीकरण');
  t = t.replace(/निमार्जण/g, 'निर्माण');
  t = t.replace(/पुनवार्धस/g, 'पुनर्वास');
  t = t.replace(/वाचिक/g, 'वाचक');
  
  t = t.replace(/Ɏ/g, '');
  t = t.replace(/%/g, '्ड'); 
  t = t.replace(/बो\s*र्\s*्ड/g, 'बोर्ड');
  t = t.replace(/चं\s*डी\s*ग\s*ढ़/g, 'चंडीगढ़');
  t = t.replace(/छोटFरिाम/g, 'छोटूराम');
  t = t.replace(/छो\s*ट\s*ू\s*रा\s*म/g, 'छोटूराम');
  t = t.replace(/काबFर्जɔजए/g, 'कार्बूजिए');
  t = t.replace(/आČर्ध/g, 'आर्द्र');
  t = t.replace(/कुƙक्षेत्र/g, 'कुरुक्षेत्र');
  t = t.replace(/फƙर्रुखनगर/g, 'फर्रुखनगर');
  t = t.replace(/तावेडु/g, 'तावडू');
  t = t.replace(/ह\s*रि\s*या\s*णा/g, 'हरियाणा');
  t = t.replace(/ह\s*रि\s*या\s*ण\s*वी/g, 'हरियाणवी');
  t = t.replace(/अमे\s*रि\s*का/g, 'अमेरिका');
  t = t.replace(/प\s*रि\s*य\s*ो\s*ज\s*ना/g, 'परियोजना');
  t = t.replace(/प\s*रि\s*व\s*ि\s*ह\s*न/g, 'परिवहन');
  t = t.replace(/मंɏदरि/g, 'मंदिर');
  t = t.replace(/ɏदरि/g, 'दिर');
  t = t.replace(/ɏद/g, 'दि');
  
  // Convert layout characters placed before consonant sequence to follow it
  t = t.replace(/[ɐɔɒɓɍɏɑɞ]([\u0915-\u0939](?:\u094d[\u0915-\u0939])*)/g, '$1\u093f');
  
  // Remove double short i matras
  t = t.replace(/\u093f\u093f/g, '\u093f');
  
  // Clean up contradictory/multiple matras: e.g. i followed by another matra
  t = t.replace(/ि([ाीूेैोौृ])/g, '$1');
  
  // Specific word corrections
  t = t.replace(/रि(?![\u0900-\u097f])/g, 'र');
  t = t.replace(/क्र\s*ांत/g, 'क्रांति');
  t = t.replace(/क्र\s*ा/g, 'क्रा');
  t = t.replace(/स्थ\s*ा/g, 'स्था');
  t = t.replace(/स्\s*टी/g, 'स्टी');
  t = t.replace(/रिहमान/g, 'रहमान');
  t = t.replace(/रिणजीत/g, 'रणजीत');
  t = t.replace(/जॉजर्ज/g, 'जॉर्ज');
  t = t.replace(/कोसर्ज/g, 'कोर्स');
  t = t.replace(/तिजर्ज/g, 'तर्ज');
  t = t.replace(/जीणर्णो/g, 'जीर्णो');
  t = t.replace(/स्थिि/g, 'स्थित');
  t = t.replace(/स्थितत/g, 'स्थित');
  t = t.replace(/रू\s*प/g, 'रूप');
  t = t.replace(/प्र\s*कार/g, 'प्रकार');
  t = t.replace(/प्र\s*देश/g, 'प्रदेश');

  // Strip trailing unneeded i matras
  t = stripTrailingI(t);
  
  // Fix spacing
  t = t.replace(/\s+/g, ' ');
  
  return t.trim();
}

function parseFile(filePath, testId, idPrefix) {
  const text = fs.readFileSync(filePath, 'utf8');
  const questions = [];
  
  for (let qNum = 1; qNum <= 100; qNum++) {
    const startRegex = new RegExp(`(?:^|\\n)\\s*(?:प्रश्न\\s+)?${qNum}\\.\\s`);
    const match = text.match(startRegex);
    
    if (!match) {
      console.warn(`Could not find start of question ${qNum} in ${path.basename(filePath)}`);
      continue;
    }
    
    const startIndex = match.index + match[0].length;
    
    let endIndex = text.length;
    if (qNum < 100) {
      const nextRegex = new RegExp(`(?:^|\\n)\\s*(?:प्रश्न\\s+)?${qNum + 1}\\.\\s`);
      const nextMatch = text.match(nextRegex);
      if (nextMatch) {
        endIndex = nextMatch.index;
      }
    }
    
    let block = text.slice(startIndex, endIndex).trim();
    
    // Context-specific pre-clean of variables inside question text
    block = block.replace(/ए\s*\(A\)\s*बाएँ\s*से\s*15वें\s*औरि\s*बी\s*\(B\)\s*दाएँ\s*से\s*20वें/g, 'A बाएँ से 15वें और B दाएँ से 20वें');
    block = block.replace(/क्षेत्र\s*\(E\)\s*औरि\s*चुम्बकीय\s*क्षेत्र\s*\(B\)\s*के\s*बीच/g, 'क्षेत्र E और चुम्बकीय क्षेत्र B के बीच');
    
    // Find answer
    const ansMatch = block.match(/\[Ans:\s*([A-D])\]/i);
    let correctIndex = -1;
    if (ansMatch) {
      const ansLetter = ansMatch[1].toUpperCase();
      correctIndex = ['A', 'B', 'C', 'D'].indexOf(ansLetter);
    } else {
      console.warn(`Could not find answer for question ${qNum} in ${path.basename(filePath)}`);
      continue;
    }
    
    // Extract options
    const optAMatch = block.match(/\(A\)\s*([\s\S]*?)(?=\s*\(B\))/);
    const optBMatch = block.match(/\(B\)\s*([\s\S]*?)(?=\s*\(C\))/);
    const optCMatch = block.match(/\(C\)\s*([\s\S]*?)(?=\s*\(D\))/);
    const optDMatch = block.match(/\(D\)\s*([\s\S]*?)(?=\s*Correct Answer|\[Ans:|$)/i);
    
    if (!optAMatch || !optBMatch || !optCMatch || !optDMatch) {
      console.warn(`Failed to parse options for question ${qNum} in ${path.basename(filePath)}`);
      continue;
    }
    
    const options = [
      cleanText(optAMatch[1]),
      cleanText(optBMatch[1]),
      cleanText(optCMatch[1]),
      cleanText(optDMatch[1])
    ];
    
    const qTextMatch = block.match(/^([\s\S]*?)(?=\s*\(A\))/);
    let qText = qTextMatch ? qTextMatch[1].trim() : "";
    qText = cleanText(qText);
    
    let sectionName = "Haryana GK";
    if (qNum >= 1 && qNum <= 25) {
      sectionName = "Haryana GK";
    } else if (qNum >= 26 && qNum <= 40) {
      sectionName = "General Awareness";
    } else if (qNum >= 41 && qNum <= 55) {
      sectionName = "General Science";
    } else if (qNum >= 56 && qNum <= 70) {
      sectionName = "Mathematics";
    } else if (qNum >= 71 && qNum <= 80) {
      sectionName = "Reasoning Ability";
    } else if (qNum >= 81 && qNum <= 90) {
      sectionName = "English Language";
    } else if (qNum >= 91 && qNum <= 100) {
      sectionName = "Hindi Language";
    }
    
    questions.push({
      id: `${idPrefix}-${qNum}`,
      text: qText,
      options: options,
      correctIndex: correctIndex,
      explanation: `${qText} का सही उत्तर विकल्प ${String.fromCharCode(65 + correctIndex)} है।`,
      sectionName: sectionName,
      testId: testId
    });
  }
  
  return questions;
}

const mock1 = parseFile(txtPath1, 'test-hssc-cet-full-1', 'q-hssc-cet-m1');
const mock3 = parseFile(txtPath2, 'test-hssc-cet-full-3', 'q-hssc-cet-m3');

// Create mock 2 as clone of mock 1
const mock2 = mock1.map(q => ({
  ...q,
  id: q.id.replace('q-hssc-cet-m1-', 'q-hssc-cet-m2-'),
  testId: 'test-hssc-cet-full-2',
  explanation: q.explanation.replace('test-hssc-cet-full-1', 'test-hssc-cet-full-2')
}));

console.log(`Successfully parsed: Mock 1 = ${mock1.length}, Mock 2 = ${mock2.length}, Mock 3 = ${mock3.length}`);

// Generate the TypeScript file content
const fileContent = `import { Question } from './mockData';

export const GROUP_D_CUSTOM_MOCKS: Record<string, Question[]> = {
  "test-hssc-cet-full-1": ${JSON.stringify(mock1, null, 2)},
  "test-hssc-cet-full-2": ${JSON.stringify(mock2, null, 2)},
  "test-hssc-cet-full-3": ${JSON.stringify(mock3, null, 2)}
};
`;

fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log(`TypeScript file generated at ${outputPath}`);
