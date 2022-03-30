const mongoose = require("mongoose");
const { Schema } = mongoose;
const QuestionSchema = new Schema({
  description: {
    type: String,
    require: true,
  },
  notes: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    
  },
  status: {
    type: Boolean,
  },
  domaine: {
    type: String,
  },

  site: { type: String, ref: "Site" },
  client: { type: Object, ref: "Site" },

  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Question = mongoose.model("questions", QuestionSchema);
