import nodemailer from 'nodemailer';

nodemailer.createTransport({
    service: 'gmail', // You can change to 'smtp' if using another service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  