
import { Collection, Db, ObjectId } from 'mongodb';
import FleetDTO from '../DTO/fleet.dto';
import VehicleDTO from '../DTO/vehicle.dto';

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
            
            console.log("result", result);
            
            return fleet.id;
        } catch (error) {
            //console.log(error);
            throw error;
        }
        
    }

    async getFleet(fleetId:string): Promise<FleetDTO> {

        //const collections: { fleetC: Collection } = fleet ;
        try {
            const query = { id: fleetId };
            console.log("query", query);
            
            const fleet = await this.fleetCollection.findOne(query) ;
            
            const fleetDto: FleetDTO = {
                id: fleet!.id, 
                name: fleet!.name,
                vehicles: fleet!.vehicles, 
                locations: { longitude: fleet!.longitude, latitude: fleet!.latitude}
            }        
            return fleetDto;
        } catch (error) {
            console.log(error);
            throw error;
        }
        
    }

    async addVehicle(fleetId:string, vehicleDto:VehicleDTO): Promise<FleetDTO> {

        //const collections: { fleetC: Collection } = fleet ;
        try {
            const query = { id: fleetId };
            console.log("query", query);
            
            const fleet = await this.fleetCollection.findOne(query) ;
            
            const fleetDto: FleetDTO = {
                id: fleet!.id, 
                name: fleet!.name,
                vehicles: fleet!.vehicles, 
                locations: { longitude: fleet!.longitude, latitude: fleet!.latitude}
            }        
            return fleetDto;
        } catch (error) {
            console.log(error);
            throw error;
        }
        
    }
}