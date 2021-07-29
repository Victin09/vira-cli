import { Request } from 'express';

import { ICache } from '@interfaces';

import { CacheConfiguration } from '@config/cache.config';
import { encrypt } from '@utils/string.util';

/**
 * @description Cache service interface with memory cache module
 */
class CacheService {
    /**
     * @description
     */
    private instance: CacheService;

    constructor() {}

    get(): CacheService {
        if (!this.instance) {
            this.instance = new CacheService();
        }
        return this.instance;
    }

    /**
     * @description
     */
    get engine(): ICache {
        return CacheConfiguration.start;
    }

    /**
     * @description
     */
    get duration(): number {
        return CacheConfiguration.options.DURATION;
    }

    /**
     * @description
     */
    get isActive(): boolean {
        return CacheConfiguration.options.IS_ACTIVE;
    }

    /**
     * @description
     *
     * @param req Express request
     */
    key(req: Request): string {
        let queryParams = '';
        if (req.query) {
            queryParams = encrypt(
                Object.keys(req.query)
                    .sort()
                    .map((key) => req.query[key])
                    .join(''),
            );
        }
        return `${CacheConfiguration.key}${req.baseUrl}${req.path}?q=${queryParams}`;
    }

    /**
     * @description
     *
     * @param req
     */
    isCachable(req: Request): boolean {
        return CacheConfiguration.options.IS_ACTIVE && req.method === 'GET';
    }

    /**
     * @description Refresh cache after insert / update
     *
     * @param segment
     */
    refresh(segment: string): void | boolean {
        if (!CacheConfiguration.options.IS_ACTIVE) {
            return false;
        }
        this.engine
            .keys()
            .slice()
            .filter((key) => key.includes(segment))
            .forEach((key) => this.engine.del(key));
    }
}

const cacheService = new CacheService().get();

export { cacheService as CacheService };
