import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Área do Professor",
    description: "Crie trabalhos, avalie entregas e analise com IA",
};

export default function ProfessorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
