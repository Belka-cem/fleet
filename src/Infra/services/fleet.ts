
import { Collection, Db, ObjectId } from 'mongodb';
import FleetDTO from '../DTO/fleet.dto';
import VehicleDTO from '../DTO/vehicle.dto';
import { log } from 'console';

export default class FleetServiceBDD {

    private fleetCollection : Collection ; 
    private db:Db;

    constructor(db:Db) {
        
        this.db = db; 
        this.fleetCollection = db.collection("fleet");
    }

    async addFleet(fleet:FleetDTO): Promise<string> {

        //const collections: { fleetC: Collection } = fleet ;
        try {
            const result = await this.fleetCollection.insertOne(fleet);
            return fleet.id;
        } catch (error) {
            throw error;
        }
        
    }

    async getFleet(fleetId:string): Promise<FleetDTO> {

        //const collections: { fleetC: Collection } = fleet ;
        try {
            const query = { id: fleetId };
            
            const fleet = await this.fleetCollection.findOne(query) ;
            const fleetDto: FleetDTO = {
                id: fleet!.id, 
                name: fleet!.name,
                vehicles: fleet!.vehicles, 
                locations: { longitude: fleet!.locations.longitude, latitude: fleet!.locations.latitude}
            }        
            return fleetDto;
        } catch (error) {
            throw error;
        }
        
    }

    async addVehicle(fleetDto:FleetDTO ){

        try {
            const query = { id: fleetDto.id };
            const res = await this.fleetCollection.updateOne(query, {"$set":{vehicles:fleetDto.vehicles}}) ;
            if (!res) throw new Error("Problème lors de l'ajout du véhicule");
     
        } catch (error) {
            throw error;
        }   
    }
}