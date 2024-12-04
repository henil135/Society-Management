
const router=require("express").Router();

const { addOwnerData, GetAllOwner, OwnerLogin, ownerProfile } = require("../controller/ownerController");
const { protect, ownerpotect } = require("../middleware/protect");
const upload=require("../utils/owner_Image")


router.post("/Ownerlogin", OwnerLogin);
//add owner
router.post("/addowner", upload.fields([
    { name: 'Adhar_front', maxCount: 1 },
    { name: 'Adhar_back', maxCount: 1 },
    { name: 'Address_proof', maxCount: 1 },
    { name: 'Rent_Agreement', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 }
]), addOwnerData);

router.get("/viewowner",GetAllOwner)

// profile

router.get("/Profile",ownerpotect,ownerProfile);



module.exports=router;