import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li className="item">
      <input
        type="checkbox"
        checked={item.done}
        onChange={() => onToggleItem(item.id)}
        id={item.id}
      />
      {/* <span style={item.done ? { textDecoration: "line-through" } : {}}>
        {item.description}
      </span> */}
      <label
        htmlFor={item.id}
        style={item.done ? { textDecoration: "line-through" } : {}}
      >
        {item.description}
      </label>
      <button onClick={() => onDeleteItem(item.id)}>
        {" "}
        <FontAwesomeIcon
          icon={faXmark}
          size="xl"
          style={{ color: "#DB5800" }}
        />
      </button>
    </li>
  );
}
