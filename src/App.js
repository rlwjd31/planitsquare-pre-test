import Button from "./components/ui/Button.js";
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

    $root.appendChild($main);
  };

  this.init();
  this.setState({});
  // this.render(); 👉🏻 setState에서 한 번 rendering이 되므로 주석처리

  return document.createElement("div");
}
