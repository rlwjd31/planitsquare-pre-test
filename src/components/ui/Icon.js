const iconMap = {
  delete: "./src/assets/delete.svg",
  check: "./src/assets/check.svg",
  calendar: "./src/assets/calendar.svg",
  filter: "./src/assets/filter.svg",
  add: "./src/assets/add.svg",
};

export default function Icon({ variant, size }) {
  this.$icon = document.createElement("img");

  this.render = () => {
    this.$icon.src = iconMap[variant];
    this.$icon.alt = `${variant} icon`;
    this.$icon.className = `${variant}-icon`;
    this.$icon.style.width = size;
    this.$icon.style.height = size;
    this.$icon.style.cursor = "pointer";
  };

  this.render();

  return this.$icon;
}
