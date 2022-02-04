const Joi = require('joi');
const mysqlService = require('./service.mysql');
const amqpService = require('./service.amqp');

const schema = Joi.object({
    firstname: Joi.string()
        .min(3)
        .max(20)
        .required(),

    lastname: Joi.string()
        .min(3)
        .max(20)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }),

    age: Joi.number(),
})

module.exports = function (req, res) {

    let validate = schema.validate(req.body);
    if (validate.error) {
        let response = { status: 401, error: validate.error }
        res.status(401).send(response);
    } else {
        let response = {
            "message": "User created successfully",
            "user": validate.value
        }

        mysqlService.createUser(validate.value)
            .then(data => {
                response.user.userid = data.rows.insertId;
                return amqpService.sendToQueue(response.user);
            })
            .then(data => {
                console.log(data);
                res.status(200).send(response);
            })
            .catch(error => {
                console.log(error);
                res.status(500).send(error);
            });
    }

}