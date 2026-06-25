const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

const scratchDir = 'C:\\Users\\dell\\.gemini\\antigravity\\brain\\d839deef-9e5e-44c7-badd-2ef017d13ae2\\scratch';

async function extractText(pdfName) {
  const pdfPath = path.join(__dirname, pdfName);
  const buf = fs.readFileSync(pdfPath);
  const uint8 = new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  const parser = new PDFParse(uint8);
  const data = await parser.getText();
  
  const textName = pdfName.replace('.pdf', '.txt');
  const textPath = path.join(scratchDir, textName);
  fs.writeFileSync(textPath, data.text);
  console.log(`Successfully extracted ${pdfName} to ${textName}`);
}

async function run() {
  await extractText('HSSC CET Group C Blog Post.pdf');
  await extractText('SBI PO 2026 Blog Rewrite.pdf');
  await extractText('SSC CGL 2026 Blog Rewrite.pdf');
}

run().catch(console.error);

