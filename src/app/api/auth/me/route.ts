import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function GET() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  const upstream = await fetch(`${API_URL}/api/v1/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    cache: "no-store",
    redirect: "manual",
  });
  const url = `${API_URL}/api/v1/users/me`;
  console.log("[ME ROUTE] upstream url:", url);
  const json = await upstream.json().catch(() => null);

  return NextResponse.json(json, { status: upstream.status });
}
