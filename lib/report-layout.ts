/** Shared report canvas measurements — keep intro + report in sync */
export const REPORT_ARTICLE_WIDTH = 2356;
export const REPORT_ARTICLE_HEIGHT = 3525;
export const REPORT_CARD_INSET = 71;
export const REPORT_CARD_TOP = 80;

/** Padding % so page-level intro aligns with white card outer edges */
export const reportCardEdgePadding = {
  paddingLeft: `${(REPORT_CARD_INSET / REPORT_ARTICLE_WIDTH) * 100}%`,
  paddingRight: `${(REPORT_CARD_INSET / REPORT_ARTICLE_WIDTH) * 100}%`,
};
