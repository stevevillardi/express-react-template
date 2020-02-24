import React from "react";
import "./style.css";

export default function LogoutBtn() {
    return (
        <>
            <a
                href="http://localhost:3001/auth/google/logout"
                className=" btn-primary btn-block btn mt-3">
                <div>
                    <i className="fab fa-google fa-fw"></i>
                    <span className="button-label"> Sign out</span>
                </div>
            </a>
        </>
    );
}
