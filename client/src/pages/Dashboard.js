import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ComplexTable from "../components/ComplexTable";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const StyledGrid = withStyles(theme => ({
    root: {
        marginTop: "15px"
    }
}))(Grid);

const Dashboard = () => {
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
