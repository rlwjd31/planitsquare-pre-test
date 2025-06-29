import Todo from "./todo.js";

/**
 * @param {Object} props
 * @param {{
 *   id: string;
 *   title: string;
 *   status: 'DONE' | 'TODO';
 *   description: string;
 *   period: {
 *     start: Date;
 *     end: Date;
 *   };
 *   relatedLink: string;
 *   priority: 'HIGH' | 'MEDIUM' | 'LOW';
 *   createdAt: Date;
 * }} props.todo
 * @param {(todoId: string) => void} props.toggleTodoStatus - todo의 상태를 토글하는 함수
 * @param {(todoId: string) => void} props.deleteTodo - todo를 삭제하는 함수
 * @param {(todoId: string, updatedTodo: Partial<Todo>) => void} props.updateTodo - todo를 업데이트하는 함수
 * @returns {HTMLDivElement}
 */
export default function Todos({
  todos,
  toggleTodoStatus,
  deleteTodo,
  updateTodo,
}) {
  const $todoList = document.createElement("div");
  $todoList.className = "todo-list";

  todos.forEach((todo) => {
    $todoList.appendChild(
      new Todo({
        todo,
        toggleTodoStatus,
        deleteTodo,
        updateTodo,
      })
    );
  });

  return $todoList;
}
