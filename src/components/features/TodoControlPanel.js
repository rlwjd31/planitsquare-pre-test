import ButtonIcon from "../ui/ButtonIcon.js";
import Input from "../ui/Input.js";

// todo control panel => todo 추가, 필터링 버튼
/**
 * Todo 컨트롤 패널 컴포넌트
 * Todo 추가 입력창과 추가/필터 버튼을 포함하는 컨트롤 패널
 * @param {Object} props 컴포넌트 속성
 * @param {(todo: string) => void} props.addTodo Todo 추가 핸들러 함수
 * @returns {HTMLDivElement} Todo 컨트롤 패널 엘리먼트
 */
export default function TodoControlPanel({ addTodo }) {
  const $container = document.createElement("div");
  $container.className = "todo-control-panel";

  const $input = new Input({
    placeholder: "Add Todo",
    onEnter: (e) => addTodo(e.target.value),
    name: "add-todo-input",
  });

  $container.appendChild($input);

  const $addTodoButtonIcon = new ButtonIcon({
    buttonVariant: "fill",
    iconVariant: "add",
    iconSize: "24px",
    text: "Add Todo",
    onClick: () => addTodo($input.value),
  });

  const $filterTodoButtonIcon = new ButtonIcon({
    buttonVariant: "outline",
    iconVariant: "filter",
    iconSize: "24px",
    text: "Filters",
    onClick: () => alert("add todo button clicked"),
  });

  $container.appendChild($addTodoButtonIcon);
  $container.appendChild($filterTodoButtonIcon);

  return $container;
}
