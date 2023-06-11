const mongoose = require("mongoose");

const notesSchema = mongoose.Schema(
  {
    title: String,
    course: String,
    userID: String,
    author: String,
  },
  {
    versionKey: false,
  }
);

const notesModel = mongoose.model("notess", notesSchema);

module.exports = {
  notesModel,
};
