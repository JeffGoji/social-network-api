const { Schema, model } = require("mongoose");

const UserSchema = new Shcema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, "Please provide a valid email"],
      match: [/^([a-z0-9_-]){3,16}$/, "Please provide a valid email address"],
    },
    thoughts: [{ type: Schema.Type.ObjectId, ref: "Thoughts" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const User = model("User", UserSchema);

module.exports = User;
