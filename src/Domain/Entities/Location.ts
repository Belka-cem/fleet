class Location_ {
    private latitude: number;
    private longitude: number;
  
    constructor(latitude: number, longitude: number) {
      this.latitude = latitude;
      this.longitude = longitude;
    }
  
    // Getters
    public getLatitude(): number {
      return this.latitude;
    }
  
    public getLongitude(): number {
      return this.longitude;
    }
  
    // Setters
    public setLatitude(latitude: number): void {
      this.latitude = latitude;
    }
  
    public setLongitude(longitude: number): void {
      this.longitude = longitude;
    }
  }