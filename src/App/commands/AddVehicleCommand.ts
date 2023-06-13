
import Vehicle from '../../Domain/Entities/Vehicle';
import Fleet from "../../Domain/Entities/Fleet";
import FleetDTO from "../../Infra/DTO/fleet.dto";
import MongoDB from "../../Infra/MongoDb";
import FleetServiceBDD from "../../Infra/services/fleet";
import VehicleServiceBDD from '../../Infra/services/vehicle';


//  enregistrer un véhicule dans une flotte
export async function registerVehicle(fleetId:string, vehicleId:string): Promise<string> {
  const db = await new MongoDB().getDb() ; 

  // On vérifie d'abbord que le véhicule existe
  const vehicleServiceBdd = new VehicleServiceBDD(db); 
  let vehicleDto = await vehicleServiceBdd.getFleet(vehicleId);
  const vehicle = Vehicle.createDefault(vehicleDto);
  if (!vehicle.getId()) return "-1";

  // On récupère la flotte 
  const fleetServiceBdd = new FleetServiceBDD(db); 
  let fleetDto = await fleetServiceBdd.getFleet(fleetId);
  const fleet = Fleet.createDefault(fleetDto);
  if (!fleet.getId()) return "-2";

  // On vérifie que le véhicule n'existe pas dans la flotte
  const idVehicle = fleet.findVehicleById(vehicle);
  console.log("idVehicle", idVehicle);
  if (idVehicle === -1)return "-3";

  //On ajoute le véhicule dans la flotte
  const result = fleet.addVehicle(vehicle);
  if (result === "ko") return "-4"
  fleetDto.vehicles = [...fleetDto.vehicles, vehicleDto]; 
  
  //On met à jour la localisation du vehicule
  vehicle.setCurrentLocation(fleet.getLocation().getLatitude(), fleet.getLocation().getLongitude());

  //Maj Bdd Fleet

  //Maj Bdd Vehicle

  return fleet.getId(); 
}
