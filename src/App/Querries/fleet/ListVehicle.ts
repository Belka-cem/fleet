import { Command } from 'commander';

export default function listVehiclesCommand(program: Command) {
  program
    .command('listVehicles')
    .description('List all vehicles in the fleet')
    .action(() => {
      // Logique pour afficher la liste des véhicules de la flotte
    });
}