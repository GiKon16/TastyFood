import dbConnect from "../../../util/mongo";
import User from "@/models/User";
import bcrypt from "bcrypt";
const jwt = require('jsonwebtoken');

export default async function handler(req: any, res: any) {
    const {
        method,
        query: { id },
    } = req;

  dbConnect();

    if (method === "PUT") {
        try {
            const user = await User.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    
}