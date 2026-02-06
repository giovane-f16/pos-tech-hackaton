import { NextRequest, NextResponse } from "next/server";
import EntregaProvider from "@/providers/entrega";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { trabalhoId, alunoId, titulo, conteudo, arquivoUrl, dataEntrega, nota, feedback, porcentagemIa, analiseIa } = body;

        if (!trabalhoId || !alunoId) {
            return NextResponse.json(
                { error: "Necessário fornecer trabalhoId e alunoId" },
                { status: 400 }
            );
        }

        if (!titulo || !conteudo || !arquivoUrl || !dataEntrega) {
            return NextResponse.json(
                { error: "Dados incompletos para criação da entrega" },
                { status: 400 }
            );
        }

        const entregaProvider = new EntregaProvider();
        await entregaProvider.criar({ trabalhoId, alunoId, titulo, conteudo, arquivoUrl, dataEntrega, nota, feedback, porcentagemIa, analiseIa });

        return NextResponse.json(
            { message: "Entrega criada com sucesso!" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Erro ao criar entrega:", error);
        return NextResponse.json(
            { error: "Erro ao criar entrega" },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const entregaProvider = new EntregaProvider();
        const entregas = await entregaProvider.getAll();
        return NextResponse.json(entregas, { status: 200 });
    } catch (error) {
        console.error("Erro ao listar entregas:", error);
        return NextResponse.json(
            { error: "Erro ao listar entregas" },
            { status: 500 }
        );
    }
}