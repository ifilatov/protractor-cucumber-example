Feature: Sanity testing
  As a user of my portal
  I want to make sure that main functionality works in a new build

  Scenario: Get url

    Given I open "https://angularjs.org" url
    Then URL should be "https://angularjs.org"


  Scenario: Hello app

    Given "angularPage"."appHello" should be present
    When I write "user"."username" to "angularPage"."inputName"
    Then "angularPage"."appHello" has text "Hello"
    And "angularPage"."appHello" has text "user"."username"


  Scenario: To Do list app

    Given "angularPage"."appToDo" should be present
    Then "angularPage"."appToDo" has text "Todo"
    And "angularPage"."appToDo" has text "1 of 2 remaining"
    And "angularPage"."appToDo" has text "learn AngularJS"
    And "angularPage"."appToDo" has text "build an AngularJS app"

    When I click "angularPage"."listToDo" item "0"
    Then "angularPage"."appToDo" has text "2 of 2 remaining"
    
    When I click "angularPage"."listToDo" item "1"
    Then "angularPage"."appToDo" has text "1 of 2 remaining"
    
    When I write "write protractor tests" to "angularPage"."inputToDo"
    And I click "angularPage"."btnAdd"
    Then "angularPage"."appToDo" has text "2 of 3 remaining"
    And "angularPage"."appToDo" has text "write protractor tests"