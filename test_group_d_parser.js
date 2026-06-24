const fs = require('fs');
const path = require('path');

const txtPath1 = 'C:\\Users\\dell\\.gemini\\antigravity\\brain\\d839deef-9e5e-44c7-badd-2ef017d13ae2\\scratch\\HSSC_Group_D_Hard_Mock_100_Questions.txt';
const txtPath2 = 'C:\\Users\\dell\\.gemini\\antigravity\\brain\\d839deef-9e5e-44c7-badd-2ef017d13ae2\\scratch\\HSSC_Premium_Mock_Test_6_ValueQuestions.txt';

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
  
  // Specific spelling replacements
  let t = text;
  t = t.replace(/Ɏ/g, '');
  t = t.replace(/ह\s*रि\s*या\s*णा/g, 'हरियाणा');
  t = t.replace(/ह\s*रि\s*या\s*ण\s*वी/g, 'हरियाणवी');
  t = t.replace(/अमे\s*रि\s*का/g, 'अमेरिका');
  t = t.replace(/प\s*रि\s*य\s*ो\s*ज\s*ना/g, 'परियोजना');
  t = t.replace(/प\s*रि\s*व\s*ि\s*ह\s*न/g, 'परिवहन');
  t = t.replace(/बो%र्ज/g, 'बोर्ड');
  t = t.replace(/चिं%ीगढ़/g, 'चंडीगढ़');
  t = t.replace(/छोटFरिाम/g, 'छोटूराम');
  t = t.replace(/काबFर्जɔजए/g, 'कार्बूजिए');
  t = t.replace(/आČर्ध/g, 'आर्द्र');
  t = t.replace(/कुƙक्षेत्र/g, 'कुरुक्षेत्र');
  t = t.replace(/तावेडु/g, 'तावडू');
  t = t.replace(/मंɏदरि/g, 'मंदिर');
  t = t.replace(/ɏदरि/g, 'दिर');
  t = t.replace(/ɏद/g, 'दि');
  t = t.replace(/ɔजिले/g, 'जिले');
  t = t.replace(/ɔजले/g, 'जिले');
  t = t.replace(/ɔज/g, 'जि');
  t = t.replace(/ɒशक्षा/g, 'शिक्षा');
  t = t.replace(/ɒश/g, 'शि');
  t = t.replace(/ɓशल्प/g, 'शिल्प');
  t = t.replace(/ɓश/g, 'शि');
  t = t.replace(/ɓभ/g, 'भि');
  t = t.replace(/ɓ/g, 'भि');
  t = t.replace(/ɑम/g, 'मि');
  t = t.replace(/ɑ/g, 'मि');

  // Convert font layout short i characters
  t = t.replace(/[ɐɔɒɓɍɏɑɞ]([\u0915-\u0939](?:\u094d[\u0915-\u0939])*)/g, '$1\u093f');
  
  // Specific word corrections for Devanagari mappings
  t = t.replace(/रिा/g, 'रा');
  t = t.replace(/रिी/g, 'री');
  t = t.replace(/रिे/g, 'रे');
  t = t.replace(/रिो/g, 'रो');
  
  t = t.replace(/किि/g, 'कि');
  t = t.replace(/जिि/g, 'जि');
  t = t.replace(/जिा/g, 'जा');
  t = t.replace(/विि/g, 'वि');
  t = t.replace(/स्थिि/g, 'स्थित');
  t = t.replace(/तिृ/g, 'तृ');
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
  t = t.replace(/रि(?![\u0900-\u097f])/g, 'र');
  
  // Clean up remaining Devanagari issues
  t = stripTrailingI(t);
  
  // Fix double spaces
  t = t.replace(/\s+/g, ' ');
  
  return t.trim();
}

function parseFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Split by "प्रश्न"
  const parts = content.split(/प्रश्न/g);
  console.log(`File: ${path.basename(filePath)} - Split into ${parts.length} parts`);
  
  const questions = [];
  let currentSection = "General Knowledge";
  
  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i].trim();
    if (!chunk) continue;
    
    // Check if chunk contains section markers, e.g. "खंड 2"
    // Since section markers are at the start of next section, they might appear in the previous question chunk.
    // Let's see: we can parse section dynamically
    
    // Try to extract question text, options, and answer key
    // Options start with (A) or (a)
    const optIndex = chunk.search(/\([A-D]\)/);
    if (optIndex === -1) continue;
    
    let rawQText = chunk.substring(0, optIndex).trim();
    // Strip leading number, e.g. "1.", "5.", "101."
    rawQText = rawQText.replace(/^\d+\s*[\.\-\:]?\s*/, '').trim();
    
    const rawOptionsAndAns = chunk.substring(optIndex).trim();
    
    // Extract options
    const optAMatch = rawOptionsAndAns.match(/\(A\)\s*([\s\S]+?)(?=\([B-D]\)|Correct Answer)/i);
    const optBMatch = rawOptionsAndAns.match(/\(B\)\s*([\s\S]+?)(?=\([C-D]\)|Correct Answer)/i);
    const optCMatch = rawOptionsAndAns.match(/\(C\)\s*([\s\S]+?)(?=\(D\)|Correct Answer)/i);
    const optDMatch = rawOptionsAndAns.match(/\(D\)\s*([\s\S]+?)(?=Correct Answer|\[Ans)/i);
    
    const ansMatch = rawOptionsAndAns.match(/\[Ans:\s*([A-D])\]/i);
    
    if (optAMatch && optBMatch && optCMatch && optDMatch && ansMatch) {
      const qText = cleanText(rawQText);
      const options = [
        cleanText(optAMatch[1]),
        cleanText(optBMatch[1]),
        cleanText(optCMatch[1]),
        cleanText(optDMatch[1])
      ];
      
      const correctChar = ansMatch[1].toUpperCase();
      const correctIndex = ['A', 'B', 'C', 'D'].indexOf(correctChar);
      
      // Determine section based on question index or content keywords
      let sectionName = "Haryana GK";
      if (qText.includes("मैथ") || qText.includes("गणित") || qText.includes("औसत") || qText.includes("ब्याज") || qText.includes("संख्या") || qText.includes("कार्य") || qText.includes("प्रतिशत") || qText.includes("क्षेत्रफल") || qText.includes("लघुत्तम") || qText.includes("ट्रेन")) {
        sectionName = "Mathematics";
      } else if (qText.includes("रीजनिंग") || qText.includes("तर्कशक्ति") || qText.includes("श्रृंखला") || qText.includes("कूट") || qText.includes("दिशा") || qText.includes("सम्बन्ध") || qText.includes("विषम") || qText.includes("बैठक")) {
        sectionName = "Reasoning Ability";
      } else if (/[a-zA-Z]/.test(qText) && (qText.includes("English") || qText.includes("sentence") || qText.includes("synonym") || qText.includes("antonym") || qText.includes("spelling") || qText.includes("fill") || qText.includes("grammatical"))) {
        sectionName = "English Language";
      } else if (qText.includes("हिन्दी") || qText.includes("व्याकरण") || qText.includes("संधि") || qText.includes("समास") || qText.includes("मुहावरा") || qText.includes("पर्यायवाची") || qText.includes("शुद्ध")) {
        sectionName = "Hindi Language";
      } else if (qText.includes("विज्ञान") || qText.includes("भौतिकी") || qText.includes("रसायन") || qText.includes("जीव") || qText.includes("कोशिका") || qText.includes("न्यूटन") || qText.includes("अम्ल") || qText.includes("धातु")) {
        sectionName = "General Science";
      } else if (i > 25 && i <= 40) {
        sectionName = "General Awareness";
      }
      
      questions.push({
        text: qText,
        options,
        correctIndex,
        explanation: `${qText} का सही उत्तर विकल्प ${correctChar} है।`,
        sectionName
      });
    }
  }
  
  return questions;
}

const qs1 = parseFile(txtPath1);
console.log(`Parsed ${qs1.length} questions from File 1.`);
if (qs1.length > 0) {
  console.log("Q1:", JSON.stringify(qs1[0], null, 2));
  console.log("Q2:", JSON.stringify(qs1[1], null, 2));
  console.log("Q3:", JSON.stringify(qs1[2], null, 2));
}

const qs2 = parseFile(txtPath2);
console.log(`Parsed ${qs2.length} questions from File 2.`);
if (qs2.length > 0) {
  console.log("Q1:", JSON.stringify(qs2[0], null, 2));
  console.log("Q2:", JSON.stringify(qs2[1], null, 2));
  console.log("Q3:", JSON.stringify(qs2[2], null, 2));
}
