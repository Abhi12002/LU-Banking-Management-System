import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../lib/dbConnect";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
    try {
        const { user } = req.body

      if (!user) {
        return res.status(400).json({ error: "User is required." });
      }

      const db = await dbConnect();
      const transactionsCollection = db.collection("transactions");
      var id;
      if(!user.id){
        id = user._id
      }else{
        id = user.id
      }
      const transactions = await transactionsCollection
        .find({
          $or: [{ senderId: id }, { receiverId: user.email }],
        })
        .sort({ timestamp: -1 })
        .toArray();

      return res.status(200).json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return res.status(500).json({ error: "Failed to fetch transaction history." });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
