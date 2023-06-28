#!/usr/bin/env node
import { Command, Option } from 'commander';
import Fleet from '../Domain/Entities/Fleet';
import { createFleet } from './commands/CreateFleetCommand';
import { registerVehicle } from './commands/AddVehicleCommand';
import { addVehicle} from './commands/CreateVehicleCommand'
import { localizeVehicle } from './Querries/GetVehicle';


const program = new Command();

// Création d'une flote
program
  .command('create')
  .description('Create a fleet')
  .requiredOption('-i, --id <id>', 'User ID')
  .option('-n, --name <name>', 'Fleet name')
  .option('-lt, --latitude <latitude>', 'latitude location')
  .option('-lg, --longitude <longitude>', 'longitude location')
  .action(async (options) => {
    //console.log("init", options.id, options.name, options.latitude, options.longitude);
     await handleCommand('create', options);
    
  });

  program
  .command('create-vehicle')
  .description('Create a vehicle')
  .requiredOption('-i, --id <id>', 'Id')
  .requiredOption('-b, --brand <Brand>', 'Brand')
  .requiredOption('-m, --model <Model>', 'Model')
  .requiredOption('-y, --year <Year>', 'Year')
  .requiredOption('-t, --type <Type>', 'Type')
  .requiredOption('-lt, --latitude <latitude>', 'latitude location')
  .requiredOption('-lg, --longitude <longitude>', 'longitude location')
  .action((options) => {
    handleCommand('create-vehicle', options);
  });



// Enregistrer un véhicule existant à une flotte
program
  .command('register-vehicle')
  .description('Add a new vehicle to the fleet')
  .requiredOption('-fi, --fleet <fleetId>', 'Fleet id')
  .requiredOption('-vi, --vehicle <vehicleId>', 'Vehicle id')
  .action(async(options) => {
    await handleCommand('register-vehicle', options);
  });


// Localiser un vehicule
program
  .command('localize-vehicle')
  .description('Localize a vehicle')
  .requiredOption('-vi, --vehicle <vehicleId>', 'Vehicle id')
  .action(async(options) => {
    await handleCommand('localize-vehicle', options);
  });



program.parse(process.argv);

async function handleCommand(command:string, options:any) {
  
  switch (command) {
    case 'create':
    
      let { id, name, latitude, longitude } = options;
     
      //Optionnel
      if (!name) name = "Random Fleet"; 
      if (!latitude) latitude = 43.296174; 
      if (!longitude) longitude = 5.369953; 


      //Init Fleet
      const fleet = new Fleet(id, name, latitude, longitude );
      //AJout de la flote à la bdd
      const idFleet = await createFleet(fleet);
      process.exit(0);

    case 'register-vehicle':
      // enregistrer un véhicule dans une flotte
      await registerVehicle(options.fleet, options.vehicle);
      //console.log(`Véhicule ${options.vehicle} est ajouté à la flotte ${options.fleet}`);
      process.exit(0);

    case 'localize-vehicle':
      //localiser un véhicule dans une flotte
      process.exit(0);

    case 'create-vehicle':
      // Céer un vehicule
      await addVehicle(options.id, options.brand, options.model, options.year, options.type, options.latitude, options.longitude);
      process.exit(0);

    default:
      console.error('Invalid command');
      process.exit(1);
  }
}
