const { createReview, deleteReview } = require("../repositories");

module.exports = {
  async createComment(req, res) {
    const newComment = await createComment({
      ...req.body,
      commentId: req.params.commentId,
    });
    res.json(newComment);
  },
  async deleteComment(req, res) {
    const { commentId } = req.params;
    const deleteResult = await deleteComment(commentId);

    if (!deleteResult) {
      const error = new Error(`Could not delete comment with ID ${commentId}`);
      error.status = 400;
      throw error;
    }

    res.json({ success: true });
  },
  async updateComment(req, res) {
    const { commentId } = req.params;
    const updateResult = await updateComment(commentId, req.body);

    if (!updateResult) {
      const error = new Error(`Could not update comment with ID ${commentId}`);
      error.status = 400;
      throw error;
    }

    res.json({ success: true });
  },
};
