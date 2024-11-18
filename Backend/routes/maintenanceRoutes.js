const { CheckMaintenancePassword, CreateMaintenance, GetMaintenance } = require("../controller/maintenanceController");
const { auth } = require("../middleware/auth");
const router=require("express").Router();

//check password correction in maintenance
router.post("/checkpassword",auth,CheckMaintenancePassword)

//add maintenance 
router.post("/addmaintenance",CreateMaintenance)
//get maintenance
router.get("/viewmaintenance",GetMaintenance)

module.exports=router