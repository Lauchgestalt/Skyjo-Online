import { createGlobalStyle } from "styled-components";

import ParkinsansBold from './fonts/Parkinsans-Bold.ttf';
import ParkinsansRegular from './fonts/Parkinsans-Regular.ttf';
import ParkinsansExtraBold from './fonts/Parkinsans-ExtraBold.ttf';
import ParkinsansLight from './fonts/Parkinsans-Light.ttf';
import ParkinsansMedium from './fonts/Parkinsans-Medium.ttf';
import ParkinsansSemiBold from './fonts/Parkinsans-SemiBold.ttf';

const Fonts = createGlobalStyle`
    @font-face {
        font-family: 'Parkinsans';
        src: url(${ParkinsansBold}) format('truetype');
        font-weight: 500;
        font-style: normal;
    }

    @font-face {
        font-family: 'Parkinsans';
        src: url(${ParkinsansRegular}) format('truetype');
        font-weight: 300;
        font-style: normal;
    }

    @font-face {
        font-family: 'Parkinsans';
        src: url(${ParkinsansExtraBold}) format('truetype');
        font-weight: 700;
        font-style: normal;
    }

    @font-face {
        font-family: 'Parkinsans';
        src: url(${ParkinsansLight}) format('truetype');
        font-weight: 100;
        font-style: normal;
    }

    @font-face {
        font-family: 'Parkinsans';
        src: url(${ParkinsansMedium}) format('truetype');
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: 'Parkinsans';
        src: url(${ParkinsansSemiBold}) format('truetype');
        font-weight: 600;
        font-style: normal;
    }
`;

export default Fonts;