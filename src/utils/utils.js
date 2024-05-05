/* eslint-disable prettier/prettier */
export function getRandomHexCode() {
  // Generate a random number between 0 and 16777215 (the decimal value of FFFFFF)
  const randomNum = Math.floor(Math.random() * 16777215);
  // Convert the decimal number to hexadecimal and pad with zeros to ensure it's 6 digits
  const hexCode = randomNum.toString(16).padStart(6, "0");
  // Prepend '#' to the hexadecimal code to make it a valid color code
  return "#" + hexCode;
}
export function startDrag(event, item) {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("todoId", item._id);
}
