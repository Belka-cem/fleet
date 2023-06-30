
import { Collection, Db, ObjectId } from 'mongodb';
import FleetDTO from '../DTO/fleet.dto';
import VehicleDTO from '../DTO/vehicle.dto';
import { log } from 'console';

export default class FleetServiceBDD {
    private fleetCollection: Collection;
    private db: Db;

    constructor(db: Db) {
        this.db = db;
        this.fleetCollection = db.collection("fleet");
    }

    /**
     * Ajoute une flotte dans la base de données
     * @param fleet - Informations sur la flotte à ajouter
     * @returns L'ID de la flotte ajoutée
     */
    async addFleet(fleet: FleetDTO): Promise<string> {
        try {
            // Vérifier si la flotte existe déjà
            const fleetExist = await this.getFleet(fleet.id);
            if (!fleetExist) {
                const result = await this.fleetCollection.insertOne(fleet);
            }
            return fleet.id;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Récupère les informations d'une flotte à partir de son ID
     * @param fleetId - ID de la flotte à récupérer
     * @returns Les informations de la flotte
     */
    async getFleet(fleetId: string): Promise<FleetDTO | null> {
        try {
            const query = { id: fleetId };

            const fleet = await this.fleetCollection.findOne(query);
            if(!fleet) return null
            const fleetDto: FleetDTO = {
                id: fleet!.id,
                name: fleet!.name,
                vehicles: fleet!.vehicles,
                locations: { longitude: fleet!.locations.longitude, latitude: fleet!.locations.latitude }
            };
            return fleetDto;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Ajoute un véhicule à une flotte existante
     * @param fleetDto - Informations de la flotte avec le véhicule ajouté
     */
    async addVehicle(fleetDto: FleetDTO) {
        try {
            const query = { id: fleetDto.id };
            const res = await this.fleetCollection.updateOne(query, { "$set": { vehicles: fleetDto.vehicles } });
            if (!res) throw new Error("Problème lors de l'ajout du véhicule");
        } catch (error) {
            throw error;
        }
    }
}
