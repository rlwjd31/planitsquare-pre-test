import Header from "./components/layouts/Header.js";
import ButtonIcon from "./components/ui/ButtonIcon.js";
import Todo from "./components/todo.js";
import { todos as mockTodos } from "./mock/todos.js";
import CheckBox from "./components/ui/Checkbox.js";

export default function App() {
  this.state = { todos: mockTodos };

  this.init = () => {
    // TODO: 나중에 state persistence기능 구현하기
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const $root = document.getElementById("app");
    const $main = document.createElement("main");

    // add header
    $main.appendChild(new Header());

    // add todo & filter(todo control panel)
    const $todoControlPanel = new TodoControlPanel();
    $main.appendChild($todoControlPanel);

    // todo 리스트 렌더링
    const $todoList = document.createElement("div");
    $todoList.className = "todo-list";
    this.state.todos.forEach((todo) => {
      $todoList.appendChild(new Todo({ todo }));
    });
    $main.appendChild($todoList);

    // app에 append
    $root.appendChild($main);
  };

  this.init();
  this.setState(this.state);
  // this.render(); 👉🏻 setState에서 한 번 rendering이 되므로 주석처리

  return document.createElement("div");
}

// todo control panel => todo 추가, 필터링 버튼
function TodoControlPanel() {
  const $container = document.createElement("div");
  $container.className = "todo-control-panel";

  const $addTodoButtonIcon = new ButtonIcon({
    buttonVariant: "fill",
    iconVariant: "add",
    iconSize: "24px",
    text: "Add Todo",
    onClick: () => alert("add todo button clicked"),
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
