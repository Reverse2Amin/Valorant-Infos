import { NextResponse } from 'next/server';
import { corsResponse, handleOptions } from '@/lib/cors';

export async function OPTIONS() { return handleOptions(); }

export async function GET() {
    try {
        const res = await fetch('https://valorant-api.com/v1/weapons?language=de-DE');
        const json = await res.json();

        const data = json.data.map((weapon: any) => ({
            uuid: weapon.uuid,
            displayName: weapon.displayName,
            category: weapon.category,
            displayIcon: weapon.displayIcon,
            // WICHTIG: Diese beiden Felder brauchen wir!
            weaponStats: weapon.weaponStats, 
            shopData: weapon.shopData        
        }));

        return corsResponse(NextResponse.json(data));
    } catch (e) {
        return corsResponse(NextResponse.json({ error: 'Fehler' }, { status: 500 }));
    }
}