import { Request } from 'express';

import { User } from '@models/user.model';

/**
 * @description
 */
export interface IRequest extends Request {
    user?: User;
    query: Record<string, string>;
    params: Record<string, string>;
}
