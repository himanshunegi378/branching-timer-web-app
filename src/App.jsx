import React, { Fragment, useEffect } from "react"
// import style from "./App.module.scss"
import { Switch, Route } from "react-router-dom"
import { TimerCards } from "./views/timerCards/TimerCards.view"

function App(props) {
    
    useEffect(() => {
        document.body.classList.remove("page-loading")
        document.body.classList.add("page-loaded")
        document.body.classList.add("bg-gray-50")
    }, [])

    return (
        <Fragment>
            <Switch>
                <Route exact path="/">
                    <TimerCards />
                </Route>
                <Route path="/audio">
                    <h1>A page for Audio Management</h1>
                </Route>
            </Switch>
        </Fragment>
    )
}

export default App
