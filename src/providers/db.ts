import { MongoClient, ServerApiVersion } from 'mongodb';

class DatabaseProvider {
    private uri: string = process.env.MONGO_DB_URI || "";
    private databaseName: string = process.env.MONGO_DB_NAME || "";
    private client: MongoClient;
    private connectedClient: Promise<MongoClient>;

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
}

export default DatabaseProvider;