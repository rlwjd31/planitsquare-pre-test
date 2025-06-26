/**
 * 우선순위 뱃지 컴포넌트
 * @param {Object} props
 * @param {'HIGH' | 'MEDIUM' | 'LOW' | 'TODO' | 'HOLD' | 'DONE'} props.text - 우선순위 & 상태 텍스트
 * @returns {HTMLDivElement}
 */
export default function Badge({ text = "MEDIUM" }) {
  this.$badge = document.createElement("div");

  // 우선순위별 색상 매핑
  const colorMap = {
    HIGH: "var(--priority-high)",
    MEDIUM: "var(--priority-medium)",
    LOW: "var(--priority-low)",
    TODO: "var(--status-todo)",
    HOLD: "var(--status-hold)",
    DONE: "var(--status-done)",
  };

  this.$badge.className = `badge badge-${text.toLowerCase()}`;
  this.$badge.textContent = text;
  this.$badge.style.backgroundColor = colorMap[text] || colorMap.MEDIUM;

  return this.$badge;
}
