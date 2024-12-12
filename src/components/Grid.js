import React, { useState } from 'react';
import styled from 'styled-components';
import { default as CardComponent } from './Card';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-rows: repeat(3, minmax(0, 1fr));
    grid-gap: 1rem;
    height: 35dvh;
    width: 35vw;

    transition: width 0.5s;

    @media (max-width: 1200px) {
        max-height: 40dvh;
        width: 40vw;
    }

    @media (max-width: 1100px) {
        max-height: 45dvh;
        width: 45vw;
    }

    @media (max-width: 992px) {
        max-height: 45dvh;
        width: 50vw;
    }
    
    @media (max-width: 825px) {
        max-height: 55dvh;
        width: 65vw;
    }

    @media (max-width: 640px) {
        max-height: 65dvh;
        width: 95vw;
    }
`;

const Card = styled(CardComponent)`
    aspect-ratio: 63 / 88;
    height: 100%;
    min-height: 0;
    min-width: 0;
    position: relative;
`;

const Grid = ({ cardArray, onClick, state }) => {
    const generateEmptyGrid = () => {
        let cardArray = [];
        for (let i = 0; i < 12; i++) {
            cardArray.push({ id: i, text: i, isVisible: false });
        }
        return cardArray;
    }

    return (
        <GridContainer>
            {cardArray ? (
                cardArray.map((card, index) => {
                    const isSelected = state.includes(index);
                    return (
                        <CardComponent key={index} className={isSelected ? 'selected' : ''} cardData={card} onClick={() => onClick(index)} />
                    )
                })
            ) : (
                generateEmptyGrid().map((card, index) => {
                    const isSelected = state.includes(index);
                    return (
                        <CardComponent key={index} className={isSelected ? 'selected' : ''} cardData={card} onClick={() => onClick(index)} />
                    )
                })
            )}
        </GridContainer>
    )
}

export default Grid
