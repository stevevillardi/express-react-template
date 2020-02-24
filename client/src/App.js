import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import queryString from "query-string";

class App extends React.Component {
    componentWillMount() {
        var query = queryString.parse(this.props.location.search);
        if (query.token) {
            window.localStorage.setItem("jwt", query.token);
            this.props.history.push("/");
        }
    }
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={["/", "/login"]}>
                        <Login />
                    </Route>
                    <Route>
                        <NoMatch />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default App;
