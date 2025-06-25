export default function Header() {
  this.$header = document.createElement("h1");
  this.$header.className = "header";
  this.$header.textContent = "To-Do";

  return this.$header;
}