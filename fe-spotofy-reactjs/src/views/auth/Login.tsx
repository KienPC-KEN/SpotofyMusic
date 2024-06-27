import React, { useState } from "react";
import "../../styles/LoginStyle.scss";
import { Container } from "react-bootstrap";
import icShowPassword from "../../assets/images/ic_show_password.png";
import icHiddenPassword from "../../assets/images/ic_hidden_password.png";
import icToggleOn from "../../assets/images/ic_toggle_on.png";
import icToggleOff from "../../assets/images/ic_toggle_off.png";
import PlaylistService from "../../services/PlayListService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isLogin, login } from "../../redux/actions/AuthAction";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showBorder, setShowBorder] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleInputPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPassword(value);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
    setShowBorder(true);
    setTimeout(() => {
      setShowBorder(false);
    }, 1500);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(email + "====" + password);
    event.preventDefault();

    await PlaylistService.login(email, password)
      .then((res: any) => {
        dispatch(login(res.data.data));
        dispatch(isLogin(true));
        navigate("/");
      })
      .catch((e: string) => {
        console.log(e);
      });
  };

  return (
    <Container fluid className="container-login p-0">
      <h4 className="header d-flex align-self-left">SPOTOFY</h4>
      <div className="container-content d-flex justify-content-center">
        <div className="content">
          <h1 className="title">Đăng nhập vào Spotofy</h1>

          <form className="container-form">
            <div className="mb-1">
              <label htmlFor="exampleInputEmail1" className="label form-label">
                Email
              </label>
              <input
                style={{ height: 52 }}
                type="email"
                onChange={(e) => handleInputEmailChange(e)}
                autoCorrect="off"
                placeholder="Email address"
                className="input-login form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="exampleInputPassword1"
                className="label form-label"
              >
                Mật khẩu
              </label>
              <div
                style={{ height: 52 }}
                className="d-flex flex-row form-control bg-transparent"
              >
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  onChange={(e) => handleInputPasswordChange(e)}
                  className=" input-login form-control-plaintext"
                  id="exampleInputPassword1"
                />

                <img
                  onClick={togglePasswordVisibility}
                  src={showPassword ? icShowPassword : icHiddenPassword}
                  alt={showPassword ? "Hiển thị mật khẩu" : "Ẩn mật khẩu"}
                  style={{ width: 24, height: 24, alignSelf: "center" }}
                />
              </div>
            </div>
            <div className="d-flex mb-5 mt-4 align-items-center">
              <img
                className={`me-sm-3 ${showBorder ? "bordered" : ""}`}
                onClick={toggleRememberMe}
                src={rememberMe ? icToggleOn : icToggleOff}
                alt={rememberMe ? "Đã nhớ tôi" : "Chưa nhớ"}
              />
              <label className="label form-check-label" htmlFor="exampleCheck1">
                Hãy nhớ tôi
              </label>
            </div>
            <button
              type="submit"
              onClick={(e) => handleLogin(e)}
              className="btn-login btn btn-primary"
            >
              Đăng nhập
            </button>
          </form>
          <div className="text-center mt-4">
            <a href="/login" className="text-forgot-password">
              Quên mật khẩu của bạn?
            </a>
          </div>
          <hr role="presentation" className="line"></hr>
          <div className="text-register-footer text-center">
            <span>Bạn chưa có tài khoản? </span>
            <span>
              <a href="/register" className="text-register">
                Đăng ký Spotofy
              </a>
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
