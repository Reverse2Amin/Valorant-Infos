import { NextResponse } from "next/server";
import { getValorantData } from "@/lib/valorant";

export async function GET() {
  const data = await getValorantData("maps");
  return NextResponse.json(data);
}
