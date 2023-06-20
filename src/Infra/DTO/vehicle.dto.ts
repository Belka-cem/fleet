import FleetDTO from "./fleet.dto";

export default interface VehicleDTO {
    id: string;
    brand: string;
    model: string;
    year: string;
    fleets: Array<string>;
    type:string;
    currentLocations :  {latitude: number, longitude:number}
  }