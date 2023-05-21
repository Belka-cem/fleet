import Vehicle from "./Vehicle";



class Fleet {
    private id: string;
    private name: string;
    private vehicles: Vehicle[];
    private location: Location_
  
    constructor(id: string, name: string, vehicles: Vehicle[], location: Location_) {
      this.id = id;
      this.name = name;
      this.vehicles = vehicles;
      this.location = location
    }
  
    // Getters
    public getId(): string {
      return this.id;
    }
  
    public getName(): string {
      return this.name;
    }
  
    public getVehicles(): Vehicle[] {
      return this.vehicles;
    }
  
    // Add a vehicle to the fleet
    public addVehicle(vehicle: Vehicle): void {
      this.vehicles.push(vehicle);
    }
  
    // Remove a vehicle from the fleet
    public removeVehicle(vehicle: Vehicle): void {
      const index = this.vehicles.findIndex(v => v.getId() === vehicle.getId());
      if (index !== -1) {
        this.vehicles.splice(index, 1);
      }
    }
  }