const fs = require('fs-extra')
const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        ca: fs.readFileSync('DigiCertGlobalRootCA.crt.pem'),
        rejectUnauthorized: true
    }
}

module.exports = config;
