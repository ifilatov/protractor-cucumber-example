let {defineSupportCode, Status} = require('cucumber');

defineSupportCode(function({setDefaultTimeout}) {
    setDefaultTimeout(180 * 1000);
});

'use strict';

defineSupportCode(function({BeforeAll, Before, After}) {

    BeforeAll(function() {
        browser.runId = Date.now();
        console.log("current run Id is ", browser.runId);
    });

    Before(function(scenario) {
        console.log('');
        console.log(scenario.pickle.name);
    });

    After(function(scenario) {
        if (scenario.result.status === Status.FAILED) {
            let attach = this.attach;
            return browser.takeScreenshot().then(function(png) {
                let decodedImage = new Buffer(png, "base64");
                return attach(decodedImage, "image/png");
            }).then(function(){
                return browser.manage().logs().get('browser');
            }).then(function(browserLog){
                return attach(require('util').inspect(browserLog.filter(x => x.level.name === "SEVERE")), 'text/plain');
            });
        }
    });

});