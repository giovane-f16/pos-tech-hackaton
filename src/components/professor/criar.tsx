import { CloudUpload, CalendarDays, Send } from "lucide-react"

const CriarTrabalho = (): React.ReactElement => {
    return (
        <div className="flex w-full justify-between gap-x-6 mt-4">
            <div className="w-1/2 border border-gray-200 rounded-lg p-4 dark:bg-gray-900 dark:border-gray-700">
                <h2 className="text-[18px] font-semibold mb-1.5 dark:text-white">
                    Criar Novo Trabalho
                </h2>
                <p className="dark:text-gray-300">
                    Crie e encaminhe um trabalho para seus alunos
                </p>
                <form action="" className="mt-4">
                    <label className="block mb-2 font-medium dark:text-white">
                        Título do Trabalho:
                    </label>
                    <input
                        type="text"
                        placeholder="Ex: Hackaton - Fase 5"
                        className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-0.5 w-full border-input bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500"
                    />

                    <label className="block mt-4 mb-2 font-medium dark:text-white">
                        Descrição e Instruções:
                    </label>
                    <textarea
                        placeholder="Descreva o que os alunos devem fazer, requisitos, formato, etc.."
                        className="w-full border border-gray-300 rounded px-3 py-2 h-24 resize-none bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    ></textarea>

                    <label className="block mt-4 mb-2 font-medium dark:text-white">
                        Data de Entrega:
                    </label>
                    <input
                        type="date"
                        className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full border-input bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500"
                    />

                    <button
                        type="submit"
                        className="mt-6 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full dark:bg-gray-800 dark:hover:bg-gray-600 flex items-center justify-center gap-x-2"
                    >
                        <Send size={16} />
                        Criar Trabalho
                    </button>
                </form>
            </div>
            <div className="w-1/2 border border-gray-200 rounded-lg p-4 dark:bg-gray-900 dark:border-gray-700">
                <h2 className="text-[18px] font-semibold mb-1.5 dark:text-white">
                    Trabalhos Criados
                </h2>
                <p className="mb-6">1 Trabalhos encaminhados para os alunos</p>
                <ul className="mt-4">
                    <li className="mb-4 border border-gray-200 rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700">
                        <h2 className="text-[18px] font-medium mb-2">
                            Redação - Tecnologia e Saude
                        </h2>
                        <p className="mb-4">
                            Escrever uma redação sobre os impactos da tecnologia na saúde.
                        </p>
                        <div className="flex mb-6 text-[14px] gap-x-4">
                            <p className="flex items-center gap-x-2">
                                <CloudUpload /> Criado: 29/01/2026
                            </p>
                            <p className="flex items-center gap-x-2">
                                <CalendarDays />
                                Entrega: 14/02/2026
                            </p>
                        </div>
                        <button className="px-4 py-0.5 border border-gray-200 rounded hover:bg-gray-200 w-full font-medium dark:hover:bg-gray-600">
                            Ver detalhes
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CriarTrabalho;