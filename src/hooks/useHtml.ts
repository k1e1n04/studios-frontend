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
  const sanitizeHtml = (html: string, options = {}) => {
    return DOMPurify.sanitize(html, options);
  };

  return { sanitizeHtml } as const;
};
