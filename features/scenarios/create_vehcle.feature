Feature: Add Vehicle
  @prod
  Scenario: Add a vehicle with all details
    Given a vehicle with ID "123456", brand "Toyota", model "Corrola", year "2022", type "car", latitude 20.234, longitude 20.345
    When i add the vehicle
    Then the vehicle should be added with ID "123456"

