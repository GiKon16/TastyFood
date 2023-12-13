import dbConnect from "../../../util/mongo";
import User from "../../../models/User";

export default async function handler(req: any, res: any) {
  const { method } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}