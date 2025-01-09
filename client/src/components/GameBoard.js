import React, { useState, useEffect } from 'react';
import { startGame, shoot } from '../services/api';
import './GameBoard.css';

const GameBoard = () => {
    const [board, setBoard] = useState([[]]);
    const [message, setMessage] = useState('');
    const [shotsLeft, setShotsLeft] = useState(0);
    const [shipsLeft, setShipsLeft] = useState(0); // Add state for remaining ships
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);

    useEffect(() => {
        // Start a new game on load
        const initializeGame = async () => {
            try {
                const gameData = await startGame();
                console.log('Game Data:', gameData);

                if (gameData.board && Array.isArray(gameData.board)) {
                    setBoard(gameData.board);
                } else {
                    throw new Error('Invalid board data received');
                }

                setShotsLeft(gameData.remainingShots);
                setShipsLeft(gameData.shipsLeft); // Set the initial number of ships
                setMessage('Game started! Take your shot.');
            } catch (error) {
                console.error('Error starting game:', error);
                setMessage('Error starting game.');
            }
        };

        initializeGame();
    }, []);

    const handleCellClick = async (x, y) => {
        try {
            const result = await shoot(x, y);
            setBoard(result.board);
            setShotsLeft(result.remainingShots);
            setShipsLeft(result.shipsLeft); // Update the number of ships left

            if (result.message) {
                setMessage(result.message);
            }

            if (result.gameOver) {
                setGameOver(true);
                setWin(result.win);
            }
        } catch (error) {
            console.error('Error shooting cell:', error);
            setMessage('Error taking your shot.');
        }
    };

    const restartGame = () => {
        window.location.reload();
    };

    return (
        <div>
            <h1>Battleship</h1>
            <p>{message}</p>
            <p>Shots Left: {shotsLeft}</p>
            <p>Ships Left: {shipsLeft}</p> {/* Display remaining ships */}
            {board.length > 0 ? (
                <div className="board">
                    {board.map((row, y) => (
                        <div key={y} className="row">
                            {row.map((cell, x) => (
                                <button
                                    key={x}
                                    className={`cell cell-${cell}`}
                                    onClick={() => handleCellClick(x, y)}
                                    disabled={cell === 2 || cell === 3 || cell === 4}
                                >
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading game board...</p>
            )}

            {/* Popup for game over */}
            {gameOver && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>{win ? 'You win!' : 'You lose.'}</h2>
                        <button onClick={restartGame}>Restart</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GameBoard;