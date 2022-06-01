import { MongoClient } from 'mongodb';

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://admin:admin@cluster0.pkllf.mongodb.net/?retryWrites=true&w=majority'
  );
  return client;
};
