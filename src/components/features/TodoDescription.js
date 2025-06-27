export default function TodoDescription({ description }) {
  const $description = document.createElement("p");
  $description.className = "todo-description";
  $description.textContent = description;

  return $description;
}