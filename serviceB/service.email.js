
const nodemailer = require("nodemailer");

module.exports = async function (data) {
    console.log('sending email.....');

    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER, // generated ethereal user
            pass: process.env.SMTP_PASS, // generated ethereal password
        },
    });

    try {
        let info = await transporter.sendMail({
            from: 'test1@gmail.com', // sender address
            to: "test2@gmail.com", // list of receivers
            subject: "User Created Mail", // Subject line
            //text: "Hello world?", // plain text body
            html: `<b>Email Address : </b> ${data.email} <br/>
                    <b>Newsletter Content</b> : ${data.firstname + "-" + data.lastname} <br/>
                    <b>Newsletter Name</b> : ${data.firstname + "-" + data.lastname}`
        });

        return info;
    } catch (error) {
        throw error;
    }

}