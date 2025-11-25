import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { corsResponse, corsHeaders, verifyToken } from '@/lib/cors';
import { Prisma } from '@prisma/client';

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return corsResponse(NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 }));
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return corsResponse(NextResponse.json({ error: 'Ungültiger Token' }, { status: 401 }));
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: Number(decoded.userId) },
      orderBy: { id: 'desc' },
    });

    return corsResponse(NextResponse.json(favorites));
  } catch (error) {
    console.error('Get favorites error:', error);
    return corsResponse(NextResponse.json({ error: 'Server Fehler' }, { status: 500 }));
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return corsResponse(NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 }));
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return corsResponse(NextResponse.json({ error: 'Ungültiger Token' }, { status: 401 }));
    }

    // WICHTIG: Wir lesen agentUuid, agentName UND agentImage
    const { agentUuid, agentName, agentImage } = await req.json();

    if (!agentUuid || !agentName) {
      return corsResponse(NextResponse.json({ error: 'Daten fehlen' }, { status: 400 }));
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: Number(decoded.userId),
        // HIER IST DIE KORREKTUR:
        itemUuid: agentUuid,      // Code: agentUuid -> DB: itemUuid
        name: agentName,          // Code: agentName -> DB: name
        image: agentImage || "",  // Code: agentImage -> DB: image (darf nicht fehlen!)
      },
    });

    return corsResponse(NextResponse.json(favorite, { status: 201 }));

  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return corsResponse(NextResponse.json({ error: 'Bereits favorisiert' }, { status: 409 }));
      }
    }
    console.error('Add favorite error:', error);
    return corsResponse(NextResponse.json({ error: 'Fehler beim Hinzufügen' }, { status: 500 }));
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return corsResponse(NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 }));
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return corsResponse(NextResponse.json({ error: 'Ungültiger Token' }, { status: 401 }));
    }

    // Wir schauen, ob die UUID in der URL (?agentUuid=...) oder im Body steht
    // Dein Frontend sendet es aktuell wahrscheinlich via URL Params beim DELETE
    const { searchParams } = new URL(req.url);
    let uuidToDelete = searchParams.get('uuid');

    // Fallback: Falls du es per JSON Body schickst
    if (!uuidToDelete) {
        try {
            const body = await req.json();
            uuidToDelete = body.agentUuid;
        } catch (e) { /* Body war leer, ignorieren */ }
    }

    if (!uuidToDelete) {
      return corsResponse(NextResponse.json({ error: 'UUID fehlt' }, { status: 400 }));
    }

    await prisma.favorite.deleteMany({
      where: {
        userId: Number(decoded.userId),
        itemUuid: uuidToDelete, // HIER AUCH: itemUuid nutzen!
      },
    });

    return corsResponse(NextResponse.json({ message: 'Favorit entfernt' }));
  } catch (error) {
    console.error('Remove favorite error:', error);
    return corsResponse(NextResponse.json({ error: 'Fehler beim Löschen' }, { status: 500 }));
  }
}