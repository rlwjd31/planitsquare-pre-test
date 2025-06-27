import Badge from "../ui/Badge.js";
import ButtonIcon from "../ui/ButtonIcon.js";
import Card from "../ui/Card.js";
import TitleSection from "./TodoTitleSection.js";
import TodoDescription from "./TodoDescription.js";
import TodoInfoSection from "./TodoInfoSection.js";

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
export default function Todo({
  todo,
  toggleTodoStatus,
  deleteTodo,
  updateTodo,
}) {
  const { id, title, status, description, period, relatedLink, priority } =
    todo;
  const $todoContainer = document.createElement("div");

  this.state = {
    isEditMode: false,
    title: title,
    priority: priority,
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    $todoContainer.innerHTML = "";
    $todoContainer.className = "todo-container";

    // todo title section
    const $titleSection = new TitleSection({
      todoId: id,
      title: this.state.title,
      onBlurTitle: (e) => {
        this.setState({ ...this.state, title: e.target.value });
      },
      onEnterTitle: (e) =>
        updateTodo(id, {
          title: e.target.value,
          priority: this.state.priority,
        }),
      onChangeCheckbox: () =>
        this.setState({ ...this.state, isEditMode: !this.state.isEditMode }),
      toggleTodoStatus,
      isEditMode: this.state.isEditMode,
    });

    $todoContainer.appendChild($titleSection);

    // todo description section
    const $descriptionSection = new TodoDescription({ description });
    $todoContainer.appendChild($descriptionSection);

    // todo info section
    const $infoSection = new TodoInfoSection({ period, relatedLink });

    $todoContainer.appendChild($infoSection);

    // todo meta section => 우선순위, 상태
    const $metaWrapper = document.createElement("div");
    $metaWrapper.className = "todo-meta-wrapper";
    const $statusBadge = new Badge({ text: status });

    // edit mode일 때 priority select, 아닐 때 badge
    let $priority;
    if (this.state.isEditMode) {
      $priority = document.createElement("select");
      $priority.className = "priority-select";
      ["HIGH", "MEDIUM", "LOW"].forEach((level) => {
        const $option = document.createElement("option");
        $option.value = level;
        $option.textContent = level;
        if (this.state.priority === level) $option.selected = true;
        $priority.appendChild($option);
      });
      $priority.addEventListener("change", (e) => {
        this.setState({
          ...this.state,
          priority: e.target.value,
        });
      });
    } else {
      $priority = new Badge({ text: this.state.priority });
    }

    $metaWrapper.appendChild($statusBadge);
    $metaWrapper.appendChild($priority);
    $todoContainer.appendChild($metaWrapper);

    // 변경, 삭제를 위한 icon(delete, pencil)
    const $iconWrapper = document.createElement("div");
    $iconWrapper.className = "icon-wrapper";
    const $deleteButtonIcon = new ButtonIcon({
      buttonVariant: "outline",
      iconSize: "24px",
      iconVariant: "delete",
      onClick: () => deleteTodo(id),
      text: "",
    });
    $deleteButtonIcon.classList.add("delete-btn-icon");
    $iconWrapper.appendChild($deleteButtonIcon);

    $todoContainer.appendChild($iconWrapper);

    // console.table(this.state);
    // console.table(todo);
  };

  this.render();

  return new Card({ children: [$todoContainer], status });
}
