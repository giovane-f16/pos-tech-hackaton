import { NextResponse } from "next/server";
import DatabaseProvider from "@/providers/db";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        const { nome, email, tipoUsuario, password, confirmPassword } = await request.json();

        if (!nome || !email || !tipoUsuario || !password || !confirmPassword) {
            return NextResponse.json({ message: "Todos os campos são obrigatórios." }, { status: 400 });
        }

        if (password !== confirmPassword) {
            return NextResponse.json({ message: "As senhas não coincidem." }, { status: 400 });
        }

        const database = new DatabaseProvider();
        const usersCollection = await database.getUsersCollection();

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "Usuário já existente." }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await usersCollection.insertOne({
            nome,
            email,
            password: hashedPassword,
            tipoUsuario,
            createdAt: new Date(),
        });

        return NextResponse.json({ message: "Usuário cadastrado com sucesso!" }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Erro interno do servidor." }, { status: 500 });
    }
}
