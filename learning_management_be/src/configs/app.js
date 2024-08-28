require('dotenv').config();

module.exports = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 4000,
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME,
    jwt_secret: process.env.JWT_SECRET,
    admin_cred: {
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD
    }
};