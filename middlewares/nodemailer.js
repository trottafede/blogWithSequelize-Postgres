const nodemailer = require("nodemailer");
module.exports = async function nodeMailer(body) {
  let { title, content, author, image } = body;

  // Nodemail

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODE_MAILER_USER,
      pass: process.env.NODE_MAILER_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
    },
  });

  let textToSend = `
        Se creó un articulo con el titulo: ${title}.
        El autor del articulo es: ${author}
        Imágen de perfil: ${image}
        El contendio de dicho articulo es:
        ${content}. 
      `;
  const mailOptions = {
    from: process.env.NODE_MAILER_USER,
    to: process.env.NODE_MAILER_USER,
    subject: "Lomoblog - nuevo post",
    text: textToSend,
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) throw err;
    console.log("Email sent: " + info.response);
  });
};
