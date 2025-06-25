/**
 * 버튼 컴포넌트
 * @param {Object} props 버튼 속성
 * @param {boolean} props.isPending 버튼의 로딩 상태로 버튼 비활성화에 사용
 * @param {string} props.text 버튼 텍스트
 * @param {(event: MouseEvent) => void} props.onClick 버튼 클릭 이벤트 핸들러
 * @returns {HTMLButtonElement} 버튼 엘리먼트
 */
export default function Button({ isPending, text, onClick }) {
  this.$button = document.createElement("button");
  this.state = {};

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$button.textContent = text;
    this.$button.className = "btn";
    this.$button.disabled = !!isPending;
    this.$button.addEventListener(
      "click",
      onClick && typeof onClick === "function" ? onClick : () => {}
    );
  };

  this.render();

  return this.$button;
}
