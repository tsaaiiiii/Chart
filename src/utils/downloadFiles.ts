import { useObjectUrl } from '@vueuse/core';
import { MIME_TYPES } from '@/const';
import type { MimeType } from '@/const/types';

/**
 * 通用下載
 * @param data blob 資料
 * @param filename 檔案名稱
 * @param mimeType MIME 類型
 */
const downloadFile = (data: Blob | ArrayBuffer, filename: string, mimeType: MimeType = MIME_TYPES.EXCEL) => {
  try {
    const blob = new Blob([data], { type: mimeType });
    const url = useObjectUrl(blob);

    if (!url.value) {
      throw new Error('Failed to create object URL');
    }

    const link = document.createElement('a');
    link.href = url.value;
    link.setAttribute('download', filename);

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 300);

  } catch (error) {
    console.error('下載失敗:', error);

  }
};


/**
 * 下載 Excel blob
 * @param data blob 資料
 * @param filename 檔案名稱
 */
const downloadExcel = (data: Blob | ArrayBuffer, filename: string = 'example') => {
  downloadFile(data, `${filename}.xlsx`, MIME_TYPES.EXCEL);
};

export { downloadExcel };
