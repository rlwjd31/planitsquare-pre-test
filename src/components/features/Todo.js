import Badge from "../ui/Badge.js";
import ButtonIcon from "../ui/ButtonIcon.js";
import Card from "../ui/Card.js";
import Icon from "../ui/Icon.js";
import TitleSection from "./TodoTitleSection.js";

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

  this.state = {
    isEditMode: false,
    title: title,
    priority: priority,
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  const $todoContainer = document.createElement("div");
  $todoContainer.className = "todo-container";

  this.render = () => {
    $todoContainer.innerHTML = "";

    // todo title section
    const $titleSection = new TitleSection({
      todoId: id,
      title: this.state.title,
      onChangeTitle: (e) => {
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
    const $description = document.createElement("p");
    $description.className = "todo-description";
    $description.textContent = description;
    $todoContainer.appendChild($description);

    // todo info section
    const $infoWrapper = document.createElement("div");
    $infoWrapper.className = "todo-info-wrapper";
    const $dateWrapper = document.createElement("div");
    $dateWrapper.className = "todo-date-wrapper";
    const $calendarIcon = new Icon({
      variant: "calendar",
      size: "20px",
    });
    const $period = document.createElement("span");
    // TODO: date parse util 함수로 빼기
    const [start, end] = Object.values(period).map((date) =>
      date.toLocaleDateString("ko-KR", {
        month: "short",
        day: "numeric",
      })
    );
    $period.textContent = `${start} ~ ${end}`;
    $dateWrapper.appendChild($calendarIcon);
    $dateWrapper.appendChild($period);

    const $urlWrapper = document.createElement("div");
    $urlWrapper.className = "todo-url-wrapper";
    const $linkIcon = new Icon({ variant: "link", size: "20px" });
    const $urlLink = document.createElement("a");
    $urlLink.href = relatedLink;
    $urlLink.textContent = relatedLink;
    $urlLink.target = "_blank";
    $urlLink.addEventListener("click", (e) => e.stopPropagation());
    $urlWrapper.appendChild($linkIcon);
    $urlWrapper.appendChild($urlLink);

    $infoWrapper.appendChild($dateWrapper);
    $infoWrapper.appendChild($urlWrapper);

    $todoContainer.appendChild($infoWrapper);

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
