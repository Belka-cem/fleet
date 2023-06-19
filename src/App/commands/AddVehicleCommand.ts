
import Vehicle from '../../Domain/Entities/Vehicle';
import Fleet from "../../Domain/Entities/Fleet";
import FleetDTO from "../../Infra/DTO/fleet.dto";
import MongoDB from "../../Infra/MongoDb";
import FleetServiceBDD from "../../Infra/services/fleet";
import VehicleServiceBDD from '../../Infra/services/vehicle';
import { addVehicle } from './CreateVehicleCommand';
import { log } from 'console';


//  enregistrer un véhicule dans une flotte
export async function registerVehicle(fleetId:string, vehicleId:string): Promise<string> {
  const db = await new MongoDB().getDb() ; 

  // On vérifie d'abbord que le véhicule existe
  const vehicleServiceBdd = new VehicleServiceBDD(db); 
  let vehicleDto = await vehicleServiceBdd.getVehicle(vehicleId);
  console.log("vehicleDto", vehicleDto.id);
  
  const vehicle = Vehicle.createDefault(vehicleDto);
  console.log("Vehicle c", vehicleDto.id);
  if (!vehicle.getId()) return "-1";
  console.log("Vehicle c ok");

  // On récupère la flotte 
  const fleetServiceBdd = new FleetServiceBDD(db); 
  let fleetDto = await fleetServiceBdd.getFleet(fleetId);
  const fleet = Fleet.createDefault(fleetDto);
  if (!fleet.getId()) return "-2";
  console.log("fleet c ok", fleetDto.locations, fleet.getLocation());

  // On vérifie que le véhicule n'existe pas dans la flotte
  const idVehicle = fleet.findVehicleById(vehicle);
  if (idVehicle !== -1) return "-3";
  console.log("vehicule n'existe pas dans la flotte ok ", idVehicle);

  //On ajoute le véhicule dans la flotte
  const result = fleet.addVehicle(vehicle);
  console.log('result', result);
  
  if (result === "ko") return "-4"
  fleetDto.vehicles = [...fleetDto.vehicles, vehicleDto]; 
  console.log("fleetDto locations  ", fleetDto.locations);

  //On met à jour la localisation du vehicule
  vehicle.setCurrentLocation(fleet.getLocation().getLatitude(), fleet.getLocation().getLongitude());
  log
  vehicleDto.currentLocations = {latitude: vehicle.getCurrentLocations().getLatitude(), longitude: vehicle.getCurrentLocations().getLongitude()}
  console.log("vehicleDto  ", vehicleDto.currentLocations);
  //Maj Bdd Fleet
  fleetServiceBdd.addVehicle(fleetDto, vehicleDto);

  //Maj Bdd Vehicle
  vehicleServiceBdd.updateVehicle(vehicleDto); 

  return fleet.getId(); 
}
