import { CHART_TYPES,MIME_TYPES } from "./index"

export type ChartType = typeof CHART_TYPES[keyof typeof CHART_TYPES]
export type MimeType = (typeof MIME_TYPES)[keyof typeof MIME_TYPES];
