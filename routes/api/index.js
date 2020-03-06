const router = require("express").Router();
const userRoutes = require("./user");
const mailboxRoutes = require("./mailbox");
const environmentRoutes = require("./environment");

router.use("/users", userRoutes);
router.use("/mailboxes", mailboxRoutes);
router.use("/environments", environmentRoutes);

module.exports = router;
