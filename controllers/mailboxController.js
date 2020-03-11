const db = require("../models");

// Defining methods for the environmentController
module.exports = {
    findAll: function(req, res) {
        db.Mailbox.find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findMbxByEmail: function(req, res) {
        // console.log(req.session.passport);
        db.Mailbox.find({ email: req.params.email })
            .then(dbModel => {
                // console.log(req);
                res.json(dbModel);
            })
            .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
        db.Mailbox.findOne({ _id: req.params.Id })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        // console.log(req.body);
        db.Mailbox.create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => {
                console.log(err);
                res.status(422).json(err);
            });
    },
    update: function(req, res) {
        // console.log(req.params);
        db.Mailbox.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => {
                console.log(err);
                res.status(422).json(err);
            });
    },
    remove: function(req, res) {
        db.Mailbox.findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
