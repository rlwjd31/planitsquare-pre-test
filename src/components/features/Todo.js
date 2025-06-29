import ButtonIcon from "../ui/ButtonIcon.js";
import Card from "../ui/Card.js";
import TitleSection from "./TodoTitleSection.js";
import TodoDescription from "./TodoDescription.js";
import TodoInfoSection from "./TodoInfoSection.js";
import TodoMetaSection from "./TodoMetaSection.js";
import { isEmptyString } from "../../utils/isEmptyString.js";

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
      isDone: status === "DONE",
      onBlurTitle: (e) => {
        if (isEmptyString(e.target.value)) return;
        this.setState({ ...this.state, title: e.target.value });
      },
      onEnterTitle: (e) => {
        const { value } = e.target;
        if (isEmptyString(value) || this.state.title === "") {
          alert("할 일을 입력해주세요");
          e.target.focus();
          return;
        }

        updateTodo(id, {
          title: value,
          priority: this.state.priority,
        });
      },
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
    const $metaSection = new TodoMetaSection({
      isEditMode: this.state.isEditMode,
      status,
      priority: this.state.priority,
      onChangePriority: (e) => {
        this.setState({
          ...this.state,
          priority: e.target.value,
        });
      },
    });
    $todoContainer.appendChild($metaSection);

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

    console.table(this.state);
  };

  this.render();

  return new Card({ children: [$todoContainer], status });
}
