const jwt = require("jsonwebtoken");
const Tenant = require("../models/tenantModel");
const Owner = require("../models/ownerModel");
const Guard = require("../models/securityGuardModel");
const User = require("../models/userModel");


const ownerpotect = async (req , res , next) =>{
    let {ownertoken} = req.cookies;
    console.log(ownertoken);
    

    if (ownertoken) {
        try {
            const decoded = jwt.verify(ownertoken, process.env.JWT_SECRET);
            req.owner = decoded.id; // Set PatientID directly on req
            console.log(decoded);       
            next();
        } catch (error) {
            console.error("Token verification failed:", error);
            return res.status(401).json({ message: "Invalid token signature" });
        }
    } else {
        console.warn("Authorization token not found");
        return res.status(403).json({ message: "You are not authorized" });
    }
}

const tenantprotect = async (req , res , next) =>{
    let {tenanttoken} = req.cookies;
    console.log(tenanttoken);
    

    if (tenanttoken) {
        try {
            const decoded = jwt.verify(tenanttoken, process.env.JWT_SECRET);
            req.tenant = decoded.id; // Set PatientID directly on req
            console.log(decoded);       
            next();
        } catch (error) {
            console.error("Token verification failed:", error);
            return res.status(401).json({ message: "Invalid token signature" });
        }
    } else {
        console.warn("Authorization token not found");
        return res.status(403).json({ message: "You are not authorized" });
    }
}

const gaurdprotect = async (req , res , next) =>{
    let {gaurdtoken} = req.cookies;
    console.log(gaurdtoken);
    

    if (gaurdtoken) {
        try {
            const decoded = jwt.verify(gaurdtoken, process.env.JWT_SECRET);
            req.gaurd = decoded.id; // Set PatientID directly on req
            console.log(decoded);       
            next();
        } catch (error) {
            console.error("Token verification failed:", error);
            return res.status(401).json({ message: "Invalid token signature" });
        }
    } else {
        console.warn("Authorization token not found");
        return res.status(403).json({ message: "You are not authorized" });
    }
}


module.exports = {ownerpotect , tenantprotect , gaurdprotect};
