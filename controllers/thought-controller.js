const { Thoughts, User } = require("../models");

//========== Thought controller:
const thoughtController = {
  // Get all of the thoughts:
  getAllThoughts(req, res) {
    Thoughts.find({})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //========= Get thoughts by ID:
  getThoughtsById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //========= Create a new thought:
  addThoughts({ params, body }, res) {
    Thoughts.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          {
            $push: { thoughts: _id },
          },
          { new: true, runValidators: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought was found" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  //========= Update a thought:
  updateThoughts({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404), json({ message: "No thought was found" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //======= Create Reaction:
  addReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thoughts found" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //======== Find a thought and Delete it:
  deleteThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thoughts found here" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //======== Find a reaction and delete it

  deleteReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found! " });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = thoughtController;
