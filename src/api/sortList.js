export default function sortList(list) {
  const sortedList = [];
  const map = new Map();
  let currentId = null;

  list.forEach((item, i) => {
    if (item.nextId === "EMPTY") {
      currentId = item.id;
      sortedList.push(item);
    } else {
      map.set(item.nextId, i);
    }
  });

  while (sortedList.length < list.length) {
    const ancestor = list[map.get(currentId)];

    if (ancestor === undefined) {
      throw Error("Database broken. This should never happen. Should...");
    }

    sortedList.push(ancestor);
    currentId = ancestor.id;
  }

  return sortedList;
}
