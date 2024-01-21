/**
 * サインアップフォームの入力値
 *
 * @property username ユーザー名
 * @property email メールアドレス
 * @property agreeToTerms 利用規約に同意するか
 * @property password パスワード
 * @property passwordConfirm パスワード（確認用）
 */
export type SignupFormInput = {
  username: string;
  email: string;
  agreeToTerms: boolean;
  password: string;
  passwordConfirm: string;
};
