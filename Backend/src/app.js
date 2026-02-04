const express = require("express");
const noteModel = require("./models/note.model.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("./public"))

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;
  const note = await noteModel.create({ title, description });
  res.status(201).json({
    message: "Note Created Successfully",
    note,
  });
});

app.get("/api/notes", async (req, res) => {
  const AllNotes = await noteModel.find();
  res.status(200).json({
    message: "All Notes Successfully",
    AllNotes,
  });
});

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  await noteModel.findByIdAndDelete(id);
  res.status(200).json({
    message: "Note Deleted Successfully",
  });
});

app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const updatedTittle = req.body.title;
  const updatedDescription = req.body.description;
  await noteModel.findByIdAndUpdate(id, {
    title: updatedTittle,
    description: updatedDescription,
  });
  res.status(200).json({
    message: "Note Updated Successfully",
  });
});

module.exports = app;
