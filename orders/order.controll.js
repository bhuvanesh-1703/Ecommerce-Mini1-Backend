const Order = require('./order.model');


const createOrder = async (req, res) => {
    try {
        const { userId, products, deliveryAddress, totalPrice, shippingCharge, paymentMethod } = req.body;

        if (!userId || !products || !deliveryAddress || totalPrice == null || shippingCharge == null || !paymentMethod) {
            return res.status(400).json({ success: false, message: "Missing requirements" });
        }

        const order = new Order(req.body);
        await order.save();

        res.status(201).json({ success: true, message: 'Order placed successfully', order });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

const getOrder = async (req, res) => {
    try {
        const order = await Order.find()
            .populate('userId')
            .populate('products.productId');

        res.status(200).json({ success: true, message: "Orders fetched successfully", data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order Not Found" });
        }
        res.status(200).json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createOrder, getOrder, deleteOrder };
