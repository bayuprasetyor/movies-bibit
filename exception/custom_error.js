const { OpResult } = require('../model/operation_result')
const { customErrorCode } = require('./error_code')

class CustomError extends Error {
    constructor(error, reqParam) {
        super(error.message)
        this.name = error.name
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }
        this.code = error.code
        this.date = new Date()
        this.innerError = error
        if (reqParam) this.data = { reqParam }

        this.opResult = new OpResult();
        this.opResult.setError(error);
        if (process.env.ENV_ !== 'production') {
            this.opResult.stackTrace = this.stack;
            if (reqParam) this.opResult.setData({ reqParam: reqParam })
            this.opResult.date = this.date
            this.opResult.innerError = this.innerError
        }
        console.log(`${this.name} : ${this.message} (code ${this.code}) {`, this, '}');
    }
}

class RunTimeError extends Error {
    constructor(error) {
        super(error.message);
        this.name = 'RunTimeError'
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, RunTimeError);
        }
        this.date = new Date()
        this.innerError = error
        this.code = customErrorCode.SYSTEM_ERROR.code

        this.opResult = new OpResult();
        this.opResult.setError(customErrorCode.SYSTEM_ERROR);

        if (process.env.ENV_ !== 'production') {
            this.opResult.stackTrace = this.stack;
            this.opResult.date = this.date
            this.opResult.innerError = this.innerError
        }
        console.log(`${this.name} : ${this.message} (code ${this.code}) {`, this, '}');
    }
}

class DatabaseError extends Error {
    constructor(error) {
        super(error.message);
        this.name = 'DatabaseError'
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DatabaseError);
        }
        this.date = new Date()
        this.innerError = error
        this.code = customErrorCode.DATABASE_OPERATION_ERROR.code

        this.opResult = new OpResult();
        this.opResult.setError(customErrorCode.DATABASE_OPERATION_ERROR);

        if (process.env.ENV_ !== 'production') {
            this.opResult.stackTrace = this.stack;
            this.opResult.date = this.date
            this.opResult.innerError = this.innerError
        }
        console.log(`${this.name} : ${this.message} (code ${this.code}) {`, this, '}');
    }
}

class GeneralError {
    static setError(is_error) {
        let isCustomError = customErrorList.some(customError => is_error instanceof customError);
        const error = isCustomError ? is_error : new RunTimeError(is_error);
        return error;
    }
}

const customErrorList = [CustomError, DatabaseError, RunTimeError];

module.exports = { CustomError, DatabaseError, GeneralError }