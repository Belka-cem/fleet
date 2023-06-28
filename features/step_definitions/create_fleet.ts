import { Given, When, Then } from '@cucumber/cucumber';
import Fleet from '../../src/Domain/Entities/Fleet';
import { createFleet } from '../../src/App/commands/CreateFleetCommand';
import  assert  from 'assert';


let fleet: Fleet;
let createdFleetId: string;

Given('a fleet with ID {string}, name {string}, latitude {float} and longitude {float}', function (fleetId: string, fleetName: string, latitude:number, longitude:number) {
  fleet = new Fleet(fleetId, fleetName, latitude, longitude);
});

When('I create the fleet', async function () {
  createdFleetId = await createFleet(fleet);
});

Then('the fleet should be created with ID {string}', function (expectedFleetId: string) {
    assert.strictEqual(createdFleetId, expectedFleetId);
});

