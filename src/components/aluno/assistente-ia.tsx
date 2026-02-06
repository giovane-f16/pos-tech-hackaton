import { Send } from "lucide-react";

const AssistenteIa = () => {
    return (
        <div className="border-gray-200 dark:border-gray-700 border rounded-lg p-6 dark:bg-gray-800">
            <h2 className="text-[18px] font-semibold mb-1.5 dark:text-white">Assistente de IA</h2>
            <p className="dark:text-gray-300">Converse com a IA para obter ajuda com seus trabalhos</p>
            <div className="mt-6 border border-gray-300 dark:border-gray-700 rounded-md p-4 h-96 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                <p className="text-gray-500 dark:text-gray-400">Área de chat com a IA (em desenvolvimento)</p>
            </div>
            <form className="mt-4 flex gap-2">
                <input type="text" placeholder="Digite sua pergunta..." className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full border-input bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500" />
                <button type="submit" className="bg-black dark:bg-gray-700 text-white rounded-lg px-4 py-1.0 hover:bg-gray-800 dark:hover:bg-gray-600 cursor-pointer flex items-center justify-center gap-2">
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
}
export default AssistenteIa;