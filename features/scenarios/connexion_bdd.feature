Feature: Database Connection
  As a developer
  I want to ensure that the application can connect to a MongoDB database

  Scenario: Connect to MongoDB
    Given I have a MongoDB connection string "mongodb://admin:fleet@localhost:27017/"
    When I attempt to connect to the database
    Then the connection should be successful
