const nodemailer = require('nodemailer');

const dotenv = require('dotenv')
dotenv.config()

console.log("EMAIL USER:", process.env.EMAIL_USER);
console.log("EMAIL PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");
// Create transporter
const transport = nodemailer.createTransport({
   
    service:"gmail",            
    secure: false,           
    auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS,  
    },
});


// Controller function to send order success mail
const orderSuccessMail = async (req, res) => {
    try {
        const { toMail, order } = req.body;
        console.log("Request body:", req.body);

        const mailOptions = {
            from: `My Mail <${process.env.EMAIL_USER}>`,
            to: toMail,
            subject: 'Order Placed Successfully',
            html: `
                <h2>Thanks For Your Order</h2>
                <p>Your order has been placed successfully.</p>
                <p><strong>Email:</strong> ${order.email}</p>
                <p><strong>Product:</strong> ${order.productname}</p>
                <h2>Thank You</h2>
            `,
        };

        const info = await transport.sendMail(mailOptions);
        console.log("Mail sent:", info);

        res.status(200).json({ success: true, info });
    } catch (error) {
        console.error('Error sending order success email:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { orderSuccessMail };
