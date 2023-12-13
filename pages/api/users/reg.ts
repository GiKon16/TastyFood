import dbConnect from "../../../util/mongo";
import User from "@/models/User";
import bcrypt from "bcrypt";

export default async function handler(req: any, res: any) {
    try {
        dbConnect()
        const { name, login, password } = req.body
        const candidate = await User.findOne({ login })
        if (candidate) {
            return res.status(400).json({ message: "Пользователь с таким логином уже существует" })
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const user = await User.create({ name, login, password: hashPassword });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    } 
}