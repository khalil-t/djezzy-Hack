import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const finduser = await User.findById(decoded._id).select("-password");

        if (!finduser) {
            console.log("User not found with ID:", decoded._id);
            return res.status(401).json({ error: "Unauthorized - User Not Found" });
        }

        req.user = finduser;
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error.message);
        return res.status(403).json({ error: "Unauthorized - Invalid Token" });
    }
};

export default protectRoute;
