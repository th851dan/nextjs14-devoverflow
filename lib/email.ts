import nodemailer from 'nodemailer';


export default async function handlerEmail() {

    console.log("try to send email")

    // Configure the transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.me.com',  // iCloud SMTP server
      port: 587,
      secure: false,  // true for 465, false for other ports
      auth: {
        user: process.env.ICLOUD_EMAIL, // Your iCloud email address
        pass: process.env.ICLOUD_APP_PASSWORD,  // Your iCloud app-specific password
      },
    });

    try {
      // Send mail
      await transporter.sendMail({
        from: process.env.ICLOUD_EMAIL,  // Your iCloud email
        to: "diepbui.qn@gmail.com",              // Recipient's email
        subject: "Nofication",                // Email subject
        text: "Hello",                      // Email body
      });

      console.log("Send email successful")

    } catch (error) {
      console.error('Error sending email:', error);
    }
}
