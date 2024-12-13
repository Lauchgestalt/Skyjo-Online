const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

app.use(cors());
app.use(express.json());

let games = {};
let players = {};

let mockGameState = {
    roomCode: '7D24A1', // Room code for the current game
    players: {
        'player1': {
            id: 'player1',
            name: 'Player 1',
            isReady: true,
        },
        'player2': {
            id: 'player2',
            name: 'Player 2',
            isReady: false,
        },
        'player3': {
            id: 'player3',
            name: 'Player 3',
            isReady: false,
        },
    },
    gameState: {
        phase: 'lobby',
        currentTurn: null,
        deck: [],
        discardPile: [],
        scores: {},
    },
}

io.on('connection', (socket) => {
    console.log(`Player connected: ${socket.id}`);
    players[socket.id] = {};

    socket.on('disconnect', () => {
        console.log(`Player disconnected: ${socket.id}`);
        const { gameId } = players[socket.id];
        if (gameId) {
            games[gameId].players = games[gameId].players.filter(p => p.id !== socket.id);
            if (games[gameId].players.length === 0) {
                delete games[gameId];
            } else {
                io.to(gameId).emit('updatePlayers', games[gameId].players);
            }
        }
        delete players[socket.id];
    });

    // ! *** Ingame events ***
    socket.on('startGameRequest', () => {
        const gameId = players[socket.id].gameId;
        games[gameId] = initializeNewGame();
        io.to(gameId).emit('gameStarted', games[gameId]);
    });

    socket.on('getGameState', () => {
        const gameId = players[socket.id].gameId;
        // io.to(socket.id).emit('updateGameState', {success: true, gameState: games[gameId]});
        io.to(socket.id).emit('updateGameState', {success: true, gameState: mockGameState});
    })
});

server.listen(8000, () => {
    console.log('Server running on port 8000');
});
