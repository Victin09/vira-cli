import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';

import RouterBase from './common/base/routes.base';
import logger from './common/config/winston.config';
import UserRouter from './routes/user.route';
import databaseConfig from './common/config/database.config';

// Define variables
const app = express();
const array: Array<RouterBase> = [];
const port: number = Number(process.env.PORT) || 3000;

// Setup middlewares
app.use(express.json());
app.use(cors());

// Initialize routes
array.push(new UserRouter(app));

const bootstrap = () => {
    createConnection(databaseConfig)
        .then((_connection) => {
            array.forEach((route: RouterBase) => 
                logger.info(`Route ${route.routeName} initiated`)
            );
            app.listen(port, () => {
                console.log(`Server on port: ${port}`);
            })
        })
        .catch((error) => {
            console.log('Unable to connect to db', error);
            process.exit(1); 
        })
}

export default bootstrap;
