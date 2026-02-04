import React, { useEffect, useState } from "react";
import "./AllNotes.css";
import axios from "axios";
import NoteCard from "./NoteCard.jsx";

const AllNotes = () => {
  useEffect(() => {
    getNotesData();
  }, []);

  const [notes, setNote] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function getNotesData() {
    const res = await axios.get("http://localhost:3000/api/notes");
    setNote(res.data.AllNotes);
  }

  async function submitHandler(e) {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/api/notes", {
      title,
      description,
    });
    console.log(res.data.message);
    setTitle("");
    setDescription("");
    getNotesData();
  }

  async function deleteNote(noteID) {
    const res = await axios.delete(`http://localhost:3000/api/notes/${noteID}`);
    console.log(res.data.message);
    getNotesData();
  }

  async function updateNote(noteID, title, description) {
    const newTitle = prompt("Enter new title", title);
    if (newTitle === null) return;

    const newDescription = prompt("Enter new description", description);
    if (newDescription === null) return;

    const res = await axios.patch(`http://localhost:3000/api/notes/${noteID}`, {
      title: newTitle,
      description: newDescription,
    });
    console.log(res.data.message);
    getNotesData();
  }

  return (
    <>
      <div className="form-contaier">
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h1 className="heading">Add New Note</h1>

          <input
            type="text"
            placeholder="Enter Title"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder="Enter Description"
            required
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          <button>Add Note</button>
        </form>
      </div>

      <div className="All-Notes">
        {notes.map((elem, idx) => {
          return (
            <div key={idx}>
              <NoteCard
                obj={elem}
                handleDeletNote={deleteNote}
                handleUpdateNote={updateNote}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllNotes;
