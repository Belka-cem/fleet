
import Vehicle from '../../Domain/Entities/Vehicle';
import MongoDB from "../../Infra/MongoDb";
import VehicleServiceBDD from '../../Infra/services/vehicle';
import VehicleDTO from '../../Infra/DTO/vehicle.dto';


//  Créer un vehicule
export async function addVehicle(id: string, brand: string, model: string, year: string, type: string, latitude = -1, longitude = -1): Promise<string> {
    //connexion bdd
    const db = await new MongoDB().getDb();
    const vehicleDto: VehicleDTO = {
        id,
        brand,
        model,
        year,
        fleets: [],
        type,
        currentLocations: { latitude, longitude }
    }

    // Insertion en bdd
    const vehicleServiceBDD: VehicleServiceBDD = new VehicleServiceBDD(db);
    const vehicleId = await vehicleServiceBDD.addVehcile(vehicleDto); 

    return vehicleId;
}
