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

        for (let size of shipSizes) {
            let placed = false;
            while (!placed) {

                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);

                if (Math.random() > 0.5) {  // horizontal
                    if(this.isShipPlaceableH(board, x, y, size)) {
                        this.placeShipH(board, x, y, size);
                        placed = true;
                    }
                }
                else {  // vertical
                    if(this.isShipPlaceableV(board, x, y, size)) {
                        this.placeShipV(board, x, y, size);
                        placed = true;
                    }
                }
            }
        }

        return board;
    }

    isShipPlaceableH(board, x, y, size) {
        // Check if the ship goes out of bounds
        if (x + size > board[0].length) {
            return false;
        }
    
        for (let i = 0; i < size; i++) {
            if (board[y][x + i] !== 0) {
                return false;
            }
    
            if (y > 0) {
                if (board[y - 1][x + i] !== 0) return false; // Cell above
                if (x + i > 0 && board[y - 1][x + i - 1] !== 0) return false; // Top-left diagonal
                if (x + i < board[0].length - 1 && board[y - 1][x + i + 1] !== 0) return false; // Top-right diagonal
            }
            if (y < board.length - 1) {
                if (board[y + 1][x + i] !== 0) return false; // Cell below
                if (x + i > 0 && board[y + 1][x + i - 1] !== 0) return false; // Bottom-left diagonal
                if (x + i < board[0].length - 1 && board[y + 1][x + i + 1] !== 0) return false; // Bottom-right diagonal
            }
        }
    
        if (x > 0 && board[y][x - 1] !== 0) { // Cell to the left
            if (y > 0 && board[y - 1][x - 1] !== 0) return false; // Top-left diagonal
            if (y < board.length - 1 && board[y + 1][x - 1] !== 0) return false; // Bottom-left diagonal
            return false;
        }
        if (x + size < board[0].length && board[y][x + size] !== 0) { // Cell to the right
            if (y > 0 && board[y - 1][x + size] !== 0) return false; // Top-right diagonal
            if (y < board.length - 1 && board[y + 1][x + size] !== 0) return false; // Bottom-right diagonal
            return false;
        }
    
        return true;
    }

    isShipPlaceableV(board, x, y, size) {
        // Check if the ship goes out of bounds
        if (y + size > board.length) {
            return false;
        }
    
        for (let i = 0; i < size; i++) {
            if (board[y + i][x] !== 0) {
                return false;
            }
            if (x > 0) {
                if (board[y + i][x - 1] !== 0) return false; // Cell to the left
                if (y + i > 0 && board[y + i - 1][x - 1] !== 0) return false; // Top-left diagonal
                if (y + i < board.length - 1 && board[y + i + 1][x - 1] !== 0) return false; // Bottom-left diagonal
            }
            if (x < board[0].length - 1) {
                if (board[y + i][x + 1] !== 0) return false; // Cell to the right
                if (y + i > 0 && board[y + i - 1][x + 1] !== 0) return false; // Top-right diagonal
                if (y + i < board.length - 1 && board[y + i + 1][x + 1] !== 0) return false; // Bottom-right diagonal
            }
        }
    
        if (y > 0 && board[y - 1][x] !== 0) { // Cell above
            if (x > 0 && board[y - 1][x - 1] !== 0) return false; // Top-left diagonal
            if (x < board[0].length - 1 && board[y - 1][x + 1] !== 0) return false; // Top-right diagonal
            return false;
        }
        if (y + size < board.length && board[y + size][x] !== 0) { // Cell below
            if (x > 0 && board[y + size][x - 1] !== 0) return false; // Bottom-left diagonal
            if (x < board[0].length - 1 && board[y + size][x + 1] !== 0) return false; // Bottom-right diagonal
            return false;
        }
        return true;
    }

    placeShipH(board, x, y, size) {
        for (let i = 0; i < size; i++) {
            board[y][x + i] = 1;
        }
        return board;
    }

    placeShipV(board, x, y, size) {
        for (let i = 0; i < size; i++) {
            board[y + i][x] = 1;
        }
        return board;
    }

    shoot(x, y) {
        if (x < 0 || x >= this.board[0].length || y < 0 || y >= this.board.length) {
            return { success: false, message: "Shot out of bounds!" };
        }
    
        if (this.board[y][x] === 2 || this.board[y][x] === 3 || this.board[y][x] === 4) {
            return { success: false, message: "Cell has already been shot" };
        }
    
        if (this.board[y][x] === 0) {
            // Miss
            this.board[y][x] = 2;
            this.remainingShots--;
            return { success: true, result: "miss", board: this.board };
        } else if (this.board[y][x] === 1) {
            // Hit
            this.board[y][x] = 3;
            
            if (this.isShipSunk(x, y)) {
                this.markSunkShip(x, y);
                this.shipsLeft--;
                const gameOver = this.shipsLeft === 0;
                return { 
                    success: true, 
                    result: "sunk", 
                    gameOver, 
                    board: this.board 
                };
            }
    
            return { success: true, result: "hit", board: this.board };
        }

        return { success: false, message: "Very bad : (" };
    }

    isShipSunk(x, y) {
        const directions = [
            [0, 1],  // Down
            [1, 0],  // Right
            [0, -1], // Up
            [-1, 0], // Left
        ];
    
        for (let [dx, dy] of directions) {
            let nx = x, ny = y;
    
            while (this.inBounds(nx, ny) && (this.board[ny][nx] === 1 || this.board[ny][nx] === 3)) {
                if (this.board[ny][nx] === 1) {
                    return false;
                }
                nx += dx;
                ny += dy;
            }
        }

        return true;
    }

    markSunkShip(x, y) {
        const directions = [
            [0, 1],  // Down
            [1, 0],  // Right
            [0, -1], // Up
            [-1, 0], // Left
        ];
    
        const queue = [[x, y]];
    
        while (queue.length > 0) {
            const [cx, cy] = queue.shift();
    
            this.board[cy][cx] = 4;
    
            for (let [dx, dy] of directions) {
                const nx = cx + dx;
                const ny = cy + dy;
    
                if (this.inBounds(nx, ny) && this.board[ny][nx] === 3) {
                    queue.push([nx, ny]);
                }
            }
        }
    }

    inBounds(x, y) {
        return x >= 0 && x < this.board[0].length && y >= 0 && y < this.board.length;
    }

}

module.exports = BattleshipLogic;