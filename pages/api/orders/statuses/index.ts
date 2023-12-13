import dbConnect from "../../../../util/mongo";
import Status from "../../../../models/Status";

const handler = async (req: any, res: any) => {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const status = await Status.find();
      res.status(200).json(status);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const status = await Status.create(req.body);
      res.status(201).json(status);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;