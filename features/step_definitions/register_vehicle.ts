import Fleet from "../../src/Domain/Entities/Fleet";
import assert from 'assert';
//const Vehicle = require("../../src/Domain/Entities/Vehicle.j;s")
import { Given, When, Then } from "@cucumber/cucumber" ; 
import Vehicle from "../../src/Domain/Entities/Vehicle";
import { VehicleTypes } from "../../src/Domain/Types/Types";

 
let saveMyfleet : Fleet ; 
let myVehcile: Vehicle

Given('my vehicle', function () {
  const vehicle = new Vehicle("ch-127-ph", "peugeot", "207", "2007", VehicleTypes.car );
  this.vehicle = vehicle; 
  });

Given('my fleet', function () {
  const lat = 3 ; 
  const lgt = 4 ; 
  const fleet = new Fleet("2", "Parking Marseille", lat, lgt); 
  this.myFleet = fleet ;
  });

  Given('the fleet of another user', function () {
    // Write code here that turns the phrase above into concrete actions
    const lat = 7 ; 
    const lgt = 9 ; 
    const fleet = new Fleet("3", "Parking Lyon", lat, lgt); 
    this.otherFleet = fleet ;

  });

  When('I register this vehicle into my fleet', function () {
    const msg = this.myFleet.addVehicle(this.vehicle);
  });


  Then('this vehicle should be part of my vehicle fleet', function () { 
    const idVehicleInMyFleet:string  = this.myFleet.findVehicleById(this.vehicle);
    saveMyfleet = this.myFleet; 
    myVehcile = this.vehicle ; 
    return assert.deepStrictEqual(this.myFleet.tabVehicles[idVehicleInMyFleet].getId(), this.vehicle.getId());

  });

/////////
When('I try to register this vehicle into my fleet', function () {
  const msg : string = saveMyfleet.addVehicle(myVehcile);
  this.msgAddVehiculeToMyFleet = msg;
});

Then('I should be informed this this vehicle has already been registered into my fleet', function () {
  assert.deepStrictEqual(this.msgAddVehiculeToMyFleet, "ko"); 
});


////
Given('this vehicle has been registered into the other user\'s fleet', function () {
  const msg : string = this.otherFleet.addVehicle(myVehcile);
   assert.deepStrictEqual(msg, "ok");
});