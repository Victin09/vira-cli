import { IError, IHTTPError } from '@interfaces';
import { CustomError } from '@errors';

/**
 * @description Custom BusinessError
 */
export class BusinessError extends CustomError implements IHTTPError {
    /**
     * @description IError HTTP response status code
     */
    statusCode: number;

    /**
     * @description IError HTTP response status message
     */
    statusText: string;

    /**
     * @description Ierror HTTP response errors
     */
    errors: Array<string>;

    constructor(error: IError) {
        super('Business validation failed');
        this.statusCode = error.statusCode;
        this.statusText = 'Business validation failed';
        this.errors = [error.message];
    }
}
