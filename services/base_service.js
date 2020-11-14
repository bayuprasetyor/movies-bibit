"use strict"

const { GeneralError } = require('../exception/custom_error');

class BaseService {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        //this.client = res.locals.client;
    }

    createInstance(_class) {
        return new _class(this.req, this.res);
    }

    throwGeneralError(error) {
        throw GeneralError.setError(error);
    }
}

module.exports = { BaseService }