const router = require("express").Router();
const mailboxController = require("../../controllers/mailboxController");

// Matches with "/api/mailbox"
router
    .route("/")
    .get(mailboxController.findAll)
    .post(mailboxController.create);

// Matches with "/api/mailbox/:id"
router
    .route("/:id")
    .put(mailboxController.update)
    .get(mailboxController.findById)
    .delete(mailboxController.remove);

// Matches with "/api/mailbox/user/:email"
router.route("/user/:email").get(mailboxController.findMbxByEmail);

module.exports = router;
