import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    });

    const path = request.nextUrl.pathname;

    // Proteger rota /professor
    if (path.startsWith("/professor")) {
        if (!token || token.tipoUsuario !== "professor") {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    // Proteger rota /aluno
    if (path.startsWith("/aluno")) {
        if (!token || token.tipoUsuario !== "aluno") {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/professor/:path*", "/aluno/:path*"]
};
