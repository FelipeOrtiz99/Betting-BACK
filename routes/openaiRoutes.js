const express = require("express");
const router = express.Router();
const { generateText } = require("../controllers/openaiController");

router.post("/generate", generateText);

module.exports = router;
