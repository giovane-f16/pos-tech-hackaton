import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DatabaseProvider from "@/providers/db";
import bcrypt from "bcrypt";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Senha", type: "password" },
            },
            async authorize(credentials) {
                const database = new DatabaseProvider();
                const usersCollection = await database.getUsersCollection();
                const user = await usersCollection.findOne({ email: credentials?.email });

                if (!user) {
                    throw new Error("Usuário não encontrado.");
                }

                const isPasswordValid = await bcrypt.compare(credentials!.password, user.password);

                if (!isPasswordValid) {
                    throw new Error("Senha inválida.");
                }

                return {
                    id: user._id.toString(),
                    name: user.nome,
                    email: user.email,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
        updateAge: 60 * 60
    },
    jwt: {
        maxAge: 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET
});