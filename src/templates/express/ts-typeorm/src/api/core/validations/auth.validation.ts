import { object, when, optional, string } from 'joi';

import { email, password, username, field, role } from '@schemas';

// POST api/v1/auth/register
const register = {
    body: object({
        username: username(),
        firstname: field().required(),
        lastname: field().required(),
        email: email().required(),
        role: role().required(),
        password: password('user').required(),
    }),
};

// POST api/v1/auth/login
const login = {
    body: object({
        email: when('context.apikey', {
            is: null,
            then: email().required(),
            otherwise: optional(),
        }),
        password: when('context.apikey', {
            is: null,
            then: password('user').required(),
            otherwise: optional(),
        }),
        apikey: when('context.password', {
            is: null,
            then: string().length(64).required(),
            otherwise: optional(),
        }),
        refreshToken: string(),
    }),
};

// POST api/v1/auth/refresh
const refresh = {
    body: object({
        token: object()
            .keys({
                refreshToken: string().required(),
            })
            .required(),
    }),
};

// GEET api/v1/auth/:service/callback
const oauthCb = {
    query: object({
        code: string().required(),
    }),
};

// PATCH api/v1/auth/confirm
const confirm = {
    body: object({
        token: string().min(64).required(),
    }),
};

// GET api/v1/auth/request-password
const requestPassword = {
    query: object({
        email: string().email().required(),
    }),
};

export { register, login, refresh, oauthCb, confirm, requestPassword };
