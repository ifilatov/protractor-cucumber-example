const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const {defineSupportCode} = require('cucumber');
const expect = chai.expect;

defineSupportCode(({Given, Then, When}) => {

    let timeout = 120000;
    let EC = browser.ExpectedConditions;

    When(/^I open "([^"]*)" url$/, function(url, next) {
        browser.get(url);
        next();
    });

    When(/^I click "([^"]*)"."([^"]*)"$/, function(page, element, next) {
        browser.wait(EC.elementToBeClickable(this.pages[page][element]), timeout, 'Wait for '+page+'.'+element+' to be clickable failed');
        this.pages[page][element].click();
        next();
    });


    When(/^I refresh page$/, function(next) {
        browser.refresh();
        next();
    });

    When(/^I write "([^"]*)" to "([^"]*)"."([^"]*)"$/, function(value, page, element, next) {
        browser.wait(EC.elementToBeClickable(this.pages[page][element]), timeout, 'Wait for '+page+'.'+element+' to be enabled failed');
        this.pages[page][element].sendKeys(value);
        next();
    });

    When(/^I add current run ID to "([^"]*)"."([^"]*)"$/, function(page, element, next) {
        browser.wait(EC.elementToBeClickable(this.pages[page][element]), timeout, 'Wait for '+page+'.'+element+' to be enabled failed');
        this.pages[page][element].sendKeys(browser.runId);
        next();
    });

    //Then steps
    Then(/^"([^"]*)"."([^"]*)" attribute "([^"]*)" has text "([^"]*)"$/, function(page, element, attribute, text, next) {
        browser.wait(EC.presenceOf(this.pages[page][element]), timeout, 'Wait for presence of '+page+'.'+element+' failed');
        expect(this.pages[page][element].getAttribute(attribute)).to.eventually.include(text).and.notify(next);
    });

    Then(/^"([^"]*)"."([^"]*)" has text "([^"]*)"$/, function(page, element, text, next) {
        text = text.replace('$Id$',browser.runId);
        browser.wait(EC.visibilityOf(this.pages[page][element]), timeout, 'Wait for visibility of '+page+'.'+element+' failed');
        expect(this.pages[page][element].getText()).to.eventually.include(text).and.notify(next);
    });

    Then(/^URL should be "([^"]*)"$/, function(url, next) {
        expect(browser.getCurrentUrl()).to.eventually.include(url).and.notify(next);
    });

    Then(/^URL should be "([^"]*)"."([^"]*)"$/, function(object, key, next) {
        expect(browser.getCurrentUrl()).to.eventually.include(this.data[object][key]).and.notify(next);
    });

});