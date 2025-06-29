# 📝 Todo List Application(플랜잇스퀘어 사전과제)

## 기본 기능(요구사항)
- [x] 할 일을 입력하는 컴포넌트는 <input type=”text”> 에 할 일을 입력하고 TodoList의 데이터에 입력된 할 일이 추가되고, 할 일의 상태가 변경될 때 마다 localStorage에 저장합니다.
- [x] 할 일 추가는 버튼 클릭 시, 혹은 엔터키 입력시 처리되게 구성하고 할 일을 삭제하는 버튼 추가 및 기능 구현합니다.
- [x] 할 일이 완료 된 경우 제목을 클릭하면 해당 할 일을 완료처리.(한번 더 클릭 시 완료 취소) 완료처리 UI는 완료된 느낌이 들도록 자유롭게 표현합니다.
- [x] 완료되지 않은 할 일은 제목 수정이 가능하게 기능 구현하고 개별 할 일을 선택해야 하므로 체크박스 UI도 추가합니다. 체크한 할 일의 제목은 input 컴포넌트에 표시되고 수정이 가능합니다. 완료 된 할 일은 input 의 상태가 read-only가 됩니다.
- [x] 최초 앱 실행 시에는 등록된 할 일이 없으므로 목록에 빈 데이터 UI를 보여주고, 등록한 목록이 있는경우 localStorage 에서 불러오게 구성합니다. (페이지 새로고침 시에도)
- [x] 목록 전체 완료/삭제 기능을 구현합니다.
- [x] 완료된 할 일 갯수 / 전체갯수를 표시하는 컴포넌트를 구현합니다.  

## 추가 구현
- [x] Todo 상세 정보 관리 (설명, 기간, 우선순위, 관련 링크)
- [x] JSDoc을 활용한 타입 안정성
- [x] 키보드 접근성 지원
- [x] 반응형 레이아웃 (Grid, text ellipsis ...)
- [x] 입력값 유효성 검사
- [x] 원형 프로그레스 바로 진행률 시각화

## 결과물 
<img width="1140" alt="image" src="https://github.com/user-attachments/assets/f7d9552d-5780-47f8-929e-a95df1f94f77" />


# 🚀 실행방법
   ```bash
   $) git clone https://github.com/rlwjd31/planitsquare-pre-test.git
   $) cd planitsquare-pre-test
   ```

   이후 `live-server` 실행

# 데이터 구조
```typescript
{
  id: string;                    // 고유 ID
  title: string;                 // 할 일 제목
  status: 'DONE' | 'TODO';       // 완료 상태
  description: string;           // 상세 설명
  period: {
    start: Date;                 // 시작일
    end: Date;                    // 종료일
  },
  relatedLink: string;           // 관련 링크
  priority: 'HIGH' | 'MEDIUM' | 'LOW'; // 우선순위
}
```

# 📁 폴더구조

```
src/
├── components/          # UI 컴포넌트들
│   ├── features/       # 비즈니스 로직 컴포넌트 (Todo, TodoList 등)
│   ├── layouts/        # 레이아웃 컴포넌트 (Header 등)
│   └── ui/            # 재사용 가능한 UI 컴포넌트 (Button, Input 등)
├── styles/            # CSS 스타일 파일들
│   ├── features/      # 기능별 스타일
│   ├── layouts/       # 레이아웃 스타일
│   └── ui/           # UI 컴포넌트 스타일
├── utils/             # 유틸리티 함수들
├── mock/              # 목업 데이터
├── constants/         # 상수 정의
├── assets/           # 이미지, 아이콘 등 정적 자원
└── App.js            # 메인 애플리케이션 컴포넌트
```

# 1. localStorage 읽고 쓰기 및 state와 연동
![untitle](https://github.com/user-attachments/assets/85e7ed5c-ad49-4353-ac72-801816f6e114)

- 상태 변경 시 localStorage에 저장
- 처음 todos는 빈 배열
- 접속 시 localStorage에 접근하여 상태와 연동
할 일을 입력하면 TodoList에 추가되고, 상태 변경 시 localStorage에 자동 저장됩니다.
```javascript
// src/App.js
this.setState = (nextState) => {
  this.state = nextState;
  saveAtStorage(this.state.todos); // localStorage에 자동 저장
  this.render();
};

// src/utils/statePersistence.js
const STORAGE_KEY = "todos";

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

```

# 2. Todo 추가 및 삭제
- input내의 Enter를 통한 추가
- input옆의 `add todo` button을 통한 추가
- button icon을 통한 Todo 삭제
  
## Input내 Enter를 통한 추가
- 값 검증 후 빈 값일 시 update 무효화
- 빈 값 alert이후 다시 focus
  
![untitle](https://github.com/user-attachments/assets/622899f9-d4ac-4520-b438-d63a8eb923a6)


```javascript
// App.js
this.updateTodo = (todoId, updatedTodo) => {
  this.setState({
    todos: this.state.todos.map((todo) =>
      todo.id === todoId
        ? {
            ...todo,
            ...updatedTodo,
          }
        : todo
    ),
  });
};

// TodoControlPanel.js
const $input = new Input({
  placeholder: "Add Todo",
  onEnter: (e) => {
    if (e.target.value.trim() === "") {
      alert("할 일을 입력해주세요.");
      $input.focus();
      return;
    }
    addTodo(e.target.value);
  },
  name: "add-todo-input",
});
```

## Button을 통한 추가

![untitle](https://github.com/user-attachments/assets/2a5250da-9678-48fe-af9f-486192529ddd)

```javascript
const $addTodoButtonIcon = new ButtonIcon({
  buttonVariant: "fill",
  iconVariant: "add",
  iconSize: "24px",
  text: "Add Todo",
  onClick: () => {
    if ($input.value.trim() === "") {
      alert("할 일을 입력해주세요.");
      $input.focus();
      return;
    }
    addTodo($input.value);
  },
});
```

## 삭제 기능

![untitle](https://github.com/user-attachments/assets/22327faa-fa76-4507-a592-3ced22b84550)
```javascript
// App.js
this.deleteTodo = (todoId) => {
  this.setState({
    todos: this.state.todos.filter((todo) => todo.id !== todoId),
  });
};

// Todo.js
const $deleteButtonIcon = new ButtonIcon({
  buttonVariant: "outline",
  iconSize: "24px",
  iconVariant: "delete",
  onClick: () => deleteTodo(id),
  text: "",
});
```

# 3. 할일 완료 및 UI 처리
완료된 todo는 `input.readOnly=true` 설정하고 수정을 trigger하는 checkbox에 `disabled` 속성을 부여하고 수정하지 못 하도록 구현했습니다.


- Todo의 title을 클릭하면 완료 <-> 미완료로 toggle
- 완료 시 => 파란색, 미완료 시 => 살짝 회색

![untitle](https://github.com/user-attachments/assets/de4a5d50-46fe-4610-8b72-cf6d40450fb8)


```javascript
// src/App.js
this.toggleTodoStatus = (todoId) => {
  const updatedTodos = this.state.todos.map((todo) => {
    if (todo.id === todoId) {
      return {
        ...todo,
        status: todo.status === "DONE" ? "TODO" : "DONE",
      };
    }
    return todo;
  });
  this.setState({ todos: updatedTodos });
};

// TodoTitleSection.js
import { TODO_FORM_FIELD } from "../../constants/todoFormField.js";
import Checkbox from "../ui/Checkbox.js";
import Input from "../ui/Input.js";

/**
 * Todo 아이템의 제목 섹션 컴포넌트
 * @param {Object} props
 * @param {string} props.todoId - todo의 고유 id
 * @param {string} props.title - todo의 제목
 * @param {boolean} props.isDone - todo의 상태
 * @param {(event: FocusEvent) => void} props.onBlurTitle - 제목 입력 필드의 blur 이벤트 핸들러
 * @param {(event: InputEvent) => void} props.onEnterTitle - 제목 입력 필드의 enter 이벤트 핸들러
 * @param {(event: InputEvent) => void} props.onChangeCheckbox - 체크박스 변경 이벤트 핸들러
 * @param {(todoId: string) => void} props.toggleTodoStatus - todo 상태 토글 함수
 * @param {boolean} props.isEditMode - 편집 모드 여부
 * @returns {HTMLDivElement} 제목 섹션 엘리먼트
 */
export default function TitleSection({
  ... //
  todoId,
  title,
  isDone,
  toggleTodoStatus,
  isEditMode,
}) {
  ... //

  const $checkbox = new Checkbox({
    ... //
    isChecked: isEditMode,
    // 👇 완료된 todo는 수정을 trigger하는 checkbox의 기본동작을 막아 수정을 하지 못 하게 함.
    disabled: isDone,  
  });

  const $editInput = new Input({
    ... //
    readOnly: isDone, // 👉🏻 완료된 Todo의 input은 read-only 활성화
  });
  $editInput.classList.add("todo-title");
  $editInput.classList.toggle("edit-mode", isEditMode);

  ... //
}

```

# 4. Todo 수정 및 체크박스 UI
Todo의 수정은 `제목, 설명, 기간, 우선순위`가 변경 가능합니다. 이는 각각 Todo를 구성하는 `Title, Description, Info, Meta` component에 코드가 작성되어 있습니다.
과제의 요구사항에 따라 `Enter`는 제목만 변경하며 `form submit button`을 통해 전체 todo 정보를 업데이트하도록 구현했습니다.

- 편집(수정) 모드일 때는 `form`으로 감싸 input name을 통해 value에 접근
- checkbox를 클릭하여 편집(수정) 모드로 변경
- 편집의 유무는 `state.isEditMode` 상태로 관리
- checkbox는 실질적인 checkbox는 숨기고 div로 style처리

### Enter를 이용한 제목 변경

![untitle](https://github.com/user-attachments/assets/ffa0ff69-46e3-41be-8f85-6dd7f12530c0)

### submit button을 이용한 todo 전체 정보 변경

![untitle](https://github.com/user-attachments/assets/64e2bf8a-60a6-4a07-95b8-776d285f3ec3)


```javascript
// Checkbox.js
export default function CheckBox({
  isChecked = false,
  onChange = () => {},
  name = "",
  value,
  disabled = false,
}) {
  this.$checkbox = document.createElement("input");
  this.$wrapper = document.createElement("div");
  this.$checkIcon = new Icon({ variant: "check", size: "20px" });

  this.render = () => {
    // 숨김처리한 실제 checkbox
    this.$checkbox.type = "checkbox";
    ... // checkbox attribute 설정

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

    ... // $wrapper에 추가
  };

  this.render();

  return this.$wrapper;
}
```


```javascript
// App.js
this.submitForm = (e) => {
  e.preventDefault();
  const formData = new FormData($form);
  const todoData = {
    title: formData.get(TODO_FORM_FIELD.TITLE),
    description: formData.get(TODO_FORM_FIELD.DESCRIPTION),
    startDate: formData.get(TODO_FORM_FIELD.START_DATE),
    endDate: formData.get(TODO_FORM_FIELD.END_DATE),
    priority: formData.get(TODO_FORM_FIELD.PRIORITY),
  };

  updateTodo(id, {
    ...todoData,
    period: {
      start: todoData.startDate ? new Date(todoData.startDate) : null,
      end: todoData.endDate ? new Date(todoData.endDate) : null,
    },
  });
};

... //

const todoSections = [
  $titleSection,
  $descriptionSection,
  $infoSection,
  $metaSection,
  $iconWrapper,
];

todoSections.forEach((section) =>
  this.state.isEditMode
    ? $form.appendChild(section)
    : $todoContainer.appendChild(section)
);


// TodoTitleSection.js
export default function TitleSection({
  ... //
  title,
  isDone,
  isEditMode,
}) {
  ... //
  const $checkbox = new Checkbox({
    ... //
    onChange: onChangeCheckbox,
    isChecked: isEditMode,
  });

  const $editInput = new Input({
    ... //
    onEnter: onEnterTitle,
    name: TODO_FORM_FIELD.TITLE,
  });

  ... //
  return $titleWrapper;
}

```

# 5. Todo 전체 완료 및 삭제
`App.js`에서 관리하는 state 변경을 위해 App.js 내부에서 선언한 함수를 callback으로 넘겨 event를 trigger하는 요소와 묶어서 구현했습니다.

![untitle](https://github.com/user-attachments/assets/bae1ed90-1c0f-4855-898c-60b3f1ab3565)

```javascript
// App.js
this.completeAllTodos = () => {
 this.setState({
   todos: this.state.todos.map((todo) => ({ ...todo, status: "DONE" })),
 });
};

this.deleteAllTodos = () => {
 this.setState({ todos: [] });
};

// TodoControlPanel.js
const $bulkWrapper = document.createElement("div");

const $completeAllButton = new Button({
 variant: "fill",
 onClick: completeAllTodos,
 text: "전체 완료",
});
$bulkWrapper.appendChild($completeAllButton);
const $deleteAllButton = new Button({
 variant: "fill",
 onClick: deleteAllTodos,
 text: "전체 삭제",
});
```

# 6. Todo 진행 정보(할 일 개수 / 전체 개수)
Todo의 진행 정보를 `할 일 개수 / 전체 개수`로 나타내며 시각적으로 더 잘 표현하기 위해 `circular progress bar` UI를 구현했습니다.

![untitle](https://github.com/user-attachments/assets/f2bfd8e9-dced-4c27-a21d-6cddee254c2b)


```javascript
// Header.js
export default function Header({
  totalTodosCount = 0,
  completedTodosCount = 0,
}) {
  ... //
  const progressPercentage =
    totalTodosCount > 0 ? (completedTodosCount / totalTodosCount) * 100 : 0;
  const circumference = 2 * Math.PI * 45; // 원 둘레
  const strokeDasharray = circumference;
  const strokeDashoffset =
    circumference - (progressPercentage / 100) * circumference;

  // r은 size 100px보다 작게 설정하여 깔끔.
  $circularProgress.innerHTML = `
    <svg class="progress-svg" viewBox="0 0 100 100">
      <circle class="progress-bg" cx="50" cy="50" r="45"/>
      <circle class="progress-fill" cx="50" cy="50" r="45" 
        stroke-dasharray="${strokeDasharray}" stroke-dashoffset="${strokeDashoffset}" 
        transform="rotate(-90 50 50)"/>
    </svg>
    <div class="progress-text">${completedTodosCount} / ${totalTodosCount}</div>
  `;

  ... //
}
```

# 7. 웹 접근성을 통한 수정
![untitle](https://github.com/user-attachments/assets/5b555ef2-dead-4137-8767-586a07d90ca3)




