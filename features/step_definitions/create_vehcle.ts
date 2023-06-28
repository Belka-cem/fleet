import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { addVehicle } from '../../src/App/commands/CreateVehicleCommand';


let vehicleId: string;
let vehicleBrand: string;
let vehicleModel: string;
let vehicleYear: string;
let vehicleType: string;
let vehicleLatitude: number;
let vehicleLongitude: number;

Given('a vehicle with ID {string}, brand {string}, model {string}, year {string}, type {string}, latitude {float}, longitude {float}', function (id: string, brand: string, model: string, year: string, type: string, latitude: number, longitude: number) {
  vehicleId = id;
  vehicleBrand = brand;
  vehicleModel = model;
  vehicleYear = year;
  vehicleType = type;
  vehicleLatitude = latitude;
  vehicleLongitude = longitude;
});

When('i add the vehicle', async function () {
  try {
    await addVehicle(vehicleId, vehicleBrand, vehicleModel, vehicleYear, vehicleType, vehicleLatitude, vehicleLongitude);
  } catch (error) {
    throw new Error('Failed to add the vehicle: ' + error);
  }
});

Then('the vehicle should be added with ID {string}', function (expectedId: string) {
  assert.strictEqual(vehicleId, expectedId);
});
