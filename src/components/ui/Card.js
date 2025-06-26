/**
 * Card 컴포넌트
 * @param {Object} props
 * @param {HTMLElement[] | HTMLElement } props.children - 카드 내부에 들어갈 요소(들)
 * @param {'DONE' | 'TODO'} [props.status] - 카드 상태(선택)
 * @returns {HTMLDivElement}
 */
export default function Card({ children, status }) {
  this.$card = document.createElement("article");
  this.$card.className = "card";
  if (status) {
    this.$card.classList.add(`card-${status.toLowerCase()}`);
  }

  if (Array.isArray(children)) {
    children.forEach((child) => this.$card.appendChild(child));
  } else if (children instanceof Node) {
    this.$card.appendChild(children);
  }

  return this.$card;
}
