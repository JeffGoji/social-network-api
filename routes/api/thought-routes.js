const router = require("express").Router();
const thoughtController = require("../../controllers/thought-controller");

const {
  getAllThoughts,
  getThoughtsById,
  addThoughts,
  updateThoughts,
  deleteThoughts,
  addReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");

// api/thoughts

router
  .route("/")

  .get(getAllThoughts)
  .post(addThoughts);
// api/thoughts/:id
router
  .route("/:id")
  .put(updateThoughts)
  .get(getThoughtsById)
  .delete(deleteThoughts);

// api/thoughts/:userId

router
  .route("/:userId")

  .post(addThoughts);

// api/thoughts/:thoughtId/reactions
router
  .route("/:thoughtId/reactions/")

  .post(addReaction);

// api/thoughts/:thoughtId/reactionId
router
  .route("/:thoughtId/reactions/:reactionId")

  .delete(deleteReaction);

module.exports = router;
