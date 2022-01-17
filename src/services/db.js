import mysql from 'mysql2/promise'
import { DB_CONFIG } from '../config'

export const query = async (sql, params) => {
    const connection = await mysql.createConnection(DB_CONFIG)
    const [results,] = await connection.execute(sql, params)

    return results
}
