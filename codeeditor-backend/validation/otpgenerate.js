const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

module.exports = function (email) {
  const createTransporter = async () => {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject("Failed to create access token :(");
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.ACCEMAIL,
        accessToken,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });

    return transporter;
  };

  let otp = parseInt(Math.random() * 1000000).toString();
  let size = otp.length;
  while (size < 6) {
    size++;
    otp = "0" + otp;
  }

  const sendEmail = async (emailOptions) => {
    try {
      let emailTransporter = await createTransporter();
      await emailTransporter.sendMail(emailOptions);
    } catch (err) {
      console.log(err);
    }
  };

  sendEmail({
    from: process.env.ACCEMAIL,
    to: email,
    subject: "OTP for registration in CodeEditor is: ",
    html:
      "<h3>OTP for account verification is in CodeEditor Website is</h3>" +
      "<h1 style='font-weight:bold;'>" +
      otp +
      "</h1>" +
      "<div>This OTP is valid for only 10 minutes</div>", // html body
  });

  return otp;
};

//Refer to this: https://dev.to/chandrapantachhetri/sending-emails-securely-using-node-js-nodemailer-smtp-gmail-and-oauth2-g3a
