/**
 * スタディ登録フォーム
 */
export type StudyRegisterFormInput = {
  title: string;
  tags: { name: string }[];
  content: string;
};
