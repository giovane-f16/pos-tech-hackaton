import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";
import databaseInstance from "@/providers/db";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
        }

        const maxSize = 10 * 1024 * 1024; // 10MB em bytes
        if (file.size > maxSize) {
            return NextResponse.json({ error: "Arquivo muito grande. Máximo: 10MB" }, { status: 400 });
        }

        // Validar tipo de arquivo
        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain"
        ];

        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({
                error: "Tipo de arquivo não permitido. Use: PDF, DOC, DOCX ou TXT"
            }, { status: 400 });
        }

        const bucket = await databaseInstance.getGridFSBucket();
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const readableStream = Readable.from(buffer);

        const uploadStream = bucket.openUploadStream(file.name, {
            metadata: {
                contentType: file.type,
                originalName: file.name,
                size: file.size,
                uploadDate: new Date()
            }
        });

        await new Promise((resolve, reject) => {
            readableStream.pipe(uploadStream)
                .on("finish", resolve)
                .on("error", reject);
        });

        return NextResponse.json({
            fileId: uploadStream.id.toString(),
            filename: file.name,
            contentType: file.type,
            size: file.size,
            message: "Upload realizado com sucesso!"
        }, { status: 201 });

    } catch (error) {
        console.error("Erro no upload:", error);
        return NextResponse.json({
            error: "Erro ao fazer upload do arquivo",
            details: error instanceof Error ? error.message : "Erro desconhecido"
        }, { status: 500 });
    }
}
