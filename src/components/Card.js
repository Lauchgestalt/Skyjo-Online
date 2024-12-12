import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

const StyledMotionDiv = styled(motion.div)`
    z-index: 1;
    aspect-ratio: 63 / 88;
    max-height: 100%;
    background: ${props => props.theme.neumorphism.background};
    cursor: pointer;
    border-radius: 10px;
    position: relative;
    box-shadow: ${props => props.theme.neumorphism.boxShadow};

    @media (hover: hover) {
        &:hover {
            background: ${props => props.theme.neumorphism.pressedBackground};
        }
    }

    &:active {
        box-shadow: ${props => props.theme.neumorphism.inverseBoxShadow};
    }

    &.selected{
        background: ${props => props.theme.neumorphism.pressedBackground};
        box-shadow: ${props => props.theme.neumorphism.inverseBoxShadow};
    }
`;

const CardContainer = styled.div`
    aspect-ratio: 63 / 88;
    height: 100%;
    min-height: 0;
    min-width: 0;
    position: relative;
    margin: 0 auto;
`;

const CardComponent = ({ className, cardData, exitAnimation, onClick, initial, enableRotation = false, enableHover = true }) => {
    return (
        <StyledMotionDiv
            className={className}
            initial={initial}
            animate={{ x: 0, y: 0, rotate: enableRotation ? 90 : 0 }}
            exit={exitAnimation}
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            onClick={onClick}
        >
            <p style={{ position: 'absolute', 'top': '50%', 'left': '50%', transform: 'translate(-50%, -50%)' }}>{cardData.text || ""}</p>
        </StyledMotionDiv>
    );
};


const Card = ({ className, cardID, cardData, exitAnimation = {}, onClick = () => { }, animateFrom = 'deck', enableRotation = false, enableHover = false }) => {
    const initial = { x: 0, y: 0, rotate: enableRotation ? 90 : 0 }


    const initialPosition = () => {
        const originElement = document.getElementById(animateFrom);
        const cardElement = document.getElementById(cardID);
        if (originElement && cardElement) {
            const originRect = originElement.getBoundingClientRect();
            const destinationRect = cardElement.getBoundingClientRect();
            const deckX = originRect.left - destinationRect.left;
            const deckY = originRect.top - destinationRect.top;
            initial.x = deckX;
            initial.y = deckY;
        }
    }

    initialPosition();

    return (
        <CardContainer id={cardID} className='gridCard'>
            <AnimatePresence mode='wait'>
                {cardData && cardData?.isVisible ? (
                    <CardComponent
                        className={className}
                        key={cardID}
                        cardData={cardData}
                        exitAnimation={exitAnimation}
                        initial={initial}
                        onClick={onClick}
                        enableRotation={enableRotation}
                        enableHover={enableHover} />
                ) : (
                    <CardComponent className={className} key={cardID + '-placeholder'} onClick={onClick} cardData={
                        {
                            id: cardID,
                            isVisible: cardData
                        }
                    } />
                )}
            </AnimatePresence>
        </CardContainer>
    )
}

export default Card;