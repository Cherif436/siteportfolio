import nodeMailer from "nodemailer";
export const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: `Nom et prénom: ${options.nom} ${options.prenom} \n\nSujet: ${options.sujet} \n\nMessage: ${options.message} \n\nE-mail de l'utilisateur qui a envoyé le message: ${options.userEmail}`,
  };
  await transporter.sendMail(mailOptions);
};
