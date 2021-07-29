import { authenticate } from 'passport';
import { promisify } from 'es6-promisify';
import { forbidden, badRequest, notFound } from '@hapi/boom';

import { User } from '@models/user.model';
import { ROLE } from '@enums';
import { list } from '@utils/enum.util';
import { IUserRequest, IResponse } from '@interfaces';

import { OAuthProvider } from '@types';

/**
 * @description
 */
class Guard {
    /**
     * @description
     */
    private instance: Guard;

    constructor() {}

    /**
     * @description
     */
    get(): Guard {
        if (!this.instance) {
            this.instance = new Guard();
        }
        return this.instance;
    }

    /**
     * @description Callback function provided to passport.authenticate with JWT strategy
     *
     * @param req Express request object derived from http.incomingMessage
     * @param res Express response object
     * @param next Callback function
     * @param roles Authorized roles
     */
    handleJWT =
        (req: IUserRequest, _res: IResponse, next: (error?: Error) => void, roles: string | string[]) =>
        async (err: Error, user: User, info: string): Promise<void> => {
            const error = err || info;
            const logIn = promisify(req.logIn) as (user, { session }) => Promise<void>;

            try {
                if (error || !user) throw error;
                await logIn(user, { session: false });
            } catch (e) {
                return next(forbidden(e));
            }

            if (!roles.includes(user.role)) {
                return next(forbidden('Forbidden area'));
            } else if (user.role !== ROLE.admin && req.params.userId && parseInt(req.params.userId, 10) !== user.id) {
                return next(forbidden('Forbidden area'));
            }

            req.user = user;

            return next();
        };

    /**
     * @description
     *
     * @param req
     * @param res
     * @param nex
     */
    handleOauth =
        (req: IUserRequest, _res: IResponse, next: (error?: Error) => void) =>
        async (err: Error, user: User): Promise<void> => {
            if (err) {
                return next(badRequest(err?.message));
            } else if (!user) {
                return next(notFound(err?.message));
            } else if (!list(ROLE).includes(user.role)) {
                return next(forbidden('Forbidden area'));
            }
            req.user = user;
            next();
        };

    /**
     * @description
     *
     * @param req
     * @param res
     * @param next
     * @param roles Authorized roles
     * @param cb
     *
     * @dependency passport
     * @see http://www.passportjs.org/
     */
    authentify = (req, res, next, roles, callback) => authenticate('jwt', { session: false }, callback(req, res, next, roles))(req, res, next);

    /**
     * @description
     *
     * @param req
     * @param res
     * @param next
     * @param service jwt | oAuth service provider
     * @param cb
     *
     * @dependency passport
     * @see http://www.passportjs.org/
     */
    oAuthentify = (req, res, next, service, callback) => authenticate(service, { session: false }, callback(req, res, next))(req, res, next);

    /**
     * @description Authorize user access according to role(s) in arguments
     *
     * @param roles
     */
    authorize =
        (roles: string[]) =>
        (req: IUserRequest, res: IResponse, next: (e?: Error) => void): void =>
            this.authentify(req, res, next, roles, this.handleJWT);

    /**
     * @description Authorize user access according to external service access_token
     *
     * @param service OAuthProvider
     */
    oAuth = (service: OAuthProvider) => authenticate(service, { session: false });

    /**
     * @description Authorize user access according to API rules
     *
     * @param service OAuthProvider
     */
    oAuthCallback =
        (service: OAuthProvider) =>
        (req: IUserRequest, res: IResponse, next: (e?: Error) => void): void =>
            this.oAuthentify(req, res, next, service, this.handleOauth);
}

const guard = new Guard().get();

export { guard as Guard };
