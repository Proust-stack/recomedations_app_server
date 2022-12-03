const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false },
    blocked: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
    fromGoogle: {
      type: Boolean,
      default: false,
    },
    fromTwitter: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", UserSchema);
