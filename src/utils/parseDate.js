export const parseDate = (date) =>
  date.toLocaleDateString("ko-KR", {
    month: "short",
    day: "numeric",
  });

// input type="date"의 value를 설정하기 위해 Date 객체를 YYYY-MM-DD로 변환하는 유틸 함수
export const formatDateToInputValue = (date) => {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d)) return "";
  return d.toISOString().slice(0, 10);
};
