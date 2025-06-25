import Button from "./components/ui/Button.js";
import CheckBox from "./components/ui/CheckBox.js";
import Icon from "./components/ui/Icon.js";
import Input from "./components/ui/Input.js";

export default function App() {
  this.state = {}; // todo state 초기화

  this.init = () => {
    // TODO: 나중에 state persistence기능 구현하기
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const $root = document.getElementById("app");
    const $main = document.createElement("main");
    const $button = new Button({
      text: "button test",
      onClick: () => alert("button clicked"),
      isPending: false,
    });

    $main.appendChild($button);

    const $input = new Input({
      value: "custom input",
      placeholder: "input test",
      onChange: (e) => console.log(e.target.value),
    });
    $main.appendChild($input);

    const $checkbox = new CheckBox({
      isChecked: true,
      onChange: (value) => console.log(value),
      value: "this is checkbox",
      name: "checkbox name",
    });

    $main.appendChild($checkbox);

    // SVG 아이콘 렌더링 (img 태그 사용)
    ["delete", "check", "calendar", "filter", "add"].forEach((variant) => {
      $main.appendChild(new Icon({ variant, size: "28px" }));
    });

    $root.appendChild($main);
  };

  this.init();
  this.setState({});
  // this.render(); 👉🏻 setState에서 한 번 rendering이 되므로 주석처리

  return document.createElement("div");
}
