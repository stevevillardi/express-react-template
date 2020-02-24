import React from "react";
import LoginBtn from "../LoginBtn";

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="/">
                React Reading List
            </a>
            <LoginBtn />
        </nav>
    );
}

export default Nav;
