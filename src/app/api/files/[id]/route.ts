import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import databaseInstance from "@/providers/db";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

        const file = files[0];
        const downloadStream = bucket.openDownloadStream(new ObjectId(id));
        const chunks: Buffer[] = [];

        await new Promise((resolve, reject) => {
            downloadStream.on("data", (chunk) => chunks.push(chunk));
            downloadStream.on("end", resolve);
            downloadStream.on("error", reject);
        });

        const buffer = Buffer.concat(chunks);

        // Retornar arquivo com headers apropriados
        return new NextResponse(buffer, {
            status: 200,
            headers: {
                "Content-Type": file.metadata?.contentType || "application/octet-stream",
                "Content-Disposition": `inline; filename="${file.filename}"`,
                "Content-Length": buffer.length.toString(),
            },
        });

    } catch (error) {
        console.error("Erro no download:", error);
        return NextResponse.json({
            error: "Erro ao baixar arquivo",
            details: error instanceof Error ? error.message : "Erro desconhecido"
        }, { status: 500 });
    }
}
