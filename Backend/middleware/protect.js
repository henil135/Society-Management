const jwt = require("jsonwebtoken");
const Tenant = require("../models/tenantModel");
const Owner = require("../models/ownerModel");
const Guard = require("../models/securityGuardModel");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
    let token;

    // Extract token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.Token) {
        token = req.cookies.Token;
    }

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_OWNER);
        console.log("Decoded Token:", decoded);

        let user;
        
        if (decoded.role === "admin") {
            user = await User.find(decoded._id).select("-password");
        } else if (decoded.role === "resident") {
            user = await Tenant.find(decoded._id).select("-password");
        } else if (decoded.role === "security") {
            user = await Guard.find(decoded._id).select("-password");
        } else {
            user = await Owner.find(decoded._id).select("-password");
        }
        if (!user) {
            console.error("User not found for ID:", decoded.id);
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};


module.exports = { protect };
