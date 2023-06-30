
import { Collection, Db, ObjectId } from 'mongodb';
import VehicleDTO from '../DTO/vehicle.dto';

export default class VehicleServiceBDD {
    private fleetCollection: Collection;
    private db: Db;

    constructor(db: Db) {
        this.db = db;
        this.fleetCollection = db.collection("vehicle");
    }

    /**
     * Ajoute un véhicule dans la base de données
     * @param vehicle - Informations sur le véhicule à ajouter
     * @returns L'ID du véhicule ajouté
     */
    async addVehicle(vehicle: VehicleDTO): Promise<string> {
        try {
            const vehicleExist = await this.getVehicle(vehicle.id)
            if (!vehicleExist){
                const result = await this.fleetCollection.insertOne(vehicle);
            }
            return vehicle.id;
        } catch (error) {
            //console.log(error);
            throw error;
        }
    }

    /**
     * Met à jour les informations d'un véhicule dans la base de données
     * @param vehicle - Informations sur le véhicule à mettre à jour
     */
    async updateVehicle(vehicle: VehicleDTO): Promise<void> {
        try {
            const result = await this.fleetCollection.updateOne({ id: vehicle.id }, { "$set": vehicle });
            if (!result) throw new Error("Erreur lors de la mise à jour du véhicule : " + vehicle.id);
        } catch (error) {
            //console.log(error);
            throw error;
        }
    }

    /**
     * Récupère les informations d'un véhicule à partir de son ID
     * @param vehicleId - ID du véhicule à récupérer
     * @returns Les informations du véhicule
     */
    async getVehicle(vehicleId: string): Promise<VehicleDTO | null > {
        try {
            const query = { id: vehicleId };
            const vehicle = await this.fleetCollection.findOne(query);
            //console.log("vehicle", vehicle);
            if(!vehicle) return null

            const vehicleDto: VehicleDTO = {
                id: vehicle!.id,
                brand: vehicle!.brand,
                year: vehicle!.year,
                model: vehicle!.model,
                type: vehicle!.type,
                fleets: vehicle!.fleets,
                currentLocations: { longitude: vehicle!.currentLocations.longitude, latitude: vehicle!.currentLocations.latitude }
            };
            return vehicleDto;
        } catch (error) {
            throw error;
        }
    }
}