import nodemailer from "nodemailer";

export const sendMail = async (to, subject, text) => {
  try {
    // Create a transporter using your email service provider
    let transporter = nodemailer.createTransport({
      service: "gmail", // You can use other services like Outlook, Yahoo, etc.
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password if 2FA is enabled
      },
    });

    // Set up email options
    let mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: to, // Recipient address
      subject: subject, // Subject line
      text: text, // Plain text body
    };

    // Send the email
    let info = await transporter.sendMail(mailOptions);

    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
