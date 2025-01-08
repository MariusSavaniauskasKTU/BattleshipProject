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
        const shipSizes = [5, 4, 3, 3, 2, 2, 2, 1, 1, 1];

        for (let i = 0; i < 10; i++) {
            const row = [];
            for (let j = 0; j < 10; j++) {
                row.push(0);
            }
            board.push(row);
        }
        this.placeShipH(board , 5, 5, 2);
        /*for (let size of shipSizes) {
            placeShipH(5, 5, 2);
            let placed = false;
            while (!placed) {

                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);

                if (Math.random() > 0.5) {  // horizontal
                    
                }
                else {  // vertical

                }

                placed = this.canPlaceShip(x, y, size, orientation);
                if (placed) {
                    this.placeShip(x, y, size, orientation, ships);
                }
            }
        }*/

    
        return board;
    }

    isShipPlaceableH(x, y, size) {
        return true;
    }

    placeShipH(board, x, y, size) {
        for (let i = 0; i < size; i++) {
            board[y][x + i] = 1;
        }
    }

}

module.exports = BattleshipLogic;