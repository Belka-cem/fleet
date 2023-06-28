
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
  

    private async connect(db_name?: string ): Promise<void> {
      // Bdd par defaut 
      const defaultBdd: string = !process.env.DB_NAME ? "FleetDb" : process.env.DB_NAME 

      //Une bdd passée paramètre ? sinon on utilise celle par défaut
      db_name = !db_name ?  defaultBdd : db_name
      try {
        //this.client = await MongoClient.connect(this.url);
        this.client = new MongoClient (this.url!);
        this.db = this.client.db(db_name ? db_name : "FleetDb");
        this.setState(true);
      } catch (error) {
        console.error('Erreur lors de la connexion à MongoDB :', error);
        this.setState(false);
        throw error;
      }
    }
  
    async getDb(db_name?:string ): Promise<Db> {

      try {
        // Singleton sur la connexion 
        if (!this.db) {
          dotenv.config();
          this.url = !process.env.DB_CONN_STRING ? "" : process.env.DB_CONN_STRING; 
          this.connect(db_name);
        }

        return this.db!;
      } catch (error) {
        throw error;
      }
      
    }

     async testConnexion () : Promise<boolean> {

      try {
        const res = await this.db!.collection("startup_log").find().toArray();
        if(!res) return false ;
        return true ;
      } catch (error) {
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


