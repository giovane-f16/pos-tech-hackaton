import { NextRequest, NextResponse } from "next/server";
import EntregaProvider from "@/providers/entrega";
import Trabalho from "@/providers/trabalho";

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
        const trabalhoProvider = new Trabalho();

        const todosTrabalhos = await trabalhoProvider.getAll();
        const entregasAluno = await entregaProvider.getByIdAluno(id);

        const trabalhosEntreguesIds = new Set(
            entregasAluno.map(entrega => String(entrega.trabalhoId))
        );

        const trabalhosPendentes = todosTrabalhos.filter(
            trabalho => !trabalhosEntreguesIds.has(String(trabalho._id))
        );

        return NextResponse.json(trabalhosPendentes, { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar trabalhos pendentes do aluno:", error);
        return NextResponse.json(
            { error: "Erro ao buscar trabalhos pendentes do aluno" },
            { status: 500 }
        );
    }
}
