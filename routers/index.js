const express = require("express");
const router = express();
const sendMessage = require("../controllers/whatsapp");

router.post("/send-message", sendMessage);

module.exports = router;
