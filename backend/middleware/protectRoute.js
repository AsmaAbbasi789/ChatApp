import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if(!token){
        return res.status(401).json({error: "Unauthorized - No token provided"})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
        return res.status(401).json({error: "Unauthorized - Invalid token"})
    }

    const user = await User.findById(decoded.userId).select("-password"); // we don't want to expose pswrd in response for security 

    if (!user){
        return res.status(404).json({error: "User not found"})
    }

    req.user = user; 

    next();

  } catch(error){
    console.log("Error in protected route middleware", error.message);
    res.status(500).json({error: "Internal server Error"})
  }  
}

export default protectRoute;

