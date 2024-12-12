import React from 'react';
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

interface GridProps {
  cardArray?: { id: string; text: number; isVisible: boolean }[];
  onClick?: (index: number) => void;
  state?: number[];
  own?: boolean;
}

const Grid = ({ cardArray, onClick, state, own = false }: GridProps) => {
  const generateEmptyGrid = () => {
    let cardArray = [];
    for (let i = 0; i < 12; i++) {
      cardArray.push({ id: i.toString(), text: i, isVisible: false });
    }
    return cardArray;
  };

  console.log(own);
  if (!state) throw new Error('State is required');

  return (
    <GridContainer>
      {cardArray
        ? cardArray.map((card, index) => {
            const isSelected = state.includes(index);
            const cardID = 'card' + index + new Date().getTime();
            return (
              <CardComponent
                key={index}
                cardID={cardID}
                className={isSelected ? 'selected' : ''}
                cardData={card}
                onClick={() => onClick && onClick(index)}
              />
            );
          })
        : generateEmptyGrid().map((card, index) => {
            const isSelected = state.includes(index);
            const cardID = 'card' + index + new Date().getTime();
            return (
              <CardComponent
                key={index}
                cardID={cardID}
                className={isSelected ? 'selected' : ''}
                cardData={card}
                onClick={() => onClick && onClick(index)}
              />
            );
          })}
    </GridContainer>
  );
};

export default Grid;
