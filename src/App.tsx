import { useState } from "react";
import "./App.css";

interface Note {
  id: number;
  text: string;
  backgroundColor: string;
  date: string;
}

function App() {
  const getRandomColor = (): string => {
    return "hsl(" + Math.random() * 360 + ", 100%, 75%)";
  };

  const [notes, setNotes] = useState<Note[]>([]);

  const [note, setNote] = useState<string>("");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const addNote = () => {
    if (note.trim().length < 10) {
      setShowError(true);
      return;
    }

    setNotes([
      ...notes,
      {
        id: Math.random(),
        text: note.trim(),
        date: new Date().toLocaleDateString(),
        backgroundColor: getRandomColor(),
      },
    ]);

    setNote("");
    setShowError(false);
    toggleModal();
  };

  const handleChange = (event: any) => {
    setNote(event.target.value);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <textarea
              className="text"
              onChange={handleChange}
              value={note}
            ></textarea>
            {showError && (
              <p className="error">Minimum characters allowed is 10</p>
            )}
            <div className="buttons">
              <button className="add-btn" onClick={addNote}>
                Add Note
              </button>
              <button className="close-btn" onClick={toggleModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <main>
        <div className="header">
          <h2 className="header-title">Notes</h2>
          <button className="add-note-btn" onClick={toggleModal}>
            +
          </button>
        </div>
        <div className="notes-container">
          {notes.map((note) => {
            return (
              <div
                key={note.id}
                className="note"
                style={{ backgroundColor: note.backgroundColor }}
              >
                <p className="note-text">{note.text}</p>
                <p className="note-date">{note.date}</p>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default App;
