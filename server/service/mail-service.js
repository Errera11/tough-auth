
require('dotenv').config({path: '../.env'});

const nodemailer = require('nodemailer');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            prt: process.env.SMTP_PORT,
            secure: false,
            auth:  {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }

    //mail sending
    async sendActivationLink(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Your account Verification link',
            html: `<h1>Please, verify your account</h1> 
                    <div>Link below</div><br><a href=${link}>Link</a>`
        })
    }
}

module.exports = new MailService();