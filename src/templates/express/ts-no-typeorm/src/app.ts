import 'reflect-metadata';
import express from 'express';
import RouterConfig from './common/config/routes.config';
import logger from './common/config/winston.config';
import UserRouter from './routes/user.route';

const app = express();

const array: Array<RouterConfig> = [];

array.push(new UserRouter(app));

array.forEach((route: RouterConfig) => 
    logger.info(`Route ${route.routeName}`)
);

export default app;
