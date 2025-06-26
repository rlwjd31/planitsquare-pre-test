const iconMap = {
  delete: "./src/assets/delete.svg",
  check: "./src/assets/check.svg",
  calendar: "./src/assets/calendar.svg",
  filter: "./src/assets/filter.svg",
  add: "./src/assets/add.svg",
  link: "./src/assets/link.svg",
  pencil: "./src/assets/pencil.svg",
};

/**
 * 아이콘 컴포넌트
 * @param {Object} props
 * @param {'delete' | 'check' | 'calendar' | 'filter' | 'add' | 'link' | 'pencil'} props.variant - 아이콘 종류
 * @param {string} props.size - 아이콘 크기 (e.g. '24px', '1rem')
 * @returns {HTMLImageElement}
 */
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
