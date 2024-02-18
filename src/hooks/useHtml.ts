import DOMPurify from "dompurify";

/**
 * HTML周りの処理をまとめたカスタムフック
 */
export const useHtml = () => {
  /**
   * HTMLをサニタイズ
   * @param html HTML
   * @param options オプション
   * @returns サニタイズされたHTML
   */
  const sanitizeHtml = (html: string, options = {}): string => {
    return DOMPurify.sanitize(html, options);
  };
};
