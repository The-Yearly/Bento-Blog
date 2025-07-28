import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export interface Session {
  uid: number;
  session: string;
}

function isValidSession(obj: any): obj is Session {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.uid === "number" &&
    typeof obj.session === "string"
  );
}

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const cookiesStore = await cookies();
  const cookie = cookiesStore.get("creds");

  let logged: Session | null = null;

  try {
    const parsed = JSON.parse(cookie?.value ?? "{}");
    if (isValidSession(parsed)) {
      logged = parsed;
    }
  } catch (e) {}

  const isLoggedIn = logged?.session && logged.session !== "";
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/signIn", req.url));
  }
}

export const config = {
  matcher: ["/admin(.*)"],
};
