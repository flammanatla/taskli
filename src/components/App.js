import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Container from "./Container";
import useMediaQuery from "../utils/useMediaQuery";

import {
  loadListsHistory,
  updateSelectedListInLocalStorage,
  updateLocalStorage,
} from "./localStorage";

// const lists = [
//   {
//     items: [
//       { id: 1, description: "Passports", done: true },
//       { id: 2, description: "Socks", done: false },
//     ],
//     name: "shopping",
//   },
//   {
//     items: [{ id: 1, description: "Passports", done: true }],
//     name: "packing",
//   },
//   {
//     items: [
//       { id: 1, description: "Passports", done: true },
//       { item },
//     ],
//     name: "packing",
//   },
// ];

export default function App() {
  const [listsHistory, selectedListHistory] = loadListsHistory();
  const [selectedList, setSelectedList] = useState(selectedListHistory); // track currently selected list
  const [lists, setLists] = useState(listsHistory); // handle all items across all lists

  const [[isSidebarVisible, isContainerVisible], setMobileView] = useState([
    true,
    false,
  ]);

  const itemsFromSelectedList =
    lists?.find((list) => list.name === selectedList)?.items || [];

  const isMobile = useMediaQuery("(max-width: 570px)");

  useEffect(() => {
    updateLocalStorage(lists);
  }, [lists]);

  useEffect(() => {
    updateSelectedListInLocalStorage(selectedList);
  }, [selectedList]);

  function handleCreateList(listName) {
    console.log(listName);
    if (!listName) return;

    setLists((lists) => [...lists, { items: [], name: listName }]);
    setSelectedList(listName);
  }

  function handleDeleteList(listName) {
    setLists((lists) => {
      const filteredLists = lists.filter((list) => list.name !== listName);
      setSelectedList(filteredLists[0]?.name || null);
      return filteredLists;
    });
  }

  function handleSelectedList(listName) {
    console.log("selected list in sidebar:", listName);
    setSelectedList(listName);
  }

  function handleAddItems(item, selectedList) {
    console.log("selected list", selectedList);
    setLists((lists) =>
      lists.map((list) => {
        if (list.name === selectedList) {
          return {
            ...list,
            items: [...list.items, item],
          };
        }
        return list;
      })
    );
  }

  if (itemsFromSelectedList?.some((i) => Array.isArray(i))) {
    throw new Error(
      "You've done something strange. One of the items is an array."
    );
  }

  function handleDeleteItem(id) {
    setLists((lists) =>
      lists.map((list) => {
        if (list.name === selectedList) {
          return {
            ...list,
            items: list.items.filter((item) => item.id !== id),
          };
        }
        return list;
      })
    );
    console.log("lists after deletion", lists);
  }

  function handleToggleItem(id) {
    // setItems((items) =>
    //   itemsFromSelectedList.map((item) =>
    //     itemsFromSelectedList.id === id ? { ...item, done: !item.done } : item
    //   )
    // );
    setLists((lists) =>
      lists.map((list) => {
        if (list.name === selectedList) {
          console.log("item toggled", {
            ...list,
            items: list.items.map((item) =>
              item.id === id ? { ...item, done: !item.done } : item
            ),
          });

          return {
            ...list,
            items: list.items.map((item) =>
              item.id === id ? { ...item, done: !item.done } : item
            ),
          };
        }

        return list;
      })
    );
    console.log("item toggled", lists);
  }

  function handleClearList(listName) {
    console.log(lists);
    console.log(listName);
    // const confirmed = window.confirm(
    //   "Are you sure you want to delete all items in this list?"
    // );
    // if (confirmed) {
    setLists((lists) =>
      lists.map((list) =>
        list.name !== listName ? list : { items: [], name: listName }
      )
    );
    // }
  }

  // function handleClearAll() {
  //   const confirmed = window.confirm(
  //     "Are you sure you want to delete all items?"
  //   );
  //   if (confirmed) {
  //     setLists([]);
  //     removeAllItemsFromLocalStorage();
  //   }
  // }

  function handleMobileView(sidebarVisible, containerVisible) {
    setMobileView([sidebarVisible, containerVisible]);
  }

  return (
    <div className="app gradient">
      <Sidebar
        isMobile={isMobile}
        className={`sidebar ${
          isMobile ? (isSidebarVisible ? "" : "hidden") : ""
        }`}
        lists={lists}
        selectedList={selectedList}
        onSelectedList={handleSelectedList}
        onCreateList={handleCreateList}
        onDeleteList={handleDeleteList}
        onSetMobileView={handleMobileView}
      ></Sidebar>
      <Container
        className={`container ${
          isMobile ? (isContainerVisible ? "" : "hidden") : ""
        }`}
        isMobile={isMobile}
        selectedList={selectedList}
        onAddItems={handleAddItems}
        items={itemsFromSelectedList}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        itemsFromSelectedList={itemsFromSelectedList}
        onClearList={handleClearList}
        onSetMobileView={handleMobileView}
      ></Container>
    </div>
  );
}
