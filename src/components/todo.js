import Badge from "./ui/Badge.js";
import ButtonIcon from "./ui/ButtonIcon.js";
import Card from "./ui/Card.js";
import Checkbox from "./ui/Checkbox.js";
import Icon from "./ui/Icon.js";

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
 * @returns {HTMLDivElement}
 */
export default function Todo({ todo, toggleTodoStatus }) {
  const { id, title, status, description, period, relatedLink, priority } =
    todo;

  const $todoContainer = document.createElement("div");
  $todoContainer.className = "todo-container";

  // todo-title-section
  const $titleWrapper = document.createElement("div");
  $titleWrapper.className = "todo-title-wrapper";
  const $checkbox = new Checkbox({
    value: id,
    onChange: toggleTodoStatus,
    isChecked: status === "DONE",
    name: "todo",
    readOnly: status === "DONE",
  });
  const $title = document.createElement("span");
  $title.className = "todo-title";
  $title.textContent = title;
  $title.addEventListener("click", () => toggleTodoStatus(id));

  $titleWrapper.appendChild($checkbox);
  $titleWrapper.appendChild($title);
  $todoContainer.appendChild($titleWrapper);

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
  const $priorityBadge = new Badge({ text: priority });

  $metaWrapper.appendChild($statusBadge);
  $metaWrapper.appendChild($priorityBadge);
  $todoContainer.appendChild($metaWrapper);

  // 변경, 삭제를 위한 icon(delete, pencil)
  const $iconWrapper = document.createElement("div");
  $iconWrapper.className = "icon-wrapper";
  const $deleteButtonIcon = new ButtonIcon({
    buttonVariant: "outline",
    iconSize: "24px",
    iconVariant: "delete",
    onClick: () => {
      console.log("delete icon button clicked");
    },
    text: "",
  });
  $deleteButtonIcon.classList.add("delete-btn-icon");
  const $editButtonIcon = new ButtonIcon({
    buttonVariant: "outline",
    iconSize: "24px",
    iconVariant: "pencil",
    onClick: () => {
      console.log("pencil icon button clicked");
    },
    text: "",
  });
  $editButtonIcon.classList.add("edit-btn-icon");
  $iconWrapper.appendChild($deleteButtonIcon);
  
  if (status === "TODO") {
    $iconWrapper.appendChild($editButtonIcon);
  }
  
  $todoContainer.appendChild($iconWrapper);

  return new Card({ children: [$todoContainer], status });
}
