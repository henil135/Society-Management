const jwt = require("jsonwebtoken");
const Tenant = require("../models/tenantModel");
const Owner = require("../models/ownerModel");
const Guard = require("../models/securityGuardModel");
const User = require("../models/userModel");


const ownerpotect = async (req , res , next) =>{
    let {ownertoken} = req.cookies;

    

    if (ownertoken) {
        try {
            const decoded = jwt.verify(ownertoken, process.env.JWT_SECRET);
            req.owner = decoded.id; // Set PatientID directly on req
               
            next();
        } catch (error) {
        
            return res.status(401).json({ message: "Invalid token signature" });
        }
    } else {
        console.warn("Authorization token not found");
        return res.status(403).json({ message: "You are not authorized" });
    }
}

const tenantprotect = async (req , res , next) =>{
    let {tenanttoken} = req.cookies;
 
    

    if (tenanttoken) {
        try {
            const decoded = jwt.verify(tenanttoken, process.env.JWT_SECRET);
            req.tenant = decoded.id; // Set PatientID directly on req       
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid token signature" });
        }
    } else {
        console.warn("Authorization token not found");
        return res.status(403).json({ message: "You are not authorized" });
    }
}

const gaurdprotect = async (req , res , next) =>{
    let {gaurdtoken} = req.cookies;
    

    if (gaurdtoken) {
        try {
            const decoded = jwt.verify(gaurdtoken, process.env.JWT_SECRET);
            req.gaurd = decoded.id; // Set PatientID directly on req
             
            next();
        } catch (error) {
       
            return res.status(401).json({ message: "Invalid token signature" });
        }
    } else {
        console.warn("Authorization token not found");
        return res.status(403).json({ message: "You are not authorized" });
    }
}
const adminprotect = async (req , res , next) =>{
    let {admintoken} = req.cookies;

    

    if (admintoken){
        try {
            const decoded = jwt.verify(admintoken, process.env.JWT_SECRET);
            req.admin = decoded._id; // Set PatientID directly on req
                  
            next();
        } catch (error) {
           
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
           
            return next();
        } catch (error) {
    
        }
    }

    if (tenanttoken) {
        try {
            const decoded = jwt.verify(tenanttoken, process.env.JWT_SECRET);
            req.member = decoded.id; // Tenant ID
            req.userType = 'Tenant'; // Set userType to Tenant
            
            return next();
        } catch (error) {
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

            return next();
        } catch (error) {

        }
    }

    if (tenanttoken) {
        try {
            const decoded = jwt.verify(tenanttoken, process.env.JWT_SECRET);
            req.chat = decoded._id; // Tenant ID
            req.userType = 'Tenant'; // Set userType to Tenant

            return next();
        } catch (error) {
          
        }
    }

    if (admintoken) {
        try {
            const decoded = jwt.verify(admintoken, process.env.JWT_SECRET);
            req.chat = decoded.id; // Owner ID
            req.userType = 'User'; // Set userType to Owner

            return next();
        } catch (error) {

        }
    }

    // If neither token is valid or present
    console.warn("No valid authorization token found");
    return res.status(403).json({ message: "You are not authorized" });
};

module.exports = {ownerpotect , tenantprotect , gaurdprotect , adminprotect , ownerOrTenantProtect , OwnerAdminTenantProtect};
