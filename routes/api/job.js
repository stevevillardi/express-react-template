const router = require("express").Router();
const jobController = require("../../controllers/jobController");

// Matches with "/api/jobs/start/:id"
router.route("/start/:id").put(jobController.startJob);

// Matches with "/api/jobs/stop/:id"
router.route("/stop/:id").put(jobController.stopJob);

// Matches with "/api/jobs/discover/:id"
router.route("/discover/:id").put(jobController.discoverJob);

// Matches with "/api/jobs/archive/:id"
router.route("/archive/:id").put(jobController.archiveJob);

// Matches with "/api/jobs/reset/:id"
router.route("/reset/:id").put(jobController.resetJob);

// Matches with "/api/jobs/queue/:id"
router.route("/queue/:id").put(jobController.queueJob);

// Matches with "/api/jobs/queue/:id"
router.route("/inprogress/:id").put(jobController.runningJob);

module.exports = router;
