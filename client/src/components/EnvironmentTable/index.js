import React, { useEffect } from "react";
import MaterialTable from "material-table";
import InputBase from "@material-ui/core/InputBase";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import API from "../../utils/API";

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
        }
    }
});

export default function EnvironmentTable() {
    const tableRef = React.createRef();
    const userEmail = window.localStorage.getItem("email");

    const [state, setState] = React.useState({
        action: "",
        columns: [
            { title: "Environment Name", field: "envName" },
            {
                title: "Type",
                field: "envType",
                lookup: { 1: "Gmail", 2: "Office365", 3: "Other" }
            },
            { title: "Description", field: "description" },
            { title: "Admin Email", field: "adminEmail" },
            {
                title: "Admin Password",
                field: "adminPassword",
                render: rowData => (
                    <InputBase
                        type="password"
                        defaultValue={rowData}
                        inputProps={{ "aria-label": "adminPassword" }}
                    />
                )
            }
        ],
        data: []
    });

    useEffect(() => {
        API.getEnvironments(userEmail).then(result => {
            setState(prevState => {
                const data = [...prevState.data, ...result.data];
                return { ...prevState, data };
            });
        });
    }, [userEmail]);

    return (
        <MuiThemeProvider theme={theme}>
            <MaterialTable
                title="Environments"
                columns={state.columns}
                data={state.data}
                editable={{
                    onRowAdd: newData =>
                        new Promise(resolve => {
                            const newEnv = { ...newData, email: userEmail };
                            API.saveEnvironment(newEnv);
                            setTimeout(() => {
                                resolve();
                                setState(prevState => {
                                    const data = [...prevState.data];
                                    data.push(newEnv);
                                    return { ...prevState, data };
                                });
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            API.updateEnvironment(newData);
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
                            API.deleteEnvironment(oldData._id);
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
                    selection: false,
                    exportButton: false,
                    grouping: false,
                    paging: true,
                    pageSize: 5,
                    pageSizeOptions: [],
                    paginationType: "normal",
                    headerStyle: {
                        backgroundColor: "#0e243e",
                        color: "#FFF",
                        paddingTop: "16px",
                        paddingBottom: "16px"
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
        </MuiThemeProvider>
    );
}
