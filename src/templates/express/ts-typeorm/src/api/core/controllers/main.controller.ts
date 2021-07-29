import { Request, Response } from 'express';

import { Logger } from '@services/logger.service';

/**
 * Manage incoming requests from api/{version}/.
 * End points of this router resolve response by itself.
 */
class MainController {
    /**
     * @description
     */
    private instance: MainController;

    constructor() {}

    /**
     * @description
     */
    get(): MainController {
        if (!this.instance) {
            this.instance = new MainController();
        }
        return this.instance;
    }

    /**
     * @description Ping api
     *
     * @param req Express request object derived from http.incomingMessage
     * @param res Express response object
     */
    async status(req: Request, res: Response, next: () => void): Promise<void> {
        res.status(200);
        res.end();
    }

    /**
     * @description Log CSP report violation. This endpoint is called programmaticaly by helmet.
     *
     * @param req Express request object derived from http.incomingMessage
     * @param res Express response object
     */
    async report(req: Request, res: Response, next: () => void): Promise<void> {
        Logger.log('error', req.body ? `CSP Violation: ${JSON.stringify(req.body)}` : 'CSP Violation');
        res.status(204);
        res.end();
    }
}

const mainController = new MainController().get();

export { mainController as MainController };
