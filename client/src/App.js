import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Environment from "./pages/Environment";
import queryString from "query-string";

import { UserContext } from "./context/UserState";

const App = props => {
    const { getUser } = useContext(UserContext);
    // const loggedUser = localStorage.getItem("email");
    // const isAuthenticated = () => {
    //     const loggedUser = localStorage.getItem("email");
    //     if (loggedUser) {
    //         getUser(loggedUser);
    //     }
    //     return localStorage.getItem("authToken") !== null;
    // };

    useEffect(() => {
        // console.log(`Stuff: ${props.location.search}`);
        var query = queryString.parse(props.location.search);
        if (query.token) {
            console.log(query);
            window.localStorage.setItem("authToken", query.token);
            window.localStorage.setItem("email", query.email);
            window.localStorage.setItem("name", query.name);
            getUser(query.email);
        }
    }, []);

    if (localStorage.getItem("authToken")) {
        return (
            <>
                <Route exact path={["/", "/login"]}>
                    <Login />
                </Route>
                <Route path={"/dashboard"}>
                    <Dashboard />
                </Route>
                <Route path={"/environments"}>
                    <Environment />
                </Route>
                <Route path={"/profile"}>
                    <Dashboard />
                </Route>
                <Route path={"/about"}>
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
