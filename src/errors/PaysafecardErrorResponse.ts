import { PaysafecardError } from './PaysafecardError';

/**
 * Error response from paysafecard
 *
 * @export
 * @interface PaysafecardErrorResponse
 */
export interface PaysafecardErrorResponse {
    code: string;
    message: string;
    number?: number;
    param?: string;
}

/**
 * Get error from a response
 *
 * @export
 * @param {number} statusCode - statuscode for the response
 * @param {PaysafecardErrorResponse} errorResponse - error response
 * @returns {PaysafecardError}
 */
export function getPaysafecardError (statusCode: number, errorResponse: PaysafecardErrorResponse): PaysafecardError {
    if (errorResponse.number === null || errorResponse.number === undefined) {
        switch (statusCode) {
            case 400:
                errorResponse.number = 400;
                errorResponse.message = 'Logical error. The requested URL cannot be found. Check your request data';
                break;
            case 403:
                errorResponse.number = 403;
                errorResponse.message = 'Transaction could not be initiated due to connection problems. The servers IP address is probably not whitelisted!';
                break;
            case 500:
            default:
                errorResponse.number = 500;
                errorResponse.message = 'Server error.';
                break;
        }
        return new PaysafecardError(errorResponse.code, errorResponse.message, errorResponse.number, errorResponse.param);
    }

    // these are some error codes for correct status for payment related stuffs from paysafecard repo
    switch (errorResponse.number) {
        case 4003:
            errorResponse.message = 'The amount for this transaction exceeds the maximum amount. The maximum amount is 1000 EURO (equivalent in other currencies)';
            break;
        case 3001:
            errorResponse.message = 'Transaction could not be initiated because the account is inactive.';
            break;
        case 2002:
            errorResponse.message = 'payment id is unknown.';
            break;
        case 2010:
            errorResponse.message = 'Currency is not supported.';
            break;
        case 2029:
            errorResponse.message = 'Amount is not valid. Valid amount has to be above 0.';
            break;
    }

    return new PaysafecardError(errorResponse.code, errorResponse.message, errorResponse.number, errorResponse.param);
}
