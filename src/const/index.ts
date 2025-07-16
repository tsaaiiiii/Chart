export const CHART_TYPES = {
  LINE:'line',
  PIE:'pie',
  BAR:'bar'
} as const

/**
 * 檔案 MIME 類型，用於下載或匯出檔案時使用
 */
export const MIME_TYPES = {
  /**
   * EXCEL 下載檔案類型
   */
  EXCEL: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
} as const;
