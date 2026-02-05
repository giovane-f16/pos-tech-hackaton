import { NextRequest, NextResponse } from "next/server";
import TrabalhoProvider from "@/providers/trabalho";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { titulo, descricao, dataEntrega } = body;

        if (!titulo || !descricao || !dataEntrega) {
            return NextResponse.json(
                { error: "Todos os campos são obrigatórios" },
                { status: 400 }
            );
        }

        const trabalhoProvider = new TrabalhoProvider();
        await trabalhoProvider.criar({ titulo, descricao, dataEntrega });

        return NextResponse.json(
            { message: "Trabalho criado com sucesso!" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Erro ao criar trabalho:", error);
        return NextResponse.json(
            { error: "Erro ao criar trabalho" },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        // Aqui você pode adicionar lógica para listar trabalhos
        return NextResponse.json(
            { message: "Rota para listar trabalhos" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Erro ao listar trabalhos:", error);
        return NextResponse.json(
            { error: "Erro ao listar trabalhos" },
            { status: 500 }
        );
    }
}
