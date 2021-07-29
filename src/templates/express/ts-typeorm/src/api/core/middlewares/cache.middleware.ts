import { Request, Response } from 'express';
import { CacheService } from '@services/cache.service';

/**
 * @description
 */
class Cache {
    /**
     * @description
     */
    private instance: Cache;

    constructor() {}

    /**
     * @description
     */
    get(): Cache {
        if (!this.instance) {
            this.instance = new Cache();
        }
        return this.instance;
    }

    /**
     * @description Request cache middleware
     *
     * @param req Express request
     * @param res Express response
     * @param next Middleware function
     */
    async read(req: Request, res: Response, next: () => void): Promise<void> {
        if (!CacheService.isCachable(req)) {
            return next();
        }
        const cached = CacheService.engine.get(CacheService.key(req)) as unknown;
        if (cached) {
            res.status(200);
            res.json(cached);
            return;
        }
        next();
    }
}

const cache = new Cache().get();

export { cache as Cache };
