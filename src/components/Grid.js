import React, { useState } from 'react';
import styled from 'styled-components';

const generateEmptyGrid = () => {
    return Array.from({ length: 12 }).map((_, index) => ({
        id: index,
        value: "",
        active: false
    }));
};

const GridContainer = styled.div`
    margin: 10px auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 15px;

    max-height: 35dvh;
    max-width: 30vw;

    @media (max-width: 992px) {
        max-height: 45dvh;
        max-width: 35vw;
    }
    
    @media (max-width: 768px) {
        max-height: 55dvh;
        max-width: 50vw;
    }

    @media (max-width: 576px) {
        max-height: 65dvh;
        max-width: 80vw;
    }

    @media (max-width: 360px) {
        max-height: 75dvh;
        max-width: 90vw;
    }
`;

const Card = styled.div`
    text-align: center;
    aspect-ratio: 2.5 / 3.5;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
    min-width: 50px;
`;

const CardValue = styled.h5`
    font-size: 1.5rem;
    font-weight: 500;
    pointer-events: none;
`;

const Grid = ({ cards, own=false, onClickFunction }) => {
    const [cardState, setCardState] = useState(cards || generateEmptyGrid());

    const handleClick = (id) => {
        if (own) {
            setCardState((prevCards) =>
                prevCards.map((card, index) =>
                    index === id ? { ...card, active: true } : card
                )
            );
        }
    };

    return (
        <GridContainer>
            {cardState.map((card, id) => (
                <Card key={id} className={`neumorphism ` + (card.active ? 'active' : '')} onClick={onClickFunction ? onClickFunction : handleClick(id)}>
                    {card.active && <CardValue className="card-value">{card.value}</CardValue>}
                </Card>
            ))}
        </GridContainer>
    );
};

export default Grid;
