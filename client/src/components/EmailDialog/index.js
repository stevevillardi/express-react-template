import React, { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { JobContext } from "../../context/JobState";

const useStyles = makeStyles(theme => ({
    title: {
        padding: "15px",
        textAlign: "center"
    },
    p: {
        paddingLeft: "15px",
        paddingRight: "15px",
        textAlign: "center"
    },
    button: {
        margin: theme.spacing(1),
        width: "100px"
    },
    buttonDiv: {
        margin: "auto"
    }
}));

export default function EmailDialog(props) {
    const { onClose, selectedRows, open, action } = props;
    const classes = useStyles();

    const {
        discoverMailboxJob,
        startMailboxJob,
        stopMailboxJob,
        archiveMailboxJob,
        resetMailboxJob,
        queueMailboxJob
    } = useContext(JobContext);

    const handleClose = action => {
        onClose(selectedRows);
        console.log(action);
        if (action === "discover statistics") {
            queueMailboxJob(selectedRows);
            setTimeout(() => {
                discoverMailboxJob(selectedRows);
            }, 2000);
        }
        if (action === "reset migration") {
            queueMailboxJob(selectedRows);
            setTimeout(() => {
                resetMailboxJob(selectedRows);
            }, 2000);
        }
        if (action === "start migration") {
            queueMailboxJob(selectedRows);
            setTimeout(() => {
                startMailboxJob(selectedRows);
            }, 2000);
        }
        if (action === "stop migration") {
            queueMailboxJob(selectedRows);
            setTimeout(() => {
                stopMailboxJob(selectedRows);
            }, 2000);
        }
        if (action === "archive mailboxes") {
            queueMailboxJob(selectedRows);
            setTimeout(() => {
                archiveMailboxJob(selectedRows);
            }, 2000);
        }
    };

    return (
        <Dialog
            className={classes.dialogButton}
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={open}>
            <DialogTitle className={classes.title} id="simple-dialog-title">
                Confirm Action
            </DialogTitle>
            <p className={classes.title}>
                Are you sure you want to {action} for {selectedRows.length}{" "}
                {selectedRows.length > 1 ? "mailboxes" : "mailbox"}?
            </p>
            <div className={classes.buttonDiv}>
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    onClick={() => {
                        handleClose(action);
                    }}>
                    Confirm
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                    onClick={() => {
                        handleClose();
                    }}>
                    Cancel
                </Button>
            </div>
        </Dialog>
    );
}

EmailDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedRows: PropTypes.array.isRequired
};
