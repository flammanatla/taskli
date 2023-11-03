import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faTag,
  faTrash,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import {
  Popover,
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
  Classes,
  Intent,
  InputGroup,
  FormGroup,
} from "@blueprintjs/core";

import { useState } from "react";

export default function Sidebar({
  lists,
  className,
  isMobile,
  selectedList,
  onSelectedList,
  onCreateList,
  onDeleteList,
  onSetMobileView,
}) {
  const listNames = lists.map((list) => list.name);

  const [isDialogVisible, setCreationDialogVisibility] = useState(false);
  const [listName, setListName] = useState("");
  const [showError, setShowError] = useState(false);

  function handleClose() {
    setCreationDialogVisibility(false);
  }

  function handleInputChange(e) {
    if (e.key && e.key !== "Enter") return;

    onCreateList(listName);
    handleClose();
    setListName("");
  }

  return (
    <div className={className}>
      <div className="logo">
        <FontAwesomeIcon icon={faSquareCheck} size="lg" />
        <span>taskli</span>
      </div>

      <ul className="sidebar__items">
        <button
          className="btn btn__create"
          onClick={() => {
            setCreationDialogVisibility((show) => !show);
          }}
        >
          add new list
        </button>
        <Dialog
          title="Add new list"
          icon="tag"
          isOpen={isDialogVisible}
          onClose={handleClose}
        >
          <DialogBody>
            <FormGroup
              helperText={
                showError &&
                `The name ${listName} is already in use. Please enter a different name for your list`
              }
              label="Enter the name of the new list"
              labelFor="textInput-newList"
              labelInfo="(required)"
              intent={Intent.DANGER}
            >
              <InputGroup
                autoFocus
                id="textInput-newList"
                placeholder="i.e. shopping, to-do etc."
                small={true}
                value={listName}
                onChange={(e) => {
                  setListName(e.target.value);
                  if (lists?.find((list) => list.name === e.target.value)) {
                    setShowError(true);
                  } else {
                    setShowError(false);
                  }
                }}
                onKeyDown={handleInputChange}
              />
            </FormGroup>
          </DialogBody>
          <DialogFooter
            actions={
              <div>
                <Button
                  text="cancel"
                  onClick={handleClose}
                  className="bp5-button--dismiss"
                  style={{
                    boxShadow: "none",
                  }}
                />
                <Button
                  text="add"
                  onClick={handleInputChange}
                  intent={Intent.PRIMARY}
                />
              </div>
            }
          />
        </Dialog>
        {listNames.map((name) => (
          <div
            className={`btn btn__list ${
              name === selectedList ? "btn__list--selected" : ""
            }`}
            value={name}
            key={name}
            onClick={() => {
              onSelectedList(name);
              onSetMobileView(false, true);
            }}
          >
            <FontAwesomeIcon
              icon={faTag}
              size="xl"
              className="faIcon faIcon--tag"
            />

            <label>{name}</label>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Popover
                popoverClassName={`${Classes.POPOVER_CONTENT_SIZING}`}
                enforceFocus={false}
                placement="right"
                content={
                  <div key="text">
                    <h4 className="bp5-popover--title">Confirm deletion</h4>
                    <p>
                      Are you sure you want to delete these items? You won't be
                      able to recover them.
                    </p>
                    <div className="bp5-popover--footer">
                      <Button
                        className={`${Classes.POPOVER_DISMISS} bp5-button--dismiss`}
                      >
                        cancel
                      </Button>
                      <Button
                        intent={Intent.DANGER}
                        text="delete"
                        className={Classes.POPOVER_DISMISS}
                        onClick={(event) => {
                          event.stopPropagation();
                          onDeleteList(name);
                        }}
                      />
                    </div>
                  </div>
                }
              >
                <Button
                  className="bp5-button--sidebar"
                  icon={<FontAwesomeIcon icon={faTrash} size="lg" />}
                ></Button>
              </Popover>
            </div>
            {isMobile && (
              <Button
                className="bp5-button--sidebar"
                icon={<FontAwesomeIcon icon={faChevronRight} size="lg" />}
              ></Button>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}
