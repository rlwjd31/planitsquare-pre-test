import Badge from "./ui/Badge.js";
import Card from "./ui/Card.js";
import Checkbox from "./ui/Checkbox.js";
import Icon from "./ui/Icon.js";

/**
 * @param {Object} props
 * @param {{
 *   id: string;
 *   title: string;
 *   status: 'HOLD' | 'DONE' | 'TODO';
 *   description: string;
 *   period: {
 *     start: Date;
 *     end: Date;
 *   };
 *   relatedLink: string;
 *   priority: 'HIGH' | 'MEDIUM' | 'LOW';
 *   createdAt: Date;
 * }} props.todo
 * @returns {HTMLDivElement}
 */
export default function Todo({ todo }) {
  const $todoContainer = document.createElement("div");
  $todoContainer.className = "todo-container";

  // todo-title-section
  const $titleWrapper = document.createElement("div");
  $titleWrapper.className = "todo-title-wrapper";
  const $checkbox = new Checkbox({
    value: todo.id,
    onChange: (value) => {
      console.log("상위에서", value);
    },
    isChecked: todo.status === "DONE",
    name: "todo",
    readOnly: todo.status === "DONE",
  });
  const $title = document.createElement("span");
  $title.className = "todo-title";
  $title.textContent = todo.title;

  $titleWrapper.appendChild($checkbox);
  $titleWrapper.appendChild($title);
  $todoContainer.appendChild($titleWrapper);

  // todo description section
  const $description = document.createElement("p");
  $description.className = "todo-description";
  $description.textContent = todo.description;
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
  const [start, end] = Object.values(todo.period).map((date) =>
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
  $urlLink.href = todo.relatedLink;
  $urlLink.textContent = todo.relatedLink;
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
  const $statusBadge = new Badge({ text: todo.status });
  const $priorityBadge = new Badge({ text: todo.priority });

  $metaWrapper.appendChild($statusBadge);
  $metaWrapper.appendChild($priorityBadge);

  $todoContainer.appendChild($metaWrapper);



  return new Card({ children: [$todoContainer] });
}
