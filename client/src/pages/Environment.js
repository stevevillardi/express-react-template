import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import EnvironmentTable from "../components/EnvironmentTable";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const StyledGrid = withStyles(theme => ({
    root: {
        marginTop: "15px"
    }
}))(Grid);

const Environment = () => {
    return (
        <>
            <Nav />
            <StyledGrid container justify="center">
                <Grid item xs={10}>
                    <EnvironmentTable />
                </Grid>
            </StyledGrid>
            <Footer />
        </>
    );
};

export default Environment;
