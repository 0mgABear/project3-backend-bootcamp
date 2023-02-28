const { Router } = require("express");
const reviewController = require("../controllers/reviews");

const reviewsRouter = Router();

reviewsRouter.post("/:commentId", reviewController.createComment);
reviewsRouter.delete("/:commentId", reviewController.deleteComment);

module.exports = reviewsRouter;
