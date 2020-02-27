import axios from "axios";

export default {
    // Gets all books
    getBooks: function() {
        return axios.get("/api/books");
    },
    // Gets the book with the given id
    getBook: function(id) {
        return axios.get("/api/books/" + id);
    },
    // Deletes the book with the given id
    deleteBook: function(id) {
        return axios.delete("/api/books/" + id);
    },
    // Saves a book to the database
    saveBook: function(bookData) {
        return axios.post("/api/books", bookData);
    },

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
    }
};
