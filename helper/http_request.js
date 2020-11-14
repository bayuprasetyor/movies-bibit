const axios = require('axios')
const {OpResult} = require('../model/operation_result')
class HttpRequestHelper{
    constructor(){
        this.axios = axios
        this.url
        this.body
        this.header
        this.method
        this.params
    }

    setUrl(url){
        this.url = url
        return this
    }

    setBody(body){
        this.body = body
        return this
    }

    setHeader(header){
        this.header = header
        return this
    }

    async get(){
        this.method = 'get'
        return await this.run()
    }

    async post(){
        this.method = 'post'
        return await this.run()
    }

    async put(){
        this.method = 'put'
        return await this.run()
    }

    config(){
        return {
            url : this.url,
            method : this.method,
            data : this.body,
            params : this.params,
            headers : this.header
        }
    }

    async run(){
        try {
            const response = await this.axios(this.config())
            return OpResult.success(response.data)
        } catch (error) {
            return OpResult.failed().setData(error)
        }
    }

    static request(url){
        let req = new HttpRequestHelper()
        req.setUrl(url)
        return req
    }
}

module.exports = {HttpRequestHelper}