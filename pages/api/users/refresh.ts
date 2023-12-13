import dbConnect from "../../../util/mongo";
const jwt = require('jsonwebtoken');

const generateAccessToken = (_id: any, name: any, login: any) => {
    const payload = {
        _id,
        name,
        login
    }
    return jwt.sign(payload, "SECRET_KEY_FOR_TASTYFOOD", { expiresIn: "24h" })    
}

const generateRefreshToken = (_id: any, name: any, login: any) => {
    const payload = {
        _id,
        name,
        login
    }
    return jwt.sign(payload, "SECRET_KEY_FOR_TASTYFOOD");
};

export default async function handler(req: any, res: any) {
    try {
        dbConnect()
        const refreshToken = req.body.token
        if (!refreshToken) { 
            return res.status(403).json("Refresh token is not valid!"); 
        }
        jwt.verify(refreshToken, "SECRET_KEY_FOR_TASTYFOOD", (err: any, user: any) => {
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken) 
            const newAccessToken = generateAccessToken(user._id, user.name, user.login);
            const newRefreshToken = generateRefreshToken(user._id, user.name, user.login);
            refreshTokens.push(newRefreshToken);
            res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            });
        });
    } catch (err) {
        res.status(500).json(refreshTokens);
    }
    
}