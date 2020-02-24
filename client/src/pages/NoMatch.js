import React from "react";
import { Col, Row, Container } from "../components/Grid";
import LogoutBtn from "../components/LogoutBtn";
import Jumbotron from "../components/Jumbotron";

const logOut = () => {
    localStorage.removeItem("jwt");
};

function NoMatch() {
    return (
        <Container fluid>
            <Row>
                <Col size="md-12">
                    <Jumbotron>
                        <h1>404 Page Not Found</h1>
                        <h1>
                            <span
                                role="img"
                                aria-label="Face With Rolling Eyes Emoji">
                                🙄
                            </span>
                            <LogoutBtn onClick={() => logOut} />
                        </h1>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    );
}

export default NoMatch;
