import { NextRequest, NextResponse } from "next/server";
import assistenteIa, { Message } from "@/providers/assistente-ia";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { mensagens } = body;

        if (!mensagens || !Array.isArray(mensagens)) {
            return NextResponse.json(
                { error: "Mensagens são obrigatórias e devem ser um array" },
                { status: 400 }
            );
        }

        const resposta = await assistenteIa.enviarMensagem(mensagens as Message[]);

        return NextResponse.json(
            { resposta },
            { status: 200 }
        );
    } catch (error) {
        console.error("Erro no assistente de IA:", error);
        return NextResponse.json(
            { error: typeof error === "string" ? error : "Erro ao processar mensagem" },
            { status: 500 }
        );
    }
}
