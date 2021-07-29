import { IRequest } from '@interfaces';

import { User } from '@models/user.model';

/**
 * @description
 */
export interface IUserRequest extends IRequest {
    user?: User;
    logIn: (user: User, { session }: any) => Promise<void>;
    body: {
        token?: string;
        password?: string;
        passwordConfirmation?: string;
        passwordToRevoke?: string;
        isUpdatePassword: boolean;
    };
    query: {
        email?: string;
        page?: any;
        perPage?: any;
    };
}
