import { NextRequest, NextResponse } from "next/server";
import TrabalhoProvider from "@/providers/trabalho";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: "ID do trabalho é obrigatório" },
                { status: 400 }
            );
        }

        const trabalhoProvider = new TrabalhoProvider();
        const trabalho = await trabalhoProvider.getById(id);

        if (!trabalho) {
            return NextResponse.json(
                { error: "Trabalho não encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json(trabalho, { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar trabalho:", error);
        return NextResponse.json(
            { error: "Erro ao buscar trabalho" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: "ID do trabalho é obrigatório" },
                { status: 400 }
            );
        }

        const trabalhoProvider = new TrabalhoProvider();
        await trabalhoProvider.delete(id);

        return NextResponse.json(
            { message: "Trabalho deletado com sucesso!" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Erro ao deletar trabalho:", error);
        return NextResponse.json(
            { error: "Erro ao deletar trabalho" },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { titulo, descricao, dataEntrega } = body;

        if (!id) {
            return NextResponse.json(
                { error: "ID do trabalho é obrigatório" },
                { status: 400 }
            );
        }

        if (!titulo || !descricao || !dataEntrega) {
            return NextResponse.json(
                { error: "Todos os campos são obrigatórios" },
                { status: 400 }
            );
        }

        const trabalhoProvider = new TrabalhoProvider();
        await trabalhoProvider.update(id, { titulo, descricao, dataEntrega });

        return NextResponse.json(
            { message: "Trabalho atualizado com sucesso!" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Erro ao atualizar trabalho:", error);
        return NextResponse.json(
            { error: "Erro ao atualizar trabalho" },
            { status: 500 }
        );
    }
}
