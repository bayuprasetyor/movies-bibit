const { BaseService } = require('./base_service')
const { OpResult } = require('../model/operation_result')
const { GeneralError } = require('../exception/custom_error')
const { MoviesRepo } = require('../repo/movies_repo')
const { LogService } = require('./log_service')
const axios = require('axios')
const {HttpRequestHelper} = require("../helper/http_request")
const {by_search} = require("../model/enum/by_search_enum")

const omdbapi_url = process.env.OMDBAPI

class MoviesService extends BaseService {
    constructor(req, res) {
        super(req, res);
        this.axios = axios
        this.movies_repo = new MoviesRepo(this.req, this.res)
        this.log_service = new LogService(this.req, this.res)
        this.request = new HttpRequestHelper()
    }
    async searchMovies(rows){
        try {
            let url = this.generateURL(rows)

            const result = await this.request
            .setUrl(url)
            .get()
            await this.sendLog({
                response:result.data.Response,
                parameter:rows,
                message:result.data.Error?result.data.Error:"",
                endpoint:url
            })
            return result
        } catch (error) {
            throw GeneralError.setError(error)
        }        
    }
    async detailMovies(rows){
        try {
            let id_movies = this.req.params.id
            let url = omdbapi_url+"&i="+id_movies
            const result = await this.request
            .setUrl(url)
            .get()
            await this.sendLog({
                response:result.data.Response,
                parameter:this.req.params.id,
                message:result.data.Error?result.data.Error:"",
                endpoint:url
            })
            return result
        } catch (error) {
            throw GeneralError.setError(error)
        }        
    }
    generateURL(rows){
        let url = omdbapi_url
        for(let by in by_search){
            if(rows[by]){
                url= url + "&"+by_search[by]+"="+rows[by]
            }
        }
        return url
    }
    async sendLog(dataLog){
        if(dataLog.response==='FALSE'){
            await this.log_service.logSuccess(dataLog)
        }
        else{
            await this.log_service.logFailed(dataLog)
        }
    }

}
module.exports = { MoviesService }