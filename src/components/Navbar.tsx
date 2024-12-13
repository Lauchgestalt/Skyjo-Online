import { useState } from 'react';
import styled from 'styled-components';

import Settings from './Settings';

import { Row, Col } from 'react-bootstrap';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Title = styled.h1`
  margin: 0;
  padding: 0;
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.heading};
`;

const SettingsButton = styled.button`
  background-color: ${(props) => props.theme.neumorphism.background};
  box-shadow: ${(props) => props.theme.neumorphism.boxShadow};
  color: ${(props) => props.theme.colors.text};
  border: none;
  border-radius: 5px;
  aspect-ratio: 1;
  transition: background-color 0.2s ease;
  margin: 5px;

  &:hover {
    background-color: ${(props) => props.theme.neumorphism.pressedBackground};
  }

  &:active {
    box-shadow: ${(props) => props.theme.neumorphism.inverseBoxShadow};
  }
`;

const Navbar = () => {
  const [showSettings, setShowSettings] = useState(false);

  const handleShow = () => setShowSettings(true);
  const handleClose = () => setShowSettings(false);

  return (
    <>
      <Settings
        show={showSettings}
        handleClose={handleClose}
      />
      <Row className='pb-2'>
        <Col />
        <Col className='d-flex justify-content-center'>
          <Title>Skyjo</Title>
        </Col>
        <Col className='d-flex justify-content-end'>
          <SettingsButton onClick={handleShow}>
            <FontAwesomeIcon icon={faCog} />
          </SettingsButton>
        </Col>
      </Row>
    </>
  );
};

export default Navbar;
