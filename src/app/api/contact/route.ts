import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Replace with your Gmail username
        pass: process.env.EMAIL_PASS, // Replace with your Gmail app-specific password
      },
    });

    // Define the email options
    const mailOptions = {
      from: email,
      to: "elitocakes01@gmail.com",
      subject: `New message from ${name}`,
      text: `You have received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
