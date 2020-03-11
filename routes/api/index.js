const router = require("express").Router();
const userRoutes = require("./user");
const mailboxRoutes = require("./mailbox");
const environmentRoutes = require("./environment");
const jobRoutes = require("./job");

router.use("/users", userRoutes);
router.use("/mailboxes", mailboxRoutes);
router.use("/environments", environmentRoutes);
router.use("/jobs", jobRoutes);

module.exports = router;
