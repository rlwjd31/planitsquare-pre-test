/**
 * 헤더 컴포넌트를 생성합니다.
 * @param {Object} props
 * @param {number} props.totalTodosCount - 전체 할 일 개수
 * @param {number} props.completedTodosCount - 완료된 할 일 개수
 * @returns {HTMLHeadingElement} 헤더 엘리먼트
 */
export default function Header({
  totalTodosCount = 0,
  completedTodosCount = 0,
}) {
  const $headerWrapper = document.createElement("div");
  $headerWrapper.className = "header-wrapper";

  const $header = document.createElement("h1");
  $header.className = "header";
  $header.textContent = "To-Do";
  $headerWrapper.appendChild($header);

  const $progressWrapper = document.createElement("div");
  $progressWrapper.className = "progress-bar-wrapper";

  // circular progress bar 생성
  const $circularProgress = document.createElement("div");
  $circularProgress.className = "circular-progress";

  const progressPercentage =
    totalTodosCount > 0 ? (completedTodosCount / totalTodosCount) * 100 : 0;
  const circumference = 2 * Math.PI * 45; // 원 둘레
  const strokeDasharray = circumference;
  const strokeDashoffset =
    circumference - (progressPercentage / 100) * circumference;

  // r은 size 100px보다 작게 설정하여 깔끔.
  $circularProgress.innerHTML = `
    <svg class="progress-svg" viewBox="0 0 100 100">
      <circle class="progress-bg" cx="50" cy="50" r="45"/>
      <circle class="progress-fill" cx="50" cy="50" r="45" 
        stroke-dasharray="${strokeDasharray}" stroke-dashoffset="${strokeDashoffset}" 
        transform="rotate(-90 50 50)"/>
    </svg>
    <div class="progress-text">${completedTodosCount} / ${totalTodosCount}</div>
  `;

  $progressWrapper.appendChild($circularProgress);
  $headerWrapper.appendChild($progressWrapper);

  return $headerWrapper;
}
