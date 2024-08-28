const logger = require('../utils/logger');

const userTableQuery = require('./tables/user');
const courseTableQuery = require('./tables/course');
const enrollmentTableQuery = require('./tables/enrollment');

const tables = {
    user: userTableQuery,
    course: courseTableQuery,
    enrollment: enrollmentTableQuery
};

const tableExists = async (connection, tableName) => {
    const [rows] = await connection.query(`SHOW TABLES LIKE '${tableName}'`);
    return rows.length > 0;
};

// check if a table exists and create tables
const checkAndCreateTables = async (connection) => {
    try {
        for (const [tableName, createTableQuery] of Object.entries(tables)) {
            if (!(await tableExists(connection, tableName))) {
                await connection.query(createTableQuery);
                logger.info(`Table '${tableName}' was created.`);
            }
        }
    } catch (err) {
        logger.error('Error checking or creating tables', {
            message: err.message,
            stack: err.stack,
        });
        throw err;
    }
};

module.exports = checkAndCreateTables;
