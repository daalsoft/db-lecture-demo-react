export const MenuType = {
  HOME: "/",
  BASIC: "/basic",
  COMPARE: "/compare",
  TUNING: "/tuning",
  WORD: "/word",
  TUNINGLECTURE: "/tuning-lecture",
  PRACTICE: "/practice",
  DOCKER: "/docker"
} as const;

export type MenuType = typeof MenuType[keyof typeof MenuType];

export const menuList = [
  { path: MenuType.HOME, label: "Home" },
  { path: MenuType.BASIC, label: "DB 기본 개념" },
  { path: MenuType.COMPARE, label: "DB별 비교" },
  { path: MenuType.TUNING, label: "성능 튜닝" },
  { path: MenuType.WORD, label: "용어" },
  { path: MenuType.TUNINGLECTURE, label: "튜닝강의" },
  //{ path: MenuType.PRACTICE, label: "실습 SQL" },
  //{ path: MenuType.DOCKER, label: "Docker 환경" }
];
