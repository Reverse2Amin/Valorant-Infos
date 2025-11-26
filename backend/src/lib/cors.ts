import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export const SECRET = "VALORANT1234"; 

export function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

export function corsResponse(data: any, status: number = 200) {
  if (data instanceof NextResponse) {
    data.headers.set('Access-Control-Allow-Origin', '*');
    data.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    data.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return data;
  }
  return NextResponse.json(data, { status, headers: corsHeaders() });
}

export function handleOptions() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as { userId: number; isAdmin: boolean; username: string };
  } catch (e) {
    console.error("Token Verify Error:", e);
    return null;
  }
}

export function getUserFromRequest(req: Request) {
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }

    const token = authHeader.substring(7);
    return verifyToken(token);
}