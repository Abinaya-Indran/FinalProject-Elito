import { NextApiRequest } from 'next';
import { connectToDatabase } from '../../../../lib/db'; // Adjust based on your actual directory structure
import Cake from '../../../../models/product'; // Adjust based on your actual directory structure
import cloudinary from '../../../../lib/cloudinary'; // Adjust based on your actual directory structure

interface CakeData {
  name: string;
  price: number;
  image: string;
  description?: string;
  createdAt?: Date;
}

export async function POST(req: NextApiRequest) {
  try {
    // Get the JSON body data from the request
    const body = await req.json();

    // Check if body.data exists before destructuring
    const { name, price, image, description, createdAt }: CakeData = body.data || {};

    if (!name || !price || !image || !description || !createdAt) {
      return new Response(
        JSON.stringify({ error: 'Missing cake details: name, price, image, description, createdAt' }),
        { status: 400 }
      );
    }

    // Connect to MongoDB using the connectToDatabase function
    await connectToDatabase();

    // Get the base64 image string from the request body
    const fileStr: string = image; // Base64 image string

    // Upload the image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: 'ecommerce_cakes', // Cloudinary folder to upload the image
    });

    // Save cake details to MongoDB
    const newCake = await Cake.create({
      name,
      price,
      image: uploadResponse.secure_url, // URL of the uploaded image
      description,
      createdAt,
    });

    // Return success response
    return new Response(
      JSON.stringify({ message: 'Cake added successfully', cake: newCake }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error uploading cake:', error);

    // Return error response
    return new Response(
      JSON.stringify({ error: 'Failed to upload cake' }),
      { status: 500 }
    );
  }
}
