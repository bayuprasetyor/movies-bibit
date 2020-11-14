const { BaseRepo } = require('./base_repo')
const { DatabaseError } = require('../exception/custom_error')
const { customErrorCode } = require('../exception/error_code')
const { OpResult } = require('../model/operation_result')

class MoviesRepo extends BaseRepo{
    constructor(req, res){
        super(req,res)
    }
}
module.exports = {MoviesRepo}