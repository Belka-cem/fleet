import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { localizeVehicle } from '../../src/App/Querries/GetVehicle';


let vehicleId: string;
let localizedVehicleLocation: any;

Given('I have a vehicle with ID {string}', function (id: string) {
  vehicleId = id;
});


When('I attempt to localize the vehicle', async function () {
  try {
    localizedVehicleLocation = await localizeVehicle(vehicleId);
  } catch (error) {
    throw new Error('Failed to localize the vehicle: ' + error);
  }
});

Then('the vehicle should be localized', function () {
  assert.ok(localizedVehicleLocation);
});




//
Given('a non-existing vehicle with ID{string}', function (id: string) {
    vehicleId = id;
  });

When('i attempt to localize the vehicle', async function () {

    this.result = async () => {
       await localizeVehicle(vehicleId);
    }
});     

Then('the vehicle should not be localized',async function () {
    try {
        await this.result();
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        assert.ok(error instanceof Error);
      }
});