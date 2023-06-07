import { Command } from 'commander';
import Vehicle from '../../../Domain/Entities/Vehicle';
import { VehicleTypes } from '../../../Domain/Types/Types';


export default function addVehicleCommand(program: Command) {
  program
    .command('register-vehicle')
    .description('Add a new vehicle to the fleet')
    .option('-i, --id <id>', 'Vehicle ID')
    .option('-b, --brand <brand>', 'Vehicle brand')
    .option('-m, --model <model>', 'Vehicle model')
    .option('-y, --year <year>', 'Vehicle year')
    .action((options) => {
      const { id, brand, model, year } = options;
      const vehicle = new Vehicle(id, brand, model, year, VehicleTypes.car);
      // Logique pour ajouter le véhicule à la flotte
    });
}
