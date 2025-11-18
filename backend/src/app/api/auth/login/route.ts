import { NextResponse } from "next/server";
import { loginUser } from "@/lib/auth";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const result = await loginUser(username, password);
  return NextResponse.json(result);
}