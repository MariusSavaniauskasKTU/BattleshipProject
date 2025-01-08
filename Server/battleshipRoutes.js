const express = require("express");
const router = express.Router();
const battleshipController = require("./battleshipController");

router.post("/start", (req, res) => battleshipController.startGame(req, res));

module.exports = router;