const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");

const sendEmail = asyncHandler(async (userEmail, message) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.MAIL_ID,
    to: userEmail,
    subject: "Foodie Verification Code",
    html: `<h1>Foodie Email Verification</h1>
    <p> Your verification code is: </p>
    <h2 style="color: blue;" >${message}</h2>
    <p> Please enter this code in the verification page to complete your registration process </p>
    <p> If you did not request this, please ignore this mail</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent");
  } catch (error) {
    console.log("Email sending failed with an error :", error);
  }
});

module.exports = sendEmail;
