const express = require("express");
const router = express.Router();
const contactController = require("./contact.controller");

router.post("/", contactController.createContact);
router.get("/admin/all", contactController.getContacts);
router.delete("/:id", contactController.deleteContact);

module.exports = router;
