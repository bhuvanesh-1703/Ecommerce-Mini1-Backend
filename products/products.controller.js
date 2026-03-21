const Product = require("./product.model");

const createProduct = async (req, res) => {
    try {
        // console.log(req.body);
        // console.log(req.file);

        const { productname, category, description, productdetails, price, stock, status } = JSON.parse(req.body.product);
        
        const image = req.file.filename

        const product = new Product({ image, productname, category, description, productdetails, price, stock, status });

        const response = await product.save();
        res.status(201).json({ success: true, message: "Product added", data: response });
    } catch (error) {
        res.status(500).json({ success: false, message: 'failed product', error });
    }
};


const getProduct = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        // console.log(products);
        res.status(200).json({ success: true, message: "Our Products", data: products });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch products", error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const products = await Product.findById(id).populate('category');
        // console.log(products);
        res.status(200).json({ success: true, message: "Our Products", data: products });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch products", error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product updated", data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Product update failed", error: error.message });
    }
};

const deleteProduct = async (req, res) => {

    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted", data: deleted });
    } catch (error) {
        res.status(500).json({ success: false, message: "Product deletion failed", error: error.message });
    }
};

module.exports = { createProduct, getProduct, getProductById, updateProduct, deleteProduct };
