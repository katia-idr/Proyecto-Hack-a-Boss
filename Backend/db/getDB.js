const mysql = require(`mysql2/promise`);

require(`dotenv`).config();

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;
let pool;
const getDB = async () => {
    try {
        if (!pool) {
            pool = mysql.createPool({
                connectionLimit: 10,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASSWORD,
                database: MYSQL_DATABASE,
                timezone: 'Z',
            });
        }
        return await pool.getConnection();
    } catch (error) {
        console.error(error.message);
    }
};

module.exports = getDB;
