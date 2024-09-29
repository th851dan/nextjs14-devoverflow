import nodemailer from 'nodemailer';
import path from 'path';
import hbs from 'nodemailer-express-handlebars';
import { create } from 'express-handlebars';
import { headers } from 'next/headers'; 

interface MailOptions {
  toMail: string
  username: string
  questionId: string
}

export default async function handlerEmail(params: MailOptions) {

    console.log("try to send email")

    // Configure the transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.me.com',  
      port: 587,
      secure: false,  
      auth: {
        user: process.env.ICLOUD_AUTH_EMAIL, 
        pass: process.env.ICLOUD_APP_NODEMAILER_PASSWORD,  
      },
      tls: {
        rejectUnauthorized: false,
      }
    });

    const handlebarOptions = {
      viewEngine: create({
        extname: '.handlebars',
        partialsDir: path.resolve('./content/emails'),
        defaultLayout: false,
      }),
      viewPath: path.resolve('./content/emails'),
      extName: '.handlebars',
    };

    transporter.use('compile', hbs(handlebarOptions));

    const headersList = headers();
    const xForwardedProto = headersList.get('x-forwarded-proto');
    const host = headersList.get('host');

    // Fallback to 'http' if the 'x-forwarded-proto' is not available
    const protocol = xForwardedProto || 'http';

    const questionLink = `${protocol}://${host}/question/${params.questionId}`;
    
    const mailOptions = {
      from: process.env.ICLOUD_FROM_EMAIL, 
      to: params.toMail, 
      subject: 'New Answer', 
      template: 'notification-new-answer', 
      context: {
        name: params.username,
        linkToQuestion: questionLink
      },
    };

    try {

      await transporter.sendMail(mailOptions);

      console.log("Send email successful")

    } catch (error) {
      console.error('Error sending email:', error);
    }
}
