let LoginPage = function() {

    this.inputUsername = element(by.css('#unameInput'));
    this.inputPassword = element(by.css('#passwordInput'));
    this.btnSubmit = element(by.css('#submitButton'));

};

module.exports = new LoginPage();