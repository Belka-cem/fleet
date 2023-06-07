
import { MongoClient, Db } from 'mongodb';

export default class MongoDB {
    private url: string;
    private client?: MongoClient;
    private db?: Db ; 
  
    constructor(url: string) {
      this.url = url;
    
    }
  
    async connect(): Promise<void> {
      try {
        this.client = await MongoClient.connect(this.url);
        this.db = this.client.db();
        console.log('Connexion réussie à MongoDB');
      } catch (error) {
        console.error('Erreur lors de la connexion à MongoDB :', error);
        throw error;
      }
    }
  
    getDb(): Db {
      if (!this.db) {
        throw new Error('La connexion à la base de données MongoDB n\'a pas été établie.');
      }
      return this.db;
    }
  
    async disconnect(): Promise<void> {
      if (this.client) {
        await this.client.close();
        console.log('Déconnexion réussie de MongoDB');
      }
    }
  }