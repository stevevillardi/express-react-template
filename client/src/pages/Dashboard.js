import React, { Component, useContext } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import EmailTable from "../components/EmailTable";
import ComplexTable from "../components/ComplexTable";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { UserContext } from "../context/UserState";

const StyledGrid = withStyles(theme => ({
    root: {
        marginTop: "15px"
    }
}))(Grid);

const Dashboard = () => {
    const { getUser } = useContext(UserContext);

    // const loggedUser = localStorage.getItem("email");
    // if (loggedUser) {
    //     getUser(loggedUser);
    // }
    return (
        <>
            <Nav />
            <StyledGrid container justify="center">
                <Grid item xs={10}>
                    {/* <EmailTable /> */}
                    <ComplexTable />
                </Grid>
            </StyledGrid>
            <Footer />
        </>
    );
};

export default Dashboard;
