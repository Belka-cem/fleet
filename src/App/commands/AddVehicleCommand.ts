
import Vehicle from '../../Domain/Entities/Vehicle';
import Fleet from "../../Domain/Entities/Fleet";
import FleetDTO from "../../Infra/DTO/fleet.dto";
import MongoDB from "../../Infra/MongoDb";
import FleetServiceBDD from "../../Infra/services/fleet";
import VehicleServiceBDD from '../../Infra/services/vehicle';
import { addVehicle } from './CreateVehicleCommand';
import { log } from 'console';
import VehicleDTO from '../../Infra/DTO/vehicle.dto';


//  enregistrer un véhicule dans une flotte
export async function registerVehicle(fleetId: string, vehicleId: string): Promise<string> {
  const db = await new MongoDB().getDb();

  // On vérifie d'abbord que le véhicule existe
  const vehicleServiceBdd = new VehicleServiceBDD(db);
  let vehicleDto : VehicleDTO | null = await vehicleServiceBdd.getVehicle(vehicleId);

  if (!vehicleDto) return "-1";
  const vehicle = Vehicle.createDefault(vehicleDto);

  // On récupère la flotte 
  const fleetServiceBdd = new FleetServiceBDD(db);
  let fleetDto : FleetDTO | null  ; 
   fleetDto = await fleetServiceBdd.getFleet(fleetId);
   if (!fleetDto) return "-2";
  const fleet = Fleet.createDefault(fleetDto);
  console.log('fleet id ' + fleet.getId());
  

  // On vérifie que le véhicule n'existe pas dans la flotte
  const idVehicle = fleet.findVehicleById(vehicle);
  if (idVehicle !== -1) return "-3";

  //On ajoute l'id du  véhicule dans la flotte
  const result = fleet.addVehicle(vehicle);
  if (result === "ko") return "-4" ;
  // On récupère l'id des vehicules 
  const tabIdvehicles = fleet.getVehicles().map(v => v.getId()); 
  fleetDto.vehicles = [...tabIdvehicles];
  
  //Maj Bdd Fleet
  await fleetServiceBdd.addVehicle(fleetDto);

  //On met à jour la localisation du vehicule
  vehicle.setCurrentLocation(fleet.getLocation().getLatitude(), fleet.getLocation().getLongitude());
  vehicleDto.currentLocations = { latitude: vehicle.getCurrentLocations().getLatitude(), longitude: vehicle.getCurrentLocations().getLongitude() }

  // On ajoute la flote dans les flottes du véhicule si elle n'existe pas
  const resuSetMyfleet = vehicle.setMyFleets(fleet)
  const tabIdFleet = vehicle.getMyFleets().map(f => f.getId()); 
  if (resuSetMyfleet === "") vehicleDto.fleets = [...tabIdFleet]

  //Maj Bdd Vehicle
  await vehicleServiceBdd.updateVehicle(vehicleDto);

  return fleet.getId();
}
