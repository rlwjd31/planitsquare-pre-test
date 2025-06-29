import Header from "./components/layouts/Header.js";
import Todo from "./components/features/Todo.js";
import TodoControlPanel from "./components/features/TodoControlPanel.js";
import { todos as mockTodos } from "./mock/todos.js";
import { getFromStorage, saveAtStorage } from "./utils/statePersistence.js";

const defaultTodo = {
  id: "crypto.randomUUID()",
  title: "todo 제목입니다.",
  status: "TODO",
  description: "todo 세부 설명란입니다.",
  priority: "MEDIUM",
  period: {
    start: new Date(),
    end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 일주일 후
  },
  relatedLink: "https://www.notion.so/9d9db7e04f7644508e8d22d0f159d4df",
};

export default function App() {
  this.state = { todos: mockTodos };
  this.$main = document.createElement("main");

  this.init = () => {
    const todosFromStorage = getFromStorage();

    // TODO: 과제의 요구사항에 따라 제출시 주석
    if (todosFromStorage.length > 0) {
      this.setState({ todos: todosFromStorage });
    } else {
      saveAtStorage(mockTodos);
      this.setState({ todos: mockTodos });
    }

    // TODO: 제출시 아래 주석 해제
    // this.setState({ todos: todosFromStorage });

    console.table(this.state.todos);
  };

  this.setState = (nextState) => {
    this.state = nextState;
    saveAtStorage(this.state.todos);

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

  this.addTodo = (title) => {
    const today = new Date();
    const oneWeekLater = new Date(today);
    oneWeekLater.setDate(today.getDate() + 7);

    this.setState({
      todos: [
        {
          ...defaultTodo,
          id: crypto.randomUUID(),
          title,
        },
        ...this.state.todos,
      ],
    });
  };

  this.deleteTodo = (todoId) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== todoId),
    });
  };

  this.updateTodo = (todoId, updatedTodo) => {
    this.setState({
      todos: this.state.todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              ...updatedTodo,
            }
          : todo
      ),
    });
  };

  this.completeAllTodos = () => {
    this.setState({
      todos: this.state.todos.map((todo) => ({ ...todo, status: "DONE" })),
    });
  };

  this.deleteAllTodos = () => {
    this.setState({ todos: [] });
  };

  this.render = () => {
    // 🐛 bug report commit id => 2cf4647
    // this.$main이 다시 생성되지 않도록 함수의 상단으로 빼고 render함수 내부에서 참조하여 DOM을 지우고 다시 그림.
    this.$main.innerHTML = "";

    const $root = document.getElementById("app");

    // add header
    this.$main.appendChild(
      new Header({
        totalTodosCount: this.state.todos.length,
        completedTodosCount: this.state.todos.filter(
          (todo) => todo.status === "DONE"
        ).length,
      })
    );

    // add todo & filter(todo control panel)
    const $todoControlPanel = new TodoControlPanel({
      addTodo: this.addTodo,
      completeAllTodos: this.completeAllTodos,
      deleteAllTodos: this.deleteAllTodos,
    });
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
          updateTodo: this.updateTodo,
        })
      );
    });
    this.$main.appendChild($todoList);

    // app에 append
    $root.appendChild(this.$main);
  };

  this.init();
}
