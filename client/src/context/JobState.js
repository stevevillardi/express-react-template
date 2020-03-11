import React, { createContext, useReducer } from "react";
import JobReducer from "./JobReducer";
// import EWS from "../utils/EWS.js";
// import axios from "axios";
// import API from "../utils/API";

// Initial state
const initialState = {
    mailboxJob: []
};

// Create context
export const JobContext = createContext(initialState);

// Provider component
export const JobProvider = ({ children }) => {
    const [state, dispatch] = useReducer(JobReducer, initialState);

    // Actions
    async function discoverMailboxJob(selectedRows) {
        selectedRows.forEach(mailbox => {
            console.log(mailbox);
            try {
                dispatch({
                    type: "DISCOVER_USER",
                    payload: mailbox
                });
            } catch (err) {
                dispatch({
                    type: "MIGRATION_ERROR",
                    payload: err.response //.data.error
                });
            }
        });
    }
    async function resetMailboxJob(selectedRows) {
        selectedRows.forEach(mailbox => {
            console.log(mailbox);
            try {
                dispatch({
                    type: "RESET_MIGRATION",
                    payload: mailbox
                });
            } catch (err) {
                dispatch({
                    type: "MIGRATION_ERROR",
                    payload: err.response //.data.error
                });
            }
        });
    }
    async function migrateMailboxJob(selectedRows) {
        selectedRows.forEach(mailbox => {
            console.log(mailbox);
            try {
                dispatch({
                    type: "START_MIGRATION",
                    payload: mailbox
                });
            } catch (err) {
                dispatch({
                    type: "MIGRATION_ERROR",
                    payload: err.response //.data.error
                });
            }
        });
    }
    async function stopMailboxJob(selectedRows) {
        selectedRows.forEach(mailbox => {
            console.log(mailbox);
            try {
                dispatch({
                    type: "STOP_MIGRATION",
                    payload: mailbox
                });
            } catch (err) {
                dispatch({
                    type: "MIGRATION_ERROR",
                    payload: err.response //.data.error
                });
            }
        });
    }
    async function archiveMailboxJob(selectedRows) {
        selectedRows.forEach(mailbox => {
            console.log(mailbox);
            try {
                dispatch({
                    type: "ARCHIVE_MIGRATION",
                    payload: mailbox
                });
            } catch (err) {
                dispatch({
                    type: "MIGRATION_ERROR",
                    payload: err.response //.data.error
                });
            }
        });
    }
    async function queueMailboxJob(selectedRows) {
        selectedRows.forEach(mailbox => {
            console.log(mailbox);
            try {
                dispatch({
                    type: "QUEUE_MIGRATION",
                    payload: mailbox
                });
            } catch (err) {
                dispatch({
                    type: "MIGRATION_ERROR",
                    payload: err.response //.data.error
                });
            }
        });
    }

    return (
        <JobContext.Provider
            value={{
                selectedRows: state.selectedRows,
                discoverMailboxJob,
                migrateMailboxJob,
                stopMailboxJob,
                archiveMailboxJob,
                resetMailboxJob,
                queueMailboxJob
            }}
        >
            {children}
        </JobContext.Provider>
    );
};
