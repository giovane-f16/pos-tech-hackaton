import { NextRequest, NextResponse } from "next/server";
import EntregaProvider from "@/providers/entrega";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: "ID do aluno é obrigatório" },
                { status: 400 }
            );
        }

        const entregaProvider = new EntregaProvider();
        const entregas = await entregaProvider.getByIdAluno(id);

        return NextResponse.json(entregas, { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar entregas por aluno:", error);
        return NextResponse.json(
            { error: "Erro ao buscar entregas por aluno" },
            { status: 500 }
        );
    }
}
