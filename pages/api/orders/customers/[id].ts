import dbConnect from "../../../../util/mongo";
import Order from "../../../../models/Order";

const handler = async (req: any, res: any) => {
    const {
        method,
        query: { customerId },
    } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const orders = await Order.find({ customerId: "646e093d0c719128f77508d2" })
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;