import { useState } from "react";

import Header from "./Header";
import Form from "./Form";
import PackingList from "./PackingList";
import Footer from "./Footer";

export default function Container({
  selectedList,
  onAddItems,
  items,
  onDeleteItem,
  onToggleItem,
  itemsFromSelectedList,
  onClearList,
  className,
  onSetMobileView,
  isMobile,
}) {
  const [sortBy, setSortBy] = useState("input");

  return (
    <div className={className}>
      <Header isMobile={isMobile} onSetMobileView={onSetMobileView}>
        {selectedList} list
      </Header>
      <Form onAddItems={onAddItems} selectedList={selectedList} />
      <PackingList
        items={items}
        sortBy={sortBy}
        onDeleteItem={onDeleteItem}
        onToggleItem={onToggleItem}
      />
      <Footer
        items={itemsFromSelectedList}
        selectedList={selectedList}
        sortBy={sortBy}
        onClearList={onClearList}
        onSort={(value) => setSortBy(value)}
      />
    </div>
  );
}
