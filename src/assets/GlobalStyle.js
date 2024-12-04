import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    .neumorphism{
        border-radius: ${props => props.borderRadius || '20px'};
        background: ${props => props.theme.neumorphism.background};
        box-shadow:  ${props => props.theme.neumorphism.boxShadow};
    }

    .neumorphism:hover{
        background: ${props => props.theme.neumorphism.pressedBackground};
    }

    .neumorphism.active{
        box-shadow: ${props => props.theme.neumorphism.inverseBoxShadow};
    }
`;

export default GlobalStyle;