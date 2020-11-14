const { BaseController } = require('./base_controller')
const { MoviesService } = require('../services/movies_service')
const { ResponseHelper } = require('../helper/response_helper')
const { OpResult } = require('../model/operation_result')
const { customErrorCode } = require('../exception/error_code')
class MoviesController extends BaseController{
    constructor(req, res){
        super(req, res)
        this.movies_service = new MoviesService(this.req, this.res);
    }
    async searchMovies(){
        try {
            const result = await this.movies_service.searchMovies(this.req.body)
            ResponseHelper.Send(this.res, result, 200);
        } catch (error) {
            ResponseHelper.Send(this.res, error.opResult/*.toJson()*/, 200)
        }
    }
    async detailMovies(){
        try {
            const result = await this.movies_service.detailMovies(this.req.body)
            ResponseHelper.Send(this.res, result, 200);
        } catch (error) {
            ResponseHelper.Send(this.res, error.opResult/*.toJson()*/, 200)
        }
    }
   

}
module.exports = {MoviesController}