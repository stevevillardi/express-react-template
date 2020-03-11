import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import "./disclosureButton";
import "./style.css";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(1),
            width: "100%",
            height: "100%"
        }
    },
    heading: {
        textAlign: "center"
    }
}));

const StyledGrid = withStyles(theme => ({
    root: {
        marginTop: "15px"
    }
}))(Grid);

const About = () => {
    const classes = useStyles();
    return (
        <>
            <Nav />
            <StyledGrid container justify="center">
                <Grid item xs={10}>
                    <Paper elevation={0} className={classes.root}>
                        <h1 className={classes.heading}>Mail Mover FAQ</h1>

                        <dl className="faq">
                            <dt>
                                <button
                                    aria-expanded="false"
                                    aria-controls="faq1_desc">
                                    What is Mail Mover?
                                </button>
                            </dt>
                            <dd>
                                <p id="faq1_desc" className="desc">
                                    Mail Mover is and easy to use and intuitive
                                    way for users or business to seamlessly
                                    migrate email from one or more mailboxes.
                                </p>
                            </dd>
                            <dt>
                                <button
                                    aria-expanded="false"
                                    aria-controls="faq2_desc">
                                    How do Mail Mover work?
                                </button>
                            </dt>
                            <dd>
                                <p id="faq2_desc" className="desc">
                                    Before you can start moving mail you first
                                    need to setup and "environment". You can do
                                    so be clicking on the Environments tab in
                                    the user profile view in the top right of
                                    the nav bar once logged in. Once you add a
                                    source and target environment you can head
                                    back to the dashboard and start adding your
                                    mailboxes.
                                </p>
                            </dd>
                            <dt>
                                <button
                                    aria-expanded="false"
                                    aria-controls="faq3_desc">
                                    What email platforms are supported?
                                </button>
                            </dt>
                            <dd>
                                <p id="faq3_desc" className="desc">
                                    We currently support Office365, On-premise
                                    Microsoft Exchange and GSuite/Gmail
                                </p>
                            </dd>
                            <dt>
                                <button
                                    aria-expanded="false"
                                    aria-controls="faq4_desc">
                                    What method is used to migrate email?
                                </button>
                            </dt>
                            <dd>
                                <p id="faq4_desc" className="desc">
                                    For microsoft/office365 environment
                                    migrations we utlize EWS to connect to and
                                    migarte mailbox content. For GSuite
                                    migraitons we utilize the Gmail API.
                                </p>
                            </dd>
                            <dt>
                                <button
                                    aria-expanded="false"
                                    aria-controls="faq5_desc">
                                    What actions can I perform on a set of
                                    mailboxes?
                                </button>
                            </dt>
                            <dd>
                                <p id="faq5_desc" className="desc">
                                    There is currently a limited set of actions
                                    you can take on a mailbox. You can discover
                                    a mailbox which will grab the mailbox size
                                    and item count along with starting and
                                    stopping a migration.
                                </p>
                            </dd>
                            <dt>
                                <button
                                    aria-expanded="false"
                                    aria-controls="faq6_desc">
                                    I have a large amount of mailboxes, can I
                                    export my migraiton list to a file?
                                </button>
                            </dt>
                            <dd>
                                <p id="faq6_desc" className="desc">
                                    Yes, from the Dashboard view there is a
                                    download icon in the top right of the
                                    Migraiton List table that will let you
                                    export to CSV.
                                </p>
                            </dd>
                        </dl>
                    </Paper>
                </Grid>
            </StyledGrid>
            <Footer />
        </>
    );
};

export default About;
