const parseDate = (date) =>
  date.toLocaleDateString("ko-KR", {
    month: "short",
    day: "numeric",
  });

export default parseDate;
