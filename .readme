# Fleet Management CLI

This is a command-line interface (CLI) application for managing a vehicle fleet. It allows you to create fleets, register vehicles to fleets, and localize vehicles by their fleet and plate number.

## Prerequisites:

 - To use this project properly, you'll need a MongoDb database.
 - An .env file must be created with the MongoDB connection information:

```dotenv
# ex .env
DB_CONN_STRING="mongodb://admin:fleet@localhost:27017/"
DB_NAME="FleetDb"
```
Connection String: mongodb://admin:fleet@localhost:27017/
Database name: FleetDb

If you don't have Mongo Db at your disposal, a docker-compose file will enable you to launch a service with a MongoDb database and a web client to manage the data stored in this database.

- To use this service, you must have docker installed on your machine.
- Open a terminal or command line in this directory.
- Run the following command to start the containers defined in the docker-compose.yml file:

```bash
docker-compose up -d
```

## Installation


1. Install the dependencies using the following command:

```bash
npm install
```
2. Build the project

```bash
npx tsc
```

## Usage

The CLI provides the following commands:

### Create Fleet

Create a new fleet.

```bash
npm run create <userId> [name] [latitude] [longitude]
```

--id <id>: User ID (required).
--name <name>: Fleet name (optional).
--latitude <latitude>: Latitude location (optional).
--longitude <longitude>: Longitude location (optional).

Exemple :

```bash
npm run create create 123456 "Ma flotte" 43.296174 5.369953
```

### Register Vehicle

Register a vehicle to a fleet.

```bash
npm run register-vehicle <fleetId> <vehiclePlateNumber>
```

--id <fleetId>: Fleet ID (required).
--name <vehiclePlateNumber>: Vehicle Id (required).

Exemple : 

```bash
npm run register-vehicle  register-vehicle "123" "ABC123"

```

### Locate a Vehicle

To find the location of a vehicle within a fleet, use the following command:

```bash
npm run localize-vehicle <vehiclePlateNumber>
```

--id <fleetId>: Fleet ID (required).
--name <vehiclePlateNumber>: Vehicle Id (required).

Exemple : 

```bash
npm run localize-vehicle "ABC123"

```

## Running Tests

You can execute tests for this project using the following command:

```bash
npm run test"

```