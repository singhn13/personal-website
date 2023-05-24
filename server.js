const nodemailer = require("nodemailer");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/submit-form", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;

    // Configure the SMTP transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "ns.singhnavya@gmail.com",
            pass: "J0bPle@se13",
        },
    });

    // Build the email options
    const mailOptions = {
        from: email,
        to: "ns.singhnavya@gmail.com",
        subject: "New Contact Form Submission",
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send("Error sending email");
        } else {
            console.log("Email sent: " + info.response);
            res.redirect("dist/index.html");
        }
    });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
