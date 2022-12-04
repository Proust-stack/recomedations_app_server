const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  compositionIds: [String],
});

module.exports = mongoose.model("Group", GroupSchema);
