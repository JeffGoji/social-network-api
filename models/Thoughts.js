const { Schema, model } = require("mongoose");

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 12,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  },

  {
    reactions: [reactionSchema],
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.legnth;
});

const Thoughts = model("Thoughts", ThoughtSchema);

module.exports = Thought;
