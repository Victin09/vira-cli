import { plainToClass } from 'class-transformer';
import { getRepository, Repository } from 'typeorm';

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
        return getRepository(User).findOneOrFail({ id: id });
    }
    create(payload: UserDto): Promise<User> {
        const userRepository: Repository<User> = getRepository(User);
        const user: User = userRepository.create(payload);
        return userRepository.save(user);
    }
    update(id: string, payload: UserDto): Promise<User> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<User> {
        throw new Error('Method not implemented.');
    }
}

export default new UserService();