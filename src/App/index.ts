import { Command } from 'commander';
import Fleet from '../Domain/Entities/Fleet';
import { createFleet } from './commands/CreateFleetCommand';
import FleetDTO from '../Infra/DTO/fleet.dto';
import MongoDB from '../Infra/MongoDb';
import FleetServiceBDD from '../Infra/services/fleet';


const program = new Command();

program
  .command('create')
  .description('Create a fleet')
  .option('-i, --id <id>', 'User ID')
  .option('-n, --name <name>', 'Fleet name')
  .option('-lt, --latitude <latitude>', 'latitude location')
  .option('-lg, --longitude <longitude>', 'longitude location')
  .action(async(id, name, latitude, longitude) => {
    const fleetId = await handleCommand('create', { id, name, latitude, longitude });
  });



program
  .command('register-vehicle')
  .description('Add a new vehicle to the fleet')
  .option('-fi, --fleet <fleetId>', 'Fleet id')
  .option('-vi, --vehicle <vehicleId>', 'Vehicle id')

  .option('-y, --year <year>', 'Vehicle year')
  .action((fleetId, vehicleId) => {
    handleCommand('register-vehicle', { fleetId, vehicleId });
  });

  // program
  // .command('register-vehicle <fleetId> <vehiclePlateNumber>')
  // .description('Register a vehicle')
  // .action((fleetId, vehiclePlateNumber) => {
  //   handleCommand('register-vehicle', { fleetId, vehiclePlateNumber });
  // });

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
      
      const { id, name, latitude, longitude } = options;
      // Init Fleet
      const fleet = new Fleet(id, name, latitude, longitude );
      console.log('new fleet ok');
      // AJout de la flote à la bdd
      // const idFleet = await createFleet(fleet);
      // console.log("id fleet : ", idFleet); 
      const fleetDTo : FleetDTO = {
        id : fleet.getId(), 
        name: fleet.getName(),
        vehicles: [],
        locations : {longitude: fleet.getLocation().getLongitude(), latitude: fleet.getLocation().getLatitude() }

      }
      console.log("fleetDTo createFleet",fleetDTo.locations);
      
      const db = await new MongoDB().getDb() ; 
      const fleetServiceBdd = new FleetServiceBDD(db); 
      const idFleet = await fleetServiceBdd.addFleet(fleetDTo);
      console.log("idFleet ok", idFleet); 
    

      break

    case 'register-vehicle':
      // enregistrer un véhicule dans une flotte
      //registerVehicle(options.fleetId, options.vehicleId);
      console.log(`Véhicule ${options.vehicleId} est ajouté à la flotte ${options.fleetId}`);
      break;

    // case 'localize-vehicle':
    //   localiser un véhicule dans une flotte
    //   localizeVehicle(options.fleetId, options.vehiclePlateNumber, options.lat, options.lng, options.alt);
    //   break;

    default:
      console.error('Invalid command');
      break;
  }
}
