import { useState } from "react";

export default function Form({ isMobile, selectedList, onAddItems }) {
  const [description, setDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!description) return;

    const newItem = {
      description,
      done: false,
      id: Date.now(),
    };

    console.log(newItem);
    onAddItems(newItem, selectedList);

    setDescription("");
  }

  return (
    <>
      <form className="add-form" onClick={handleSubmit}>
        <input
          type="text"
          placeholder={
            isMobile ? "Start typing..." : "What do you need to do?..."
          }
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button disabled={selectedList === null} className="btn btn__add-form">
          add
        </button>
      </form>
    </>
  );
}
