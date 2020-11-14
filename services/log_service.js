const { BaseService } = require('./base_service')
const { OpResult } = require('../model/operation_result')
const { GeneralError } = require('../exception/custom_error')
const {LogRepo } = require('../repo/log_repo')

class LogService extends BaseService {
    constructor(req,res) {
        super(req,res);
        this.LogRepo = new LogRepo(this.req, this.res)
    }
    logSuccess (dataLog){
        dataLog = {
            message : "Sucess",
            ...dataLog,
        }
        this.sendLog(dataLog)
    }
    logFailed (dataLog){
        dataLog = {
            ...dataLog,
            message:dataLog.message,
        }
        this.sendLog(dataLog)
    }
    async sendLog(dataLog){
        try{
            await this.LogRepo.postLog(dataLog)
        }catch (error) {
            throw GeneralError.setError(error)
         }
    }
}
module.exports = { LogService }