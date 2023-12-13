import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";

const handler = async (req: any, res: any) => {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      // const token = req.headers.authorization.split(' ')[1]
      // if (!token) {
      //   return res.status(403).json("Для оформления заказа необходимо авторизоваться")
      // }
      const order = await Order.create(req.body);
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
    try {
      await Order.deleteMany();
      res.status(200).json("Все заказы удалены!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;