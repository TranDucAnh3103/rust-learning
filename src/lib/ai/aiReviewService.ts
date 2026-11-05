import { AIReviewResult, AISettings, CodeExercise } from '@/types';

export const DEFAULT_AI_SETTINGS: AISettings = {
  apiBaseUrl: 'https://api.openai.com/v1',
  apiKey: '',
  model: 'gpt-4o-mini',
  requestTimeoutMs: 25000,
  persistToSession: false,
};

const SESSION_STORAGE_KEY = 'rustforge_session_ai_settings';

// In-memory holder for API credentials
let inMemorySettings: AISettings = { ...DEFAULT_AI_SETTINGS };

/**
 * Loads AI settings either from in-memory cache or sessionStorage if user opted in.
 */
export function getAISettings(): AISettings {
  if (inMemorySettings.apiKey) {
    return inMemorySettings;
  }

  try {
    const sessionRaw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (sessionRaw) {
      const parsed = JSON.parse(sessionRaw);
      inMemorySettings = {
        apiBaseUrl: parsed.apiBaseUrl || DEFAULT_AI_SETTINGS.apiBaseUrl,
        apiKey: parsed.apiKey || '',
        model: parsed.model || DEFAULT_AI_SETTINGS.model,
        requestTimeoutMs: Number(parsed.requestTimeoutMs) || DEFAULT_AI_SETTINGS.requestTimeoutMs,
        persistToSession: true,
      };
      return inMemorySettings;
    }
  } catch {
    // sessionStorage not available or disabled
  }

  return inMemorySettings;
}

/**
 * Saves AI settings in-memory, or to sessionStorage if persistToSession is opted-in.
 */
export function saveAISettings(settings: AISettings): void {
  inMemorySettings = { ...settings };

  try {
    if (settings.persistToSession && settings.apiKey) {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(settings));
    } else {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
  } catch {
    // sessionStorage error fallback
  }
}

/**
 * Clears AI credentials from both memory and sessionStorage.
 */
export function clearAISettings(): void {
  inMemorySettings = { ...DEFAULT_AI_SETTINGS };
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    // ignore
  }
}

/**
 * Tests connection with the configured provider.
 */
export async function testAIConnection(settings: AISettings): Promise<{ success: boolean; message: string }> {
  if (!settings.apiKey) {
    return { success: false, message: 'API key is required to test the connection.' };
  }

  const cleanBase = settings.apiBaseUrl.replace(/\/+$/, '');
  const endpoint = `${cleanBase}/chat/completions`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), Math.min(settings.requestTimeoutMs, 12000));

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${settings.apiKey.trim()}`,
      },
      body: JSON.stringify({
        model: settings.model || 'gpt-4o-mini',
        messages: [{ role: 'user', content: 'Ping. Respond with "ok".' }],
        max_tokens: 5,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.status === 401) {
      return { success: false, message: 'Authentication failed (401): The provided API key is invalid or expired.' };
    }
    if (response.status === 429) {
      return { success: false, message: 'Rate limit or quota exceeded (429): Check your provider billing or limits.' };
    }
    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      return { success: false, message: `Server returned error ${response.status}: ${errText.slice(0, 150)}` };
    }

    return { success: true, message: 'Connection successful! Provider is ready to review code.' };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    if (err instanceof Error) {
      if (err.name === 'AbortError') {
        return { success: false, message: 'Connection timed out. Check network or base URL.' };
      }
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        return {
          success: false,
          message:
            'CORS or Network Error: This static browser client was blocked from reaching the API. Verify that the provider allows direct browser requests (CORS) or use an endpoint with appropriate CORS headers.',
        };
      }
      return { success: false, message: `Network error: ${err.message}` };
    }
    return { success: false, message: 'Unknown error occurred while contacting API endpoint.' };
  }
}

/**
 * Requests an AI code review using an OpenAI-compatible chat completions endpoint.
 */
export async function requestAICodeReview(
  exercise: CodeExercise,
  studentCode: string,
  settings: AISettings
): Promise<AIReviewResult> {
  if (!settings.apiKey) {
    throw new Error('API key is not configured. Please open Settings to set your OpenAI-compatible API key.');
  }

  const cleanBase = settings.apiBaseUrl.replace(/\/+$/, '');
  const endpoint = `${cleanBase}/chat/completions`;

  const systemPrompt = `You are a strict, senior Rust educator and code reviewer for RustForge.
Your goal is to evaluate student code against specific exercise instructions and Rust language principles.
IMPORTANT RULES:
1. You must assess code according to the given lesson requirements and Rust idiomatic design.
2. You must respond ONLY with a valid JSON object matching the requested schema. No markdown backticks, no markdown blocks.
3. Because you are an LLM and not a compiler binary, compilerDiagnostics must strictly be null. Never fabricate rustc error headers.

Required JSON format:
{
  "isCorrect": boolean,
  "score": number, // 0 to 100
  "conceptualErrors": string[], // list of conceptual or syntax misunderstandings
  "feedback": string, // clear pedagogic explanation
  "suggestedFix": string, // idiomatic correction or guidance
  "improvementTips": string[], // tips to write more idiomatic Rust
  "compilerDiagnostics": null
}`;

  const userPrompt = `EXERCISE TITLE: ${exercise.title}
INSTRUCTIONS: ${exercise.instructions}
EXPECTED OUTCOME: ${exercise.expectedOutcome}

STUDENT SUBMITTED CODE:
\`\`\`rust
${studentCode}
\`\`\`

Evaluate this Rust code. Output pure JSON matching the schema.`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), settings.requestTimeoutMs);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${settings.apiKey.trim()}`,
      },
      body: JSON.stringify({
        model: settings.model || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.1,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.status === 401) {
      throw new Error('Authentication failed (401): The configured API key was rejected by the provider.');
    }
    if (response.status === 429) {
      throw new Error('Rate limit exceeded (429): Your API provider quota or rate limit has been reached.');
    }
    if (!response.ok) {
      const errBody = await response.text().catch(() => '');
      throw new Error(`API provider returned HTTP ${response.status}: ${errBody.slice(0, 180)}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('Invalid response structure: No message content returned from LLM.');
    }

    // Extract JSON from response (handling potential accidental markdown wrapping)
    let jsonText = content.trim();
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '');
    }

    const parsed = JSON.parse(jsonText);

    // Validate runtime structure
    return {
      isCorrect: Boolean(parsed.isCorrect),
      score: typeof parsed.score === 'number' ? Math.max(0, Math.min(100, Math.round(parsed.score))) : 50,
      conceptualErrors: Array.isArray(parsed.conceptualErrors) ? parsed.conceptualErrors.map(String) : [],
      feedback: typeof parsed.feedback === 'string' ? parsed.feedback : 'Review complete.',
      suggestedFix: typeof parsed.suggestedFix === 'string' ? parsed.suggestedFix : '',
      improvementTips: Array.isArray(parsed.improvementTips) ? parsed.improvementTips.map(String) : [],
      compilerDiagnostics: null, // Strictly null: never claim LLM output is rustc
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    if (err instanceof Error) {
      if (err.name === 'AbortError') {
        throw new Error('AI review request timed out. Please check your network or increase the timeout in Settings.');
      }
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        throw new Error(
          'Browser CORS / Network Error: The static browser client could not connect directly to the provider endpoint. Ensure the provider supports browser CORS requests or consider a CORS-friendly gateway.'
        );
      }
      throw err;
    }
    throw new Error('Unknown error during AI code review.');
  }
}
