// import dbConnect from "../../../../util/mongo";
// import Order from "../../../../models/Order";

// const handler = async (req: any, res: any) => {
//     const {
//         method,
//         query: { customerId },
//     } = req;

//   await dbConnect();

//   if (method === "GET") {
//     try {
//       const orders = await Order.find({ customerId: customerId });
//       res.status(200).json(orders);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }
// };

// export default handler;