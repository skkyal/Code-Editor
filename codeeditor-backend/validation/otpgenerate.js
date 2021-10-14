const nodemailer = require("nodemailer");
module.exports = function (email) {
  const otp = parseInt(Math.random() * 1000000);
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: process.env.ACCEMAIL,
      pass: process.env.ACCPASS,
    },
  });
  //console.log("HERE");
  const mailOptions = {
    from: process.env.ACCEMAIL,
    to: email,
    subject: "Otp for registration is: ",
    html:
      "<h3>OTP for account verification is </h3>" +
      "<h1 style='font-weight:bold;'>" +
      otp +
      "</h1>", // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent:", info.messageId);
      console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
    }
  });

  return otp;
};
