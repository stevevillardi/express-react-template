import React from "react";
import "./style.css";

export default function LoginBtn() {
    const urlGoogle =
        process.env.NODE_ENV === "production"
            ? "/auth/google"
            : "http://localhost:3001/auth/google";
    const urlFacebook =
        process.env.NODE_ENV === "production"
            ? "/auth/facebook"
            : "http://localhost:3001/auth/facebook";

    return (
        <>
            <a href={urlGoogle} className=" btn-primary btn-block btn mt-3">
                <div>
                    <i className="fab fa-google fa-fw"></i>
                    <span className="button-label"> Sign in with Google</span>
                </div>
            </a>
            <a href={urlFacebook} className=" btn-primary btn-block btn my-2">
                <div>
                    <i className="fab fa-facebook-f fa-fw"></i>
                    <span className="button-label"> Sign in with Facebook</span>
                </div>
            </a>
        </>
    );
}
