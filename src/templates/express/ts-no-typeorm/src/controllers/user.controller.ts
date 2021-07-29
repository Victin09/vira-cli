import logger from '../common/config/winston.config';
import Crud from '../common/interfaces/crud.interface';
import User from '../entities/user.entity';

class UserController implements Crud<User> {

    constructor() {
        logger.info('user controller initiated')
    }

    list(): Promise<User[]> {
        throw new Error('Method not implemented.');
    }
    find(id: string): Promise<User> {
        throw new Error('Method not implemented.');
    }
    create(payload: User): Promise<User> {
        throw new Error('Method not implemented.');
    }
    update(id: string, payload: User): Promise<User> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<User> {
        throw new Error('Method not implemented.');
    }

}

export default new UserController();
