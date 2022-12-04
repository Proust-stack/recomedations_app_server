const { Schema, model } = require("mongoose");

const TagSchema = new Schema({
  compositionId: [
    {
      type: String,
      index: true,
    },
  ],
});

module.exports = model("Tag", TagSchema);
