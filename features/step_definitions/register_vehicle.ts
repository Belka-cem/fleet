
import { Given, When, Then } from '@cucumber/cucumber';
import { registerVehicle } from '../../src/App/commands/AddVehicleCommand';
import assert from 'assert';


let fleetId: string;
let vehicleId: string;
let result: string;


Given('a fleet with ID {string}', function (id: string) {
  fleetId = id;
});

Given('a vehicle with ID {string}', function (id: string) {
  vehicleId = id;
});

When('I register the vehicle in the fleet', async function () {
  try {
    result = await registerVehicle(fleetId, vehicleId);
  } catch (error) {
    throw new Error('Failed to register the vehicle: ' + vehicleId + ' ' + error);
  }
});

Then('the vehicle should be added to the fleet', function () {
  if (result !== fleetId) {
    throw new Error('Failed to add the vehicle to the fleet');
  }
});


Given('a non-existing vehicle with ID {string}', function (id:string) {
  vehicleId = id;
});

When('I register the non-existing vehicle in the fleet', async function () {
  
    this.result = () => {
      registerVehicle(fleetId, vehicleId);
    } 
});

Then('the registration should fail', function () {

  assert.throws(async() => {
    // pourapturer l'erreur
   await this.result();
  }, Error);
});
