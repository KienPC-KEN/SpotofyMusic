import { LOGIN, IS_LOGIN } from "../actions/AuthAction";

const initialState = {
  user: {
    name: "",
    image: "",
    email: "",
    password: "",
    date: "",
    gender: "",
  },
  isLogin: false,
};

const authReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case IS_LOGIN:
      return {
        ...state,
        isLogin: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
