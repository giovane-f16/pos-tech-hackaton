'use client';

import "./style.css";
import { GraduationCap } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import AuthProvider from "@/providers/auth";

const Auth = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [activeTab, setActiveTab] = useState('login');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [userRegisterName, setUserRegisterName] = useState('');
    const [userRegisterEmail, setUserRegisterEmail] = useState('');
    const [userRegisterPassword, setUserRegisterPassword] = useState('');
    const [userRegisterConfirmPassword, setUserRegisterConfirmPassword] = useState('');
    const [userRegisterTipoUsuario, setUserRegisterTipoUsuario] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const authProvider = new AuthProvider();
    const [loading, setLoading] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
        setUserRegisterTipoUsuario(event.target.value);
    };

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!loginEmail || !loginPassword) {
            setErrorMessage("Preencha e-mail e senha.");
            return;
        }

        setLoading(true);

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: loginEmail,
                password: loginPassword,
            });

            if (result?.ok) {
                window.location.href = "/";
            } else {
                setErrorMessage("E-mail ou senha inválidos.");
            }
        } catch (err) {
            console.error(err);
            setErrorMessage("Erro ao fazer login.");
        } finally {
            setLoading(false);
        }
    };

    const handleCadastro = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!userRegisterName || !userRegisterEmail || !userRegisterPassword || !userRegisterConfirmPassword || !userRegisterTipoUsuario) {
            setErrorMessage("Preencha todos os campos.");
            return;
        }

        const passWordError = authProvider.validadePassword(userRegisterPassword, userRegisterConfirmPassword);
        if (typeof passWordError === "string") {
            setErrorMessage(passWordError);
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome: userRegisterName,
                    email: userRegisterEmail,
                    password: userRegisterPassword,
                    confirmPassword: userRegisterConfirmPassword,
                    tipoUsuario: userRegisterTipoUsuario,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                await signIn("credentials", {
                    redirect: true,
                    email: userRegisterEmail,
                    password: userRegisterPassword,
                    callbackUrl: "/"
                });
            } else {
                setErrorMessage(data.message);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

  return(
    <main className="h-[75vh] bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4 dark:bg-[var(--background)] dark:from-[var(--background)] dark:to-[var(--foreground)]">
        <section className="flex-col items-center justify-center p-4 w-full max-w-md">
            <div className="flex items-center gap-2 mb-2 justify-center">
                <GraduationCap className="size-12 text-blue-600" />
                <span className="text-2xl font-bold dark:text-black"> Aprendia</span>
            </div>
            <p className="text-center dark:text-black">Acesse sua conta ou crie uma nova</p>

            <div className="flex gap-1 mx-auto mt-4 bg-gray-200 rounded-2xl p-1">
                <button
                    onClick={() => setActiveTab('login')}
                    className={`cursor-pointer font-medium text-[14px] flex-1 py-1 rounded-xl transition-colors text-foreground ${activeTab === 'login' ? 'bg-white dark:bg-gray-400 dark:text-white' : ''}`}
                >
                    Login
                </button>
                <button
                    onClick={() => setActiveTab('cadastro')}
                    className={`cursor-pointer font-medium text-[14px] flex-1 py-1 rounded-xl transition-colors text-foreground ${activeTab === 'cadastro' ? 'bg-white dark:bg-gray-400 dark:text-white' : ''}`}
                >
                    Cadastro
                </button>
            </div>

            {activeTab === 'login' ? (
                <form onSubmit={handleLogin} className="mt-4 p-6 border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl max-w-md mx-auto w-full">
                    <h1 className="font-bold text-[16px]">Fazer login</h1>
                    <p className="text-gray-700 mt-2 mb-5 dark:text-white">Entre com seu E-mail e senha</p>
                    {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
                    <div>
                        <label htmlFor="email" className="font-medium text-sm">E-mail</label>
                        <input required type="email" id="email" name="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="seu@email.com" className="w-full py-1.5 px-4 bg-gray-100 rounded-md mt-1 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:bg-gray-400" />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="password" className="font-medium text-sm">Senha</label>
                        <input required type="password" id="password" name="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Sua senha" className="w-full py-1.5 px-4 bg-gray-100 rounded-md mt-1 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:bg-gray-400" />
                    </div>
                    <div className="mt-4.5">
                        <p className="font-medium text-sm">Tipo de Usuário</p>
                        <div className="mt-1.5 flex items-center">
                            <input type="radio" name="tipo" id="aluno" value="aluno" onChange={handleChange}/>
                            <label htmlFor="aluno" className="ml-1">Aluno</label>
                            <input type="radio" name="tipo" id="professor" value="professor" className="ml-4" onChange={handleChange} />
                            <label htmlFor="professor" className="ml-1">Professor</label>
                        </div>
                    </div>
                    <button type="submit" disabled={loading} className="mt-8 w-full bg-black text-white p-2 rounded-md cursor-pointer hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 disabled:opacity-50">
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleCadastro} className="mt-4 p-6 border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl max-w-md mx-auto w-full">
                    <h1 className="font-bold text-[16px]">Criar conta</h1>
                    <p className="text-gray-700 mt-2 mb-5 dark:text-white">Preencha os dados para se cadastrar</p>
                    {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
                    <div>
                        <label htmlFor="nome" className="font-medium text-sm">Nome completo</label>
                        <input required type="text" id="nome" name="nome" value={userRegisterName} onChange={(e) => setUserRegisterName(e.target.value)} placeholder="Seu nome completo" className="w-full py-1.5 px-4 bg-gray-100 rounded-md mt-1 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:bg-gray-400" />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="email-cadastro" className="font-medium text-sm">E-mail</label>
                        <input required type="email" id="email-cadastro" name="email" value={userRegisterEmail} onChange={(e) => setUserRegisterEmail(e.target.value)} placeholder="seu@email.com" className="w-full py-1.5 px-4 bg-gray-100 rounded-md mt-1 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:bg-gray-400" />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="password-cadastro" className="font-medium text-sm">Senha</label>
                        <input required type="password" id="password-cadastro" name="password" value={userRegisterPassword} onChange={(e) => setUserRegisterPassword(e.target.value)} placeholder="Sua senha" className="w-full py-1.5 px-4 bg-gray-100 rounded-md mt-1 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:bg-gray-400" />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="confirm-password" className="font-medium text-sm">Confirmar senha</label>
                        <input required type="password" id="confirm-password" name="confirmPassword" value={userRegisterConfirmPassword} onChange={(e) => setUserRegisterConfirmPassword(e.target.value)} placeholder="Confirme sua senha" className="w-full py-1.5 px-4 bg-gray-100 rounded-md mt-1 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:bg-gray-400" />
                    </div>
                    <div className="mt-4.5">
                        <p className="font-medium text-sm">Tipo de Usuário</p>
                        <div className="mt-1.5 flex items-center">
                            <input type="radio" name="tipo-cadastro" id="aluno-cadastro" value="aluno" onChange={handleChange}/>
                            <label htmlFor="aluno-cadastro" className="ml-1">Aluno</label>
                            <input type="radio" name="tipo-cadastro" id="professor-cadastro" value="professor" className="ml-4" onChange={handleChange} />
                            <label htmlFor="professor-cadastro" className="ml-1">Professor</label>
                        </div>
                    </div>
                    <button type="submit" disabled={loading} className="mt-8 w-full bg-black text-white p-2 rounded-md cursor-pointer hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 disabled:opacity-50">
                        {loading ? "Cadastrando..." : "Cadastrar"}
                    </button>
                </form>
            )}

            <div className="text-center mt-4">
                <a href="/" className="whitespace-nowrap rounded-md text-sm font-medium text-primary">Voltar para Home</a>
            </div>
        </section>
    </main>
  );
}

export default Auth;