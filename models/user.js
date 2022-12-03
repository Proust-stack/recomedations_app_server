const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    blocked: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", UserSchema);
