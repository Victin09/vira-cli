import { getRepository } from 'typeorm';

import logger from '../common/config/winston.config';
import UserDto from '../common/dto/user.dto';
import Crud from '../common/interfaces/crud.interface';
import User from '../entities/user.entity';

class UserService implements Crud<User, UserDto> {

    constructor() {
        logger.info('User service initiated');
    }

    list(limit: number, page: number): Promise<User[]> {
        return getRepository(User).find({
            skip: page,
            take: limit
        });
    }
    find(id: string): Promise<User> {
        throw new Error('Method not implemented.');
    }
    create(payload: UserDto): Promise<User> {
        throw new Error('Method not implemented.');
    }
    update(id: string, payload: UserDto): Promise<User> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<User> {
        throw new Error('Method not implemented.');
    }
}

export default new UserService();