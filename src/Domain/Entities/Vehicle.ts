import VehicleDTO from "../../Infra/DTO/vehicle.dto";
import { VehicleTypes } from "../Types/Types";
import Fleet from "./Fleet";
import Location_ from "./Location"

export default class Vehicle {
    private id: string;
    private brand: string;
    private model: string;
    private type: string;
    private year: string;
    private myFleets : Array<Fleet>  = [] ; 
    private currentLocations: Location_   =  new Location_() ; 


    constructor(id: string, brand: string, model: string, year: string, type:string) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.type = type;
       
    }

    static createDefault(vehicleDto:VehicleDTO):Vehicle {
      return  new Vehicle(vehicleDto.id, vehicleDto.brand, vehicleDto.model, vehicleDto.year, vehicleDto.type)
    }


      // Getters
  public getId(): string {
    return this.id;
  }

  public getBrand(): string {
    return this.brand;
  }

  public getModel(): string {
    return this.model;
  }

  public getYear(): string {
    return this.year;
  }

  public getCurrentLocations(): Location_ {
    return this.currentLocations;
  }

  public getMyFleets(): Array<Fleet> {
    return this.myFleets;
  }

  //Setters
  public setCurrentLocation(latitude: number, longitude:number){
    this.currentLocations.setLatitude(latitude);
    this.currentLocations.setLongitude(longitude);
  }

  public setMyFleets(newFleet: Fleet):string{
    // Si la  nouvelle flotte n'exite pas dans les flottes du véhicules on l'ajoute
    if (this.myFleets.filter(f => f.getId() === newFleet.getId()).length < 1) {
      this.myFleets.push(newFleet)
      return newFleet.getId() ; 
    }
    return "" ; 
  }


  //
}