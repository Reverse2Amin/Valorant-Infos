import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { corsResponse, corsHeaders, verifyToken } from '@/lib/cors';

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return corsResponse({ error: 'Nicht autorisiert' }, 401);
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded || !decoded.isAdmin) {
      return corsResponse({ error: 'Keine Admin-Berechtigung' }, 403);
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        isAdmin: true,
        _count: {
          select: { favorites: true },
        },
      },
      orderBy: { id: 'desc' },
    });

    return corsResponse(users);
  } catch (error) {
    console.error('Get users error:', error);
    return corsResponse({ error: 'User konnten nicht geladen werden' }, 500);
  }
}