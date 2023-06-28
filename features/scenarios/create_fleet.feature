Feature: Create Fleet
 @prod
  Scenario: Create a new fleet
    Given a fleet with ID "fleetTestAuto", name "My Fleet", latitude 31.0102 and longitude 51.09
    When I create the fleet
    Then the fleet should be created with ID "fleetTestAuto"
