import DatabaseProvider from "@/providers/db";
import { ObjectId } from "bson";

interface Entrega {
    _id: ObjectId;
    trabalhoId: ObjectId;
    alunoId: ObjectId;

    titulo: string;
    conteudo: string;
    arquivoUrl: string;

    dataEntrega: Date;
    nota?: number;
    feedback?: string;
    porcentagemIa?: number;
    analiseIa?: string;
}

class EntregaProvider extends DatabaseProvider {
    constructor() {
        super();
    }
}

export default EntregaProvider;