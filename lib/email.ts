import nodemailer from 'nodemailer';


export default async function handlerEmail() {

    console.log("try to send email")

    // Configure the transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.beta.buddyknows.org',
      port: 587,
      secure: false,  
      auth: {
        user: process.env.ICLOUD_EMAIL, 
        pass: process.env.ICLOUD_APP_PASSWORD,  
      },
    });

    try {
      // Send mail
      await transporter.sendMail({
        from: process.env.ICLOUD_EMAIL,  
        to: "diepbui.qn@gmail.com",             
        subject: "Nofication",               
        text: "Hello",              
      });

      console.log("Send email successful")

    } catch (error) {
      console.error('Error sending email:', error);
    }
}
