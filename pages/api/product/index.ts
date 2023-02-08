import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db('productdb');

    const productsCollection = db.collection('products');

    if (req.method === 'GET') {
      const products = await productsCollection
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
    if (req.method === 'DELETE') {
      const objIds: ObjectId[] = req.body.map((id: string) => new ObjectId(id));

      const deletedProducts = await productsCollection.deleteMany({
        _id: { $in: objIds },
      });

      if (deletedProducts.deletedCount === objIds.length) {
        res
          .status(200)
          .json({ deletedProducts, message: 'Successfully deleted' });
        return res.end();
      } else {
        res.status(404).json({ error: 'Failed to delete' });
        return res.end();
      }
    }
  } catch (e) {
    console.error(e);
  }
};
