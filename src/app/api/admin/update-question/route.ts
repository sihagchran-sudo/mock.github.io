import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import fs from 'fs';
import path from 'path';

function replaceQuestionInFile(filePath: string, questionId: string, updatedQ: any): boolean {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find where the question ID is declared
    const idPattern = new RegExp(`"id"\\s*:\\s*"${questionId}"|'id'\\s*:\\s*'${questionId}'`);
    const match = content.match(idPattern);
    if (!match) return false;
    
    const idIndex = match.index!;
    
    // Scan backward to find the start of the object (opening brace '{')
    let startIdx = idIndex;
    while (startIdx >= 0) {
      if (content[startIdx] === '{') {
        break;
      }
      startIdx--;
    }
    
    if (startIdx < 0) return false;
    
    // Scan forward to find the matching closing brace '}'
    let endIdx = startIdx;
    let braceCount = 0;
    let inDoubleQuotes = false;
    let inSingleQuotes = false;
    let escaped = false;
    
    while (endIdx < content.length) {
      const char = content[endIdx];
      
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === '"' && !inSingleQuotes) {
        inDoubleQuotes = !inDoubleQuotes;
      } else if (char === "'" && !inDoubleQuotes) {
        inSingleQuotes = !inSingleQuotes;
      } else if (!inDoubleQuotes && !inSingleQuotes) {
        if (char === '{') {
          braceCount++;
        } else if (char === '}') {
          braceCount--;
          if (braceCount === 0) {
            break;
          }
        }
      }
      endIdx++;
    }
    
    if (braceCount !== 0 || endIdx >= content.length) {
      return false;
    }
    
    // Construct the new question string with clean spacing
    const newObjectStr = JSON.stringify({
      id: questionId,
      text: updatedQ.text,
      options: updatedQ.options,
      correctIndex: Number(updatedQ.correctIndex),
      explanation: updatedQ.explanation,
      sectionName: updatedQ.sectionName,
      testId: updatedQ.testId
    }, null, 2);
    
    // Reconstruct the file content
    const newContent = content.substring(0, startIdx) + newObjectStr + content.substring(endIdx + 1);
    fs.writeFileSync(filePath, newContent, 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing question to file ${filePath}:`, err);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { questionId, text, options, correctIndex, explanation, sectionName, testId } = body;

    if (!questionId || !text || !options || correctIndex === undefined || explanation === undefined) {
      return NextResponse.json({ success: false, error: 'Missing required question fields' }, { status: 400 });
    }

    // 1. Save override to the database SystemSetting table for instant production persistence
    try {
      const key = `q_override_${questionId}`;
      const payload = JSON.stringify({
        text,
        options,
        correctIndex: Number(correctIndex),
        explanation,
        sectionName,
        testId
      });

      await prisma.systemSetting.upsert({
        where: { key },
        update: { value: payload },
        create: { key, value: payload }
      });
      console.log(`Saved question override to database for question ${questionId}`);
    } catch (dbErr) {
      console.error('Failed to save override to database:', dbErr);
    }

    // 2. Modify files on disk
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
        if (replaceQuestionInFile(filePath, questionId, {
          text,
          options,
          correctIndex,
          explanation,
          sectionName,
          testId
        })) {
          console.log(`Successfully updated question ${questionId} on disk in ${file}`);
          updated = true;
          break;
        }
      }
    }

    if (updated) {
      return NextResponse.json({ success: true, message: 'Question updated successfully in database and disk files!' });
    } else {
      // It's still a success since database override works, but warn that file wasn't found
      return NextResponse.json({ 
        success: true, 
        message: 'Question override saved in database, but static file was not found/updated.' 
      });
    }
  } catch (error: any) {
    console.error('Error updating question:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
