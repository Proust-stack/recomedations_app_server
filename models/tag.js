const { Schema, model } = require("mongoose");

const TagSchema = new Schema({
  compositionId: [
    {
      type: String,
      ref: "Composition",
    },
  ],
});

module.exports = model("Tag", TagSchema);
