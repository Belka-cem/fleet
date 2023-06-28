
import { Collection, Db, ObjectId } from 'mongodb';
import VehicleDTO from '../DTO/vehicle.dto';

export default class VehicleServiceBDD {

    private fleetCollection : Collection ; 
    private db:Db;

    constructor(db:Db) {
        
        this.db = db; 
        this.fleetCollection = db.collection("vehicle");
    }

    async addVehcile(vehicle:VehicleDTO): Promise<string> {
        try {
            const result = await this.fleetCollection.insertOne(vehicle);
            console.log("result", result);
            return vehicle.id;
        } catch (error) {
            //console.log(error);
            throw error;
        }
        
    }

    async updateVehicle(vehicle:VehicleDTO):Promise<void> {
        try {
            const result = await this.fleetCollection.updateOne({id: vehicle.id}, {"$set" :vehicle});
            if(!result) throw new Error("Error lors de la maj du véhicule : " + vehicle.id)
            
        } catch (error) {
            //console.log(error);
            throw error;
        }
    }

    async getVehicle(vehicleId:string): Promise<VehicleDTO> {

        //const collections: { fleetC: Collection } = fleet ;
        try {
            const query = { id: vehicleId };
            
            const vehicle = await this.fleetCollection.findOne(query) ;
            //console.log("vehicle", vehicle);
            
             if (!vehicle) throw new Error("Impossible de récupérer le véhicule " + vehicleId )
            const vehicleDto: VehicleDTO = {
                id: vehicle!.id, 
                brand: vehicle!.brand,
                year: vehicle!.year, 
                model:vehicle!.model,
                type: vehicle!.type,
                fleets: vehicle!.fleets,
                currentLocations: { longitude: vehicle!.currentLocations.longitude, latitude: vehicle!.currentLocations.latitude}
            }        
            return vehicleDto;
        } catch (error) {
            throw error;
        }
        
    }
}