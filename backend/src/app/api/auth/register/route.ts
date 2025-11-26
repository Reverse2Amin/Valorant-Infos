import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { corsResponse } from '@/lib/cors';
import bcrypt from 'bcrypt';

export async function OPTIONS() {
  return corsResponse(new NextResponse(null, { status: 204 }));
}

export async function POST(req: Request) {
  console.log("--> REGISTER Anfrage empfangen");

  try {
    const body = await req.json();
    console.log("Daten:", body);

   
    const { username, password, email, name } = body;

    if (!username || !password) {
        console.log("Fehler: Username/Passwort fehlt");
        return corsResponse(NextResponse.json({ error: 'Username und Passwort fehlen' }, { status: 400 }));
    }

   
    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) {
        console.log("Fehler: Username vergeben");
        return corsResponse(NextResponse.json({ error: 'Username bereits vergeben' }, { status: 409 }));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
 
    const user = await prisma.user.create({
      data: { 
          username, 
          password: hashedPassword, 
          name: name || "",
          email: email || null 
      },
    });

    console.log("User erstellt, ID:", user.id);
    return corsResponse(NextResponse.json({ message: 'OK' }));

  } catch (error) {
      console.error("SERVER ERROR REGISTER:", error);
      
      return corsResponse(NextResponse.json({ error: 'Server Fehler beim Erstellen' }, { status: 500 }));
  }
}