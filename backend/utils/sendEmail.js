const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html, devFallbackText }) => 
{
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log("\n📧 [DEV MODE] Email not configured. Reset link below:\n");
    // agar email ya password set ni hoga .env me to direct reset link bhejdo.
    console.log(devFallbackText);
    console.log("\n");
    return;
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    // mere gmail se jayegi user ko email to reset his/her password.
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // 5 seconds mein msg display krdega , hang nahi hoga.
    connectionTimeout: 5000, 
  });
  // email sender 
  await transporter.sendMail({
    from: `"Note_Stack" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;