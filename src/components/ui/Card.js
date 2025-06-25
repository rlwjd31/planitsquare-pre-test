/**
 * Card 컴포넌트
 * @param {Object} props
 * @param {HTMLElement[] | HTMLElement } props.children - 카드 내부에 들어갈 요소(들)
 * @returns {HTMLDivElement}
 */
export default function Card({ children }) {
  this.$card = document.createElement("div");
  this.$card.className = "card";

  if (Array.isArray(children)) {
    children.forEach((child) => this.$card.appendChild(child));
  } else if (children instanceof Node) {
    this.$card.appendChild(children);
  }

  return this.$card;
}
