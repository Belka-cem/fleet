import Vehicle from "./Vehicle";
import Location_ from "./Location"
import { stringify } from "querystring";
import { Console, log } from "console";
import FleetDTO from "../../Infra/DTO/fleet.dto";


export default class Fleet{
    private id: string;
    private name: string;
    private tabVehicles: Array<Vehicle> = []; 
    private location : Location_ ; 
    
    // Contructeur classique
    constructor(id: string, name: string,  latitude: number, longitude: number) {
      this.location = new Location_(latitude, longitude)
      this.id = id;
      this.name = name;
    }

        // On créée la classe à partie du dto
        static createDefault(fleetDto:FleetDTO):Fleet {
          return  new Fleet(fleetDto.id, fleetDto.name, fleetDto.locations.latitude, fleetDto.locations.longitude)
        }
  
    // Getters
    public getId(): string {
      return this.id;
    }
  
    public getName(): string {
      return this.name;
    }

    public getLocation(): Location_ {
      return this.location;
    }
  
    public getVehicles(): Array<Vehicle> {
      return this.tabVehicles;
    }
  
  // Add a vehicle to the fleet
  public addVehicle(vehicle: Vehicle): string {
    //On ajoute le vehicule que si il n'existe pas dans la flotte
    const tabFiltervehicle =  this.tabVehicles.filter(v => v.getId() === vehicle.getId());
    if (tabFiltervehicle.length > 0) {
      return "ko";
    }
    // on maj la localisation en cours du vehicule
    vehicle.setCurrentLocation(this.location.getLatitude(), this.location.getLongitude())
    //on ajoute le véhicule à la flotte
    this.tabVehicles.push(vehicle);
    // On ajoute la flotte encours à la flotte du vehicule
    vehicle.setMyFleets(this)
    return "ok";
  }
  
    // Remove a vehicle from the fleet
    public removeVehicle(vehicle: Vehicle): void {
      const index = this.tabVehicles.findIndex(v => v.getId() === vehicle.getId());
      if (index !== -1) {
        this.tabVehicles.splice(index, 1);
      }
    }

        //trouve un  Vehicle par son id
        public findVehicleById (vehicle:Vehicle)  {
          const index = this.tabVehicles.findIndex(v => v.getId() === vehicle.getId());
          return index;
        }
    
        public findVehiculeByBrand(vehiculeBrand:string){
          const newTabVehicles = this.tabVehicles.filter(v => v.getBrand() === vehiculeBrand)
          return newTabVehicles; 
        }
    
  }