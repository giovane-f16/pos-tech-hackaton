import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "@/components/header-wrapper";
import Footer from "@/components/footer";
import AuthComponent from "@/components/session";
import { getTheme } from "@/providers/theme";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: "Aprendia - Plataforma Educacional",
        template: "%s | Aprendia",
    },
    description: "Plataforma educacional inteligente para envio de trabalhos acadêmicos e auxílio com IA",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const theme = await getTheme();
    return (
        <html lang="pt-BR" className={theme === "dark" ? "dark" : ""}>
            <head>
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
                <AuthComponent>
                    <HeaderWrapper />
                    {children}
                    <Footer />
                </AuthComponent>
            </body>
        </html>
    );
}