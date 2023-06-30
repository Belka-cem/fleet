Feature: Localize Vehicle

  @prod
  Scenario: Localize an existing vehicle
    Given I have a vehicle with ID "123456"
    When I attempt to localize the vehicle
    Then the vehicle should be localized

  @prod
  Scenario: Localize a non-existing vehicle
    Given a non-existing vehicle with ID "0000000000"
    When i attempt to localize the vehicle
    Then the vehicle should not be localized
