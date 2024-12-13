import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import { Spinner } from "react-bootstrap";

import { useToast } from "../hooks/useToast";

import socket from "../socket";
import Grid from "../components/Grid";

import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const card1Anim = keyframes`
    0% {
    }
    16.66666% {
        transform: translateX(95px) rotate(15deg);
    }
    33.33333% {
        transform: translateX(-20px);
        z-index: 1;
    }
    49.99999% {
        transform: translateX(-20px);
        z-index: 1;
    }
    66.66666% {
        transform: translateX(-10px);
        z-index: 2;
    }
    83.33333% {
        transform: translateX(-10px);
        z-index: 2;
    }
`;

const card2Anim = keyframes`
    0% {
    }
    16.66666% {
        transform: translateX(0);
    }
    33.33333% {
        transform: translateX(10px);
        z-index: 3;
    }
    49.99999% {
        transform: translateX(105px) rotate(15deg);
    }
    66.66666% {
        transform: translateX(-10px);
        z-index: 1;
    }
    83.33333% {
        transform: translateX(-10px);
        z-index: 1;
    }
`;

const card3Anim = keyframes`
    0% {
        z-index: 1;
    }
    16.66666% {
        transform: translateX(0);
    }
    33.33333% {
        transform: translateX(10px);
        z-index: 2;
    }
    49.99999% {
        transform: translateX(10px);
        z-index: 2;
    }
    66.66666% {
        transform: translateX(20px);
        z-index: 3;
    }
    83.33333% {
        transform: translateX(115px) rotate(15deg);
    }
`;

const Hand = styled.div`
    height: 100px;
    position: relative;
    margin-right: 70px;
`;

const LobbyCard = styled.div`
    font-size: 22px;
    height: 100px;
    width: 70px;
    border: 3px solid #262722;
    border-radius: 10px;
    background-color: #b3704d;
    background-color: lavender;
    position: absolute;
    top: 0;
    transition: transform 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    transition-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);

    span {
        background-color: #8badc8;
        display: none;
        margin: 0 auto;
        width: 50px;
        height: 50px;
        border-radius: 25px;
    }

    &.card-1 {
        z-index: 3;
        background-color: ${(props) => props.theme.colors.accentColors.green};
        margin-left: 20px;
        animation-duration: 6s;
        animation-name: ${card1Anim};
        animation-iteration-count: infinite;
    }
    &.card-2 {
        z-index: 2;
        background-color: ${(props) => props.theme.colors.accentColors.yellow};
        margin-left: 10px;
        animation-duration: 6s;
        animation-name: ${card2Anim};
        animation-iteration-count: infinite;
    }
    &.card-3 {
        z-index: 1;
        background-color: ${(props) => props.theme.colors.accentColors.red};
        animation-duration: 6s;
        animation-name: ${card3Anim};
        animation-iteration-count: infinite;
    }
`;

const LobbyContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const CopyIcon = styled(FontAwesomeIcon)`
    cursor: pointer;
    transition: color 0.2s ease;
    padding: 10px;
    background: ${(props) => props.theme.colors.background};
    box-shadow: ${(props) => props.theme.neumorphism.boxShadow};
    border-radius: ${(props) => props.theme.neumorphism.borderRadius};

    &:hover {
        background: ${(props) => props.theme.neumorphism.pressedBackground};
    }

    &:active {
        box-shadow: ${(props) => props.theme.neumorphism.inverseBoxShadow};
    }
`;

const LoadingIcon = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const CodeContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin-top: 20px;
    font-weight: ${(props) => props.theme.fontWeights.bold};
    user-select: none;
    background: ${(props) => props.theme.neumorphism.pressedBackground};
    border-radius: ${(props) => props.theme.neumorphism.borderRadius};
    box-shadow: ${(props) => props.theme.neumorphism.inverseBoxShadow};
    padding: 10px;

    p {
        margin: 0;
        margin-right: 5px;
        user-select: all;
    }
`;

interface GameState {
    roomCode: string;
    // Add other properties of gameState here if needed
}

const Lobby = () => {
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [selectedCards, setSelectedCards] = useState<number[]>([]);

    const toast = useToast();

    const navigate = useNavigate();

    useEffect(() => {
        socket.emit("getGameState");

        socket.on(
            "updateGameState",
            (response: {
                success: boolean;
                gameState: any;
                error?: string;
            }) => {
                if (response.success) {
                    setGameState(response.gameState);
                } else {
                    console.error(response.error);
                    navigate("/");
                }
            }
        );

        return () => {
            socket.off("updateGameState");
        };
    }, [navigate]);

    const selectedCardsHandler = (id: number) => {
        if (id > 12 || id < 0) {
            return;
        }
        if (selectedCards.includes(id)) {
            setSelectedCards(selectedCards.filter((card) => card !== id));
        } else {
            if (selectedCards.length >= 3) {
                toast.warning(
                    "You can only select 3 cards you fucking idiot. It's not that hard to count to 3."
                );
                return;
            }
            setSelectedCards([...selectedCards, id]);
        }
    };

    const handleCopy = async (text: string) => {
        await navigator.clipboard.writeText(text);
        toast.success("Room code copied to clipboard");
    };

    if (!gameState) {
        return (
            <LoadingIcon>
                <Spinner role="status" />
            </LoadingIcon>
        );
    }

    return (
        <LobbyContainer>
            <h4>Waiting for other players...</h4>
            <Hand className="mb-4">
                <LobbyCard className="card-1">
                    <span></span>
                </LobbyCard>
                <LobbyCard className="card-2">
                    <span></span>
                </LobbyCard>
                <LobbyCard className="card-3">
                    <span></span>
                </LobbyCard>
            </Hand>

            <h5 className="mb-4">
                Select 3 cards you want to reveal once the game begins:
            </h5>

            <Grid state={selectedCards} onClick={selectedCardsHandler} />

            <CodeContainer className="mb-2">
                <p>{gameState.roomCode}</p>
                <CopyIcon onClick={() => handleCopy(gameState.roomCode)} icon={faCopy} />
            </CodeContainer>
        </LobbyContainer>
    );
};

export default Lobby;
