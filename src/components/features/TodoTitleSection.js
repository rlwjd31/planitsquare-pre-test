import Checkbox from "../ui/Checkbox.js";
import Input from "../ui/Input.js";

/**
 * Todo 아이템의 제목 섹션 컴포넌트
 * @param {Object} props
 * @param {string} props.todoId - todo의 고유 id
 * @param {string} props.title - todo의 제목
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
    readOnly: !isEditMode,
  });

  let $titleElement;
  if (isEditMode) {
    const $editInput = new Input({
      value: title,
      onBlur: onBlurTitle,
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
