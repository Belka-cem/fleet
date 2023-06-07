import { Command } from 'commander';

export default function removeVehicleCommand(program: Command) {
  program
    .command('removeVehicle <id>')
    .description('Remove a vehicle from the fleet')
    .action((id) => {
      // Logique pour supprimer le véhicule de la flotte en utilisant l'ID fourni
    });
}