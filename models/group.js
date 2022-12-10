const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  compositions: [{ type: mongoose.ObjectId, ref: "Composition" }],
});

module.exports = mongoose.model("Group", GroupSchema);
