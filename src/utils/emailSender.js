const nodemailer = require("nodemailer");

const emailSender = async ({
  receiver = "khizer.hayyat@datics.ai",
  subject,
  content,
}) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "djangodeveloper9@gmail.com",
        pass: "",
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "djangodeveloper9@gmail.com",
      to: receiver,
      subject,
      html: content,
    });

    console.log("Message sent: %s", info);
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports = { emailSender };
