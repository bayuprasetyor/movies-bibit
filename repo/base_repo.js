"use strict"
const { DatabaseError } = require('../exception/custom_error')
const { customErrorCode } = require('../exception/error_code')
const { Client, Pool } = require('pg')
const { OpResult } = require('../model/operation_result')
class BaseRepo {
    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    async query (queryString, params = []) {
        return new Promise(async (resolve, reject) =>{
            try{
                // const result = await this.res.locals.client.query(queryString, params);
                const result = await this.res.locals.client.query(queryString, params);
                //todo: log?
                resolve(result)
            }catch(e){
                let {message, stack} = e
                console.log(message, stack);
                reject(e);
            }
        })
    }
}
module.exports = {BaseRepo, DatabaseError}