const { CreateCommunity, communitys, CreateGroup, allgroup, message } = require("../controller/communitychatcController");

const router = require("express").Router();

router.post("/createcommunity" , CreateCommunity)
router.get("/communityget" , communitys)
router.post("/creategroup" , CreateGroup)
router.get("/allgroup" , allgroup)
router.post("/createmessage" , message)
router.get("/allmessage" , message)

module.exports=router;