import { TODO_FORM_FIELD } from "../../constants/todoFormField.js";
import Checkbox from "../ui/Checkbox.js";
import Input from "../ui/Input.js";

/**
 * Todo 아이템의 제목 섹션 컴포넌트
 * @param {Object} props
 * @param {string} props.todoId - todo의 고유 id
 * @param {string} props.title - todo의 제목
 * @param {boolean} props.isDone - todo의 상태
 * @param {(event: FocusEvent) => void} props.onBlurTitle - 제목 입력 필드의 blur 이벤트 핸들러
 * @param {(event: InputEvent) => void} props.onEnterTitle - 제목 입력 필드의 enter 이벤트 핸들러
 * @param {(event: InputEvent) => void} props.onChangeCheckbox - 체크박스 변경 이벤트 핸들러
 * @param {(todoId: string) => void} props.toggleTodoStatus - todo 상태 토글 함수
 * @param {boolean} props.isEditMode - 편집 모드 여부
 * @returns {HTMLDivElement} 제목 섹션 엘리먼트
 */
export default function TitleSection({
  todoId,
  title,
  isDone,
  onBlurTitle,
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
    // 완료된 todo는 수정을 trigger하는 checkbox의 기본동작을 막아 수정을 하지 못 하게 함.
    disabled: isDone,
  });
  $checkbox.classList.add("todo-checkbox");

  const $editInput = new Input({
    value: title,
    onBlur: onBlurTitle,
    onEnter: onEnterTitle,
    placeholder: "할 일을 입력해주세요",
    readOnly: isDone,
    name: TODO_FORM_FIELD.TITLE,
  });
  $editInput.classList.add("todo-title");
  $editInput.classList.toggle("edit-mode", isEditMode);

  // 👇 edit-mode 즉, 수정 중이 아닐 때만 클릭 이벤트를 추가하여 수정 중일 때 예기치 않은 이벤트 발생 제거
  if (!isEditMode) {
    $editInput.setAttribute("autocomplete", "off");
    // $editInput.tabIndex = -1;
    $editInput.addEventListener("click", (e) => toggleTodoStatus(todoId));
  }

  $titleWrapper.appendChild($checkbox);
  $titleWrapper.appendChild($editInput);

  return $titleWrapper;
}
