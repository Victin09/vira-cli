import { Request, Response } from 'express';

import logger from '../common/config/winston.config';
import UserDto from '../common/dto/user.dto';
import User from '../entities/user.entity';
import userService from '../services/user.service';

class UserController {

    constructor() {
        logger.info('user controller initiated')
    }

    async list(req: Request, res: Response) {
        const { limit, page } = req.query;
        logger.debug('query: ' + req.query)
        logger.debug('limit: ' + Number(limit));
        logger.debug('page: ' + page);
        const users: User[] = await userService.list(Number(limit), Number(page));
        res.send({ 'data': users });
    }
    async find(req: Request, res: Response) {
        const { id } = req.params;
        const users: User = await userService.find(id);
        res.send({ 'data': users });
    }
    async create(req: Request, res: Response) {
        const payload: UserDto = req.body;
        const user: User = await userService.create(payload);
        res.send({ 'data': user });
    }
    update(req: Request, res: Response): Promise<User> {
        throw new Error('Method not implemented.');
    }
    delete(req: Request, res: Response): Promise<User> {
        throw new Error('Method not implemented.');
    }

}

export default new UserController();
