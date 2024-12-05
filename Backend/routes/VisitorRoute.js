const express = require("express");
const { visitor, Allvisitor, CreateAlert, AllAlerts } = require("../controller/VisitorTrackingController");

const router = express.Router();

// create a visitor details
router.post("/VisitorDetails", visitor);

// find all visitor
router.get("/AllVisitor", Allvisitor);

// craete a Alert
router.post("/Alert", CreateAlert);

// find all alerts
router.get("/AllAlerts", AllAlerts);


module.exports = router;
