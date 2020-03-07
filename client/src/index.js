import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserState";

ReactDOM.render(
    <UserProvider>
        <BrowserRouter>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </BrowserRouter>
    </UserProvider>,
    document.getElementById("root")
);
