Feature: Vehicle Registration

  @prod 
  Scenario: Register a vehicle in a fleet
    Given a fleet with ID "123"
    And a vehicle with ID "123456"
    When I register the vehicle in the fleet
    Then the vehicle should be added to the fleet

 @prod 
  Scenario: Register a non-existing vehicle
    Given a fleet with ID "123"
    And a non-existing vehicle with ID "00-000-00"
    When I register the non-existing vehicle in the fleet
    Then the registration should fail

  
  Scenario: Register a vehicle in a non-existing fleet
    Given a non-existing fleet with ID "noFleet"
    And a vehicle with ID "123456"
    When I register the vehicle in the fleet
    Then the registration should fail
