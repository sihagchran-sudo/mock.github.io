const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const scratchDir = 'C:\\Users\\dell\\.gemini\\antigravity\\brain\\d839deef-9e5e-44c7-badd-2ef017d13ae2\\scratch';

async function extractText(pdfName) {
  const pdfPath = path.join(__dirname, pdfName);
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdfParse(dataBuffer);
  
  const textName = pdfName.replace('.pdf', '.txt');
  const textPath = path.join(scratchDir, textName);
  fs.writeFileSync(textPath, data.text);
  console.log(`Successfully extracted ${pdfName} to ${textName}`);
}

async function run() {
  await extractText('HSSC_Group_D_Hard_Mock_100_Questions.pdf');
  await extractText('HSSC_Group_D_Hard_Mock_100_Questions (1).pdf');
  await extractText('HSSC_Premium_Mock_Test_6_ValueQuestions.pdf');
}

run().catch(console.error);
