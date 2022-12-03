const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  compositionIds: [{ type: String, ref: "Composition" }],
});

module.exports = mongoose.model("Group", GroupSchema);
