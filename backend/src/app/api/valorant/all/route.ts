import { NextResponse } from "next/server";
import { fetchAgents, fetchMaps, fetchWeapons} from "@/lib/valorant";


//Alle Daten werden auf http://localhost:3000/api/valorant/all angezeigt

export async function GET() {
  const [agents, maps, weapons] = await Promise.all([
    fetchAgents(),
    fetchMaps(),
    fetchWeapons(),
    
  ]);

  return NextResponse.json({
    agents,
    maps,
    weapons
  });
}