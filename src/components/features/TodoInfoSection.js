import Icon from "../ui/Icon.js";
import { parseDate, formatDateToInputValue } from "../../utils/parseDate.js";
import { TODO_FORM_FIELD } from "../../constants/todoFormField.js";

/**
 * Todo의 기간과 관련 링크를 표시하는 섹션 컴포넌트
 * @param {Object} props
 * @param {boolean} props.isEditMode 편집 모드 여부
 * @param {{start: Date, end: Date}} props.period Todo의 시작일과 종료일
 * @param {string} props.relatedLink Todo와 관련된 URL 링크
 * @returns {HTMLDivElement} Todo 정보를 담은 div 엘리먼트
 */
export default function TodoInfoSection({ isEditMode, period, relatedLink }) {
  const $infoWrapper = document.createElement("div");
  $infoWrapper.className = "todo-info-wrapper";

  const $dateWrapper = document.createElement("div");
  $dateWrapper.className = "todo-date-wrapper";
  const $calendarIcon = new Icon({
    variant: "calendar",
    size: "20px",
  });

  let $period = null;

  if (isEditMode) {
    const $dateWrapper = document.createElement("div");
    $dateWrapper.className = "todo-date-wrapper";
    const $startInput = document.createElement("input");
    $startInput.type = "date";
    $startInput.className = "todo-date-input";
    $startInput.value = formatDateToInputValue(period.start);
    $startInput.name = TODO_FORM_FIELD.START_DATE;
    $startInput.addEventListener("change", (e) => {
      console.log("start", e.target.value, "\t", typeof e.target.value);
    });

    const $endInput = document.createElement("input");
    $endInput.type = "date";
    $endInput.className = "todo-date-input";
    $endInput.value = formatDateToInputValue(period.end);
    $endInput.name = TODO_FORM_FIELD.END_DATE;
    $endInput.addEventListener("change", (e) => {
      console.log("end", e.target.value, "\t", typeof e.target.value);
    });

    $dateWrapper.appendChild($startInput);
    $dateWrapper.appendChild($endInput);
    $period = $dateWrapper;
  } else {
    $period = document.createElement("span");
    const [start, end] = Object.values(period).map(parseDate);

    $period.textContent = `${start} ~ ${end}`;
  }

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

  return $infoWrapper;
}
