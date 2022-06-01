import { connectToDatabase } from '../../db/connectDB';

export default async function handler(req, res) {
  const getProducts = async (client) => {
    const db = client.db();
    try {
      const productsArray = await db.collection('products').find().toArray();
      return productsArray;
    } catch (error) {
      res.json({ message: 'Could not find collection named products' });
      return;
    }
  };
  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Could not connect to DB' });
    return;
  }
  if (req.method === 'GET') {
    try {
      const productsArray = await getProducts(client);
      res.status(201).json({ products: productsArray });
    } catch (error) {
      res.status(500).json({ message: 'Could no fetch data' });
      return;
    }

  }
  
}
