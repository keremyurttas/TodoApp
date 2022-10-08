/* eslint-disable prettier/prettier */
export function filterFirebaseKeys(data) {
  let arr = [];
  for (let key in data) {
    data[key].key = key;
    arr.push(data[key]);
  }
  return arr;
}
