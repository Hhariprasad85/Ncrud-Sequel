const user = require("../controllers/User");
const express = require("express");
const router = express.Router();

// create new user
router.post("/api/user/create", user.create);
router.get("/api/user/all", user.fetchAll);
router.get("/api/user/:id", user.fetchSingle);
router.put("/api/user/update/:id", user.updateCurrentUser);
router.delete("/api/user/delete/:id", user.deleteCurrentUser);
router.delete("/api/user/deleteAll", user.deleteAllUsers);

module.exports = router;