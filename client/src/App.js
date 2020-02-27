import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import API from "./utils/API";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import queryString from "query-string";

import { UserContext } from "./context/UserState";

const App = props => {
    const { getUser } = useContext(UserContext);

    const isAuthenticated = () => {
        return localStorage.getItem("jwt") !== null;
    };

    const setUser = query => {
        if (isAuthenticated()) {
            // email = encodeURIComponent(email);
            API.getUser(query.email).then(result => {
                if (result.data) {
                    API.updateUser({
                        email: query.email,
                        name: query.name,
                        token: query.token
                    });
                } else {
                    API.saveUser({
                        email: query.email,
                        name: query.name,
                        token: query.token
                    });
                }
            });
            getUser(query.email);
        }
    };

    useEffect(() => {
        var query = queryString.parse(props.location.search);
        if (query.token) {
            console.log(query);
            window.localStorage.setItem("jwt", query.token);
            setUser(query);
        }
    }, []);

    if (isAuthenticated()) {
        return (
            <>
                <Route exact path={["/", "/login"]}>
                    <Login />
                </Route>
                <Route path={"/dashboard"}>
                    <Dashboard />
                </Route>
            </>
        );
    } else {
        return (
            <>
                <Route exact path={["/", "/login"]}>
                    <Login />
                </Route>
                <Redirect to="/" />
            </>
        );
    }
};

export default App;
