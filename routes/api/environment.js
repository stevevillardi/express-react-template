const router = require("express").Router();
const environmentController = require("../../controllers/environmentController");

// Matches with "/api/environments"
router
    .route("/")
    .get(environmentController.findAll)
    .post(environmentController.create);

// Matches with "/api/environments/:id"
router
    .route("/:id")
    .put(environmentController.update)
    .get(environmentController.findById)
    .delete(environmentController.remove);

// Matches with "/api/environments/user/:email"
router.route("/user/:email").get(environmentController.findEnvByEmail);

module.exports = router;
