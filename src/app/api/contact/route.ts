// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    // You can handle the form data here, like saving to a database or sending an email
    console.log('Contact Form Submission:', { name, email, password });

    // Send a response
    return res.status(200).json({ message: 'Contact form submitted successfully!' });
  } else {
    // Method Not Allowed
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
