// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const connectDB = async () => {
    const client = await MongoClient.connect(process.env.mongoURL);
    return client;
  };

  const insertDocument = async (client, document) => {
    const db = client.db();
    await db.collection('emails').insertOne(document);
  };

  if (req.method === 'POST') {
    const email = await req.body.email;
    if (!email) {
      res.json({ message: 'No email added' });
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      res.status(422).json({ message: 'Invalid email address' });
    } else {
      let client;

      try {
        client = await connectDB();
      } catch (error) {
        res.status(500).json({ message: 'Error connecting to database' });
        return;
      }

      try {
        await insertDocument(client, { email: email });
        client.close();
      } catch (error) {
        res.status(500).json({ message: 'Error inserting data' });
        return;
      }

      res.status(201).json({ email: email });
    }
  } else {
    res.status(200).json({ message: 'Request recieved' });
  }
}
