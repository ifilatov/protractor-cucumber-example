exports.config = {

    seleniumServerJar: '../node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.13.0.jar',

    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: [
                // Disable "Chrome is being controlled by automated test software" infobar
                '--disable-infobars'
            ],
            prefs: {
                // Disable Chrome's annoying password manager
                'profile.password_manager_enabled': false,
                'credentials_enable_service': false,
                'password_manager_enabled': false,
                'download': {
                    'prompt_for_download': false,
                    'default_directory': __dirname
                }
            }
        }
    },

    ignoreUncaughtExceptions: true,
    getPageTimeout: 10000,
    allScriptsTimeout: 120000,

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    specs: [
        '../features/sanity.test.feature'
    ],

    cucumberOpts: {
        require: ['../features/step_definitions/*.js', '../features/support/*.js'],
        keepAlive: true,
        'fail-fast': true,
        format: 'json:./reports/sanity.conf.json',
        profile: false
    },

    params: {
        // Params for setting browser window width and height - can be also
        // changed via the command line as: --params.browserConfig.width 1024
        baseUrl: 'https://test.ui.com/',
        apiBaseUrl: 'https://test.api.com/api/',
        browserConfig: {
            width: 1440,
            height: 1024
        }
    },

    onPrepare: function() {
        // If you need to navigate to a page which does not use Angular,
        // you can turn off waiting for Angular
        // browser.ignoreSynchronization = true;

        // Set custom window size for browser
        browser.driver.manage().window().setSize(
            browser.params.browserConfig.width,
            browser.params.browserConfig.height
        );

        browser.driver.getCapabilities().then(function(caps){
            browser.browserName = caps.get('browserName');
        });

    },

    afterLaunch: function() {

        let reporter = require('cucumber-html-reporter');

        let options = {
            theme: 'bootstrap',
            jsonFile: './reports/sanity.conf.json',
            output: './reports/sanity.report.html',
            reportSuiteAsScenarios: true,
            launchReport: false,
            storeScreenshots: true,
            metadata: {
                "Test Environment": "STAGING",
                "Browser": "Chrome"
            }
        };

        reporter.generate(options);
    }

};
