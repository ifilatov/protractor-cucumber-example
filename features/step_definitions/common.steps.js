const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const {defineSupportCode} = require('cucumber');
const expect = chai.expect;

defineSupportCode(({Given, Then, When}) => {

    let timeout = 120000;
    let EC = browser.ExpectedConditions;

    //Given
    Given(/^I open "([^"]*)" url$/, function(url, next) {
        browser.get(url);
        next();
    });

    //When
    When(/^I click "([^"]*)"."([^"]*)"$/, function(page, element, next) {
        browser.wait(EC.elementToBeClickable(this.pages[page][element]), timeout, 'Wait for '+page+'.'+element+' to be clickable failed');
        this.pages[page][element].click();
        next();
    });

    When(/^I click "([^"]*)"."([^"]*)" item "([^"]*)"$/, function(page, element, index, next) {
        browser.wait(EC.elementToBeClickable(this.pages[page][element].get(index)), timeout, 'Wait for '+page+'.'+element+' on index '+index+' to be clickable failed');
        this.pages[page][element].get(index).click();
        next();
    });

    When(/^I write "([^"]*)" to "([^"]*)"."([^"]*)"$/, function(value, page, element, next) {
        browser.wait(EC.elementToBeClickable(this.pages[page][element]), timeout, 'Wait for '+page+'.'+element+' to be enabled failed');
        this.pages[page][element].sendKeys(value);
        next();
    });

    When(/^I write "([^"]*)"."([^"]*)" to "([^"]*)"."([^"]*)"$/, function(object, value, page, element, next) {
        browser.wait(EC.elementToBeClickable(this.pages[page][element]), timeout, 'Wait for '+page+'.'+element+' to be enabled failed');
        this.pages[page][element].sendKeys(this.data[object][value]);
        next();
    });

    //Then
    Then(/^"([^"]*)"."([^"]*)" has text "([^"]*)"$/, function(page, element, text, next) {
        text = text.replace('$Id$',browser.runId);
        browser.wait(EC.visibilityOf(this.pages[page][element]), timeout, 'Wait for visibility of '+page+'.'+element+' failed');
        expect(this.pages[page][element].getText()).to.eventually.include(text).and.notify(next);
    });

    Then(/^"([^"]*)"."([^"]*)" has text "([^"]*)"."([^"]*)"$/, function(page, element, object, key, next) {
        text = this.data[object][key].replace('$Id$',browser.runId);
        browser.wait(EC.visibilityOf(this.pages[page][element]), timeout, 'Wait for visibility of '+page+'.'+element+' failed');
        expect(this.pages[page][element].getText()).to.eventually.include(text).and.notify(next);
    });

    Then(/^"([^"]*)"."([^"]*)" should be present$/, function(page, element, next) {
        expect(this.pages[page][element].isPresent()).to.eventually.equal(true).and.notify(next);
    });

    Then(/^URL should be "([^"]*)"$/, function(url, next) {
        expect(browser.getCurrentUrl()).to.eventually.include(url).and.notify(next);
    });


});