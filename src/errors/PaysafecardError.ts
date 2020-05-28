export class PaysafecardError extends Error {
    constructor(code: string, message: string, errorNumber?: number, param?: string) {
        super(`code = ${code}, message = ${message}, errorNumber = ${errorNumber}, param = ${param}`); // 'Error' breaks prototype chain here
        Object.setPrototypeOf(this, new.target.prototype);
    }
}