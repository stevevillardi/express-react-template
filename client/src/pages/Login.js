import React from "react";
import LoginBtn from "../components/LoginBtn";
import "./style.css";
// import Particles from "react-particles-js";

function Login() {
    return (
        <>
            <div className="particles container-fluid">
                {/* <Particles
                    params={{
                        particles: {
                            number: {
                                value: 150,
                                density: { enable: true, value_area: 800 }
                            },
                            color: { value: "#ffffff" },
                            shape: {
                                type: "circle",
                                stroke: { width: 0, color: "#000000" },
                                polygon: { nb_sides: 5 }
                            },
                            opacity: {
                                value: 0.5,
                                random: false,
                                anim: {
                                    enable: false,
                                    speed: 1,
                                    opacity_min: 0.1,
                                    sync: false
                                }
                            },
                            size: {
                                value: 3,
                                random: true,
                                anim: {
                                    enable: false,
                                    speed: 40,
                                    size_min: 0.1,
                                    sync: false
                                }
                            },
                            line_linked: {
                                enable: true,
                                distance: 150,
                                color: "#ffffff",
                                opacity: 0.4,
                                width: 1
                            },
                            move: {
                                enable: true,
                                speed: 6,
                                direction: "none",
                                random: false,
                                straight: false,
                                out_mode: "out",
                                bounce: false,
                                attract: {
                                    enable: false,
                                    rotateX: 600,
                                    rotateY: 1200
                                }
                            }
                        }
                    }}
                /> */}
                <div className="login border">
                    <h1 className="text-center">
                        <i className="far fa-paper-plane fa-fw"></i>Mail Mover
                    </h1>
                    <LoginBtn />
                    <a
                        className="float-right text-secondary"
                        href="https://github.com/stevevillardi/">
                        What is Mail Mover?
                    </a>
                </div>
            </div>
        </>
    );
}

export default Login;
