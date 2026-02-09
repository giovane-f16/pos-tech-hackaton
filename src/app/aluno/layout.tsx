import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Área do Aluno",
    description: "Envie trabalhos, consulte histórico e use o assistente de IA",
};

export default function AlunoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
