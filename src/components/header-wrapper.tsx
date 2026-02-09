import Header from "./header";
import AuthProvider from "@/providers/auth";
import { getTheme } from "@/providers/theme";

export default async function HeaderWrapper() {
    const authProvider = new AuthProvider();
    const nome = await authProvider.getNome();
    const tipoUsuario = await authProvider.getTipoUsuario();
    const theme = await getTheme();

    return <Header nome={nome} tipoUsuario={tipoUsuario} theme={theme} />;
}
