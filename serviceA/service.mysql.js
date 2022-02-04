
const mysql = require('mysql');

module.exports = {
    getConnection: async function () {
        let connection;
        try {
            connection = await mysql.createConnection({
                host: process.env.DATABASE_HOST,
                user: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASS,
                database: process.env.DATABASE_NAME
            });
            connection.connect();
        } catch (error) {
            throw new Error(error.message);
        }

        return connection;
    },
    createUser: async function (user) {
        let conn = await this.getConnection();

        return new Promise((resolve, reject) => {

            let sql = `INSERT INTO user (firstname,lastname,email,age) values('${user.firstname}', '${user.lastname}', '${user.email}', ${user.age})`;

            conn.query(sql, (err, rows, fields) => {
                if (err) { reject(err); }
                else { resolve({ 'rows': rows, 'fields': fields }); }
            });
        });
    }
}