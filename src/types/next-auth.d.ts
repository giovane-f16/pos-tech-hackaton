import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Estende o objeto 'user' retornado no callback 'session'
   */
  interface Session {
    user: {
      id: string;
      tipoUsuario: string;
    } & DefaultSession["user"];
  }

  /**
   * Estende o objeto 'user' retornado no callback 'signIn' ou 'jwt'
   */
  interface User {
    id: string;
    tipoUsuario: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * Estende o token JWT para incluir campos personalizados
   */
  interface JWT {
    id: string;
    tipoUsuario: string;
  }
}
