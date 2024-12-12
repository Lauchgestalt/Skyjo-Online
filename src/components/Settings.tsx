import React from "react";
import { Offcanvas } from "react-bootstrap";
import ThemeToggle from "./ThemeToggle";
import styled from "styled-components";

const SettingsContainer = styled(Offcanvas)`
    color: ${(props) => props.theme.colors.text};
    font-family: ${(props) => props.theme.fonts};
    background-color: ${(props) => props.theme.colors.background};
`;

const SettingsLine = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const SettingsLabel = styled.p`
    color: ${(props) => props.theme.colors.text};
    font-family: ${(props) => props.theme.fonts};
    display: inline-block;
`;

interface SettingsProps {
    show: boolean;
    handleClose: () => void;
}

const Settings = ({ show, handleClose }: SettingsProps) => {
    return (
        <SettingsContainer show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Settings</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <SettingsLine>
                    <SettingsLabel>Theme:</SettingsLabel>
                    <ThemeToggle />
                </SettingsLine>
            </Offcanvas.Body>
        </SettingsContainer>
    );
};

export default Settings;
