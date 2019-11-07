import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import CacheRoute, {CacheSwitch} from "react-router-cache-route";

import App from "./App";
import Detail from "./Detail";

function MyRouter() {
    return (
        <BrowserRouter>
            <CacheRoute>
                <CacheSwitch>
                    <CacheRoute exact path="/" component={App}></CacheRoute>
                    <Route path="/detail/:skuid" component={Detail}></Route>
                </CacheSwitch>
            </CacheRoute>
        </BrowserRouter>
    );
}

export default MyRouter;
