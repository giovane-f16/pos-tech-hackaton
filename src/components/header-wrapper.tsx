import Header from "./header";
import AuthProvider from "@/providers/auth";

export default async function HeaderWrapper() {
    const authProvider = new AuthProvider();
    const nome = await authProvider.getNome();

    return <Header nome={nome} />;
}
