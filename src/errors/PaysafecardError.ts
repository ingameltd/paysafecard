export class PaysafecardError extends Error {
    constructor(code: string, message: string, number?: number, param?: string) {
        super(`code = ${code}, message = ${message}, number = ${number}, param = ${param}`); // 'Error' breaks prototype chain here
        Object.setPrototypeOf(this, new.target.prototype);
    }
}