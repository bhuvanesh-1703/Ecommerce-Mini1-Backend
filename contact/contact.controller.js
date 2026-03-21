const Contact = require("./contact.model");

const createContact = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newContact = new Contact({ name, email, phone });
        const response = await newContact.save();

        res.status(201).json({ success: true, message: "Message sent successfully", data: response });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to save contact message", error: error.message });
    }
};

const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch contact messages", error: error.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return res.status(404).json({ success: false, message: "Message not found" });
        }

        res.status(200).json({ success: true, message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete contact message", error: error.message });
    }
};

module.exports = { createContact, getContacts, deleteContact };
