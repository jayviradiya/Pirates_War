const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts-c");

router.post("/create", postController.createPost);
router.get("/inbox/:userId", postController.getInbox);
router.get("/outbox/:userId", postController.getOutbox);
router.get("/get/:id", postController.getPostById);
router.delete("/delete/:id", postController.deletePost);
router.post("/delete", postController.deleteMultiplePosts);

module.exports = router;
