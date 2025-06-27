import Icon from "../ui/Icon.js";
import parseDate from "../../utils/parseDate.js";

export default function TodoInfoSection({ period, relatedLink }) {
  const $infoWrapper = document.createElement("div");
  $infoWrapper.className = "todo-info-wrapper";

  const $dateWrapper = document.createElement("div");
  $dateWrapper.className = "todo-date-wrapper";
  const $calendarIcon = new Icon({
    variant: "calendar",
    size: "20px",
  });
  const $period = document.createElement("span");
  const [start, end] = Object.values(period).map(parseDate);

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

  return $infoWrapper;
}
