Feature: Database Connection

  @prod
  Scenario: Connect to MongoDB
    Given The MongoDB connection "mongodb://admin:fleet@localhost:27017/"
    When I attempt to connect to the database
    Then the connection should be successful
