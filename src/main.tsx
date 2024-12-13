import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import Theme from "./contexts/ThemeContextProvider";
import GlobalStyle from "./assets/GlobalStyle";
import Fonts from "./assets/Fonts";
import { ToastContextProvider } from "./contexts/ToastContextProvider";

const rootElement = document.getElementById("root");
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <Fonts />
            <Theme>
                <GlobalStyle />
                <ToastContextProvider>
                    <App />
                </ToastContextProvider>
            </Theme>
        </React.StrictMode>
    );
} else {
    console.error("Failed to find the root element");
}
