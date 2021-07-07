import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import "./index.css"
import AudioProvider from "./providers/audioProvider"
import { TimerCardsProvider } from "./contexts/TimerCards"
import { BrowserRouter as Router } from "react-router-dom"
ReactDOM.render(
    <React.StrictMode>
        <AudioProvider>
            <TimerCardsProvider>
                <Router>
                    <App />
                </Router>
            </TimerCardsProvider>
        </AudioProvider>
    </React.StrictMode>,
    document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
