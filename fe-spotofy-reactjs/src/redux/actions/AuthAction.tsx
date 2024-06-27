import { User as UserType } from "../../model/User";

export const LOGIN = "LOGIN";
export const IS_LOGIN = "IS_LOGIN";

type User = UserType | null | undefined;

export const login = (user: User) => ({
  type: LOGIN,
  payload: user,
});

export const isLogin = (isLogin: boolean) => ({
  type: IS_LOGIN,
  payload: isLogin,
});
