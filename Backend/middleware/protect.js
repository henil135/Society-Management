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
const adminprotect = async (req , res , next) =>{
    let {admintoken} = req.cookies;
    console.log("admin token",admintoken);
    

    if (admintoken){
        try {
            const decoded = jwt.verify(admintoken, process.env.JWT_SECRET);
            req.admin = decoded._id; // Set PatientID directly on req
            console.log(decoded);
            console.log(req.admin)       
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

const ownerOrTenantProtect = async (req, res, next) => {
    const { ownertoken, tenanttoken } = req.cookies;

    if (ownertoken) {
        try {
            const decoded = jwt.verify(ownertoken, process.env.JWT_SECRET);
            req.member = decoded.id; // Owner ID
            req.userType = 'Owner'; // Set userType to Owner
            console.log("Authenticated as Owner:", decoded);
            return next();
        } catch (error) {
            console.error("Owner token verification failed:", error);
        }
    }

    if (tenanttoken) {
        try {
            const decoded = jwt.verify(tenanttoken, process.env.JWT_SECRET);
            req.member = decoded.id; // Tenant ID
            req.userType = 'Tenant'; // Set userType to Tenant
            console.log("Authenticated as Tenant:", decoded);
            return next();
        } catch (error) {
            console.error("Tenant token verification failed:", error);
        }
    }

    // If neither token is valid or present
    console.warn("No valid authorization token found");
    return res.status(403).json({ message: "You are not authorized" });
};


const OwnerAdminTenantProtect = async (req, res, next) => {
    const { ownertoken, tenanttoken,admintoken} = req.cookies;

    if (ownertoken) {
        try {
            const decoded = jwt.verify(ownertoken, process.env.JWT_SECRET);
            req.chat = decoded.id; // Owner ID
            req.userType = 'Owner'; // Set userType to Owner
            console.log("Authenticated as Owner:", decoded);
            return next();
        } catch (error) {
            console.error("Owner token verification failed:", error);
        }
    }

    if (tenanttoken) {
        try {
            const decoded = jwt.verify(tenanttoken, process.env.JWT_SECRET);
            req.chat = decoded._id; // Tenant ID
            req.userType = 'Tenant'; // Set userType to Tenant
            console.log("Authenticated as Tenant:", decoded);
            return next();
        } catch (error) {
            console.error("Tenant token verification failed:", error);
        }
    }

    if (admintoken) {
        try {
            const decoded = jwt.verify(admintoken, process.env.JWT_SECRET);
            req.chat = decoded.id; // Owner ID
            req.userType = 'User'; // Set userType to Owner
            console.log("Authenticated as Admin:", decoded);
            return next();
        } catch (error) {
            console.error("Admin token verification failed:", error);
        }
    }

    // If neither token is valid or present
    console.warn("No valid authorization token found");
    return res.status(403).json({ message: "You are not authorized" });
};

module.exports = {ownerpotect , tenantprotect , gaurdprotect , adminprotect , ownerOrTenantProtect , OwnerAdminTenantProtect};
