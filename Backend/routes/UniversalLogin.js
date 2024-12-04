const router=require("express").Router();
const User = require("../models/userModel");
const { Adminlogin } = require("../controller/userController");
const Owner = require("../models/ownerModel");
const { OwnerLogin } = require("../controller/ownerController");
const { TenantLogin } = require("../controller/tenantController");
const Tenant = require("../models/tenantModel");
const { GuardLogin } = require("../controller/securityGuardController");
const Guard = require("../models/securityGuardModel");

//  UniversalLogin

router.post("/login", async (req, res) => {
  const { Email, password, rememberMe } = req.body;
  if (!Email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email/phone and password" });
  }

  try {
    const normalizedIdentifier = Email.trim().toLowerCase();
    const normalizedPhone = Email.trim().replace(/[\s\-\(\)]/g, "");
    const admin = await User.findOne({
      $or: [{ Email_Address: normalizedIdentifier }, { Phone_Number: normalizedPhone }],
    });

    if (admin) {
      return Adminlogin(req, res);
    }

    const owner = await Owner.findOne({
      $or: [{ Email_address: normalizedIdentifier }, { Phone_number: normalizedPhone }],
    });

    if (owner) {
      return OwnerLogin(req, res);
    }

    const tenant = await Tenant.findOne({
      $or: [{ Email_address: normalizedIdentifier }, { Phone_number: normalizedPhone }],
    });

    if (tenant) {
      return TenantLogin(req, res);
    }

    const guard = await Guard.findOne({
      $or: [{ MailOrPhone: normalizedIdentifier }],
    });

    if (guard) {
      return GuardLogin(req, res);
    }

    return res.status(400).json({ message: "Invalid credentials" });
  } catch (error) {
    console.error("Error during universal login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports=router;