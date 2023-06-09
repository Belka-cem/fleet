import VehicleDTO from "./vehicle.dto";

export default interface FleetDTO {
    id: string;
    name: string;
    vehicles: Array<VehicleDTO>;
    locations :  {latitude: number, longitude:number};
  }