import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        name: string;
        colors: {
            background: string;
            text: string;
            accentText: string;
            accentColors: {
                blue: string;
                green: string;
                yellow: string;
                red: string;
                moon?: string;
            };
        };
        fonts: {
            body: string;
            heading: string;
        };
        fontSizes: {
            xsmall: string;
            small: string;
            medium: string;
            large: string;
            xlarge: string;
        };
        fontWeights: {
            light: number;
            regular: number;
            bold: number;
        };
        neumorphism: {
            background: string;
            pressedBackground: string;
            boxShadow: string;
            inverseBoxShadow: string;
            borderRadius: string;
        };
    }
}
