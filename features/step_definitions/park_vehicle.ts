import assert from 'assert';
//const Vehicle = require("../../src/Domain/Entities/Vehicle.j;s")
import { Given, When, Then } from "@cucumber/cucumber" ; 
import Vehicle from "../../src/Domain/Entities/Vehicle" ; 
import Fleet from "../../src/Domain/Entities/Fleet" ;
import { VehicleTypes } from "../../src/Domain/Types/Types";

Given('a vehicle', function () {
    // 
    const vehicle = new Vehicle("ch-127-ph", "peugeot", "207", "2007", VehicleTypes.car );
    this.vehicle = vehicle; 
  });

  Given('a location', function () {
    // Write code here that turns the phrase above into concrete actions
    this.lat = 3 ; 
    this.lgt = 4 ; 
  });

  Given('I have registered this vehicle into my fleet', function () {
 
    const fleet = new Fleet("1", "Parking Aix", this.lat, this.lgt); 
    this.fleet = fleet ;
  });

  When('I park my vehicle at this location', function () {
    // Write code here that turns the phrase above into concrete actions
    this.fleet.addVehicle(this.vehicle); 
  });

  Then('the known location of my vehicle should verify this location', function () {
    // Write code here that turns the phrase above into concrete actions
    assert.deepStrictEqual(this.vehicle.getCurrentLocations(), this.fleet.getLocation())
  });


  /////  Scenario 2

  
  Given('my vehicle has been parked into this location', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  When('I try to park my vehicle at this location', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  Then('I should be informed that my vehicle is already parked at this location', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });