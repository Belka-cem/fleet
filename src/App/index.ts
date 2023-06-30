#!/usr/bin/env node
import {program} from 'commander';
import Fleet from '../Domain/Entities/Fleet';
import { createFleet } from './commands/CreateFleetCommand';
import { registerVehicle } from './commands/AddVehicleCommand';
import { addVehicle} from './commands/CreateVehicleCommand'
import { localizeVehicle } from './Querries/GetVehicle';

//Création d'une flotte
program
  .command('create <userId> [name] [latitude] [longitude]')
  .description('Create a fleet')
  .action(async (userId, name, latitude, longitude) => {
    if (!name) name = "Random Fleet " + userId; 
      if (!latitude) latitude = 43.296174; 
      if (!longitude) longitude = 5.369953; 
      //Init Fleet
      const fleet = new Fleet(userId, name, latitude, longitude );
      //AJout de la flote à la bdd
      const idFleet = await createFleet(fleet);
      console.log(`Fleet created with ID: ${idFleet}`);
      process.exit(0);
  });

  // enregistrer un véhicule dans une flotte
program
  .command('register-vehicle <fleetId> <vehiclePlateNumber>')
  .description('Register a vehicle to a fleet')
  .action(async (fleetId, vehiclePlateNumber) => {
     await registerVehicle(fleetId, vehiclePlateNumber);
     console.log(`Vehicle ${vehiclePlateNumber} has been added to fleet ${fleetId}.`);
     process.exit(0);
  });

  //Localiser un vehicule
program
  .command('localize-vehicle <vehiclePlateNumber>')
  .description('Localize a vehicle in a fleet')
  .action(async ( vehiclePlateNumber) => {
    const location = await localizeVehicle(vehiclePlateNumber)
    console.log( location.latitude +" "+ location.longitude);
    process.exit(0);
  });

program.parse(process.argv);