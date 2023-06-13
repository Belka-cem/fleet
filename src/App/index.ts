#!/usr/bin/env node
import { Command, Option } from 'commander';
import Fleet from '../Domain/Entities/Fleet';
import { createFleet } from './commands/CreateFleetCommand';
import { registerVehicle } from './commands/AddVehicleCommand';



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


// Enregistrer un véhicule
program
  .command('register-vehicle')
  .description('Add a new vehicle to the fleet')
  .requiredOption('-fi, --fleet <fleetId>', 'Fleet id')
  .requiredOption('-vi, --vehicle <vehicleId>', 'Vehicle id')
  .action(async(options) => {
    await handleCommand('register-vehicle', options);
  });


  //Localiser un Véhicule
program
  .command('localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]')
  .description('Localize a vehicle')
  .action((fleetId, vehiclePlateNumber, lat, lng, alt) => {
    handleCommand('localize-vehicle', { fleetId, vehiclePlateNumber, lat, lng, alt });
  });

program.parse(process.argv);

async function handleCommand(command:string, options:any) {
  switch (command) {
    case 'create':
      console.log('commande create');
      
      let { id, name, latitude, longitude } = options;
     
      //Optionnel
      if (!name) name = "Random Fleet"; 
      if (!latitude) latitude = 43.296174; 
      if (!longitude) longitude = 5.369953; 


      //Init Fleet
      const fleet = new Fleet(id, name, latitude, longitude );
      console.log('new fleet ok', fleet.getLocation());
      //AJout de la flote à la bdd
      const idFleet = await createFleet(fleet);
      console.log("id fleet : ", idFleet); 
      process.exit(0);

    case 'register-vehicle':
      // enregistrer un véhicule dans une flotte
      await registerVehicle(options.fleet, options.vehicle);
      console.log(`options`, options);
      console.log(`Véhicule ${options.vehicle} est ajouté à la flotte ${options.fleet}`);
      process.exit(0);

    // case 'localize-vehicle':
    //   localiser un véhicule dans une flotte
    //   localizeVehicle(options.fleetId, options.vehiclePlateNumber, options.lat, options.lng, options.alt);
    //   break;

    default:
      console.error('Invalid command');
      process.exit(1);
  }
}
