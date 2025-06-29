import { TODO_FORM_FIELD } from "../../constants/todoFormField.js";
import Badge from "../ui/Badge.js";

/**
 * Todo의 상태와 우선순위를 표시하는 섹션 컴포넌트
 * @param {Object} props
 * @param {'DONE' | 'TODO'} props.status Todo의 현재 상태
 * @param {'HIGH' | 'MEDIUM' | 'LOW'} props.priority Todo의 우선순위
 * @param {boolean} props.isEditMode 수정 모드 여부
 * @returns {HTMLDivElement} Todo 메타 정보를 담은 div 엘리먼트
 */
export default function TodoMetaSection({
  status,
  priority,
  isEditMode,
}) {
  const $metaWrapper = document.createElement("div");
  $metaWrapper.className = "todo-meta-wrapper";
  const $statusBadge = new Badge({ text: status });

  // edit mode일 때 priority select, 아닐 때 badge
  let $priority;
  if (isEditMode) {
    $priority = document.createElement("select");
    $priority.value = priority;
    $priority.name = TODO_FORM_FIELD.PRIORITY;
    ["HIGH", "MEDIUM", "LOW"].forEach((value) => {
      const $option = document.createElement("option");
      $option.value = value;
      $option.textContent = value;
      $priority.appendChild($option);
    });
  } else {
    $priority = new Badge({ text: priority });
  }

  $metaWrapper.appendChild($statusBadge);
  $metaWrapper.appendChild($priority);

  return $metaWrapper;
}
