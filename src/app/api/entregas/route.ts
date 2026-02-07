import { NextRequest, NextResponse } from "next/server";
import entrega from "@/providers/entrega";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { trabalhoId, trabalhoTitulo, alunoId, alunoNome, titulo, conteudo, arquivoUrl, dataEntrega, nota, feedback, porcentagemIa, analiseIa } = body;

        if (!trabalhoId || !trabalhoTitulo || !alunoId || !alunoNome) {
            return NextResponse.json(
                { error: "Necessário fornecer trabalhoId, trabalhoTitulo, alunoId e alunoNome" },
                { status: 400 }
            );
        }

        if (!titulo || !conteudo || !arquivoUrl || !dataEntrega) {
            return NextResponse.json(
                { error: "Dados incompletos para criação da entrega" },
                { status: 400 }
            );
        }

        await entrega.criar({ trabalhoId, trabalhoTitulo, alunoId, alunoNome, titulo, conteudo, arquivoUrl, dataEntrega, nota, feedback, porcentagemIa, analiseIa });

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
        const entregas = await entrega.getAll();
        return NextResponse.json(entregas, { status: 200 });
    } catch (error) {
        console.error("Erro ao listar entregas:", error);
        return NextResponse.json(
            { error: "Erro ao listar entregas" },
            { status: 500 }
        );
    }
}