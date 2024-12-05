const Visitor = require("../models/VisitorTrackingModel");
const Alert = require("../models/AlertModel");

// create a visitor details
exports.visitor = async (req, res) => {
    try {
        let data = await Visitor.create(req.body);
        res.json({ "Visitor": data })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// find all visitor

exports.Allvisitor = async (req, res) => {
    try {
        let data = await Visitor.find();
        res.json({ "All Visitor": data })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// craete a Alert

exports.CreateAlert = async (req, res) => {
    try {
        let data = await Alert.create(req.body);
        res.json({ "AlertData": data })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// find all alerts

exports.AllAlerts = async (req, res) => {
    try {
        let data = await Alert.find();
        res.json({ "AlertData": data })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}