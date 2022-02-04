
const amqp = require('amqplib/callback_api');

module.exports = {
    getConnection: async function () {

        return new Promise((resolve, reject) => {

            let { AMQP_HOST, AMQP_USER, AMQP_PORT, AMQP_PASSWORD } = process.env;

            amqp.connect(`amqps://${AMQP_USER}:${AMQP_PASSWORD}@${AMQP_HOST}:${AMQP_PORT}`,
                function (error0, connection) {
                    if (error0) {
                        reject(error0);
                    }
                    resolve(connection);
                });
        })
    },
    sendToQueue: async function (user) {
        console.log('start sending...')

        let connection;
        try {
            connection = await this.getConnection();
        } catch (error) {
            throw error;
        }

        return new Promise((resolve, reject) => {
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    reject(error1);
                }

                var queue = 'email';
                var msg = JSON.stringify(user);

                channel.assertQueue(queue, {
                    durable: true
                });

                let s = channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
                console.log(s)

                setTimeout(function () { connection.close(); }, 500);
                resolve('ok');
            });
        })

    }
}