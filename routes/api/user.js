const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/users"
router
    .route("/")
    .get(userController.findAll)
    .post(userController.create);

// Matches with "/api/users/:email"
router
    .route("/:email")
    .put(userController.update)
    .get(userController.findByEmail)
    .delete(userController.remove);

module.exports = router;
