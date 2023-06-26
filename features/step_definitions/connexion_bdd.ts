import { Given, When, Then } from "@cucumber/cucumber" ; 
import MongoDB from '../../src/Infra/MongoDb';


let mongoDB: MongoDB;

Given('I have a MongoDB connection string {string}', function (connectionString: string) {
  mongoDB = new MongoDB();
  process.env.DB_CONN_STRING = connectionString;
});

When('I attempt to connect to the database', async function () {
  try {
    await mongoDB.getDb();
  } catch (error) {
    throw new Error('Failed to connect to the database: ' + error);
  }
});

Then('the connection should be successful', function () {
  if (!mongoDB.getState()) {
    throw new Error('Database connection was not established');
  }
});