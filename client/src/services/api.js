import axios from 'axios';

const API_URL = 'http://localhost:3001/game';

let gameId = '';

export const startGame = async () => {
    const response = await axios.post(`${API_URL}/start`);
    gameId = response.data.gameId;
    return response.data;
};

export const shoot = async (x, y) => {
    const response = await axios.post(`${API_URL}/shoot`, { gameId, x, y });
    return response.data;
};