const { updateSecurityGuard, DeleteGuard, GetByIdGuard, GetSecurityGuard, CreateSecurityGuard, GuardLogin, gaurdProfile,  } = require("../controller/securityGuardController");
const { gaurdprotect } = require("../middleware/protect");
const upload = require("../utils/security_Image");
const router = require("express").Router();

router.get("/profile" , gaurdprotect ,gaurdProfile ) 


//Add security Guard
router.post("/addsecurity",upload.fields([{ name: "profileimage", maxCount: 1 },{ name: "adhar_card", maxCount: 1 }, ]), CreateSecurityGuard);

router.post("/Guardlogin", GuardLogin);
//get Guard
router.get("/", GetSecurityGuard);
//get by id Guard
router.get("/:id", GetByIdGuard);
//delete Guard
router.delete("/deletesecurity/:id", DeleteGuard);
//update Guard
router.put("/updatesecurity/:id",upload.fields([{ name: "profileimage", maxCount: 1 },{ name: "adhar_card", maxCount: 1 },]),updateSecurityGuard );


module.exports = router;
