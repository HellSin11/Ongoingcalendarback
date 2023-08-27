const nodeMailer = require('nodemailer')


class MailService {

    SMTP_HOST='smtp.gmail.com'
    SMTP_PORT=587
    SMTP_USER='ongoingsemailsernder@gmail.com'
    SMTP_PASSWORD='jh4CD7m44K'

    constructor() {
        this.transporter = nodeMailer.createTransport({
            host: this.SMTP_HOST,
            port: this.SMTP_PORT,
            secure: false,
            auth: {
                user: this.SMTP_USER,
                pass: this.SMTP_PASSWORD
            }
        })
    }
    async sendActivationMail(to, link) {
        console.log(this.transporter)
        await this.transporter.sendMail({
            from: this.SMTP_USER,
            to,
            subject: 'Activation of the Ongoing calendar account',
            text: '',
            html:
                `
                    <div>
                        <h1>To activate the account follow the link:</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }
}

module.exports = new MailService();