
const amqp = require('amqplib/callback_api');

module.exports = {
    connection: null,
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
    getFromQueue: async function (callback) {
        console.log('start receiving...')

        try {
            this.connection = await this.getConnection();
        } catch (error) {
            throw error;
        }

        this.connection.createChannel(function (error1, channel) {
            if (error1) {
                callback(error1, null);
            }

            var queue = 'email';

            channel.assertQueue(queue, {
                durable: true
            });

            channel.consume(queue, function (msg) {
                //console.log(" [x] Received %s", msg.content.toString());
                callback(null, msg.content.toString());
            }, { noAck: true });
        });

    },
    sendToQueue: async function (user) {
        console.log('start sending...')

        if (!this.connection) {
            try {
                this.connection = await this.getConnection();
            } catch (error) {
                throw error;
            }
        }

        return new Promise((resolve, reject) => {
            this.connection.createChannel(function (error1, channel) {
                if (error1) {
                    reject(error1);
                }

                var queue = 'parking-lot-queue';
                var msg = JSON.stringify(user);

                channel.assertQueue(queue, {
                    durable: true
                });

                let s = channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
                console.log(s)

                resolve('ok');
            });
        })

    }
}