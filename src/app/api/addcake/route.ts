import { connectToDatabase } from '../../../../lib/db'; // Adjust path accordingly
import Cake from '../../../../models/product'; // Adjust path accordingly
import cloudinary from '../../../../lib/cloudinary'; // Adjust path accordingly
import { NextRequest, NextResponse } from 'next/server';

interface CakeData {
  sellerId: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  createdAt?: Date;
  category: string;
}

export const POST = async (req: NextRequest) => {

  try {
    // Get the JSON body data from the request
    const body = await req.json();
    console.log('Body:', body);

    if (!body.data) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { name, price, sellerId, image, description, createdAt, category }: CakeData = body.data;

    if (!name || !price || !image || !category || !sellerId) {
      return NextResponse.json({ error: 'Missing required cake details' }, { status: 400 });
    }

    // Connect to MongoDB
    await connectToDatabase();

    //  image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'ecommerce_cakes',
    });

    // Save cake details to MongoDB
    const newCake = await Cake.create({
      sellerId,
      name,
      price,
      image: uploadResponse.secure_url,
      description: description || '',
      createdAt: createdAt ? new Date(createdAt) : new Date(),
      category,
    });

    return NextResponse.json({ message: 'Cake added successfully', cake: newCake }, { status: 201 });
  } catch (error) {
    console.error('Error uploading cake:', error);
    return NextResponse.json({ error: 'Failed to upload cake' }, { status: 500 });
  }
}
