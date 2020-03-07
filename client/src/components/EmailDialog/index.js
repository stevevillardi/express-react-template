import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1)
    },
    dialog: {
        padding: "15px",
        margin: "15px"
    }
}));

export default function EmailDialog(props) {
    const { onClose, selectedRows, open, action } = props;
    const classes = useStyles;

    const handleClose = () => {
        onClose(selectedRows);
        console.log(selectedRows);
    };

    const handleListItemClick = value => {
        onClose(value);
    };

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={open}
            className={classes.dialog}
        >
            <DialogTitle id="simple-dialog-title">Confirm Action</DialogTitle>
            <p>
                Are you sure you want to {action} for {selectedRows.length}{" "}
                {selectedRows.length > 1 ? "mailboxes" : "mailbox"}?
            </p>
            <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={handleClose}
            >
                Yes
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={handleClose}
            >
                Cancel
            </Button>
        </Dialog>
    );
}

EmailDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedRows: PropTypes.array.isRequired
};
