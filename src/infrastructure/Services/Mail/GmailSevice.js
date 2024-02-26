const nodemailer = require("nodemailer");
const { MAIL_TEMPLATE } = require("./template");

class GoogleMailService {
  static from = process.env.GMAIL_USER;
  static mailOptions = {
    from: GoogleMailService.from || "pacomekengefe@gmail.com",
    subject: "Invitation à une vente aux enchères",
    text: "Invitation à une vente aux enchères",
  };

  static transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.GMAIL_HOST,
    port: Number(process.env.GMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  static sendMail = async ({ to, auctionCode, auctionName, userId, adminName, adminEmail }) => {
    const redirectionURL = `${process.env.CLIENT_HOST}/confirm/${auctionCode}/${userId}`;
    console.log("redirectionURL", redirectionURL)

    const info = await GoogleMailService.transporter.sendMail({
      ...GoogleMailService.mailOptions,
      bcc: adminEmail,
      to,
      text: `Vous avez été invité à la vente :${auctionName}, cliquez sur le lien suivant pour y acceder ${redirectionURL}`,
      html: MAIL_TEMPLATE({ adminName, auctionName, redirectionURL }),
    });

    console.log("Email sent to " + to + " : " + info.response);
  };
}

module.exports = { GoogleMailService };
