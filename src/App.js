import Header from "./components/layouts/Header.js";
import ButtonIcon from "./components/ui/ButtonIcon.js";
import Card from "./components/ui/Card.js";
import Input from "./components/ui/Input.js";
import Button from "./components/ui/Button.js";

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

    // add header
    $main.appendChild(new Header());

    // add todo & filter(todo control panel)
    const $todoControlPanel = new TodoControlPanel();
    $main.appendChild($todoControlPanel);

    

    $root.appendChild($main);
  };

  this.init();
  this.setState({});
  // this.render(); 👉🏻 setState에서 한 번 rendering이 되므로 주석처리

  return document.createElement("div");
}

function TodoControlPanel() {
  const $container = document.createElement("div");
  $container.className = "todo-control-panel";

  const $addTodoButtonIcon = new ButtonIcon({
    buttonVariant: "fill",
    iconVariant: "add",
    iconSize: "24px",
    text: "Add Todo",
    onClick: () => alert("add todo button clicked"),
  });

  const $filterTodoButtonIcon = new ButtonIcon({
    buttonVariant: "outline",
    iconVariant: "filter",
    iconSize: "24px",
    text: "Filters",
    onClick: () => alert("add todo button clicked"),
  });

  $container.appendChild($addTodoButtonIcon);
  $container.appendChild($filterTodoButtonIcon);

  return $container;
}
