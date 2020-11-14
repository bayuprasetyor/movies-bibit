const { BaseRepo } = require('./base_repo')
const { DatabaseError } = require('../exception/custom_error')
const { customErrorCode } = require('../exception/error_code')
const { OpResult } = require('../model/operation_result')

class LogRepo extends BaseRepo{
    constructor(req, res){
        super(req,res)
    }

    async postLog(dataLog){
        try{
            let dataLogs = await dataLog
            const data = await this.query(`
            insert into log_movies (endpoint, parameter, message, response)
            values ($1, $2, $3, $4)`
            ,[dataLogs.endpoint, dataLogs.parameter, dataLogs.message, dataLogs.response])
            return OpResult.success(data.rows[0])
        }
        catch(error){
            throw new DatabaseError(error)
        }
    }
}
module.exports = {LogRepo}