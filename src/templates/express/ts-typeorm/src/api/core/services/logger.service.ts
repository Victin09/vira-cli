import { LoggerConfiguration } from '@config/logger.config';
import { Logger as WinstonLogger } from 'winston';

/**
 * Log service
 */
class Logger {
    /**
     * @description Wrapped logger instance, here winston
     */
    private instance: Logger;

    /**
     * @description
     */
    engine: WinstonLogger;

    constructor(engine: WinstonLogger) {
        this.engine = engine;
    }

    get(): Logger {
        if (!this.instance) {
            this.instance = new Logger(this.engine);
        }
        return this.instance;
    }

    /**
     * @description Do log action
     *
     * @param level
     * @param message
     */
    log(level: string, message: string): void {
        this.engine[level](message);
    }
}

const logger = new Logger(LoggerConfiguration.logger).get();

export { logger as Logger };
