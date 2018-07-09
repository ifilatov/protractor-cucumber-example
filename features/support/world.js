const { setWorldConstructor } = require('cucumber')

class CustomWorld {

    constructor({attach}) {

        this.attach = attach;

        this.pages = {
            angularPage: require('../page_objects/angularjs.page')
        };

        this.data = {
            user: require('../data/users/user.data')
        };

    }

}

setWorldConstructor(CustomWorld);

