import { VehicleTypes } from "../Types/Types";

export default class Vehicle {
    private id: number;
    protected brand: string;
    protected model: string;
    protected type: VehicleTypes;
    protected year: string;
    protected status: boolean = false; 

    constructor(id: number, brand: string, model: string, year: string, type:VehicleTypes) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.type = type;
       
    }


      // Getters
  public getId(): number {
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
}