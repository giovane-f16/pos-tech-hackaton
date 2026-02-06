const Historico = () => {
    return (
        <div className="border-gray-200 dark:border-gray-700 border rounded-lg p-6 dark:bg-gray-800">
            <h2 className="text-[18px] font-semibold mb-1.5 dark:text-white">Histórico de Envios</h2>
            <p className="dark:text-gray-300">Conteúdo do histórico de trabalhos enviados.</p>
            <div className="mt-4">
                <ul>
                    <li className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg mb-4 flex flex-col gap-2 dark:bg-gray-900">
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium text-[18px] dark:text-white">Tech Challenge Fase 1</h3>
                            <button className="border border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-4 py-1 cursor-pointer flex items-center justify-center gap-2 font-medium text-[12px] dark:text-gray-200">
                                Ver Detalhes
                            </button>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Enviado em: 10 de Janeiro de 2024</p>
                        <p className="flex items-center gap-2">
                            <span className="bg-green-100 dark:bg-green-900 px-1.5 py-1 text-[12px] rounded-xl text-green-900 dark:text-green-100">Avaliado</span>
                            <span className="font-medium text-green-600 dark:text-green-400 text-[14px]">Nota: 9.5/10</span>
                        </p>
                    </li>
                    <li className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg mb-4 flex flex-col gap-2 dark:bg-gray-900">
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium text-[18px] dark:text-white">Relatório de Pesquisa</h3>
                            <button className="border border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-4 py-1 cursor-pointer flex items-center justify-center gap-2 font-medium text-[12px] dark:text-gray-200">
                                Ver Detalhes
                            </button>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Enviado em: 22 de Fevereiro de 2024</p>
                        <p className="flex items-center gap-2">
                            <span className="bg-yellow-100 dark:bg-yellow-900 px-1.5 py-1 text-[12px] rounded-xl text-yellow-900 dark:text-yellow-100">
                                Aguardando Avaliação
                            </span>
                        </p>
                    </li>
                    <li className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg mb-4 flex flex-col gap-2 dark:bg-gray-900">
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium text-[18px] dark:text-white">Trabalho Final de Curso</h3>
                            <button className="border border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-4 py-1 cursor-pointer flex items-center justify-center gap-2 font-medium text-[12px] dark:text-gray-200">
                                Ver Detalhes
                            </button>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Enviado em: 15 de Março de 2024</p>
                        <p className="flex items-center gap-2">
                            <span className="bg-green-100 dark:bg-green-900 px-1.5 py-1 text-[12px] rounded-xl text-green-900 dark:text-green-100">Avaliado</span>
                            <span className="font-medium text-green-600 dark:text-green-400 text-[14px]">Nota: 9.5/10</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default Historico;