class HttpError extends Error {
    constructor(message?: string){
        super(message)
        this.name = this.constructor.name
    }
}

/**
 * Status code 401
 */
export class UnAuthorizedError extends HttpError {}

/**
 * Status Code 409
 */
export class ConflictError extends HttpError {}

//Add more error class if you need distinction
