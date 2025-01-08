class BattleshipLogic {
    constructor() {
        this.board = this.generateNewBoard();
        this.remainingShots = 25;
        this.shipsLeft = 10;
    }

    // 0 - empty field
    // 1 - ship part
    // 2 - missed shoot
    // 3 - hit ship
    // 4 - sunked ship
    generateNewBoard() {
        const board = [];

        for (let i = 0; i < 10; i++) {
            const row = [];
            for (let j = 0; j < 10; j++) {
                row.push(0);
            }
            board.push(row);
        }
    
        return board;
    }

}

module.exports = BattleshipLogic;