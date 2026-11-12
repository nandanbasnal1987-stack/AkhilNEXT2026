const nodemailer = require('nodemailer');

// Create transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_app_password'  // Use App Password, not your real Gmail password
  }
});

// Email options
const mailOptions = {
  from: 'your_email@gmail.com',
  to: 'receiver_email@example.com',
  subject: 'Test Email from Nodemailer',
  text: 'This is a test email sent from Node.js using Nodemailer'
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error: ', error);
  }
  console.log('Email sent: ' + info.response);
});
