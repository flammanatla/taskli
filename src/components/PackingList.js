import Item from "./Item";

export default function PackingList({
  items,
  sortBy,
  onDeleteItem,
  onToggleItem,
}) {
  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sortBy === "done") {
    sortedItems = items.slice().sort((a, b) => Number(a.done) - Number(b.done));
  }

  return (
    <div className="items">
      <ul className="items__list">
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}
