import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

const StyledMotionDiv = styled(motion.div)`
    z-index: 1;
    aspect-ratio: 63 / 88;
    max-height: 100%;
    background: ${(props) => props.theme.neumorphism.background};
    cursor: pointer;
    border-radius: 10px;
    position: relative;
    box-shadow: ${(props) => props.theme.neumorphism.boxShadow};

    @media (hover: hover) {
        &:hover {
            background: ${(props) => props.theme.neumorphism.pressedBackground};
        }
    }

    &:active {
        box-shadow: ${(props) => props.theme.neumorphism.inverseBoxShadow};
    }

    &.selected {
        background: ${(props) => props.theme.neumorphism.pressedBackground};
        box-shadow: ${(props) => props.theme.neumorphism.inverseBoxShadow};
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

interface CardComponentProps {
    className?: string;
    cardData: { text?: number; id?: string; isVisible?: boolean };
    exitAnimation?: any;
    onClick?: () => void;
    initial?: any;
    enableRotation?: boolean;
}

const CardComponent: React.FC<CardComponentProps> = ({
    className,
    cardData,
    exitAnimation,
    onClick,
    initial,
    enableRotation = false,
}) => {
    return (
        <StyledMotionDiv
            className={className}
            initial={initial}
            animate={{ x: 0, y: 0, rotate: enableRotation ? 90 : 0 }}
            exit={exitAnimation}
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            onClick={onClick}
        >
            <p
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                {cardData.text || ""}
            </p>
        </StyledMotionDiv>
    );
};

interface CardProps {
    className?: string;
    cardID: string;
    cardData: { text?: number; id?: string; isVisible?: boolean };
    exitAnimation?: any;
    onClick?: () => void;
    animateFrom?: string;
    enableRotation?: boolean;
    enableHover?: boolean;
}

const Card: React.FC<CardProps> = ({
    className,
    cardID,
    cardData,
    exitAnimation = {},
    onClick = () => {},
    animateFrom = "deck",
    enableRotation = false,
}) => {
    const initial = { x: 0, y: 0, rotate: enableRotation ? 90 : 0 };

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
    };

    initialPosition();

    return (
        <CardContainer id={cardID} className="gridCard">
            <AnimatePresence mode="wait">
                {cardData && cardData?.isVisible ? (
                    <CardComponent
                        className={className}
                        key={cardID}
                        cardData={cardData}
                        exitAnimation={exitAnimation}
                        initial={initial}
                        onClick={onClick}
                        enableRotation={enableRotation}
                    />
                ) : (
                    <CardComponent
                        className={className}
                        key={cardID + "-placeholder"}
                        onClick={onClick}
                        cardData={{
                            id: cardID,
                            isVisible: false,
                        }}
                    />
                )}
            </AnimatePresence>
        </CardContainer>
    );
};

export default Card;
