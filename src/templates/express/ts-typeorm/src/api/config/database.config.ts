import 'reflect-metadata';

import { createConnection, Connection } from 'typeorm';
import { ENV } from '@config/environment.config';
import { Logger } from '@services/logger.service';

/**
 * Typeorm default configuration
 *
 * @see https://http://typeorm.io
 */
class Database {
    constructor() {}

    /**
     * @description Connect to MySQL server
     * @async
     */
    connect(options: Record<string, unknown>): void {
        createConnection({
            type: options.TYPE,
            name: options.NAME,
            host: options.HOST,
            port: options.PORT,
            username: options.USER,
            password: options.PWD,
            database: options.DB,
            entities: options.ENTITIES,
            subscribers: options.SUBSCRIBERS,
            synchronize: options.SYNC,
            logging: options.LOG,
            cache: options.CACHE,
        } as any)
            .then((_connection: Connection) => {
                Logger.log('info', `Connection to '${options.TYPE}' server established on port ${options.PORT as string} (${ENV})`);
            })
            .catch((error: Error) => {
                process.stdout.write(`error: ${error.message}`);
                process.exit(1);
            });
    }
}

const database = new Database();

export { database as Database };
