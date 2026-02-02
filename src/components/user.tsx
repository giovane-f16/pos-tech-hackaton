import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
export default function User() {

    const { data: session, status } = useSession();

    if (status === "loading") {
        return <></>;
    }

    const logout = () => {
        let confirm = window.confirm("Tem certeza que deseja sair?");
        if (confirm) {
            signOut({
                callbackUrl: "/"
            });
        }
    }

    if (session && session.user) {
        return (
            <div className="flex items-center gap-2">
                <p className="text-gray-900 dark:text-gray-100">Bem vindo, {session.user.name}!</p>
                <button className="px-4 py-0 bg-gray-800 rounded hover:bg-gray-700 text-white cursor-pointer" onClick={logout}>
                    Sair
                </button>
            </div>
        );
    }

    return <></>;
}