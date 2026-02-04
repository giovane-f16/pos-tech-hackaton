import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

class AuthProvider {
    public async getSession() {
        return await getServerSession(authOptions);
    }

    public async getNome(): Promise<string | null> {
        const session = await this.getSession();
        return session?.user?.name || null;
    }

    public async getEmail(): Promise<string | null> {
        const session = await this.getSession();
        return session?.user?.email || null;
    }

    public async getTipoUsuario(): Promise<string | null> {
        const session = await this.getSession();
        return session?.user?.tipoUsuario as string || null;
    }
}

export default AuthProvider;