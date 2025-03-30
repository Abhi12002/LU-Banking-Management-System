import { NextApiRequest, NextApiResponse } from "next";
import {dbConnect} from "@/lib/dbConnect"; // Ensure correct import


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {


    // Connect to MongoDB
    const db = await dbConnect();
    const usersCollection = db.collection("users");
    const users = await usersCollection.find({}).toArray();

    if (!users) {
      return res.status(404).json({ error: "Error getting data" });
    }

    // Return the user's bank data
    return res.status(200).json(users|| {});
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Error fetching user data" });
  }
}
