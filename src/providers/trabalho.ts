import database from "@/providers/db";
import { ObjectId } from "mongodb";

export interface interfaceTrabalho {
    _id: string;
    titulo: string;
    descricao: string;
    dataEntrega: string;
    dataCriacao: string;
}

class Trabalho {
    public async criar(trabalho: Omit<interfaceTrabalho, "_id">): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const trabalhosCollection = await database.getTrabalhosCollection();
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
                const trabalhosCollection = await database.getTrabalhosCollection();
                const trabalhos = await trabalhosCollection
                    .find()
                    .sort({ dataCriacao: -1, _id: -1 })
                    .toArray();
                resolve(trabalhos as unknown as interfaceTrabalho[]);
            } catch (error) {
                reject(`Erro ao buscar trabalhos: ${error}`);
            }
        });
    }

    public async delete(id: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const trabalhosCollection = await database.getTrabalhosCollection();
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
                const trabalhosCollection = await database.getTrabalhosCollection();
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

    public async getById(id: string): Promise<interfaceTrabalho | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const trabalhosCollection = await database.getTrabalhosCollection();
                const objectId = new ObjectId(id);
                const trabalho = await trabalhosCollection.findOne({ _id: objectId });
                resolve(trabalho as unknown as interfaceTrabalho);
            } catch (error) {
                reject(`Erro ao buscar trabalho por ID: ${error}`);
            }
        });
    }
}

const trabalhoInstance = new Trabalho();
export default trabalhoInstance;