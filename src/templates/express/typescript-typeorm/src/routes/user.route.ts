import express from 'express';

import logger from '../common/config/winston.config';
import RouterBase from '../common/base/routes.base';
import UserController from '../controllers/user.controller';

class UserRouter extends RouterBase {
    
    constructor(app: express.Application) {
        super(app, 'user-route', '/user');
        logger.info('user router initiated');
    }
    
    configureRoutes(): express.Application {
        console.log(this.routeEndpoint);
        
        // List
        this.app.route(this.routeEndpoint)
            .get(UserController.list);

        // Find by id
        this.app.route(`${this.routeEndpoint}/:id`)
            .get(UserController.find);

        // Create
        this.app.route(this.routeEndpoint)
            .post(UserController.create);

        // Update
        this.app.route(`${this.routeEndpoint}/:id`)
            .put(UserController.update);
            
        // Update
        this.app.route(`${this.routeEndpoint}/:id`)
            .put(UserController.delete);   

        return this.app;
    }
}

export default UserRouter;
