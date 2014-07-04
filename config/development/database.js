module.exports = {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    port: process.env.DB_PORT || 27017
}
