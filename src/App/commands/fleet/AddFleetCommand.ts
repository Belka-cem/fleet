import { Command } from 'commander';
import Fleet from '../../../Domain/Entities/Fleet';
import { VehicleTypes } from '../../../Domain/Types/Types';


export default function addVehicleCommand(program: Command) {
  program
    .command('register-vehicle')
    .description('Add a new vehicle to the fleet')
    .option('-i, --id <id>', 'User ID')
    .option('-b, --brand <brand>', 'Vehicle brand')
    .option('-m, --model <model>', 'Vehicle model')
    .option('-y, --year <year>', 'Vehicle year')
    .action((options) => {
      const { id, brand, model, year } = options;
      const vehicle = new Fleet(id, brand, 0, 0 );
      // Logique pour ajouter le véhicule à la flotte
    });
}
