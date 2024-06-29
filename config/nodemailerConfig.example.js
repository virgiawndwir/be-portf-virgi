const nodemailer = require('nodemailer');

// Configure trasnporter for sending email
const transporter = nodemailer.createTransport({
  service: 'gmail', // Email service
  auth: {
    user: 'your-email@gmail.com', // Your email
    pass: 'your-email-password' // Email pass or app-specific password
  }
});

// Send the email
const sendEmail = async (payload) => {
  transporter.sendMail(payload, (error, info) => {
      if (error) {
          return console.log('Error:', error);
      }
      console.log('Email sent:', info.response);

      // only needed when using pooled connections
      transporter.close();
  });
}
module.exports = sendEmail;