const BattleshipLogic = require("./battleshipLogic");

class BattleshipController{
    constructor() {
        this.games = {};
    }

    startGame(req, res) {
        const gameId = Math.random().toString(36).substr(2, 9); // Generate unique ID
        const newGame = new BattleshipLogic();
    
        this.games[gameId] = newGame;
    
        res.json({
            gameId,
            board: newGame.board,
            remainingShots: newGame.remainingShots,
            shipsLeft: newGame.shipsLeft, // Include ships left
            message: "Game started successfully!",
        });
    }
    
    shoot(req, res) {
        const { gameId, x, y } = req.body;
        const game = this.games[gameId];
    
        if (!game) {
            return res.status(404).json({ error: "Game not found" });
        }
    
        const result = game.shoot(x, y);
        res.json(result);
    }
}


module.exports = new BattleshipController();