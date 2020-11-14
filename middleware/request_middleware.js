const db = require('../conn/pg_conn');
const { GeneralError } = require('../exception/custom_error')

module.exports = {
  getSessionConnection: async (req, res, next) => {  // req.on('end', function() { console.log("THE END IS NEAR"); res.locals.client.release() });
    try {
      res.locals.client = db.pool();
    } catch (error) {
      console.log(error);
      // throw GeneralError.setError(e)
    }
    next();
  }
}
