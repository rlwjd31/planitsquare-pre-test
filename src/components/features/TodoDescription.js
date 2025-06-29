import { TODO_FORM_FIELD } from "../../constants/todoFormField.js";

export default function TodoDescription({ description, isEditMode = false }) {
  const $textarea = document.createElement("textarea");
  $textarea.className = "todo-description";
  $textarea.name = TODO_FORM_FIELD.DESCRIPTION;
  $textarea.value = description || "";
  $textarea.placeholder = "할 일에 대한 설명을 입력하세요";
  $textarea.classList.toggle("edit-mode", isEditMode);
  $textarea.readOnly = !isEditMode;

  return $textarea;
}
