const mailer = require("nodemailer");

const createTransport = async () => {
	let transporter = mailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true, // true for 465, false for other ports
		auth: {
			user: process.env.STMP_USER,
			pass: process.env.STMP_PASS,
		},
	});
	return transporter;
};
module.exports = {
	send: async (to, subject, message) => {
		const transporter = await createTransport();
		return await transporter.sendMail({
			from: '"Othniel Agera" <othniel.agera@flutterwavego.com>', // sender address
			to,
			subject,
			html: message,
		});
	},
};
