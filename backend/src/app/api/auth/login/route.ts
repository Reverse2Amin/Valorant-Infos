import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
// WICHTIG: Wir importieren das SECRET aus der zentralen Datei!
import { corsResponse, handleOptions, SECRET } from '@/lib/cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// 1. OPTIONS für CORS
export async function OPTIONS() {
    return handleOptions();
}

// 2. POST für Login
export async function POST(req: Request) {
    console.log("--> LOGIN Versuch gestartet");

    try {
        const body = await req.json();
        const { username, password } = body;

        if (!username || !password) {
            return corsResponse(NextResponse.json({ error: 'Daten fehlen' }, { status: 400 }));
        }

        // User suchen
        const user = await prisma.user.findUnique({ 
            where: { username: username } 
        });

        if (!user) {
            console.log("User nicht gefunden:", username);
            return corsResponse(NextResponse.json({ error: 'Falsche Daten' }, { status: 401 }));
        }

        // Passwort prüfen
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            console.log("Falsches Passwort für:", username);
            return corsResponse(NextResponse.json({ error: 'Falsche Daten' }, { status: 401 }));
        }

        // TOKEN ERSTELLEN
        // Hier nutzen wir jetzt das importierte SECRET ("VALORANT1234")
        const token = jwt.sign(
            { 
                userId: user.id, 
                isAdmin: user.isAdmin, 
                username: user.username 
            },
            SECRET, // <--- DAS HIER IST DER ENTSCHEIDENDE PUNKT
            { expiresIn: '2h' }
        );

        console.log("Login erfolgreich, Token erstellt mit SECRET:", SECRET);
        
        return corsResponse(NextResponse.json({
            token,
            isAdmin: user.isAdmin,
            user: { id: user.id, username: user.username }
        }));

    } catch (error) {
        console.error("LOGIN CRASH:", error);
        return corsResponse(NextResponse.json({ error: 'Server Fehler' }, { status: 500 }));
    }
}