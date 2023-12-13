import dbConnect from "../../../util/mongo";
import User from "@/models/User";
import bcrypt from "bcrypt";
const jwt = require('jsonwebtoken');

const generateAccessToken = (_id: any, name: any, login: any) => {
    const payload = {
        _id,
        name,
        login
    }
    return jwt.sign(payload, "KGV33143112_SECRET_KEY_FOR_TASTYFOOD", { expiresIn: "24h" })    
}

export default async function handler(req: any, res: any) {
    try {
        dbConnect()
        const { login, password } = req.body
        const user = await User.findOne({ login })
        if (!user) {
            return res.status(400).json({message: `Пользователь ${ login } не найден`})
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({message: `Введен неверный пароль`})
        }
        const token = generateAccessToken(user._id, user.name, user.login)
        user.token = token
        await user.save()
        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json(err);
    }
    
}