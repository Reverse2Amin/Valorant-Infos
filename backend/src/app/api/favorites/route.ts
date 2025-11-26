import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { corsResponse, handleOptions, getUserFromRequest } from '@/lib/cors';
import { Prisma } from '@prisma/client';


export async function OPTIONS() { 
    return handleOptions(); 
}


export async function GET(req: Request) {
    const user = getUserFromRequest(req);
    if (!user) {
        return corsResponse(NextResponse.json({ error: 'Nicht eingeloggt' }, { status: 401 }));
    }

    try {
        const favorites = await prisma.favorite.findMany({
            where: { userId: user.userId },
            orderBy: { id: 'desc' }
        });
        return corsResponse(NextResponse.json(favorites));
    } catch (e) {
        return corsResponse(NextResponse.json({ error: 'Fehler beim Laden' }, { status: 500 }));
    }
}

export async function POST(req: Request) {
    const user = getUserFromRequest(req);
    if (!user) {
        return corsResponse(NextResponse.json({ error: 'Nicht eingeloggt' }, { status: 401 }));
    }

    try {
        const body = await req.json();
        console.log("POST Favorite empfangen:", body);

        const { agentUuid, agentName, agentImage } = body;

        if (!agentUuid || !agentName) {
            return corsResponse(NextResponse.json({ error: 'Daten fehlen' }, { status: 400 }));
        }

        const fav = await prisma.favorite.create({
            data: {
                userId: user.userId,
                itemUuid: agentUuid,      
                name: agentName,
                image: agentImage || ""
            }
        });

        return corsResponse(NextResponse.json(fav));

    } catch (error) {
      
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return corsResponse(NextResponse.json({ message: 'Bereits favorisiert' }, { status: 200 })); // 200 OK senden, damit Frontend nicht meckert
        }
        console.error("Fav Error:", error);
        return corsResponse(NextResponse.json({ error: 'Server Fehler' }, { status: 500 }));
    }
}


export async function DELETE(req: Request) {
    const user = getUserFromRequest(req);
    if (!user) {
        return corsResponse(NextResponse.json({ error: 'Nicht eingeloggt' }, { status: 401 }));
    }

    try {
        
        const { searchParams } = new URL(req.url);
        const uuid = searchParams.get('uuid');

        if (!uuid) {
            return corsResponse(NextResponse.json({ error: 'UUID fehlt' }, { status: 400 }));
        }

        await prisma.favorite.deleteMany({
            where: {
                userId: user.userId,
                itemUuid: uuid
            }
        });

        return corsResponse(NextResponse.json({ message: 'Gelöscht' }));
    } catch (e) {
        return corsResponse(NextResponse.json({ error: 'Fehler beim Löschen' }, { status: 500 }));
    }
}