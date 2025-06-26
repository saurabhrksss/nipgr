const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendApprovalEmail = async (email, fullName) => {
  const mailOptions = {
    from: `"NIPGR Calendar Admin" <no-reply@nipgr.ac.in>`,
    to: email,
    subject: 'Your Account Request has been Approved',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Congratulations, ${fullName}!</h2>
        <p>Your request to join the NIPGR Calendar has been approved by the administrator.</p>
        <p>You can now create your account using this email address by clicking the button below.</p>
        <a href="http://localhost:3000/signup" style="background-color: #28a745; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Sign Up Now
        </a>
        <p style="margin-top: 20px;">If you did not request this, please disregard this email.</p>
        <br>
        <p>Best regards,</p>
        <p>The NIPGR Team</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Approval email sent: ' + info.response);
    // Preview URL will be logged in the console if using Ethereal
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending approval email:', error);
  }
};

module.exports = { sendApprovalEmail };