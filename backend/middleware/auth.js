import jwt from "jsonwebtoken"

const authMiddleware = async(req , res , next)=>{
    const { token } = req.headers;
    console.log("authMiddleware headers:", req.headers);
    if(!token)
    {
        return res.json({success:false , message:"please login again"})
    }
    try {
        const token_decode = jwt.verify(token , process.env.JWT_SECRET);
        req.userId = token_decode.id;
        if (!req.body) {
            req.body = {};
        }
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log("authMiddleware error:", error);
        res.json({success:false , message:error.message || "Invalid token"})
    }
}

export default authMiddleware;