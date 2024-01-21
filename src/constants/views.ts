/**
 * 画面の定義
 */
export const views = {
  TOP: {
    path: "/",
    name: "トップ",
  },
  STUDY_LIST: {
    path: "/study/list",
    name: "学習一覧",
  },
  STUDY_DETAIL: {
    path: "/study/detail",
    name: "学習詳細",
  },
  STUDY_REGISTER: {
    path: "/study/register",
    name: "学習登録",
  },
  STUDY_UPDATE: {
    path: "/study/update",
    name: "学習更新",
  },
  STUDY_TAG_LIST: {
    path: "/study/tag/list",
    name: "タグ一覧",
  },
  STUDY_REVIEW_LIST: {
    path: "/study/review/list",
    name: "復習一覧",
  },
  AUTH_LOGIN: {
    path: "/auth/login",
    name: "ログイン",
  },
  AUTH_SIGNUP: {
    path: "/auth/signup",
    name: "新規登録",
  },
  AUTH_SIGNUP_SUCCESS: {
    path: "/auth/signup/success",
    name: "新規登録完了",
  },
  ERROR_INTERNAL_SERVER_ERROR: {
    path: "/error/internal_server_error",
    name: "サーバーエラー",
  },
  ERROR_NOT_FOUND: {
    path: "/error/not_found",
    name: "ページが見つかりません",
  },
};
