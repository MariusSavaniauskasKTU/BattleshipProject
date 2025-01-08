const express = require("express");
const router = express.Router();
const battleshipController = require("./battleshipController");

router.post("/start", (req, res) => battleshipController.startGame(req, res));
router.get("/:gameId", (req, res) => battleshipController.getGameInfo(req, res));
router.post("/shoot", (req, res) => battleshipController.shoot(req, res));

module.exports = router;