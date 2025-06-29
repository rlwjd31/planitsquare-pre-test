const STORAGE_KEY = "todos";
/**
 * state persistence with localStorage
 * @returns {Array<{
 *   id: string;
 *   title: string;
 *   status: 'DONE' | 'TODO';
 *   description: string;
 *   period: { start: Date; end: Date };
 *   relatedLink: string;
 *   priority: 'HIGH' | 'MEDIUM' | 'LOW';
 * }> | []} 빈 배열이나 TODO 타입의 배열을 반환합니다.
 */
export const getFromStorage = () => {
  try {
    const todosString = localStorage.getItem(STORAGE_KEY);
    if (!todosString) return [];

    const todos = JSON.parse(todosString);

    return todos.map((todo) => {
      try {
        // Date 객체 생성 및 유효성 검사
        const startDate = new Date(todo.period?.start);
        const endDate = new Date(todo.period?.end);

        // Invalid Date 체크
        if (isNaN(startDate.getTime())) {
          throw new Error(`Invalid start date: ${todo.period?.start}`);
        }
        if (isNaN(endDate.getTime())) {
          throw new Error(`Invalid end date: ${todo.period?.end}`);
        }

        return {
          ...todo,
          period: {
            start: startDate,
            end: endDate,
          },
        };
      } catch (todoError) {
        console.warn("Failed to parse todo:", todo, todoError);
        // 에러를 다시 throw하여 상위에서 처리
        throw new Error(`Todo parsing failed: ${todoError.message}`);
      }
    });
  } catch (error) {
    console.error("Failed to get todos from storage:", error);
    return [];
  }
};

/**
 * todos를 localStorage에 저장.
 * @param {Array} todos - 저장할 todos 배열
 */
export const saveAtStorage = (todos) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Failed to save todos to storage:", error);
  }
};
