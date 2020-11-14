const res = require('dotenv').config();
const { Pool, Client } = require('pg');

var poolConnection = null;

var dbConfig = {
    host: process.env.PG_DB_HOST,
    user: process.env.PG_DB_USER,
    password: process.env.PG_DB_PASS,
    database: process.env.PG_DB_NAME,
    port: process.env.PG_DB_PORT, 
    max: 20,
    idleTimeoutMillis: 3000
}

// async function retryConnection(){
//     connectionPool = await new Pool(dbConfig); 
// }

var db = {  
    init : async (cb) => {
            poolConnection = await new Pool(dbConfig);
            if(cb)
                cb() 
    },
    /**
     * pool is for single query. Use pool if you don't need a transaction. Ex. when SELECT.
     */
    pool: () => {
        return poolConnection;
    },
    /**
     * client is for transactions. Use client if you need a transaction. Ex. when using BEGIN COMMIT and ROLLBACK
     */
    client : async () => {
        try {
            client = await poolConnection.connect();
            
            return client;    
        } catch (error) {
            console.log(error)
            log.critical("db connection error at .\/conn\/pgConn.js :" + error.message);
        }
    },
    totalCount : () => {
        return poolConnection.totalCount;
    }
}

module.exports = db;