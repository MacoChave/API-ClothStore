const env = process.env

const db = {
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'root',
    password: env.DB_PASS || 'root',
    database: env.DB_NAME || 'db_clothstore'
}

const listPerPage = env.LIST_PER_PAGE || 10

module.exports = {
    SECRET: 'ClothStore',
    DB_CONFIG: db,
    DB_OFFSET: listPerPage
}