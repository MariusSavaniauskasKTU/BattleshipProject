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

    getGameInfo(req, res) {
        const { gameId } = req.params;
        const game = this.games[gameId];

        if (!game) {
            return res.status(404).json({ error: "Zaidimas nerastas" });
        }

        res.json({
            board: game.board,
            remainingShots: game.remainingShots,
            shipsLeft: game.shipsLeft,
        });
    }

    shoot(req, res) {
        const { gameId, x, y } = req.body;
        const game = this.games[gameId];

        if (!game) {
            return res.status(404).json({ error: "Zaidimas nerastas" });
        }

        const result = game.shoot(x, y);
        res.json(result);
    }
}


module.exports = new BattleshipController();