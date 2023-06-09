
import { Collection, Db } from 'mongodb';
import FleetDTO from '../DTO/fleet.dto';

export default class FleetServiceBDD {

    private fleetCollection : Collection ; 
    private db:Db;

    constructor(db:Db) {
        
        this.db = db; 
        this.fleetCollection = db.collection("fleet");
    }

    async addFleet(fleet:FleetDTO): Promise<string> {
        console.log("addFleet init", fleet );
        
        try {
            const result = await this.fleetCollection.insertOne({...fleet});
            
            console.log("result", result);
            
            return fleet.id;
        } catch (error) {
            console.log(error);
            throw error;
        }
        
    }
}