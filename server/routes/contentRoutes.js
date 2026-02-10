const express = require("express");
const router = express.Router();

const contentController = require("../controllers/contentController");

router.get("/wall", contentController.getWall);

router.get("/:id", contentController.getContentDetails);
router.get(
  "/tv/:id/season/:seasonNumber",
  auth,
  contentController.getSeasonDetails,
);
router.get("/search", auth, contentController.searchContent);

module.exports = router;
