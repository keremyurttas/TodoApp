/* eslint-disable prettier/prettier */
export function filterFirebaseKeys(data) {
  let arr = [];
  for (let key in data) {
    data[key].key = key;
    arr.push(data[key]);
  }
  return arr;
}
export function startDrag(event, item) {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("todoId", item.key);
}
