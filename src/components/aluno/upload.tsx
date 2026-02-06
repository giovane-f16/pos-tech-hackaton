import { Upload, CalendarDays, CloudUpload } from "lucide-react";

const UploadDeTrabalho = () => {
    return (
        <div className="flex gap-x-6">
            <div className="w-1/2 border border-gray-200 rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-[18px] font-semibold mb-1.5 dark:text-white">Trabalhos Pendentes/Realizados</h2>
                <p className="mb-6">1 Trabalhos realizado</p>
                <ul className="mt-4">
                    <li className="mb-4 border border-gray-200 rounded-lg p-4 dark:bg-gray-900 dark:border-gray-700">
                        <h2 className="text-[18px] font-medium mb-2">Redação - Tecnologia e Saude</h2>
                        <p className="mb-4">Escrever uma redação sobre os impactos da tecnologia na saúde.</p>
                        <div className="flex mb-6 text-[14px] gap-x-4">
                            <p className="flex items-center gap-x-2">
                                <CloudUpload /> Criado: 29/01/2026
                            </p>
                            <p className="flex items-center gap-x-2">
                                <CalendarDays />
                                Entrega: 14/02/2026
                            </p>
                            <p className="flex items-center gap-x-2 font-bold">
                                Status: <span className="text-yellow-600 dark:text-yellow-400 font-medium">Pendente</span>
                            </p>
                        </div>
                        <button className="px-4 py-0.5 border border-gray-200 rounded hover:bg-gray-200 w-full font-medium dark:hover:bg-gray-600">Selecionar</button>
                    </li>
                    <li className="mb-4 border border-gray-200 rounded-lg p-4 dark:bg-gray-900 dark:border-gray-700">
                        <h2 className="text-[18px] font-medium mb-2">Redação - Tecnologia e Saude</h2>
                        <p className="mb-4">Escrever uma redação sobre os impactos da tecnologia na saúde.</p>
                        <div className="flex mb-6 text-[14px] gap-x-4">
                            <p className="flex items-center gap-x-2">
                                <CloudUpload /> Criado: 29/01/2026
                            </p>
                            <p className="flex items-center gap-x-2">
                                <CalendarDays />
                                Entrega: 14/02/2026
                            </p>
                            <p className="flex items-center gap-x-2 font-bold">
                                Status: <span className="text-green-600 dark:text-green-400 font-medium flex items-center">Entregue</span>
                            </p>
                        </div>
                        <button className="px-4 py-0.5 border border-gray-200 rounded hover:bg-gray-200 w-full font-medium dark:hover:bg-gray-600">Selecionar</button>
                    </li>
                </ul>
            </div>
            <div className="border-gray-200 dark:border-gray-700 border rounded-lg p-6 dark:bg-gray-800 w-1/2">
                <h2 className="text-[18px] font-semibold mb-1.5 dark:text-white">Enviar novo Trabalho</h2>
                <p className="dark:text-gray-300">Preencha os dados e faça o upload do seu trabalho acadêmico</p>
                <form className="mt-6 flex flex-col gap-y-2.5">
                    <label htmlFor="titulo" className="mb-0 font-medium dark:text-gray-200">Título do Trabalho</label>
                    <input type="text" placeholder="Ex: Tech Challenge Fase 2" className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full border-input bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500" />
                    <label htmlFor="descricao" className="font-medium dark:text-gray-200">Descrição</label>
                    <textarea placeholder="Descreva brevemente o conteúdo do trabalho" className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full border-input bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 h-20"></textarea>
                    <label htmlFor="upload" className="font-medium dark:text-gray-200">Arquivo do Trabalho</label>
                    <input type="file" name="" id="" className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full border-input bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 cursor-pointer" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Formatos aceitos: PDF, DOC, DOCX, TXT (máx. 10MB)</p>
                    <button type="submit" className="bg-black dark:bg-gray-700 text-white rounded-lg px-4 py-1.5 w-full hover:bg-gray-800 dark:hover:bg-gray-600 cursor-pointer flex items-center justify-center gap-2 mt-2">
                        <Upload size={18} />
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
}
export default UploadDeTrabalho;