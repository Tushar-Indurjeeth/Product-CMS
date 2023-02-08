import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

type PId = {
  pid?: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { pid }: PId = req.query;
    const client = await clientPromise;
    const db = client.db('productdb');
    const products = db.collection('products');

    if (req.method === 'GET') {
      const product = await products.findOne({
        _id: new ObjectId(pid),
      });

      if (product != null) {
        return res.status(200).json(product);
      } else {
        return res.status(404).send({ error: 'Product not found' });
      }
    }

    // if (req.method === 'DELETE') {
    //   const product = await products.deleteOne({
    //     _id: new ObjectId(pid),
    //   });

    //   if (product.deletedCount > 0) {
    //     return res
    //       .status(200)
    //       .json({ product, message: 'Successfully deleted' });
    //   } else {
    //     return res.status(404).send({ error: 'Product not found' });
    //   }
    // }

    if (req.method === 'PUT') {
      const product = await products.updateOne(
        { _id: new ObjectId(pid) },
        {
          $set: req.body,
        }
      );

      if (product.modifiedCount > 0) {
        res.status(200).json({ product, message: 'Successfully updated' });
        res.end();
      } else {
        res.status(400).send({ error: 'Failed to update product' });
        res.end();
      }
    }
  } catch (e) {
    console.error(e);
  }
};
