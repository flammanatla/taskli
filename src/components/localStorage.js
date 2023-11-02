export function loadListsHistory() {
  const history = [
    localStorage.getItem("taskli_history") !== null
      ? JSON.parse(localStorage.getItem("taskli_history"))
      : [],
    localStorage.getItem("taskli_selectedList") !== null
      ? JSON.parse(localStorage.getItem("taskli_selectedList"))
      : null,
  ];
  // return localStorage.getItem("taskli_history") !== null
  //   ? JSON.parse(localStorage.getItem("taskli_history"))
  //   : [];
  return history;
}

export function updateLocalStorage(lists) {
  localStorage.setItem("taskli_history", JSON.stringify(lists));
}

// export function removeAllItemsFromLocalStorage() {
//   localStorage.clear();
// }

export function updateSelectedListInLocalStorage(selectedListName) {
  localStorage.setItem("taskli_selectedList", JSON.stringify(selectedListName));
}

/*
export function storeItemsInLocalStorage(item) {
  let history =
    localStorage.getItem("history") !== null
      ? JSON.parse(localStorage.getItem("history"))
      : [];

  history.push(item);
  localStorage.setItem("history", JSON.stringify(history));
}



export function deleteItemInLocalStorage(id) {
  let history;

  if (localStorage.getItem("history") !== null) {
    history = JSON.parse(localStorage.getItem("history"));
  } else {
    history = [];
  }

  history.forEach(function (item, index) {
    if (id === item.id) {
      history.splice(index, 1);
    }
  });

  localStorage.setItem("history", JSON.stringify(history));
}
*/
