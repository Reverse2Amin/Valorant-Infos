import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { corsResponse, corsHeaders } from '@/lib/cors';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

function generateToken(userId: string | number, email: string, isAdmin: boolean) {
  return jwt.sign({ userId, email, isAdmin }, JWT_SECRET, { expiresIn: '7d' });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return corsResponse({ error: 'E-Mail und Passwort erforderlich' }, 400);
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return corsResponse({ error: 'Ungültige Anmeldedaten' }, 401);
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return corsResponse({ error: 'Ungültige Anmeldedaten' }, 401);
    }

    const token = generateToken(user.id, user.email ?? '', user.isAdmin);

    return corsResponse({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error: unknown) {
    console.error('Login error:', error);
    return corsResponse({ error: 'Login fehlgeschlagen' }, 500);
  }
}