import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { corsResponse, handleOptions, getUserFromRequest } from '@/lib/cors';

export async function OPTIONS() {
    return handleOptions();
}

export async function DELETE(req: Request) {
    const user = getUserFromRequest(req);
    
    if (!user) {
        return corsResponse(NextResponse.json({ error: 'Nicht eingeloggt' }, { status: 401 }));
    }

    try {
        
        await prisma.user.delete({
            where: { id: user.userId }
        });

        return corsResponse(NextResponse.json({ message: 'Account gelöscht' }));
    } catch (e) {
        return corsResponse(NextResponse.json({ error: 'Fehler beim Löschen' }, { status: 500 }));
    }
}