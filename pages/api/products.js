// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDB } from '../../db/connectDB';
export default function handler(req, res) {
  const getProducts = async (client) => {
    const db = client.db();
    const productsArray = await db.collection('products').toArray();

    return productsArray;
  };

  if (req.method === 'GET') {
    let client;
    try {
      client = connectDB();
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to DB' });
      return;
    }
    try {
      const productsArray = getProducts(client);
      res.status(201).json({ myData: productsArray });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Could no fetch data' });
      return;
    }
  }
}
