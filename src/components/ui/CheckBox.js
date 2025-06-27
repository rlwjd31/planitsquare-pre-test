import Icon from "./Icon.js";

/**
 * 체크박스 컴포넌트
 * @param {Object} props
 * @param {boolean} [props.isChecked=false]
 * @param {(checked: boolean, value: string) => void} [props.onChange=()=>{}]
 * @param {string} [props.name=""]
 * @param {string} props.value
 * @param {boolean} [props.readOnly=false]
 */
export default function CheckBox({
  isChecked = false,
  onChange = () => {},
  name = "",
  value,
  readOnly = false,
}) {
  this.$checkbox = document.createElement("input");
  this.$wrapper = document.createElement("div");
  this.$checkIcon = new Icon({ variant: "check", size: "20px" });

  this.render = () => {
    // 숨김처리한 실제 checkbox
    this.$checkbox.type = "checkbox";
    this.$checkbox.className = "checkbox";
    this.$checkbox.checked = isChecked;
    this.$checkbox.name = name;
    this.$checkbox.value = value;
    this.$checkbox.readOnly = readOnly;
    this.$checkbox.onchange = (e) => {
      e.stopPropagation();
      onChange(e.target.value);

      // wrapper는 checkbox의 상위 요소로 선택할 방법이 없어 data attribute로 체크를 주어 style을 적용함
      this.$wrapper.setAttribute(
        "data-checked",
        e.target.checked ? "checked" : "unchecked"
      );

      this.$checkbox.checked = e.target.checked;
    };

    // custom checkbox wrapper
    this.$wrapper.className = "checkbox-wrapper";
    this.$wrapper.setAttribute(
      "data-checked",
      isChecked ? "checked" : "unchecked"
    );

    // 접근성 고려하여 enter시 체크박스 클릭
    this.$wrapper.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.$checkbox.click();
      }
    });

    this.$wrapper.appendChild(this.$checkbox);
    this.$wrapper.appendChild(this.$checkIcon);
  };

  this.render();

  return this.$wrapper;
}
