import Button from "../ui/Button.js";
import ButtonIcon from "../ui/ButtonIcon.js";
import Input from "../ui/Input.js";

// todo control panel => todo 추가, 필터링 버튼
/**
 * Todo 컨트롤 패널 컴포넌트
 * Todo 추가 입력창과 추가/필터 버튼을 포함하는 컨트롤 패널
 * @param {Object} props 컴포넌트 속성
 * @param {(todo: string) => void} props.addTodo Todo 추가 핸들러 함수
 * @param {() => void} props.completeAllTodos 모든 Todo를 완료 상태로 변경하는 핸들러 함수
 * @param {() => void} props.deleteAllTodos 모든 Todo를 삭제하는 핸들러 함수
 * @returns {HTMLDivElement} Todo 컨트롤 패널 엘리먼트
 */
export default function TodoControlPanel({
  addTodo,
  completeAllTodos,
  deleteAllTodos,
}) {
  const $container = document.createElement("div");
  $container.className = "todo-control-panel";
  const $addTodoWrapper = document.createElement("div");
  $addTodoWrapper.className = "add-todo-wrapper";

  const $input = new Input({
    placeholder: "Add Todo",
    onEnter: (e) => {
      if (e.target.value.trim() === "") {
        alert("할 일을 입력해주세요.");
        $input.focus();
        return;
      }
      addTodo(e.target.value);
    },
    name: "add-todo-input",
  });

  $addTodoWrapper.appendChild($input);

  const $addTodoButtonIcon = new ButtonIcon({
    buttonVariant: "fill",
    iconVariant: "add",
    iconSize: "24px",
    text: "Add Todo",
    onClick: () => {
      if ($input.value.trim() === "") {
        alert("할 일을 입력해주세요.");
        $input.focus();
        return;
      }
      addTodo($input.value);
    },
  });
  $addTodoWrapper.appendChild($addTodoButtonIcon);

  // 전체 todo 완료 및 삭제 관리 UI
  const $bulkWrapper = document.createElement("div");
  $bulkWrapper.className = "bulk-wrapper";

  const $completeAllButton = new Button({
    variant: "fill",
    onClick: completeAllTodos,
    text: "전체 완료",
  });
  $bulkWrapper.appendChild($completeAllButton);
  const $deleteAllButton = new Button({
    variant: "fill",
    onClick: deleteAllTodos,
    text: "전체 삭제",
  });
  $bulkWrapper.appendChild($deleteAllButton);

  $container.appendChild($addTodoWrapper);
  $container.appendChild($bulkWrapper);

  return $container;
}
