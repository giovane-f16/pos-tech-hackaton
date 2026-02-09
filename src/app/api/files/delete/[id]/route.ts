import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import databaseInstance from "@/providers/db";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ error: "ID do arquivo não fornecido" }, { status: 400 });
        }

        const bucket = await databaseInstance.getGridFSBucket();
        const files = await bucket.find({ _id: new ObjectId(id) }).toArray();
        if (files.length === 0) {
            return NextResponse.json({ error: "Arquivo não encontrado" }, { status: 404 });
        }

        await bucket.delete(new ObjectId(id));

        return NextResponse.json({
            message: "Arquivo deletado com sucesso",
            fileId: id
        }, { status: 200 });

    } catch (error) {
        console.error("Erro ao deletar arquivo:", error);
        return NextResponse.json({
            error: "Erro ao deletar arquivo",
            details: error instanceof Error ? error.message : "Erro desconhecido"
        }, { status: 500 });
    }
}
