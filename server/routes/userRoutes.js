const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { auth, requireProfile } = require("../middleware/auth");

router.post("/registration", userController.registration);
router.post("/login", userController.login);

router.get("/user", auth, userController.getUser);
router.post("/profiles", auth, userController.createProfile);
router.get("/user/profile", auth, userController.getProfile);
router.delete("/profiles/:id", auth, userController.deleteProfile);

router.patch("/user/list", auth, requireProfile, userController.updateList);
router.get("/user/list/:listType", auth, userController.getList);

router.patch(
  "/user/list/:listType/:contentId",
  auth,
  userController.deleteListItem,
);
router.patch("/profile", auth, userController.updateProfile);

module.exports = router;
