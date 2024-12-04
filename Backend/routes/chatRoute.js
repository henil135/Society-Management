const { createmessage, getChathistory, updatechatstatus, deletechat, getadmincontact, getresidentcontact } = require("../controller/chatcontroller");

const router=require("express").Router();

router.post('/create' , createmessage)
router.get("/:adminId/:residentId" , getChathistory)
router.put("/:chatId" , updatechatstatus)
router.delete("/:chatId" , deletechat)
router.get("/contact/resident/:residentId" , getadmincontact)
router.get("/contact/admin/:adminId" , getresidentcontact)

module.exports=router;