import Header from "./components/layouts/Header.js";
import ButtonIcon from "./components/ui/ButtonIcon.js";
import Todo from "./components/todo.js";
import { todos as mockTodos } from "./mock/todos.js";

export default function App() {
  this.state = { todos: mockTodos };
  this.$main = document.createElement("main");

  this.init = () => {
    // TODO: 나중에 state persistence기능 구현하기
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.toggleTodoStatus = (todoId) => {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          status: todo.status === "DONE" ? "TODO" : "DONE",
        };
      }
      return todo;
    });

    this.setState({ todos: updatedTodos });
  };

  this.deleteTodo = (todoId) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== todoId),
    });
  };

  this.render = () => {
    // 🐛 bug report commit id => 2cf4647
    // this.$main이 다시 생성되지 않도록 함수의 상단으로 빼고 render함수 내부에서 참조하여 DOM을 지우고 다시 그림.
    this.$main.innerHTML = "";

    const $root = document.getElementById("app");

    // add header
    this.$main.appendChild(new Header());

    // add todo & filter(todo control panel)
    const $todoControlPanel = new TodoControlPanel();
    this.$main.appendChild($todoControlPanel);

    // todo 리스트 렌더링
    const $todoList = document.createElement("div");
    $todoList.className = "todo-list";
    this.state.todos.forEach((todo) => {
      $todoList.appendChild(
        new Todo({
          todo,
          toggleTodoStatus: this.toggleTodoStatus,
          deleteTodo: this.deleteTodo,
        })
      );
    });
    this.$main.appendChild($todoList);

    // app에 append
    $root.appendChild(this.$main);
  };

  this.init();
  this.setState(this.state);
  // this.render(); 👉🏻 setState에서 한 번 rendering이 되므로 주석처리
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
