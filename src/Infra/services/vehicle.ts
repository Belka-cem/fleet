
import { Collection, Db, ObjectId } from 'mongodb';
import VehicleDTO from '../DTO/vehicle.dto';

export default class VehicleServiceBDD {

    private fleetCollection : Collection ; 
    private db:Db;

    constructor(db:Db) {
        
        this.db = db; 
        this.fleetCollection = db.collection("vehicle");
    }

    async addFleet(vehicle:VehicleDTO): Promise<string> {
        try {
            const result = await this.fleetCollection.insertOne(vehicle);
            console.log("result", result);
            return vehicle.id;
        } catch (error) {
            //console.log(error);
            throw error;
        }
        
    }

    async getFleet(vehicleId:string): Promise<VehicleDTO> {

        //const collections: { fleetC: Collection } = fleet ;
        try {
            const query = { id: vehicleId };
            console.log("query", query);
            
            const vehicle = await this.fleetCollection.findOne(query) ;
            
            const vehicleDto: VehicleDTO = {
                id: vehicle!.id, 
                brand: vehicle!.brand,
                year: vehicle!.year, 
                model:vehicle!.model,
                type: vehicle!.type,
                fleets: vehicle!.fleets,
                currentLocations: { longitude: vehicle!.longitude, latitude: vehicle!.latitude}
            }        
            return vehicleDto;
        } catch (error) {
            console.log(error);
            throw error;
        }
        
    }
}