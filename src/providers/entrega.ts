import database from "@/providers/db";
import { ObjectId } from "mongodb";

export interface Entrega {
    _id: string;
    trabalhoId: string;
    trabalhoTitulo: string;
    alunoId: string;
    alunoNome: string;
    titulo: string;
    conteudo: string;
    arquivoUrl: string;
    dataLimiteDaEntrega: Date;
    dataRecebimento: Date;
    dataAvaliado?: Date;
    nota?: number;
    feedback?: string;
    porcentagemIa?: number;
    analiseIa?: string;
}

class EntregaProvider {
    public async criar(entrega: Omit<Entrega, "_id">): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const entregasCollection = await database.getEntregasCollection();
                const novaEntrega = {
                    trabalhoId: new ObjectId(entrega.trabalhoId),
                    trabalhoTitulo: entrega.trabalhoTitulo,
                    alunoId: new ObjectId(entrega.alunoId),
                    alunoNome: entrega.alunoNome,
                    titulo: entrega.titulo,
                    conteudo: entrega.conteudo,
                    arquivoUrl: entrega.arquivoUrl,
                    dataLimiteDaEntrega: entrega.dataLimiteDaEntrega, // Data definida no Trabalho
                    dataRecebimento: new Date(),
                    dataAvaliado: entrega.dataAvaliado,
                    nota: entrega.nota,
                    feedback: entrega.feedback,
                    porcentagemIa: entrega.porcentagemIa,
                    analiseIa: entrega.analiseIa,
                };
                await entregasCollection.insertOne(novaEntrega);
                resolve();
            } catch (error) {
                reject(`Erro ao criar entrega: ${error}`);
            }
        });
    }

    public async getAll(): Promise<Entrega[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const entregasCollection = await database.getEntregasCollection();
                const entregas = await entregasCollection
                    .find()
                    .sort({ dataRecebimento: -1, _id: -1 })
                    .toArray();
                resolve(entregas as unknown as Entrega[]);
            } catch (error) {
                reject(`Erro ao buscar entregas: ${error}`);
            }
        });
    }

    public async getById(id: string): Promise<Entrega | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const entregasCollection = await database.getEntregasCollection();
                const objectId = new ObjectId(id);
                const entrega = await entregasCollection.findOne({ _id: objectId });
                resolve(entrega as unknown as Entrega);
            } catch (error) {
                reject(`Erro ao buscar entrega por ID: ${error}`);
            }
        });
    }

    public async getByIdTrabalho(trabalhoId: string): Promise<Entrega[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const entregasCollection = await database.getEntregasCollection();
                const objectId = new ObjectId(trabalhoId);
                const entregas = await entregasCollection
                    .find({ trabalhoId: objectId })
                    .sort({ dataRecebimento: -1, _id: -1 })
                    .toArray();
                resolve(entregas as unknown as Entrega[]);
            } catch (error) {
                reject(`Erro ao buscar entregas por ID do trabalho: ${error}`);
            }
        });
    }

    public async getByIdAluno(alunoId: string): Promise<Entrega[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const entregasCollection = await database.getEntregasCollection();
                const objectId = new ObjectId(alunoId);
                const entregas = await entregasCollection
                    .find({ alunoId: objectId })
                    .sort({ dataRecebimento: -1, _id: -1 })
                    .toArray();
                resolve(entregas as unknown as Entrega[]);
            } catch (error) {
                reject(`Erro ao buscar entregas por ID do aluno: ${error}`);
            }
        });
    }

    public async delete(id: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const entregasCollection = await database.getEntregasCollection();
                const objectId = new ObjectId(id);
                await entregasCollection.deleteOne({ _id: objectId });
                resolve();
            } catch (error) {
                reject(`Erro ao deletar entrega: ${error}`);
            }
        });
    }

    public async update(id: string, entrega: Partial<Omit<Entrega, "_id">>): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const entregasCollection = await database.getEntregasCollection();
                const objectId = new ObjectId(id);
                const updateData: any = { ...entrega };

                // Converte IDs string para ObjectId se fornecidos
                if (entrega.trabalhoId) {
                    updateData.trabalhoId = new ObjectId(entrega.trabalhoId);
                }
                if (entrega.alunoId) {
                    updateData.alunoId = new ObjectId(entrega.alunoId);
                }

                await entregasCollection.updateOne(
                    { _id: objectId },
                    { $set: updateData }
                );
                resolve();
            } catch (error) {
                reject(`Erro ao atualizar entrega: ${error}`);
            }
        });
    }
}

const entregaInstance = new EntregaProvider();
export default entregaInstance;