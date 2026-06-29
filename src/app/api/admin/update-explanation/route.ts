import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function replaceExplanationInFile(filePath: string, questionId: string, newExplanation: string): boolean {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find where the question ID is declared
    const idPattern = new RegExp(`"id"\\s*:\\s*"${questionId}"`);
    const match = content.match(idPattern);
    if (!match) return false;
    
    const idIndex = match.index!;
    
    // Search within next 2500 characters for the "explanation" key
    const searchArea = content.substring(idIndex, idIndex + 2500);
    const expMatch = searchArea.match(/"explanation"\s*:\s*"/);
    if (!expMatch) return false;
    
    const expValueStartIdx = idIndex + expMatch.index! + expMatch[0].length;
    
    // Find the end of the double-quoted string (accounting for escaped quotes \")
    let endIdx = expValueStartIdx;
    while (endIdx < content.length) {
      if (content[endIdx] === '"' && content[endIdx - 1] !== '\\') {
        break;
      }
      endIdx++;
    }
    
    if (endIdx >= content.length) return false;
    
    // Escape the new explanation for storing in a JSON double-quoted string
    const escapedExplanation = newExplanation
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r');
      
    // Reconstruct the file content
    const newContent = content.substring(0, expValueStartIdx) + escapedExplanation + content.substring(endIdx);
    fs.writeFileSync(filePath, newContent, 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing explanation to file ${filePath}:`, err);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const { questionId, newExplanation } = await req.json();

    if (!questionId || !newExplanation) {
      return NextResponse.json({ success: false, error: 'Missing questionId or newExplanation' }, { status: 400 });
    }

    const dataFiles = [
      'src/groupDMocksData.ts',
      'src/haryanaPoliceMocksData.ts',
      'src/haryanaPoliceExpertMockData.ts',
      'src/haryanaPoliceExpertMockData2.ts',
      'src/sscMocksData.ts',
      'src/mockData.ts'
    ];

    let updated = false;
    for (const file of dataFiles) {
      const filePath = path.resolve(file);
      if (fs.existsSync(filePath)) {
        if (replaceExplanationInFile(filePath, questionId, newExplanation)) {
          console.log(`Successfully updated explanation for ${questionId} in ${file}`);
          updated = true;
          break;
        }
      }
    }

    if (updated) {
      return NextResponse.json({ success: true, message: 'Explanation updated successfully in mock database files!' });
    } else {
      return NextResponse.json({ success: false, error: 'Question ID not found in any data files' }, { status: 404 });
    }
  } catch (error: any) {
    console.error('Error updating explanation:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
