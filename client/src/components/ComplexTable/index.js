import React from "react";
import MaterialTable from "material-table";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

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
    const tableRef = React.createRef();

    const handleChange = name => event => {
        setState({
            ...state,
            [name]: event.target.value
        });
    };

    const [state, setState] = React.useState({
        action: "",
        columns: [
            { title: "Source Email", field: "source" },
            { title: "Source Environment", field: "senv" },
            { title: "Target Email", field: "target" },
            { title: "Target Environment", field: "tenv" },
            { title: "Mailbox Size(GB)", field: "size", editable: "never" },
            { title: "Item Count", field: "count", editable: "never" },
            { title: "Migration Status", field: "status", editable: "never" }
        ],
        data: [
            {
                source: "stevevillardi@gmail.com",
                senv: "Gmail-1",
                tenv: "O365-1",
                target: "steve@villardi.io",
                size: 1.03,
                count: 1100,
                status: "Not Started"
            },
            {
                source: "stevevillardi2@gmail.com",
                senv: "Gmail-1",
                tenv: "O365-1",
                target: "steve2@villardi.io",
                size: 2.5,
                count: 1100,
                status: "In Progress"
            },
            {
                source: "stevevillardi3@gmail.com",
                senv: "Gmail-2",
                tenv: "O365-1",
                target: "steve3@villardi.io",
                size: 1.1,
                count: 1100,
                status: "Migraiton Error"
            },
            {
                source: "stevevillardi4@gmail.com",
                senv: "Gmail-2",
                tenv: "O365-1",
                target: "steve4@villardi.io",
                size: 1.6,
                count: 1100,
                status: "Completed"
            },
            {
                source: "stevevillardi5@gmail.com",
                senv: "Gmail-3",
                tenv: "O365-1",
                target: "steve5@villardi.io",
                size: 3.7,
                count: 1100,
                status: "Completed"
            },
            {
                source: "stevevillardi6@gmail.com",
                senv: "Gmail-3",
                tenv: "O365-1",
                target: "steve6@villardi.io",
                size: 7.3,
                count: 1100,
                status: "Completed with Warnings"
            }
        ]
    });

    return (
        <>
            <MaterialTable
                title="Migraiton List"
                columns={state.columns}
                data={state.data}
                editable={{
                    onRowAdd: newData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                setState(prevState => {
                                    const data = [...prevState.data];
                                    data.push(newData);
                                    return { ...prevState, data };
                                });
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
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
                        color: "#FFF"
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
                    <option value={null}>Select Aciton..</option>
                    <option value={"Stats"}>Gather Stats</option>
                    <option value={"Start"}>Start Migraiton</option>
                    <option value={"Stop"}>Stop Migration</option>
                    <option value={"Archive"}>Archive Migraiton</option>
                </StyledSelect>
                <StyledButton variant="outlined" size="large">
                    Execute
                </StyledButton>
            </StyledFormControl>
        </>
    );
}
