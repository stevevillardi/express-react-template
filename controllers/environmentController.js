const db = require("../models");

// Defining methods for the environmentController
module.exports = {
    findAll: function(req, res) {
        db.Environment.find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findEnvByEmail: function(req, res) {
        db.Environment.find({ email: req.params.email })
            .then(dbModel => {
                // console.log(req);
                res.json(dbModel);
            })
            .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
        db.Environment.findOne({ _id: req.params.Id })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        // console.log(req.body);
        db.Environment.create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => {
                console.log(err);
                res.status(422).json(err);
            });
    },
    update: function(req, res) {
        // console.log(req.params);
        db.Environment.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => {
                console.log(err);
                res.status(422).json(err);
            });
    },
    remove: function(req, res) {
        db.Environment.findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
