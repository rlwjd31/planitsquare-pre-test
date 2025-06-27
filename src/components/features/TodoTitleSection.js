import Checkbox from "../ui/Checkbox.js";
import Input from "../ui/Input.js";

// todo-title-section
export default function TitleSection({
  todoId,
  title,
  onChangeTitle,
  onEnterTitle,
  onChangeCheckbox,
  toggleTodoStatus,
  isEditMode,
}) {
  const $titleWrapper = document.createElement("div");
  $titleWrapper.className = "todo-title-wrapper";

  const $checkbox = new Checkbox({
    value: todoId,
    onChange: onChangeCheckbox,
    isChecked: isEditMode,
    name: "todo",
    readOnly: !isEditMode,
  });

  let $titleElement;
  if (isEditMode) {
    // @FIXME: todo.js의 존재하는 state가 갱신되면서 input의 focus가 풀리는 이슈
    const $editInput = new Input({
      value: title,
      onChange: onChangeTitle,
      onEnter: onEnterTitle,
      placeholder: "할 일을 입력해주세요",
    });
    $titleElement = $editInput;
  } else {
    const $title = document.createElement("span");
    $title.className = "todo-title";
    $title.textContent = title;
    $title.addEventListener("click", () => toggleTodoStatus(todoId));

    $titleElement = $title;
  }

  $titleWrapper.appendChild($checkbox);
  $titleWrapper.appendChild($titleElement);

  return $titleWrapper;
}
