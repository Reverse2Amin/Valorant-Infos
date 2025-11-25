import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { corsResponse } from '@/lib/cors';
import bcrypt from 'bcrypt';

// WICHTIG für CORS
export async function OPTIONS() { return corsResponse({}, 204); }

export async function POST(req: Request) {
  console.log("--> REGISTER Anfrage erhalten"); 

  try {
    const body = await req.json();
    console.log("Daten vom Frontend:", body); 

    const { username, password, name, email } = body;

    // Validierung: Nur Username & Passwort sind Pflicht
    if (!username || !password) {
        console.log("Fehler: Daten fehlen");
        return corsResponse(NextResponse.json({ error: 'Username und Passwort fehlen' }, { status: 400 }));
    }

    // Prüfen
    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) {
        console.log("Fehler: User existiert schon");
        return corsResponse(NextResponse.json({ error: 'Username vergeben' }, { status: 409 }));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Erstellen (Email optional, falls leer machen wir null)
    const user = await prisma.user.create({
      data: { 
          username, 
          password: hashedPassword, 
          name: name || "",
          email: email || null 
      },
    });

    console.log("User erstellt:", user.id);
    return corsResponse(NextResponse.json({ message: 'Erfolgreich registriert' }));

  } catch (error) {
      console.error("CRITICAL REGISTER ERROR:", error);
      return corsResponse(NextResponse.json({ error: 'Server Fehler' }, { status: 500 }));
  }
}