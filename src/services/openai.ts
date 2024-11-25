import { Gap, Service } from '../types';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface OpenAIError {
  error: {
    message: string;
    type: string;
    param: string | null;
    code: string;
  };
}

async function makeOpenAIRequest(messages: OpenAIMessage[]): Promise<string> {
  if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your-api-key-here') {
    throw new Error('Please configure your OpenAI API key in the .env file');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages,
        temperature: 0.7,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json() as OpenAIError;
      throw new Error(errorData.error?.message || `API request failed: ${response.statusText}`);
    }

    const data = await response.json() as OpenAIResponse;
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from OpenAI API');
    }

    return data.choices[0].message.content;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`OpenAI API Error: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while generating the proposal');
  }
}

export async function generateProposal(gaps: Gap[], services: Service[]): Promise<string> {
  if (!gaps.length) {
    throw new Error('Please add at least one financial gap before generating a proposal');
  }

  if (!services.length) {
    throw new Error('Please add at least one service offering before generating a proposal');
  }

  const messages: OpenAIMessage[] = [
    {
      role: 'system',
      content: `You are an expert strategic CFO specializing in growth and financial advisory. 
Create professional proposals using clear headers, bullet points, and structured sections.
Use markdown formatting for better readability.`
    },
    {
      role: 'user',
      content: `Create a comprehensive proposal addressing these gaps and services:

Financial Gaps:
${gaps.map(g => `- ${g.description} (${g.priority} priority)
  Impact: ${g.impact}`).join('\n')}

Service Offerings:
${services.map(s => `- ${s.name} (${s.frequency} at $${s.price})
  Description: ${s.description}
  Deliverables: ${s.deliverables}`).join('\n')}

The proposal should include:

1. Executive Summary
2. Detailed Gap Analysis
3. Recommended Solutions with specific tools:
   - GoalPilot
   - ForecastIQ
   - CEO Dashboard
   - MarketPulse
   - ZenData
   - Financial Health Check-Up
   - Advisio
   - FindtheGAP
4. Implementation Timeline
5. Investment Overview
6. Expected Outcomes and KPIs`
    }
  ];

  return await makeOpenAIRequest(messages);
}

export async function detectGapsFromData(data?: string): Promise<Gap[]> {
  const messages: OpenAIMessage[] = [
    {
      role: 'system',
      content: `You are an expert financial analyst. For each gap identified, provide:
1. A clear description of the gap
2. Its business impact
3. Priority level (high/medium/low)

Format each gap as:
Description: [gap description]
Impact: [detailed impact]
Priority: [priority level]

Separate each gap with a blank line.`
    },
    {
      role: 'user',
      content: data 
        ? `Analyze this financial data and identify key gaps:\n\n${data}`
        : 'Provide 3-5 common financial gaps based on industry standards for a growing business.'
    }
  ];

  const content = await makeOpenAIRequest(messages);
  
  return content.split('\n\n')
    .filter(Boolean)
    .map(section => {
      const lines = section.split('\n');
      return {
        id: Date.now() + Math.random(),
        description: lines[0]?.replace(/^Description:\s*/i, '').trim() || 'Undefined Gap',
        impact: lines[1]?.replace(/^Impact:\s*/i, '').trim() || 'No impact specified',
        priority: (lines[2]?.replace(/^Priority:\s*/i, '').trim().toLowerCase() || 'medium') as 'low' | 'medium' | 'high'
      };
    });
}