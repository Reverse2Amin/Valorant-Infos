import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { corsResponse, corsHeaders, verifyToken } from '@/lib/cors';

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function DELETE(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return corsResponse({ error: 'Nicht autorisiert' }, 401);
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return corsResponse({ error: 'Ungültiger Token' }, 401);
    }

    await prisma.user.delete({ where: { id: parseInt(decoded.userId) } });

    return corsResponse({ message: 'Account erfolgreich gelöscht' });
  } catch (error) {
    console.error('Delete account error:', error);
    return corsResponse({ error: 'Account löschen fehlgeschlagen' }, 500);
  }
}