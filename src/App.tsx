import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Navbar from "./components/Navbar";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";

const AppContainer = styled.div`
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    min-height: 100dvh;
    font-family: ${(props) => props.theme.fonts};
    padding: 5px 20px;
    transition: background-color 0.5s;
    -webkit-transition: background-color 0.5s;
    -moz-transition: background-color 0.5s;
    -o-transition: background-color 0.5s;
`;

function App() {
    return (
        <>
            <AppContainer>
                <Navbar />
                <Router>
                    <Routes>
                        <Route path="/" element={<Lobby />} />
                        <Route path="/game/:gameId" element={<Game />} />
                    </Routes>
                </Router>
            </AppContainer>
        </>
    );
}

export default App;
