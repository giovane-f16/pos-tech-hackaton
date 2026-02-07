import { NextRequest, NextResponse } from "next/server";
import entregaProvider from "@/providers/entrega";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: "ID da entrega é obrigatório" },
                { status: 400 }
            );
        }

        const entregaData = await entregaProvider.getById(id);

        if (!entregaData) {
            return NextResponse.json(
                { error: "Entrega não encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json(entregaData, { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar entrega:", error);
        return NextResponse.json(
            { error: "Erro ao buscar entrega" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: "ID da entrega é obrigatório" },
                { status: 400 }
            );
        }

        await entregaProvider.delete(id);

        return NextResponse.json(
            { message: "Entrega deletada com sucesso!" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Erro ao deletar entrega:", error);
        return NextResponse.json(
            { error: "Erro ao deletar entrega" },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: "ID da entrega é obrigatório" },
                { status: 400 }
            );
        }

        await entregaProvider.update(id, body);

        return NextResponse.json(
            { message: "Entrega atualizada com sucesso!" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Erro ao atualizar entrega:", error);
        return NextResponse.json(
            { error: "Erro ao atualizar entrega" },
            { status: 500 }
        );
    }
}
