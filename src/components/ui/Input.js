import isFunction from "../../utils/isFunction.js";

/**
 * 입력 컴포넌트
 * @param {Object} props 입력 필드 속성
 * @param {string} props.value input value
 * @param {string} props.placeholder
 * @param {boolean} props.readOnly
 * @param {string} props.name input name 속성
 * @param {(event: InputEvent) => void} props.onChange input의 event handler
 * @param {(event: InputEvent) => void} props.onEnter input의 enter event handler
 * @returns {HTMLInputElement}
 */
export default function Input({
  value = "",
  placeholder = "todo 입력",
  readOnly,
  name,
  onChange,
  onEnter,
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
    this.$input.name = name;
    this.$input.type = "text";
    this.$input.placeholder = placeholder;
    this.$input.readOnly = !!readOnly; // 과제의 요구사항에 따라 read only구현
    this.$input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (isFunction(onEnter)) onEnter(e);
      }
    });
    this.$input.addEventListener(
      "input",
      (e) => isFunction(onChange) && onChange(e)
    );
  };

  this.render();

  return this.$input;
}
