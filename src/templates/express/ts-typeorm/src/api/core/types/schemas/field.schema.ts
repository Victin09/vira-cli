import * as Joi from 'joi';
import { AnySchema } from 'joi';

const field = (): AnySchema => {
    return Joi.string();
};

export { field };
