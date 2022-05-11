import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(422).json({ message: 'Invalid email or password' });
      client.close();
      return;
    }

    const client = await connectToDatabase();
    const db = client.db();
    const existingUser = await db.collection('users').findOne({ email: email });
    if (existingUser) {
      res.status(422).json({ message: 'User already exists' });
      client.close();
      return;
    }
    const hashedPassord = await hashPassword(password);
    try {
      const result = await db.collection('users').insertOne({
        email: email,
        password: hashedPassord,
      });
    } catch (error) {
      res.json({ message: 'Error in creating a new user', error: error });
      return;
    }
    res.status(201).json({ message: 'Created new user' });
    client.close();
  } else {
    client.close();
    return;
  }
}

export default handler;
