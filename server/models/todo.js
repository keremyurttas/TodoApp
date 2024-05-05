const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  color:{
    type:String,
    default:"#ffff"
  }
});
module.exports = mongoose.model("Todo", todoSchema);
