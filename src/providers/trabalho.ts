import DatabaseProvider from "@/providers/db";
import { ObjectId } from "mongodb";

interface interfaceTrabalho {
    titulo: string;
    descricao: string;
    dataEntrega: string;
    dataCriacao: string;
}

class Trabalho {
    databaseProvider: DatabaseProvider;

    constructor() {
        this.databaseProvider = new DatabaseProvider();
    }

    public async criar(trabalho: interfaceTrabalho): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const trabalhosCollection = await this.databaseProvider.getTrabalhosCollection();
                await trabalhosCollection.insertOne({
                    titulo: trabalho.titulo,
                    descricao: trabalho.descricao,
                    dataEntrega: trabalho.dataEntrega,
                    dataCriacao: trabalho.dataCriacao,
                });
                resolve();
            } catch (error) {
                reject(`Erro ao criar trabalho: ${error}`);
            }
        });
    }

    public async getAll(): Promise<interfaceTrabalho[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const trabalhosCollection = await this.databaseProvider.getTrabalhosCollection();
                const trabalhos = await trabalhosCollection.find().toArray();
                resolve(trabalhos as unknown as interfaceTrabalho[]);
            } catch (error) {
                reject(`Erro ao buscar trabalhos: ${error}`);
            }
        });
    }

    public async delete(id: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const trabalhosCollection = await this.databaseProvider.getTrabalhosCollection();
                const objectId = new ObjectId(id);
                await trabalhosCollection.deleteOne({ _id: objectId });
                resolve();
            } catch (error) {
                reject(`Erro ao deletar trabalho: ${error}`);
            }
        });
    }

    public async update(id: string, trabalho: Partial<interfaceTrabalho>): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const trabalhosCollection = await this.databaseProvider.getTrabalhosCollection();
                const objectId = new ObjectId(id);
                await trabalhosCollection.updateOne(
                    { _id: objectId },
                    { $set: trabalho }
                );
                resolve();
            } catch (error) {
                reject(`Erro ao atualizar trabalho: ${error}`);
            }
        });
    }
}

export default Trabalho;