const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false },
    blocked: { type: Boolean, default: false },
    img: String,
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
