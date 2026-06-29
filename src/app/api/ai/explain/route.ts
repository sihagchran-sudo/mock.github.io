import { NextResponse } from 'next/server';

interface ApiKeyConfig {
  provider: string;
  apiKey: string;
  baseUrl: string;
  model: string;
}

export async function POST(req: Request) {
  try {
    const { questionText, options, correctIndex, sectionName } = await req.json();

    // Parse the API keys configuration array from env
    const configStr = process.env.API_KEYS_CONFIG;
    let configs: ApiKeyConfig[] = [];

    if (configStr) {
      try {
        // Strip single quotes if they wrap the JSON array in env
        const cleanConfigStr = configStr.trim().replace(/^'|'$/g, '');
        configs = JSON.parse(cleanConfigStr);
      } catch (err) {
        console.error('Failed to parse API_KEYS_CONFIG JSON:', err);
      }
    }

    // Fallback if no configs parsed
    if (configs.length === 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'No valid API keys configured in environment variables.' 
      }, { status: 500 });
    }

    const optionsStr = options.map((opt: string, idx: number) => `${String.fromCharCode(65 + idx)}) ${opt}`).join('\n');
    const correctLetter = String.fromCharCode(65 + correctIndex);

    const systemPrompt = `You are an expert tutor for the HSSC Haryana Group D / SSC CGL competitive exams. 
Your task is to write a highly detailed, extremely clear, and bilingual (English/Hindi) step-by-step explanation for the mock test question.

Format guidelines:
1. Provide a detailed English explanation under "**Explanation (English):**".
2. Provide a detailed Hindi explanation under "**व्याख्या (हिंदी):**".
3. Use a double newline to separate the English and Hindi parts.
4. Include an "**Exam Tip:**" (and/or "**परीक्षा टिप:**") at the bottom to explain shortcuts or important memory hooks.
5. Use markdown bolding (double asterisks like **Statement I**) where appropriate to highlight key terms.
6. Return ONLY the explanation content. Do not include any introductory remarks like "Here is the explanation" or "Sure, I can help".`;

    const userMessage = `Section: ${sectionName}
Question:
${questionText}

Options:
${optionsStr}

Correct Answer: Option ${correctLetter} (${options[correctIndex] || ''})`;

    let errors: string[] = [];

    // Loop through the configs sequentially (Failover loop)
    for (let i = 0; i < configs.length; i++) {
      const config = configs[i];
      console.log(`Attempting AI explanation generation using provider: ${config.provider} (Model: ${config.model})`);

      try {
        const response = await fetch(`${config.baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.apiKey}`
          },
          body: JSON.stringify({
            model: config.model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userMessage }
            ],
            temperature: 0.3,
            max_tokens: 2000
          })
        });

        if (response.ok) {
          const data = await response.json();
          const explanation = data.choices?.[0]?.message?.content || '';
          
          if (explanation.trim()) {
            console.log(`Successfully generated explanation with provider: ${config.provider}`);
            return NextResponse.json({ success: true, explanation, provider: config.provider });
          } else {
            throw new Error('API returned an empty completion response.');
          }
        } else {
          const errText = await response.text();
          let parsedError = errText;
          try {
            const errJson = JSON.parse(errText);
            parsedError = errJson.error?.message || errJson.message || errText;
          } catch (_) {}
          
          throw new Error(`HTTP ${response.status} (${response.statusText}): ${parsedError}`);
        }
      } catch (err: any) {
        const errMsg = `Provider ${config.provider} failed: ${err.message}`;
        console.error(errMsg);
        errors.push(errMsg);
        // Continue to the next API key config in the loop
      }
    }

    // If we exhausted all API keys and all failed
    return NextResponse.json({ 
      success: false, 
      error: `All configured API keys failed to generate solution:\n${errors.join('\n')}` 
    }, { status: 502 });

  } catch (error: any) {
    console.error('Core routing error generating AI explanation:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
