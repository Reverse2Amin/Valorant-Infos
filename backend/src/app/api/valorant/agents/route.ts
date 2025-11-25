import { NextRequest } from 'next/server';
import { corsResponse, corsHeaders } from '@/lib/cors';

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  try {
    const response = await fetch('https://valorant-api.com/v1/agents?isPlayableCharacter=true');
    const data = await response.json();

    if (data.status !== 200) {
      return corsResponse({ error: 'Fehler beim Abrufen der Agents' }, 500);
    }

    return corsResponse(data);
  } catch (error) {
    console.error('Agents fetch error:', error);
    return corsResponse({ error: 'Agents konnten nicht geladen werden' }, 500);
  }
}