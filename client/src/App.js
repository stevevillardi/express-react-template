import React from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import queryString from "query-string";

class App extends React.Component {
    isAuthenticated() {
        return localStorage.getItem("jwt") !== null;
    }

    componentDidMount() {
        var query = queryString.parse(this.props.location.search);
        if (query.token) {
            window.localStorage.setItem("jwt", query.token);
            // this.props.history.push("/");
        }
    }
    render() {
        if (this.isAuthenticated()) {
            return (
                <>
                    <Route exact path={["/", "/login"]}>
                        <Login />
                    </Route>
                    <Route path={"/dashboard"}>
                        <NoMatch />
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
    }
}

export default App;
