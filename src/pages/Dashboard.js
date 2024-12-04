import React from 'react'

import socket from '../socket';

const Dashboard = () => {
    const [nickname, setNickname] = useState('');
    const [gameId, setGameId] = useState('');
    const navigate = useNavigate();

    const createGame = async () => {
        const res = await fetch('http://localhost:3001/create-game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        navigate(`/game/${data.gameId}`);
    };

    const joinGame = () => navigate(`/game/${gameId}`);
    return (
        <div>
            <input placeholder="Nickname" onChange={(e) => setNickname(e.target.value)} />
            <button onClick={createGame}>Create Game</button>
            <input placeholder="Game ID" onChange={(e) => setGameId(e.target.value)} />
            <button onClick={joinGame}>Join Game</button>
        </div>
    )
}

export default Dashboard