Feature: Sanity testing
  As a user of my portal
  I want to make sure that main functionality works in a new build

  Scenario: Headers Page - Change Customer

    Given I logged in as "user"

  Scenario: Dashboard Page

    When I click "headersPage"."btnDashboard"
    Then "dashboardPage"."dashboardPage" should be present