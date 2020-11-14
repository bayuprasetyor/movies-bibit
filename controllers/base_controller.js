class BaseController {
    constructor(req, res){
        this.req = req
        this.res = res
    }

    createInstance(_class){
        return new _class(this.req, this.res);
    }
}

module.exports = {BaseController}