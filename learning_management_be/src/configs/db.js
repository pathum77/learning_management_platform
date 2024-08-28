const mysql = require('mysql2');
const config = require('./app');
const logger = require('../utils/logger');
const checkAndCreateTables = require('../db/tablesSetup');

const pool = mysql.createPool({
    host: config.db_host,
    user: config.db_user,
    password: config.db_password,
    database: config.db_name,
});

const db = pool.promise();

const connectWithRetry = () => {
    db.getConnection()
        .then(async (connection) => {
            logger.info('Connected to MySQL database');
            try {
                // Check and create tables if necessary
                await checkAndCreateTables(connection);
            } finally {
                connection.release();
            }
        })
        .catch((err) => {
            logger.error('Error connecting to MySQL database. Retrying in 5 seconds...', {
                message: err.message,
                stack: err.stack,
            });
            setTimeout(connectWithRetry, 5000);
        });
};

connectWithRetry();

module.exports = db;