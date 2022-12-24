const cron = require("node-cron");
const mailService = require("./mailer");

const wishes = [
	"Cheer, cheer! You survived another year!",
	"It's your birthday! Time to treat yourself.",
	"Even after you blow out your candles you'll still keep on shining brightly. Have a fantastic birthday!",
	"I hope your birthday is filled with every flavor of happiness, and several flavors of cake and ice cream!",
	"I hope your birthday brings you lots of joy and love. You deserve it.",
	"Today's your birthday! Now if that isn't the cherry on the cake, I don't know what is. Have a wonderful day!",
	"Wherever you are and whatever you're doing, I hope you have a fantastic birthday!",
	"Another year, another birthday. I hope this one is as amazing as you are!",
	"I wish you the most spectacularly beautiful birthday!",
	"Surround yourself with laughter and happiness on your birthday. That means inviting me! Happy birthday.",
	"Happy Birthday to one of the awesomest people who ever lived.",
	"It's time to celebrate the anniversary of my favorite person being born.",
	"Beware! It's your birthday! You'll be drowning in gifts, hugs, and kisses!",
	"I’m celebrating today. It’s the anniversary of my favorite person being born.",
	"Love is light and light is love happy birthday!!",
	"I hope your birthday is packed with joy, and may you have many more birthdays like it!",
	"Today's your birthday! Now if that isn't the cherry on the cake, I don't know what is. Have a wonderful day!",
	"Happy birthday to the best person I've ever had the pleasure of meeting!",
	"Happy birthday to somebody we really need a week for to celebrate properly!",
	"Have a great birthday, and remember to never act your age.",
];
const sent = [];

const sendMeEmail = async (quote, cronParam) => {
	// let recipient = "d10a9308-3246-4469-a4de-e6d70b6871e6@email.webhook.site",
	let recipient = "otagera@gmail.com",
		subject = "Email From Cron Job",
		message = "This is a message from Cron job";
	message += "<br/>" + quote + "<br/>" + cronParam;
	await mailService.send(recipient, subject, message);
};

const sendEmail = async (quote) => {
	let recipient = "kufreokon24@gmail.com",
		subject = "Email From Cron Job",
		message = "This is a message from Cron job";
	message += "<br/>" + quote;
	await mailService.send(recipient, subject, message);
};

module.exports = {
	triggerEveryHour: () => {
		// Every hour, on day 23 of the month, only in December
		cron.schedule("*/30 * 24 12 *", function (cronParam) {
			const random = Math.floor(Math.random() * wishes.length);
			const quote = wishes.splice(random, 1);
			sent.push(quote);
			sendMeEmail(quote, cronParam);
			// sendEmail(quote);
			console.log(cronParam);
		});
	},
};
