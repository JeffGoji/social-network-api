const { Schema, model } = require("mongoose");

const userSchema = new Shcema({
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
  //Add thought Arrays

  //Add array of _id values refrencing the user model as a self-refference.
});
