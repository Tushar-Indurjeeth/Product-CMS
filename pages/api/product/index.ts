import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { ObjectIdLike } from 'bson';

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
      const objIds: ObjectId[] = req.body.ids.map(
        (id: string) => new ObjectId(id)
      );

      const deletedProducts = await productsCollection.deleteMany({
        _id: { $in: objIds },
      });

      if (deletedProducts.deletedCount === objIds.length) {
        return res
          .status(200)
          .json({ deletedProducts, message: 'Successfully deleted' });
      } else {
        return res.status(404).send({ error: 'Product not found' });
      }
    }
  } catch (e) {
    console.error(e);
  }
};
