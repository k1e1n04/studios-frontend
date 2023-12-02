/**
 * ページングレスポンスDTO
 *
 * @property totalElements 総件数
 * @property totalPages 総ページ数
 * @property pageNumber ページ番号
 * @property pageElements 1ページあたりの件数
 */
export type PageResponseDto = {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageElements: number;
};
