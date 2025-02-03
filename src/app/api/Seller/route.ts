// // src/app/api/Baker/route.ts
// import { NextResponse } from "next/server";
// import { connectToDatabase } from "../../../../lib/db";
// import Baker from "../../../../models/baker"; 
// import { ObjectId } from "mongodb";

// // GET: Fetch all bakers
// export async function GET() {
//   try {
//     await connectToDatabase();
//     const bakers = await Baker.find();  // Fetch all bakers from the database
//     return NextResponse.json(bakers, { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Failed to fetch bakers" }), {
//       status: 500,
//     });
//   }
// }

// // POST: Create a new baker
// export async function POST(req: Request) {
//   try {
//     await connectToDatabase();
//     const body = await req.json();
//     const newBaker = new Baker(body);  // Create a new baker instance
//     await newBaker.save();

//     return NextResponse.json(newBaker, { status: 201 });  // Return the created baker
//   } catch (error: any) {
//     return new Response(JSON.stringify({ error: "Failed to create baker" }), {
//       status: 500,
//     });
//   }
// }

// // PATCH: Update a baker by ID
// export const PATCH = async (req: Request) => {
//   try {
//     const body = await req.json(); // Parse the request body
//     const { bakerId, name, address, phoneNumber, role } = body;  // Extract fields

//     await connectToDatabase(); // Connect to the database

//     // Validate input
//     if (!bakerId) {
//       return new Response(
//         JSON.stringify({ message: "BakerId is required" }),
//         { status: 400 }
//       );
//     }

//     // Update the baker
//     const updatedBaker = await Baker.findByIdAndUpdate(
//       bakerId, // Use bakerId to find the baker
//       { name, address, phoneNumber, role }, // Update the baker's details
//       { new: true } // Return the updated document
//     );

//     // Check if the baker exists
//     if (!updatedBaker) {
//       return new Response(
//         JSON.stringify({ message: "Baker not found" }),
//         { status: 404 }
//       );
//     }

//     // Return success response with the updated baker
//     return new Response(
//       JSON.stringify({ message: "Baker updated", baker: updatedBaker }),
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Error updating baker:", error);
//     return new Response(
//       JSON.stringify({ message: "Error updating baker", error: error.message }),
//       { status: 500 }
//     );
//   }
// };

// // DELETE: Delete a baker by ID
// export async function DELETE(req: Request) {
//   try {
//     // Connect to the database
//     await connectToDatabase();

//     // Parse the JSON body
//     const body = await req.json();
//     const { bakerId } = body;

//     // Validate bakerId
//     if (!bakerId) {
//       return new Response(
//         JSON.stringify({ error: "Baker ID is required" }),
//         { status: 400 }
//       );
//     }

//     // Attempt to delete the baker by ID
//     const result = await Baker.findByIdAndDelete(bakerId);

//     // Check if the baker was found and deleted
//     if (!result) {
//       return new Response(
//         JSON.stringify({ error: "Baker not found" }),
//         { status: 404 }
//       );
//     }

//     // Return success response
//     return NextResponse.json(
//       { message: "Baker deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     // Return failure response with error details
//     return new Response(
//       JSON.stringify({ error: "Failed to delete baker", details: error.message }),
//       { status: 500 }
//     );
//   }
// }
