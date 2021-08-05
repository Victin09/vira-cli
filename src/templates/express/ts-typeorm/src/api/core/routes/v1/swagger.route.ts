import swaggerJSDOC from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { Router } from '@classes';

import { ROLE } from '@enums';
import { swaggerSpec } from '@config/swagger.config';

export class UserRouter extends Router {
    constructor() {
        super();
    }

    define(): void {
        this.router.route('/docs')
            .get(swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    }
}
