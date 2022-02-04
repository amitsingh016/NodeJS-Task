const express = require("express");
require('dotenv').config();
const amqpService = require('./service.amqp');
const emailService = require('./service.email');
const mysqlService = require('./service.mysql');

const app = express();

amqpService.getFromQueue(async function (err, data) {
    if (err) {
        console.log(err);
    }

    if (data) {
        data = JSON.parse(data);
        try {
            await emailService(data);
            await mysqlService.createLogs(data);
        } catch (error) {
            console.log(error);
            await amqpService.sendToQueue(data);
        }
    }


})


app.listen(6000)