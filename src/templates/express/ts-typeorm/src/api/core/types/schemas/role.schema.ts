import * as Joi from 'joi';
import { AnySchema } from 'joi';

import { list } from '@utils/enum.util';
import { ROLE } from '@enums';

const role = (): AnySchema => {
    return Joi.any().valid(...list(ROLE));
};

export { role };
