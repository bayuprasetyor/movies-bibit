
const customErrorCode = {
    //systemError
    SYSTEM_ERROR: { name: 'SystemError', message: 'System Error', code: '01' },

    //dbOperationError
    DATABASE_OPERATION_ERROR: { name: 'DatabaseOperationError', message: 'Database operation error', code: '02' },
}

module.exports = { customErrorCode }