import Header from "./header";
import AuthProvider from "@/providers/auth";
import { getTheme } from "@/providers/theme";

export default async function HeaderWrapper() {
    const authProvider = new AuthProvider();
    const nome = await authProvider.getNome();
    const theme = await getTheme();

    return <Header nome={nome} theme={theme} />;
}
