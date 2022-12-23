const express = require("express");
const app = express();
const mailService = require("./services/mailer");
const cronService = require("./services/job");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.json({
		status: "running",
		version: "v1",
	});
});

app.post("/mail", async (req, res) => {
	try {
		const { to, subject, message } = req.body;
		await mailService.send(to, subject, message);
		res.json({ message: "Email sent successfully", status: true });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message, status: false });
	}
});

const port = process.env.PORT || 5677;
app.listen(port, () => {
	console.log(`Server started on port ${port}`);

	cronService.triggerEveryHour();
});
