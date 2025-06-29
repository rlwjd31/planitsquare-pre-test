import Icon from "./Icon.js";

/**
 * 아이콘이 포함된 버튼 컴포넌트
 * @param {Object} props 버튼 속성
 * @param {'fill' | 'outline'} props.buttonVariant 버튼의 종류
 * @param {'delete' | 'check' | 'calendar' | 'filter' | 'add'} props.iconVariant 아이콘의 종류 (Material Icons 기준)
 * @param {string} props.iconSize 아이콘의 크기 (e.g. '24px')
 * @param {'submit' | 'button'} props.type 버튼의 타입
 * @param {boolean} props.isPending 버튼의 로딩 상태로 버튼 비활성화에 사용
 * @param {string} props.text 버튼 텍스트
 * @param {(event: MouseEvent) => void} props.onClick 버튼 클릭 이벤트 핸들러
 * @returns {HTMLButtonElement} 버튼 엘리먼트
 */
export default function ButtonIcon({
  type = "button",
  isPending,
  text,
  onClick,
  buttonVariant,
  iconVariant,
  iconSize,
}) {
  this.$buttonIcon = document.createElement("button");
  this.$buttonIcon.type = type;
  this.$text = document.createElement("span");
  this.$icon = new Icon({
    variant: iconVariant,
    size: iconSize,
  });
  this.state = {};

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    // button text
    this.$text.textContent = text;

    // button, 실질적으로 button기능과 wrapper 역할
    this.$buttonIcon.className = "btn btn-icon";
    this.$buttonIcon.setAttribute("data-variant", buttonVariant);
    this.$buttonIcon.disabled = !!isPending;
    this.$buttonIcon.addEventListener(
      "click",
      onClick && typeof onClick === "function" ? onClick : () => {}
    );

    this.$buttonIcon.appendChild(this.$icon);
    if (text) {
      this.$buttonIcon.appendChild(this.$text);
    }
  };

  this.render();

  return this.$buttonIcon;
}
