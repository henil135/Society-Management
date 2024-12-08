const Razorpay = require("razorpay");

const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
});

exports.Pay = (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || isNaN(amount)) {
            return res.status(400).json({ message: "Invalid or missing amount" });
        }

        const options = {
            amount: amount * 100, // Convert to paise
            currency: "INR",      // Razorpay requires currency
        };

        razorpay.orders.create(options, (err, order) => {
            if (err) {

                return res.status(500).json({ message: err.message });
            }
            res.status(200).json(order);
        });
    } catch (error) {

        res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.getOrderDetails = async (req, res) => {
    const { orderId } = req.params;

    if (!orderId) {
        return res.status(400).json({ message: "Order ID is required" });
    }

    try {
        const orderDetails = await razorpay.orders.fetch(orderId);
        res.status(200).json(orderDetails);
    } catch (error) {
        
        res.status(500).json({
            // message: error.error?.description || "Something went wrong",
        });
    }
};
