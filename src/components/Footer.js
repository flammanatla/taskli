import { Alert, Intent } from "@blueprintjs/core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Footer({
  items,
  selectedList,
  onClearList,
  sortBy,
  onSort,
}) {
  let footerContent;

  const [isAlertVisible, setIsAlertVisibile] = useState(false);

  if (!items.length) {
    footerContent = `Start adding some items to your ${selectedList} list!`;
  } else {
    const numItems = items.length;
    const itemsDone = items.filter((item) => item.done).length;
    const percentage = Math.round((itemsDone / numItems) * 100);

    footerContent =
      percentage === 100
        ? "Well done! Now have some good rest"
        : `You have ${numItems} items on your list and you already done
      ${itemsDone} (${percentage}%)`;
  }

  return (
    <footer className="footer">
      <div className="btn btn__actions">
        <select
          value={sortBy}
          onChange={(e) => onSort(e.target.value)}
          className="btn btn__action"
        >
          <option value="input">sort by input order</option>
          <option value="description">sort by description</option>
          <option value="done">sort by status</option>
        </select>
        <Alert
          // className={this.props.data.themeName}
          cancelButtonText="cancel"
          confirmButtonText="clear list"
          icon={<FontAwesomeIcon icon={faTrash} />}
          // icon="trash"
          intent={Intent.DANGER}
          isOpen={isAlertVisible}
          onCancel={() => setIsAlertVisibile((show) => !show)}
          onConfirm={() => {
            onClearList(selectedList);
            setIsAlertVisibile((show) => !show);
          }}
        >
          <p>
            Are you sure you want to clear all items from list "{selectedList}"?
            You won't be able to restore them later.
          </p>
        </Alert>
        <button
          onClick={() => {
            setIsAlertVisibile((show) => !show);
          }}
          className="btn btn__action btn__action--red"
        >
          clear list
        </button>
      </div>
      {footerContent}
    </footer>
  );
}
