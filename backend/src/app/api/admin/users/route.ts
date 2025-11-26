import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { corsResponse, handleOptions, getUserFromRequest } from '@/lib/cors';

export async function OPTIONS() { return handleOptions(); }

// GET: Alle User sehen (Hatten wir schon)
export async function GET(req: Request) {
    const user = getUserFromRequest(req);
    if (!user || !user.isAdmin) return corsResponse(NextResponse.json({ error: 'Forbidden' }, { status: 403 }));

    const users = await prisma.user.findMany({
        select: { id: true, username: true, email: true, isAdmin: true}
    });
    return corsResponse(NextResponse.json(users));
}

// NEU: DELETE: User löschen
export async function DELETE(req: Request) {
    const user = getUserFromRequest(req);
    
    // 1. Nur Admin darf das
    if (!user || !user.isAdmin) {
        return corsResponse(NextResponse.json({ error: 'Nur für Admins' }, { status: 403 }));
    }

    try {
        // ID aus URL lesen (?id=123)
        const { searchParams } = new URL(req.url);
        const idToDelete = Number(searchParams.get('id'));

        if (!idToDelete) return corsResponse(NextResponse.json({ error: 'ID fehlt' }, { status: 400 }));

        // Verhindern, dass man sich selbst löscht
        if (idToDelete === user.userId) {
            return corsResponse(NextResponse.json({ error: 'Du kannst dich nicht selbst löschen' }, { status: 400 }));
        }

        // Löschen
        await prisma.user.delete({ where: { id: idToDelete } });

        return corsResponse(NextResponse.json({ message: 'User gelöscht' }));
    } catch (e) {
        return corsResponse(NextResponse.json({ error: 'Fehler beim Löschen' }, { status: 500 }));
    }
}