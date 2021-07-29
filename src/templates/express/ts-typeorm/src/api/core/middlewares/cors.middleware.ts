import { notAcceptable } from '@hapi/boom';
import { Request, Response } from 'express';
import { CONTENT_TYPE } from '@config/environment.config';
import { CONTENT_TYPE as CONTENT_TYPE_ENUM } from '@enums';

/**
 * @description
 */
class Cors {
    /**
     * @description
     */
    private instance: Cors;

    constructor() {}

    /**
     * @description
     */
    get(): Cors {
        if (!this.instance) {
            this.instance = new Cors();
        }
        return this.instance;
    }

    /**
     * @description Check header validity according to current request and current configuration requirements
     *
     * @param contentType Configuration content-type
     *
     * @param req Express request object derived from http.incomingMessage
     * @param res Express response object
     * @param next Callback function
     */
    validate(req: Request, res: Response, next: (e?: Error) => void): void {
        if (req.method === 'OPTIONS') {
            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': ['Content-Type', 'Authorization', 'Origin'],
                'Access-Control-Allow-Methods': '*',
            });
            res.end();
            return;
        }

        if (!req.headers['content-type']) {
            return next(notAcceptable(`Content-Type headers must be ${CONTENT_TYPE} or 'multipart/form-data', ${req.headers['content-type']} given`));
        }

        if (CONTENT_TYPE_ENUM[CONTENT_TYPE] !== req.headers['content-type'] && req.headers['content-type'].lastIndexOf(CONTENT_TYPE_ENUM['multipart/form-data']) === -1) {
            return next(notAcceptable(`Content-Type head must be ${CONTENT_TYPE} or 'multipart/form-data, ${req.headers['content-type']} given`));
        }

        if (!req.headers.origin) {
            return next(notAcceptable('Origin header must be specified'));
        }

        next();
    }
}

const cors = new Cors().get();

export { cors as Cors };
