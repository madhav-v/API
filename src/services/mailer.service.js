const dotenv = require('dotenv')
dotenv.config();
const nodemailer = require("nodemailer");

class MailService{
    connection;
    constructor(){
        this.connection = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PWD
            }
        });
    }

    sendMail = async (to, subject, content, attachments = null, cc= null, bcc=null) => {
        try{
            let msg = {
                from: '"Admin User" no-reply@test.com', // sender address
                to: to, // list of receivers
                subject: subject, // Subject line
                html: content
            }
            if(attachments){
                msg.attachments = attachments
            }
            if(cc){
                msg.cc = cc;
            }
            if(bcc){
                msg.bcc = bcc;
            }

            let response = await this.connection.sendMail(msg)
            console.log(response)
            return true
        } catch(except){
            console.log("EmailException: ", except);
        }
    }
}
const mailSvc = new MailService();
module.exports = mailSvc;