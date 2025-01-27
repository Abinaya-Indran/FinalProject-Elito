// pages/api/contact.ts
import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";

// POST method to handle the form submission
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Set up the transporter (Gmail as an example)
    const transporter = nodemailer.createTransport({
      service: "gmail",  // Can be any email provider like 'smtp', 'sendgrid', etc.
      auth: {
        user: process.env.EMAIL_USER,  // Use environment variable for email user
        pass: process.env.EMAIL_PASS,  // Use environment variable for email password or app-specific password
      },
    });

    const mailOptions = {
      from: email,
      to: "elitocakes01@gmail.com",  // Your email address where you want to receive the message
      subject: `New message from ${name}`,
      text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: (error as any).message || "Failed to send message." });
    }
  } else {
    // If the method is not POST, return a method not allowed error
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
