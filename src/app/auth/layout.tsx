import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Entre ou crie sua conta na plataforma Aprendia",
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
