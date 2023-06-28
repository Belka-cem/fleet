import Fleet from "../../Domain/Entities/Fleet";
import FleetDTO from "../../Infra/DTO/fleet.dto";
import MongoDB from "../../Infra/MongoDb";
import FleetServiceBDD from "../../Infra/services/fleet";


export async function createFleet(fleet:Fleet) {
    //  créer une flotte et renvoyer l'ID de la flotte
    const fleetDTo : FleetDTO = {
        id : fleet.getId(), 
        name: fleet.getName(),
        vehicles: [],
        locations : {longitude: fleet.getLocation().getLongitude(), latitude: fleet.getLocation().getLatitude() }
      }

      const db = await new MongoDB().getDb() ; 
      const fleetServiceBdd = new FleetServiceBDD(db); 
      const idFleet = await fleetServiceBdd.addFleet(fleetDTo);
      return idFleet;
  }