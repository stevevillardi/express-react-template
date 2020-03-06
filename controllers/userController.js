const db = require("../models");

// Defining methods for the userController
module.exports = {
    findAll: function(req, res) {
        db.User.find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findByEmail: function(req, res) {
        //let email = decodeURIComponent(req.params.email);
        db.User.findOne({ email: req.params.email })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db.User.create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
        // let email = decodeURIComponent(req.params.email);
        // console.log(req.body);
        db.User.findOneAndUpdate(
            { email: req.params.email },
            { token: req.body.token }
        )
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.User.findById({ email: req.params.email })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
