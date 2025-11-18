import { NextResponse } from "next/server";
import { registerUser } from "@/lib/auth";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const result = await registerUser(username, password);
  return NextResponse.json(result);
}