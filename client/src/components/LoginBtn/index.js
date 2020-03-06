import React from "react";
import "./style.css";

export default function LoginBtn() {
    return (
        <>
            <a href="/auth/google" className=" btn-primary btn-block btn mt-3">
                <div>
                    <i className="fab fa-google fa-fw"></i>
                    <span className="button-label"> Sign in with Google</span>
                </div>
            </a>
            <a
                href="/auth/facebook"
                className=" btn-primary btn-block btn my-2">
                <div>
                    <i className="fab fa-facebook-f fa-fw"></i>
                    <span className="button-label"> Sign in with Facebook</span>
                </div>
            </a>
        </>
    );
}
