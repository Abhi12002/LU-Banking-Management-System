import { NextApiRequest, NextApiResponse } from "next";
import {dbConnect} from "@/lib/dbConnect"; // Ensure correct import


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { email } = req.body

    // Connect to MongoDB
    const db = await dbConnect();
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Could not find the user." });
    }
    await db.collection('users').updateOne(
        { email },
        {
          $set: {
            isAdmin: true,
          },
        }
      );
    // Return the user's bank data
    return res.status(200).json({ success: true, message: 'User is successfully granted admin access' });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Error fetching user data" });
  }
}
