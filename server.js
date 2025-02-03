const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/send", (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send("Error: " + error.toString());
        }
        res.status(200).send("Message sent successfully!");
    });
});

app.get("/", async (req, res) => {
    res.send("Server is running");
});

app.listen(port, (req, res) => {
  console.log("Server is running");
});