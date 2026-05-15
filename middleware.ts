import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isLoginPage = pathname === "/admin/login"

  if (pathname.startsWith("/admin") && !isLoginPage) {
    const session = request.cookies.get("admin_session")?.value
    const expected = process.env.ADMIN_PASSWORD

    if (!expected || session !== expected) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
