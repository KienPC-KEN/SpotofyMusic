import { BACKGROUND_COLOR, SEARCH_TERM } from "../actions/HeaderAction";

const initialState = {
  backgroundColor: "",
  searchTerm: "",
};

const navigationReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case BACKGROUND_COLOR:
      return {
        ...state,
        backgroundColor: action.payload,
      };

    case SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      return state;
  }
};

export default navigationReducer;
