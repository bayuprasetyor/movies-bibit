const {customErrorCode} = require('../exception/error_code')
class OpResult{
    constructor(){
        this.status
        this.data
        this.message
    }

    setStatus(status){
        this.status = status;
        return this
    }

    setData(data){
        this.data = data;
        return this
    }

    setMessage(message){
        this.message = message;
        return this
    }
    setChannel(channel){
        this.channel = channel;
        return this
    }
    setRecipient(recipient){
        this.recipient = recipient;
        return this
    }
    setResult(result){
        this.result = result;
        return this
    }

    setError(error){
        this.status = false;
        this.name = error.name;//.name;
        this.message = error.message;//.name;
        this.errorCode = error.code;
    }

    setValidationResult(validation, name){
        this.status = validation.error ? false : true
        this.data = this.status ? undefined : (name ? `${name} : ${validation.error.message}` : validation.error.message)
        this.message = this.status ? undefined : customErrorCode.INVALID_REQUEST_PARAMETERS.message//name
        this.errorCode = this.status ? undefined : customErrorCode.INVALID_REQUEST_PARAMETERS.code
    }

    toJson(){
        return {
            status : this.status ? 'OK' : "NOK",
            message : this.message,
            errorCode : this.errorCode,
            data : this.data
        }
    }

    /** get OpResult object that this.status is set to true by default
     * @param set the data for the success result
     * @returns OpResult object 
     */
    static success (data){
        let op = new OpResult()
        op.status = true
        if(data){
            op.data = data
        }
        return op;
    }

    /** get OpResult object that this.status is set to false by default
     * @param message set the message for the failed result
     * @returns OpResult object
     */
    static failed (message){
        let op = new OpResult()
        op.status = false
        if(message){
            op.message = message
        }
        return op;
    }

    /**
     * get OpResult object from error class
     * @param {Error} error error class
     */
    static error (error) {
        let op = new OpResult()
        op.setError(error)
        return op;
    }

    /**
     * get OpResult object from joi validation result object
     * @param {Object} validation joi validation result
     */
    static validation (validation, name){
        let op = new OpResult()
        op.setValidationResult(validation, name)
        return op;
    }
}

module.exports = {OpResult}