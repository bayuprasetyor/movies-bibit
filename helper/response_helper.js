const {OpResult} = require('../model/operation_result')

"use strict"
class ResponseHelper extends OpResult{
    constructor(){
        super()
    }

    setOpResult(op_result){
        for (const key in op_result) {
            if (op_result.hasOwnProperty(key)) {
                const element = op_result[key];
                this[key] = element
            }
        }
    }

    send(res, http_status_code = 200){
        //todo: log this.toJson() to logger
        res.status(http_status_code).json(this.toJson());
    }

    static Create(op_result){
        let resp = new ResponseHelper()
        resp.setOpResult(op_result)
        return resp;
    }

    static Send(res, op_result, http_status_code = 200){
        res.status(http_status_code).json(op_result)
    }
}

module.exports = {ResponseHelper}