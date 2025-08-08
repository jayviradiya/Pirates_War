const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {

  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or use custom SMTP
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `PiratesTeam:${process.env.EMAIL_USER}`,
    to,
    subject,
    html: text
  });

};

module.exports = sendEmail;
