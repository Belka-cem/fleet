import { Given, When, Then } from "@cucumber/cucumber" ; 
import MongoDB from '../../src/Infra/MongoDb';
import assert from 'assert';

let mongoDB: MongoDB;

Given('The MongoDB connection {string}', function (connectionString: string) {
  mongoDB = new MongoDB();
  process.env.DB_CONN_STRING = connectionString;
});

When('I attempt to connect to the database', async function () {
  try {
    await mongoDB.getDb("local");
  } catch (error) {
    throw new Error('Failed to connect to the database: ' + error);
  }
});

Then('the connection should be successful',async function () {

  if (await mongoDB.testConnexion() === false) {
    throw new Error('Database connection was not established');
  }
});