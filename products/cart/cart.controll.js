
const Cart = require("./cart.model");


const createCart = async (req, res) => {
    try {
        const { productId, userId, quantity } = req.body;

        const cartData = await Cart.findOne({ productId: productId, userId: userId });

        console.log(cartData);

        if (cartData != null) {

            await Cart.updateOne({ _id: cartData._id }, { quantity: cartData.quantity + 1 }, { new: true });

            res.status(200).json({ success: true, message: "Add to cart Successfully!" });

            return
        }

        const cart = new Cart({ productId, userId, quantity })

        const response = await cart.save();

        res.status(201).json({ success: true, message: "Product Add successfully", data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: "Failed to create cart", error });
    }
};

// const getCartByProductId = async (productId) =>{
//     const product = await Cart
// }


const getCart = async (req, res) => {
    try {
        const { userId } = req.query;
        let query = {};
        if (userId) {
            query.userId = userId;
        }

        const cart = await Cart.find(query).populate('productId').populate('userId')
        console.log(cart);
        res.status(200).json({ success: true, message: "Cart successfully", data: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to view cart", error });
    }

}


const deleteCart = async (req, res) => {
    try {
        const deleted = await Cart.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Product Not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted successfully", data: deleted });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete cart", error });
    }
};


const updateCart = async (req, res) => {

    console.log(req.body.quantity);

    try {
        const updateCartQty = await Cart.findByIdAndUpdate(
            req.params.id,
            { quantity: req.body.quantity },
            { new: true }
        );


        if (!updateCartQty) {
            return res.status(404).json({ success: false, message: "Cart item not found" });
        }

        res.status(200).json({ success: true, message: "Quantity updated", data: updateCartQty });
    } catch (error) {
        res.status(500).json({ success: false, message: "Quantity update failed", error });
    }
};




module.exports = { createCart, getCart, deleteCart, updateCart };

