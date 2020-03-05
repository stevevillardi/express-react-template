import axios from "axios";

export default {
    // Gets all Users
    getUsers: function() {
        return axios.get("/api/users");
    },
    // Gets the user with the given email
    getUser: function(email) {
        return axios.get("/api/users/" + email);
    },
    // Deletes the user with the given email
    deleteUser: function(email) {
        return axios.delete("/api/users/" + email);
    },
    // Saves a User to the database
    saveUser: function(userData) {
        return axios.post("/api/users", userData);
    },
    updateUser: function(userData) {
        return axios.put("/api/users/" + userData.email, userData);
    },

    // Gets all Environments for a user
    getEnvironments: function(email) {
        return axios.get("/api/environments/user/" + email);
    },
    // Gets the user with the given id
    getEnvironment: function(id) {
        return axios.get("/api/environments/" + id);
    },
    // Deletes the user with the given id
    deleteEnvironment: function(id) {
        return axios.delete("/api/environments/" + id);
    },
    // Saves a User to the database
    saveEnvironment: function(environmentData) {
        return axios.post("/api/environments", environmentData);
    },
    updateEnvironment: function(environmentData) {
        return axios.put(
            "/api/environments/" + environmentData._id,
            environmentData
        );
    },

    // Gets all Environments for a user
    getMailboxes: function(email) {
        return axios.get("/api/mailboxes/user/" + email);
    },
    // Gets the user with the given id
    getMailbox: function(id) {
        return axios.get("/api/mailboxes/" + id);
    },
    // Deletes the user with the given id
    deleteMailbox: function(id) {
        return axios.delete("/api/mailboxes/" + id);
    },
    // Saves a User to the database
    saveMailbox: function(mailboxData) {
        return axios.post("/api/mailboxes", mailboxData);
    },
    updateMailbox: function(mailboxData) {
        return axios.put("/api/mailboxes/" + mailboxData._id, mailboxData);
    }
};
