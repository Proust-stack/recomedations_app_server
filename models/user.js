const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: { type: String, default: "user" },
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false },
    blocked: { type: Boolean, default: false },
    img: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", UserSchema);
