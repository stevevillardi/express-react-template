import React, { createContext, useReducer } from "react";
import UserReducer from "./UserReducer";
import axios from "axios";

// Initial state
const initialState = {
    email: null,
    name: null,
    token: null
};

// Create context
export const UserContext = createContext(initialState);

// Provider component
export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, initialState);

    // Actions
    async function getUser(email) {
        try {
            const res = await axios.get(`/api/users/${email}`);

            dispatch({
                type: "GET_USER",
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: "TRANSACTION_ERROR",
                payload: err.response.data.error
            });
        }
    }

    return (
        <UserContext.Provider
            value={{
                email: state.email,
                name: state.name,
                token: state.token,
                getUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
