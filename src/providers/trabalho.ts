import DatabaseProvider from "@/providers/db";

interface interfaceTrabalho {
    id: string;
    titulo: string;
    descricao: string;
    dataEntrega: string;
    status: "pendente" | "avaliado";
    nota: number | null;
}

interface interfaceCriarTrabalho {
    titulo: string;
    descricao: string;
    dataEntrega: string;
}

class Trabalho {
    databaseProvider: DatabaseProvider;

    constructor() {
        this.databaseProvider = new DatabaseProvider();
    }

    public async criar(trabalho: interfaceCriarTrabalho): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const trabalhosCollection = await this.databaseProvider.getTrabalhosCollection();
                await trabalhosCollection.insertOne({
                    titulo: trabalho.titulo,
                    descricao: trabalho.descricao,
                    dataEntrega: trabalho.dataEntrega,
                    status: "pendente",
                    nota: null
                });
                resolve();
            } catch (error) {
                reject(`Erro ao criar trabalho: ${error}`);
            }
        });
    }
}

export default Trabalho;