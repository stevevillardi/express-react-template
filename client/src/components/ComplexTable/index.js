import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import API from "../../utils/API";
import EmailDialog from "../../components/EmailDialog";

const theme = createMuiTheme({
    overrides: {
        MuiTableSortLabel: {
            root: {
                color: "#fff",
                "&:hover": {
                    color: "#bbdefb"
                }
            },
            active: {
                color: "#bbdefb !important"
            },
            icon: {
                color: "#bbdefb !important"
            }
        },
        MuiTableCell: {
            root: {
                fontSize: "11.5px",
                paddingTop: "0px !important",
                paddingBottom: "0px !important",
                paddingLeft: "5px !important",
                paddingRight: "5px !important"
            }
        }
    }
});

const StyledFormControl = withStyles({
    root: {
        display: "inline-block",
        marginTop: "15px",
        minWidth: 120,
        color: "#7196b9",
        borderRadius: "5px"
    }
})(FormControl);

const StyledSelect = withStyles({
    root: {
        color: "black",
        backgroundColor: "#ffffff",
        "&:focus": {
            backgroundColor: "#ffffff",
            color: "black",
            borderColor: "white"
        }
    }
})(Select);

const StyledButton = withStyles({
    root: {
        color: "black",
        backgroundColor: "#ffffff",
        height: "56px",
        marginBottom: "4px",
        marginLeft: "15px",
        "&:hover": {
            backgroundColor: "#27292a",
            color: "white",
            borderColor: "white"
        }
    }
})(Button);

export default function ComplexTable() {
    let userEmail = window.localStorage.getItem("email");
    // let selectedRows = [];
    const tableRef = React.createRef();
    let envList = {};

    const handleChange = name => event => {
        setState({
            ...state,
            [name]: event.target.value
        });
    };

    useEffect(() => {
        // console.log(userEmail);
        API.getEnvironments(userEmail).then(result => {
            result.data.forEach(item => {
                envList[item._id] = item.envName;
            });
            API.getMailboxes(userEmail).then(result => {
                setState(prevState => {
                    const data = [...prevState.data, ...result.data];
                    return { ...prevState, data };
                });
            });
        });
    }, [userEmail]);

    const [state, setState] = React.useState({
        action: "",
        columns: [
            { title: "Source Email", field: "sourceEmail" },
            {
                title: "Source Environment",
                field: "sourceEnv",
                lookup: envList
            },
            { title: "Target Email", field: "targetEmail" },
            {
                title: "Target Environment",
                field: "targetEnv",
                lookup: envList
            },
            {
                title: "Mailbox Size(GB)",
                field: "mailboxSize",
                editable: "never"
            },
            { title: "Item Count", field: "itemCount", editable: "never" },
            {
                title: "Migration Status",
                field: "migrationStatus",
                editable: "never"
            }
        ],
        data: []
    });
    //for button state tracking
    const [open, setOpen] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);

    const handleClickOpen = () => {
        // console.log("hit");
        setOpen(true);
    };

    const handleClose = value => {
        setOpen(false);
        setSelectedRows(value);
    };

    return (
        <MuiThemeProvider theme={theme}>
            <MaterialTable
                title="Migration List"
                columns={state.columns}
                data={state.data}
                onSelectionChange={rows => {
                    setSelectedRows(rows);
                    // console.log(selectedRows);
                }}
                editable={{
                    onRowAdd: newData =>
                        new Promise(resolve => {
                            const newMailbox = { ...newData, email: userEmail };
                            API.saveMailbox(newMailbox);
                            setTimeout(() => {
                                resolve();
                                const formatData = {
                                    ...newData,
                                    mailboxSize: "0.0GB",
                                    migrationStatus: "Not Started",
                                    itemCount: 0
                                };
                                setState(prevState => {
                                    const data = [...prevState.data];
                                    data.push(formatData);
                                    return { ...prevState, data };
                                });
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            // console.log(newData);
                            API.updateMailbox(newData);
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    setState(prevState => {
                                        const data = [...prevState.data];
                                        data[data.indexOf(oldData)] = newData;
                                        return { ...prevState, data };
                                    });
                                }
                            }, 600);
                        }),
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            API.deleteMailbox(oldData._id);
                            setTimeout(() => {
                                resolve();
                                setState(prevState => {
                                    const data = [...prevState.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    return { ...prevState, data };
                                });
                            }, 600);
                        })
                }}
                options={{
                    actionsColumnIndex: -1,
                    selection: true,
                    exportButton: true,
                    grouping: true,
                    paging: true,
                    pageSize: 5,
                    pageSizeOptions: [],
                    paginationType: "normal",
                    headerStyle: {
                        backgroundColor: "#0e243e",
                        color: "#FFF",
                        paddingTop: "5px",
                        paddingBottom: "5px"
                    },
                    cellStyle: {
                        paddingTop: "5px",
                        paddingBottom: "5px"
                    }
                }}
                actions={[
                    {
                        icon: "refresh",
                        tooltip: "Refresh Data",
                        isFreeAction: true,
                        onClick: () =>
                            tableRef.current && tableRef.current.onQueryChange()
                    }
                ]}
            />

            <StyledFormControl variant="outlined">
                {/* <InputLabel
                        ref={inputLabel}
                        htmlFor="outlined-action-native-simple">
                        Action
                    </InputLabel> */}
                <StyledSelect
                    native
                    value={state.action}
                    onChange={handleChange("action")}
                    inputProps={{
                        name: "action",
                        id: "outlined-action-native-simple"
                    }}
                >
                    <option value={null}>Select Action..</option>
                    <option value={"discover statistics"}>
                        Discover Statistics
                    </option>
                    <option value={"start migration"}>Start Migration</option>
                    <option value={"stop migration"}>Stop Migration</option>
                    <option value={"reset migration"}>Reset Migration</option>
                    <option value={"archive mailboxes"}>
                        Archive Migration
                    </option>
                </StyledSelect>
                <StyledButton
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={handleClickOpen}
                >
                    Execute
                </StyledButton>
                <EmailDialog
                    selectedRows={selectedRows}
                    action={state.action}
                    open={open}
                    onClose={handleClose}
                />
            </StyledFormControl>
        </MuiThemeProvider>
    );
}
