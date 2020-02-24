import React from "react";
import LoginBtn from "../components/LoginBtn";
import "./style.css";
import Particles from "react-particles-js";

function Login() {
    return (
        <>
            <div className="particles">
                <Particles
                    params={{
                        particles: {
                            number: {
                                value: 400
                            },
                            size: {
                                value: 3
                            }
                        }
                    }}
                />
                <div className="login border">
                    <h1 className="text-center">
                        <i className="far fa-paper-plane fa-fw"></i>Mail Mover
                    </h1>
                    <LoginBtn />
                    <a className="float-right text-secondary" href="/">
                        What is Mail Mover?
                    </a>
                </div>
            </div>
        </>
    );
}

export default Login;
