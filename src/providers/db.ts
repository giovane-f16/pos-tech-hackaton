import { MongoClient, ServerApiVersion } from 'mongodb';

class DatabaseProvider {
    private uri: string = process.env.MONGO_DB_URI || "";
    private databaseName: string = process.env.MONGO_DB_NAME || "";
    private client: MongoClient;
    private connectedClient: Promise<MongoClient>;
    private userCollection: string = process.env.MONGO_DB_USER_COLLECTION || "Users";
    private trabalhosCollection: string = process.env.MONGO_DB_TRABALHOS_COLLECTION || "Trabalhos";
    private entregasCollection: string = process.env.MONGO_DB_ENTREGAS_COLLECTION || "Entregas";

    constructor() {
        this.client = new MongoClient(this.uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });

        this.connectedClient = this.connect();
    }

    private async connect(): Promise<MongoClient> {
        try {
            await this.client.connect();
            return this.client;
        } catch (error) {
            throw new Error(`Falha ao conectar ao banco de dados: ${error}`);
        }
    }

    public async getClient() {
        try {
            let client = await this.connectedClient;
            return client.db(this.databaseName);
        } catch (error) {
            throw new Error(`Erro ao obter o cliente do banco de dados: ${error}`);
        }
    }

    public getUsersCollection() {
        try {
            let usersCollection = this.getClient().then(db => db.collection(this.userCollection));
            return usersCollection;
        } catch (error) {
            throw new Error(`Erro ao obter a coleção de usuários: ${error}`);
        }
    }

    public getTrabalhosCollection() {
        try {
            let trabalhosCollection = this.getClient().then(db => db.collection(this.trabalhosCollection));
            return trabalhosCollection;
        } catch (error) {
            throw new Error(`Erro ao obter a coleção de trabalhos: ${error}`);
        }
    }

    public getEntregasCollection() {
        try {
            let entregasCollection = this.getClient().then(db => db.collection(this.entregasCollection));
            return entregasCollection;
        } catch (error) {
            throw new Error(`Erro ao obter a coleção de entregas: ${error}`);
        }
    }
}

const databaseInstance = new DatabaseProvider();
export default databaseInstance;