import React from "react";
import "./NoteCard.css";

const NoteCard = (props) => {
  return (
    <div className="note-card">
      <h1 className="note-title">{props.obj.title}</h1>

      <p className="note-desc">{props.obj.description}</p>

      <div className="btn-group">
        <button
          className="btn delete"
          onClick={() => {
            props.handleDeletNote(props.obj._id);
          }}
        >
          Delete
        </button>
        <button
          className="btn update"
          onClick={() => {
            props.handleUpdateNote(
              props.obj._id,
              props.obj.title,
              props.obj.description,
            );
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
