import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserState";
import { JobProvider } from "./context/JobState";

ReactDOM.render(
    <JobProvider>
        <UserProvider>
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={App} />
                </Switch>
            </BrowserRouter>
        </UserProvider>
    </JobProvider>,
    document.getElementById("root")
);
