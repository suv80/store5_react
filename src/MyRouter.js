import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import App from "./App";
import Detail from "./Detail";

function MyRouter() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <App></App>
                </Route>
                <Route path="/detail">
                    <Detail></Detail>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default MyRouter;
