import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db('productdb');

    if (req.method === 'GET') {
      const products = await db
        .collection('products')
        .find({})
        .sort({ title: 'asc' })
        .toArray();

      return res.status(200).json(products);
    }

    if (req.method === 'POST') {
      const product = (await db.collection('products').insertOne(req.body))
        .acknowledged;

      if (product) {
        res.status(201);
        res.json({ result: 'Successfully created' });
        res.end();
      } else {
        res.status(406);
        res.json({ error: 'Failed to create product' });
        res.end();
      }
    }
  } catch (e) {
    console.error(e);
  }
};
