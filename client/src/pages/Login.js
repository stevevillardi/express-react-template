import React from "react";
import LoginBtn from "../components/LoginBtn";
import "./style.css";
import Particles from "react-particles-js";

function Login() {
    return (
        <>
            <div className="login">
                <div className="particles">
                    <Particles
                        params={{
                            particles: {
                                number: {
                                    value: 100
                                },
                                size: {
                                    value: 3
                                }
                            }
                        }}
                    />
                </div>
                <div className="login-card">
                    <h1>Mail Mover</h1>
                    <LoginBtn />
                </div>
            </div>
        </>
    );
}

export default Login;
