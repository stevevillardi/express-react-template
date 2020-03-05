const router = require("express").Router();
const bookRoutes = require("./books");
const userRoutes = require("./user");
const mailboxRoutes = require("./mailbox");
const environmentRoutes = require("./environment");

// Book routes
router.use("/books", bookRoutes);
router.use("/users", userRoutes);
router.use("/mailboxes", mailboxRoutes);
router.use("/environments", environmentRoutes);

module.exports = router;
