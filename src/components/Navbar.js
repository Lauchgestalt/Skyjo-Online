import React, { useState } from 'react'
import styled from 'styled-components';

import { useTheme } from '../assets/Theme';

import { Button, Container, Row, Col } from 'react-bootstrap';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Settings from './Settings';

const Title = styled.h1`
    margin: 0;
    padding: 0;
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.fonts.heading};
`;

const Navbar = () => {
    const { theme } = useTheme();
    const [showSettings, setShowSettings] = useState(false);

    const handleShow = () => setShowSettings(true);
    const handleClose = () => setShowSettings(false);

    const getButtonType = () => {
        switch (theme.name) {
            case 'light':
                return 'dark';
            case 'dark':
                return 'light';
            case 'colorful':
                return 'outline-light';
            default:
                return 'light';
        }
    }

    return (
        <>
            <Settings show={showSettings} handleClose={handleClose} />
            <Row className='pb-2'>
                <Col />
                <Col className='d-flex justify-content-center'>
                    <Title>Skyjo</Title>
                </Col>
                <Col className='d-flex justify-content-end'>
                    <Button size="sm" variant={getButtonType()} onClick={handleShow}>
                        <FontAwesomeIcon icon={faCog} />
                    </Button>
                </Col>
            </Row>
        </>
    )
}

export default Navbar