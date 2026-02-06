import { CircleAlert } from "lucide-react";

const AnalisarComIA = (): React.ReactElement => {
    return (
        <div className="border-gray-200 dark:border-gray-700 border rounded-lg p-6 dark:bg-gray-800">
            <h2 className="text-[18px] font-semibold mb-1.5 dark:text-white">Ferramenta de Análise de IA</h2>
            <p className="dark:text-gray-300">Análise de uso de IA nos trabalhos dos alunos</p>
            <div className="p-4 mt-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 flex gap-x-2 dark:bg-blue-200">
                <CircleAlert className="" />
                <div>
                    <h2 className="flex items-center gap-2 mb-2 font-semibold">
                        Como funciona a análise de IA
                    </h2>
                    <p>Nossa ferramenta analisa o texto do trabalho e identifica padrões característicos de conteúdo gerado por IA, fornecendo uma estimativa percentual do uso de IA.</p>
                </div>
            </div>
            <div className="mt-6">
                <h3 className="text-[18px] font-medium">Trabalhos recentes</h3>
                <div className="mt-4">
                    <ul>
                        <li className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg mb-4 flex flex-col gap-2 dark:bg-gray-900">
                            <div className="flex items-center justify-between">
                                <h3 className="font-medium text-[18px] dark:text-white">Tech Challenge Fase 1</h3>
                                <button className="border border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-4 py-1 cursor-pointer flex items-center justify-center gap-2 font-medium text-[12px] dark:text-gray-200">
                                    Reanalisar
                                </button>
                            </div>
                            <p className="text-sm">Uso de IA detectado</p>
                            <div className="relative w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                                <div
                                    className="absolute top-0 left-0 h-full bg-linear-to-r from-yellow-400 to-orange-500 transition-all duration-500 flex items-center justify-center"
                                    style={{ width: '75%' }}
                                >
                                    <span className="text-white font-semibold text-sm">75%</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default AnalisarComIA;