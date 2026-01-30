'use client';

import "./style.css";
import { GraduationCap } from "lucide-react";
import { useState } from "react";

const Auth = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [activeTab, setActiveTab] = useState('login');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

  return(
    <main className="h-[75vh] bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
        <section className="flex-col items-center justify-center p-4 w-full max-w-md">
            <div className="flex items-center gap-2 mb-2 justify-center">
                <GraduationCap className="size-12 text-blue-600" />
                <span className="text-2xl font-bold dark:text-white"> Aprendia</span>
            </div>
            <p className="text-center">Acesse sua conta ou crie uma nova</p>

            <div className="flex gap-1 mx-auto mt-4 bg-gray-200 rounded-2xl p-1">
                <button
                    onClick={() => setActiveTab('login')}
                    className={`cursor-pointer font-medium text-[14px] flex-1 py-1 rounded-xl transition-colors text-foreground ${activeTab === 'login' ? 'bg-white' : ''}`}
                >
                    Login
                </button>
                <button
                    onClick={() => setActiveTab('cadastro')}
                    className={`cursor-pointer font-medium text-[14px] flex-1 py-1 rounded-xl transition-colors ${activeTab === 'cadastro' ? 'bg-white' : ''}`}
                >
                    Cadastro
                </button>
            </div>

            <form action="" className="mt-4 p-6 border bg-white border-gray-200 rounded-xl max-w-md mx-auto w-full">
                <h1 className="font-bold text-[16px]">Fazer login</h1>
                <p className="text-gray-700 mt-2 mb-5">Entre com seu E-mail e senha</p>
                <div>
                    <label htmlFor="email" className="font-medium text-sm">E-mail</label>
                    <input required type="email" id="email" name="email" placeholder="seu@email.com" className="w-full py-1.5 px-4 bg-gray-100 rounded-md mt-1 focus:outline-none focus:ring-1 focus:ring-gray-400" />
                </div>
                <div className="mt-4">
                    <label htmlFor="password" className="font-medium text-sm">Senha</label>
                    <input required type="password" id="password" name="password" placeholder="Sua senha" className="w-full py-1.5 px-4 bg-gray-100 rounded-md mt-1 focus:outline-none focus:ring-1 focus:ring-gray-400" />
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
                <button type="submit" className="mt-8 w-full bg-black text-white p-2 rounded-md cursor-pointer hover:bg-gray-800">Entrar</button>
            </form>

            <div className="text-center mt-4">
                <a href="/" className="whitespace-nowrap rounded-md text-sm font-medium text-primary">Voltar para Home</a>
            </div>
        </section>
    </main>
  );
}

export default Auth;