
import { MongoClient, Db } from 'mongodb';
import * as dotenv from "dotenv";

export default class MongoDB {
    private url?: string;
    private client?: MongoClient;
    private db?: Db ; 
    private isConnected = false ; 

    getState (): boolean {
      return this.isConnected ; 
    }

    private setState (state:boolean) {
       this.isConnected= state ; 
    }
  

    private async connect(): Promise<void> {
      try {
        //this.client = await MongoClient.connect(this.url);
        this.client = new MongoClient (this.url!);
        this.db = this.client.db(process.env.DB_NAME);
        console.log('Connexion réussie à MongoDB');
        this.setState(true);
      } catch (error) {
        console.error('Erreur lors de la connexion à MongoDB :', error);
        this.setState(false);
        throw error;
      }
    }
  
    async getDb(): Promise<Db> {

      try {
        // Singleton sur la connexion 
        if (!this.db) {
          dotenv.config();
          this.url = !process.env.DB_CONN_STRING ? "" : process.env.DB_CONN_STRING; 
          this.connect();
        }

        return this.db!;
      } catch (error) {
        console.error('Erreur lors de la connexion à MongoDB :', error);
        throw error;
      }
      
    }
  
    private async disconnect(): Promise<void> {
      if (this.client) {
        await this.client.close();
        console.log('Déconnexion réussie de MongoDB');
      }
    }
  }


