
import { MongoClient, Db } from 'mongodb';
import * as dotenv from "dotenv";

export default class MongoDB {
  private url?: string;
  private client?: MongoClient;
  private db?: Db;
  private isConnected = false;

  /**
   * Renvoie l'état de la connexion à la base de données
   * @returns True si connecté, sinon False
   */
  getState(): boolean {
      return this.isConnected;
  }

  private setState(state: boolean) {
      this.isConnected = state;
  }

  /**
   * Établit une connexion à la base de données MongoDB
   * @param db_name - Nom de la base de données (optionnel)
   */
  private async connect(db_name?: string): Promise<void> {
      // Base de données par défaut
      const defaultBdd: string = !process.env.DB_NAME ? "FleetDb" : process.env.DB_NAME;

      // Base de données passée en paramètre, sinon utilisation de la base de données par défaut
      db_name = !db_name ? defaultBdd : db_name;
      try {
          this.client = new MongoClient(this.url!);
          this.db = this.client.db(db_name);
          this.setState(true);
      } catch (error) {
          console.error('Erreur lors de la connexion à MongoDB :', error);
          this.setState(false);
          throw error;
      }
  }

  /**
   * Récupère la référence à la base de données
   * @param db_name - Nom de la base de données (optionnel)
   * @returns La référence à la base de données
   */
  async getDb(db_name?: string): Promise<Db> {
      try {
          // Singleton sur la connexion
          if (!this.db) {
              dotenv.config();
              this.url = !process.env.DB_CONN_STRING ? "" : process.env.DB_CONN_STRING;
              await this.connect(db_name);
          }

          return this.db!;
      } catch (error) {
          throw error;
      }
  }

  /**
   * Vérifie si la connexion à la base de données est fonctionnelle
   * @returns True si la connexion est réussie, sinon False
   */
  async testConnexion(): Promise<boolean> {
      try {
          const res = await this.db!.collection("startup_log").find().toArray();
          if (!res) return false;
          return true;
      } catch (error) {
          throw error;
      }
  }

  /**
   * Ferme la connexion à la base de données
   */
  private async disconnect(): Promise<void> {
      if (this.client) {
          await this.client.close();
          console.log('Déconnexion réussie de MongoDB');
      }
  }
}
