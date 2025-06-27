/**
 * 입력 컴포넌트
 * @param {Object} props 입력 필드 속성
 * @param {string} props.value input value
 * @param {string} props.placeholder
 * @param {boolean} props.readOnly
 * @param {(event: InputEvent) => void} props.onChange input의 event handler
 * @returns {HTMLInputElement}
 */
export default function Input({
  value = "",
  placeholder = "todo 입력",
  readOnly,
  onChange,
}) {
  this.$input = document.createElement("input");

  this.state = {};

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$input.value = value;
    this.$input.className = "input";
    this.$input.type = "text";
    this.$input.placeholder = placeholder;
    this.$input.readOnly = !!readOnly; // 과제의 요구사항에 따라 read only구현
    this.$input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && onChange && typeof onChange === "function") {
        onChange(e);
      }
    });
  };

  this.render();

  return this.$input;
}
