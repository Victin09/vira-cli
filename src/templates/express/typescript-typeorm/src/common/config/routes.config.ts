import express from 'express';

abstract class RouterConfig {
    app: express.Application;
    routeName: string;
    routeEndpoint: string;

    constructor(app: express.Application, routeName: string, routeEndpoint: string) {
        this.app = app;
        this.routeName = routeName;
        this.routeEndpoint = routeEndpoint;
        this.configureRoutes();
    }

    abstract configureRoutes(): express.Application;
}

export default RouterConfig;
