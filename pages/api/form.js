// pages/api/submit.js
import clientPromise from "@/lib/db"; // adjust the path as needed

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    try {
      const client = await clientPromise;
      const db = client.db("newone"); // Replace with your database name

      const collection = db.collection("newdata"); // Replace with your collection name

      const result = await collection.insertOne({ name, email, message, createdAt: new Date() });

      res.status(201).json({ message: "Data inserted successfully", result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
