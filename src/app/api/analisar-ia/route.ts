import { NextRequest, NextResponse } from "next/server";
import analisarIa from "@/providers/analisar-ia";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { conteudo } = body;

        if (!conteudo || typeof conteudo !== 'string') {
            return NextResponse.json(
                { error: "Conteúdo é obrigatório e deve ser uma string" },
                { status: 400 }
            );
        }

        const resultado = await analisarIa.analisar(conteudo);

        return NextResponse.json(resultado, { status: 200 });
    } catch (error) {
        console.error("Erro ao analisar IA:", error);
        return NextResponse.json(
            { error: typeof error === "string" ? error : "Erro ao analisar conteúdo" },
            { status: 500 }
        );
    }
}
