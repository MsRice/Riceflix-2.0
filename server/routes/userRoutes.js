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

// ///////////////////
router.get("/profiles/:profileId/watchlist", userController.getWatchlist);
router.get("/profiles/:profileId/favorites", userController.getFavorites);
router.get("/profiles/:profileId/history", userController.getHistory);

// router.patch( "/user/list/:listType/:contentId", auth, userController.deleteListItem, );
// router.patch("/profile", auth, userController.updateProfile);

router.post(
  "/profiles/:profileId/watchlist",
  auth,
  userController.updateWatchList,
);
router.post(
  "/profiles/:profileId/favorites",
  auth,
  userController.updateFavorites,
);
router.post("/profiles/:profileId/history", auth, userController.updateHistory);

router.delete(
  "/profiles/:profileId/watchlist/:contentId",
  auth,
  userController.deleteWatchList,
);
router.delete(
  "/profiles/:profileId/favorite/:contentId",
  auth,
  userController.deleteFavorites,
);
router.delete(
  "/profiles/:profileId/history/:contentId",
  auth,
  userController.deleteHistory,
);

router.get("/profiles/:profileId/list", auth, userController.getUserLists);
module.exports = router;
