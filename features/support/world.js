const { setWorldConstructor } = require('cucumber')

class CustomWorld {

    constructor({attach}) {

        this.attach = attach;

        this.pages = {
            dashboardPage: require('../page_objects/dashboard.page'),
        };

        this.data = {
            user: require('../data/users/user.data'),
            customer: require('../data/customers/customer.data')
        };

    }

}

setWorldConstructor(CustomWorld);

