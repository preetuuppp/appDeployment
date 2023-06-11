const express = require("express");
const { auth } = require("../middleware/auth");
const { notesModel } = require("../model/notesModel");
const noteRouter = express.Router();

noteRouter.use(auth);

//creating notes
noteRouter.post("/create", async (req, res) => {
  try {
    const note = new notesModel(req.body);
    await note.save();
    res.json({ msg: "New note created", note: req.body });
  } catch (error) {
    res.json({ msg: "not added notes" });
  }
});

//getting notes
noteRouter.get("/", async (req, res) => {
  try {
    const note = await notesModel.find({ userID: req.body.userID });

    res.json(note);
  } catch (error) {
    res.json({ msg: "not found notes" });
  }
});

//updating notes
noteRouter.patch("/update/:noteID", async (req, res) => {
  const userIDinUserDoc = req.body.userID;
  const { noteID } = req.params;
  try {
    const note = await notesModel.findOne({ _id: noteID });
    console.log(note);
    const userIDinNoteDoc = note.userID;
    if (userIDinUserDoc === userIDinNoteDoc) {
      // console.log(
      //   "userId in USERdoc",
      //   userIDinUserDoc,
      //   "userId in note",
      //   userIDinNoteDoc
      // );
      await notesModel.findByIdAndUpdate({ _id: noteID }, req.body);
      res.json({ msg: `${note.title} has been updated` });
    } else {
      // console.log(
      //   "userId in USERdoc",
      //   userIDinUserDoc,
      //   "userId in note",
      //   userIDinNoteDoc
      // );
      res.json({ msg: "Not Authorized" });
    }
  } catch (error) {
    res.json({ msg: "Could not find" });
  }
});

// deleted a note
noteRouter.delete("/delete/:noteID", async (req, res) => {
  const userIDinUserDoc = req.body.userID;
  const { noteID } = req.params;
  try {
    const note = await notesModel.findOne({ _id: noteID });
    console.log(note);
    const userIDinNoteDoc = note.userID;
    if (userIDinUserDoc === userIDinNoteDoc) {
      console.log(
        "userId in USERdoc",
        userIDinUserDoc,
        "userId in note",
        userIDinNoteDoc
      );
      await notesModel.findByIdAndDelete({ _id: noteID });
      res.json({ msg: `${note.title} has been deleted` });
    } else {
      console.log(
        "userId in USERdoc",
        userIDinUserDoc,
        "userId in note",
        userIDinNoteDoc
      );
      res.json({ msg: "Not Authorized" });
    }
  } catch (error) {
    res.json({ msg: "Could not find" });
  }
});

module.exports = {
  noteRouter,
};
