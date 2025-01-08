const BattleshipLogic = require("./battleshipLogic");

class BattleshipController{
    constructor() {
        this.games = {};
    }

    startGame(req, res) {
        const gameId = Math.random().toString(36).substr(2, 9); // Generuoja unikalų ID
        this.games[gameId] = new BattleshipLogic();
        res.json({ gameId, message: "Pradetas zaidimas" });
    }
}


module.exports = new BattleshipController();