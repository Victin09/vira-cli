import { ConnectionOptions } from 'typeorm';

import User from '../../entities/user.entity';

const databaseConfig: ConnectionOptions = {
    name: 'default',
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'express_typeorm',
    entities: [User],
    synchronize: true,
};

export default databaseConfig;
