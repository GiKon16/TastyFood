import dbConnect from "../../../../util/mongo";
import PaymentMethod from "../../../../models/PaymentMethod";

const handler = async (req: any, res: any) => {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const method = await PaymentMethod.find();
      res.status(200).json(method);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const method = await PaymentMethod.create(req.body);
      res.status(201).json(method);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;