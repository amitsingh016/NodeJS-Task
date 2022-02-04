
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
    createLogs: async function (user) {

        console.log('inserting to db...');
        let conn = await this.getConnection();

        return new Promise((resolve, reject) => {

            let date = this.formatDate(new Date());
            let sql = `INSERT INTO logs (date,email,newsletter) values('${date}', '${user.email}', '${user.firstname + "-" + user.lastname}')`;

            conn.query(sql, (err, rows, fields) => {
                if (err) { reject(err); }
                else { resolve({ 'rows': rows, 'fields': fields }); }
            });
        });
    },
    formatDate: function (date) {
        return (
            [
                date.getFullYear(),
                (date.getMonth() + 1).toString().padStart(2, '0'),
                (date.getDate()).toString().padStart(2, '0'),
            ].join('-') +
            ' ' +
            [
                (date.getHours()).toString().padStart(2, '0'),
                (date.getMinutes()).toString().padStart(2, '0'),
                (date.getSeconds()).toString().padStart(2, '0'),
            ].join(':')
        );
    }
}