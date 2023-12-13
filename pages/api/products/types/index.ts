import dbConnect from "../../../../util/mongo";
import TypeOfProduct from "../../../../models/Status";

const handler = async (req: any, res: any) => {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const type = await TypeOfProduct.find();
      res.status(200).json(type);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const type = await TypeOfProduct.create(req.body);
      res.status(201).json(type);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;