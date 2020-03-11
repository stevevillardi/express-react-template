const db = require("../models");
const EWS = require("../config/ewsAPI");

const randomItemCount = () => {
    return Math.floor(Math.random() * (5000 - 200)) + 200;
};

const randomDataSize = () => {
    const precision = 100; // 2 decimals
    const randomnum =
        Math.floor(
            Math.random() * (5 * precision - 1 * precision) + 1 * precision
        ) /
        (1 * precision);
    return `${randomnum}GB`;
};

const randomPercentage = () => {
    return Math.floor(Math.random() * (100 - 20)) + 20;
};

// Defining methods for the environmentController
module.exports = {
    startJob: function(req, res) {
        console.log(req.body);
        let sourceCred;
        let targetCred;

        const pagedMigration = (total, current) => {
            console.log(`Total:${total} | Current Page: ${current}`);
            if (total <= current + 1) {
                completeMigration();
            } else {
                EWS.migrateMessage(
                    sourceCred,
                    targetCred,
                    pagedMigration,
                    total,
                    current
                );
            }
        };

        const completeMigration = () => {
            req.body.migrationStatus = "Completed (100%)";
            db.Mailbox.findOneAndUpdate({ _id: req.params.id }, req.body)
                .then(dbModel => res.json(dbModel))
                .catch(err => {
                    console.log(err);
                    res.status(422).json(err);
                });
        };

        if (req.body.sourceEmail === "mscott@source-tenant.com") {
            db.Environment.findOne({ _id: req.body.sourceEnv }).then(result => {
                sourceCred = result;
                db.Environment.findOne({
                    _id: req.body.targetEnv
                }).then(result => {
                    targetCred = result;
                    pagedMigration(req.body.itemCount || 1200, 0);
                });
            });
        } else {
            setTimeout(() => {
                completeMigration();
            }, Math.floor(Math.random() * 10000) + 2000);
        }
    },

    startJobBackup: function(req, res) {
        console.log(req.body);
        setTimeout(() => {
            let sourceCred;
            let targetCred;
            db.Environment.findOne({ _id: req.body.sourceEnv }).then(result => {
                sourceCred = result;
                db.Environment.findOne({ _id: req.body.targetEnv }).then(
                    result => {
                        targetCred = result;
                        EWS.migrateMessage(sourceCred, targetCred);
                        req.body.migrationStatus = "Completed (100%)";
                        db.Mailbox.findOneAndUpdate(
                            { _id: req.params.id },
                            req.body
                        )
                            .then(dbModel => res.json(dbModel))
                            .catch(err => {
                                console.log(err);
                                res.status(422).json(err);
                            });
                    }
                );
            });
        }, Math.floor(Math.random() * 10000) + 2000);
    },

    stopJob: function(req, res) {
        setTimeout(() => {
            req.body.migrationStatus = `Stopped (${randomPercentage()}%)`;
            // console.log(req.params);
            db.Mailbox.findOneAndUpdate({ _id: req.params.id }, req.body)
                .then(dbModel => res.json(dbModel))
                .catch(err => {
                    console.log(err);
                    res.status(422).json(err);
                });
        }, Math.floor(Math.random() * 10000) + 2000);
    },

    discoverJob: async function(req, res) {
        let sourceCred;
        const updateStats = result => {
            // console.log(result);
            if (result) {
                req.body.itemCount = result;
            }
            db.Mailbox.findOneAndUpdate({ _id: req.params.id }, req.body)
                .then(dbModel => res.json(dbModel))
                .catch(err => {
                    console.log(err);
                    res.status(422).json(err);
                });
        };
        setTimeout(() => {
            // console.log(req.body);
            if (req.body.itemCount === 0) {
                req.body.mailboxSize = randomDataSize();
                req.body.itemCount = randomItemCount();
            }
            req.body.migrationStatus = "Discovered";
            // console.log(req.params);

            db.Environment.findOne({ _id: req.body.sourceEnv }).then(
                async result => {
                    if (req.body.sourceEmail === "mscott@source-tenant.com") {
                        sourceCred = result;
                        EWS.collectInboxStats(sourceCred, updateStats);
                    } else {
                        updateStats();
                    }
                }
            );
        }, Math.floor(Math.random() * 10000) + 2000);
    },
    discoverJobBackup: async function(req, res) {
        let sourceCred;
        setTimeout(() => {
            // console.log(req.body);
            if (req.body.itemCount === 0) {
                req.body.mailboxSize = randomDataSize();
                req.body.itemCount = randomItemCount();
            }
            req.body.migrationStatus = "Discovered";
            // console.log(req.params);

            db.Environment.findOne({ _id: req.body.sourceEnv }).then(
                async result => {
                    sourceCred = result;
                    const info = await EWS.collectInboxStats(
                        sourceCred,
                        updateStats()
                    );
                    console.log(info);
                    db.Mailbox.findOneAndUpdate(
                        { _id: req.params.id },
                        req.body
                    )
                        .then(dbModel => res.json(dbModel))
                        .catch(err => {
                            console.log(err);
                            res.status(422).json(err);
                        });
                }
            );
        }, Math.floor(Math.random() * 10000) + 2000);
    },

    archiveJob: function(req, res) {
        setTimeout(() => {
            req.body.migrationStatus = "Archived";
            // console.log(req.params);
            db.Mailbox.findOneAndUpdate({ _id: req.params.id }, req.body)
                .then(dbModel => res.json(dbModel))
                .catch(err => {
                    console.log(err);
                    res.status(422).json(err);
                });
        }, Math.floor(Math.random() * 10000) + 2000);
    },

    resetJob: function(req, res) {
        setTimeout(() => {
            req.body.migrationStatus = "Not Started";
            req.body.mailboxSize = "0.00GB";
            req.body.itemCount = 0;
            // console.log(req.params);
            db.Mailbox.findOneAndUpdate({ _id: req.params.id }, req.body)
                .then(dbModel => res.json(dbModel))
                .catch(err => {
                    console.log(err);
                    res.status(422).json(err);
                });
        }, Math.floor(Math.random() * 10000) + 2000);
    },
    queueJob: function(req, res) {
        req.body.migrationStatus = "In Progress";
        // console.log(req.params);
        db.Mailbox.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => {
                console.log(err);
                res.status(422).json(err);
            });
    },
    runningJob: function(req, res) {
        setTimeout(() => {
            req.body.migrationStatus = "In Progress";
            // console.log(req.params);
            db.Mailbox.findOneAndUpdate({ _id: req.params.id }, req.body)
                .then(dbModel => res.json(dbModel))
                .catch(err => {
                    console.log(err);
                    res.status(422).json(err);
                });
        }, Math.floor(Math.random() * 10000) + 2000);
    }
};
