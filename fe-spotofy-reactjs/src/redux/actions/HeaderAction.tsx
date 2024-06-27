export const BACKGROUND_COLOR = "BACKGROUND_COLOR";
export const SEARCH_TERM = "SEARCH_TERM";

export const setBackgroundHeader = (backgroundColor: string) => ({
  type: BACKGROUND_COLOR,
  payload: backgroundColor,
});
export const setSearchTerm = (search: string) => ({
  type: SEARCH_TERM,
  payload: search,
});
