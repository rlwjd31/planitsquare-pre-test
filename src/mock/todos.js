/**
 * @typedef {Object} TODO
 * @property {string} id - 고유 id
 * @property {string} title - todo의 제목
 * @property {'HOLD' | 'DONE' | 'TODO'} status - 잠시 멈춤 | 끝냄 | 해야될 일 (sort 기능)
 * @property {string} description - 추후 tooltip에서 사용하기
 * @property {{ start: Date, end: Date }} period - todo를 끝내야 할 기간
 * @property {string} relatedLink - todo와 관련된 링크
 * @property {'HIGH' | 'MEDIUM' | 'LOW'} priority - 우선순위 (높음: red, 중간: green, 낮음: yellow/orange)
 */

// TODO 타입에 맞는 mock 데이터 10개

export const todos = [
  {
    id: "1",
    title: "신규 사용자 온보딩 완료",
    status: "TODO",
    description: "신규 사용자를 위한 온보딩 절차를 모두 완료해야 합니다.",
    period: { start: new Date("2024-06-01"), end: new Date("2024-06-03") },
    relatedLink: "https://www.naver.com",
    priority: "HIGH",
  },
  {
    id: "2",
    title: "프로젝트 문서 작성",
    status: "HOLD",
    description: "프로젝트의 주요 문서를 초안 작성 및 검토합니다.",
    period: { start: new Date("2024-06-02"), end: new Date("2024-06-10") },
    relatedLink: "https://www.google.com",
    priority: "MEDIUM",
  },
  {
    id: "3",
    title: "로그인 버그 수정",
    status: "TODO",
    description: "QA에서 제보된 로그인 문제를 해결합니다.",
    period: { start: new Date("2024-06-01"), end: new Date("2024-06-02") },
    relatedLink: "https://github.com",
    priority: "HIGH",
  },
  {
    id: "4",
    title: "의존성 패키지 업데이트",
    status: "DONE",
    description: "npm 패키지들을 최신 버전으로 업데이트합니다.",
    period: { start: new Date("2024-05-25"), end: new Date("2024-05-27") },
    relatedLink: "https://react.dev",
    priority: "LOW",
  },
  {
    id: "5",
    title: "랜딩 페이지 디자인",
    status: "HOLD",
    description: "새로운 랜딩 페이지의 와이어프레임을 제작합니다.",
    period: { start: new Date("2024-06-05"), end: new Date("2024-06-15") },
    relatedLink: "https://www.figma.com",
    priority: "MEDIUM",
  },
  {
    id: "6",
    title: "대시보드 코드 리팩토링",
    status: "TODO",
    description: "대시보드 코드 구조와 가독성을 개선합니다.",
    period: { start: new Date("2024-06-03"), end: new Date("2024-06-07") },
    relatedLink: "https://developer.mozilla.org",
    priority: "LOW",
  },
  {
    id: "7",
    title: "2분기 리포트 준비",
    status: "DONE",
    description: "2분기 리포트 작성을 위한 데이터 수집 및 분석을 진행합니다.",
    period: { start: new Date("2024-05-20"), end: new Date("2024-05-31") },
    relatedLink: "https://www.kakaocorp.com",
    priority: "HIGH",
  },
  {
    id: "8",
    title: "주간 팀 미팅",
    status: "TODO",
    description: "주간 팀 미팅을 통해 진행 상황을 공유합니다.",
    period: { start: new Date("2024-06-04"), end: new Date("2024-06-04") },
    relatedLink: "https://zoom.us",
    priority: "MEDIUM",
  },
  {
    id: "9",
    title: "이미지 에셋 최적화",
    status: "HOLD",
    description: "웹사이트의 이미지 파일을 압축 및 최적화합니다.",
    period: { start: new Date("2024-06-06"), end: new Date("2024-06-09") },
    relatedLink: "https://tinypng.com",
    priority: "LOW",
  },
  {
    id: "10",
    title: "PR 리뷰 및 머지",
    status: "TODO",
    description: "대기 중인 Pull Request를 확인하고 머지합니다.",
    period: { start: new Date("2024-06-02"), end: new Date("2024-06-03") },
    relatedLink: "https://github.com/pulls",
    priority: "HIGH",
  },
];
