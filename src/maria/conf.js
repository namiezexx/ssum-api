require('dotenv').config();

var conf = {
    db_info: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.MARIA_DB,
        connectionLimit: process.env.CONNECTION_LIMIT
    }
}

module.exports = conf;