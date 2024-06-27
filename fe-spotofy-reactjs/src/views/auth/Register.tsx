import React, { useEffect, useState } from "react";
import "../../styles/RegisterStyle.scss";
import { Container } from "react-bootstrap";
import SliderStepRegister from "../../components/SliderStepRegister";
import icBack from "../../assets/images/ic_back.png";
import icBackHover from "../../assets/images/ic_back_hover.png";
import icShowPassword from "../../assets/images/ic_show_password.png";
import icHiddenPassword from "../../assets/images/ic_hidden_password.png";
import icWarning from "../../assets/images/ic_warning.png";
import PlaylistService from "../../services/PlayListService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");

  const [currentStep, setCurrentStep] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(0);
  const [isFocusEmail, setIsFocusEmail] = useState(false);
  const [isFocusPassword, setIsFocusPassword] = useState(false);
  const [isFocusName, setIsFocusName] = useState(false);
  const [isFocusDate, setIsFocusDate] = useState(false);
  const [isFocusGender, setIsFocusGender] = useState(false);

  const [checkEmail, setCheckEmail] = useState(true);
  const [checkPassword, setCheckPassword] = useState(true);
  const [checkPasswordCharacters, setCheckPasswordCharacters] = useState(false);
  const [
    checkPasswordNumberOrSpecialCharacter,
    setCheckPasswordNumberOrSpecialCharacter,
  ] = useState(false);
  const [checkPasswordTenCharacters, setCheckPasswordTenCharacters] =
    useState(false);

  const [checkTextPasswordCharacters, setCheckTextPasswordCharacters] =
    useState(true);
  const [
    checkTextNumberOrSpecialCharacter,
    setCheckTextNumberOrSpecialCharacter,
  ] = useState(true);
  const [checkTextTenCharacters, setCheckTextTenCharacters] = useState(true);

  const [checkName, setCheckName] = useState(true);
  const [checkDate, setCheckDate] = useState(true);
  const [checkGender, setCheckGender] = useState(true);

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
  const handleInputNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setName(value);
  };

  const handleInputDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setDate(value);
  };

  const handleGenderChange = (event: { target: { value: any } }) => {
    const value = event.target.value;
    setGender(value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const registerUser = async () => {
    let objUser = {
      name: name,
      image: "",
      email: email,
      password: password,
      date: date,
      gender: gender,
    };

    await PlaylistService.register(objUser)
      .then((res: any) => {
        console.log(res.data);
      })
      .catch((e: string) => {
        console.log(e);
      });
  };

  const checkValidateStepTwo = () => {
    if (name === "") {
      setCheckName(false);
      if (date.trim() === "") {
        setCheckDate(false);
      }
      if (gender === "") {
        setCheckGender(false);
      }
      return false;
    } else {
      if (date.trim() === "") {
        setCheckDate(false);
        if (gender === "") {
          setCheckGender(false);
        }
        return false;
      } else {
        if (gender === "") {
          setCheckGender(false);
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    switch (currentStep) {
      case "":
        if (!checkEmail || email === "") {
          setCheckEmail(false);
          return;
        }
        window.location.hash = "step1";

        break;

      case "step1":
        if (
          !checkPasswordCharacters ||
          !checkPasswordNumberOrSpecialCharacter ||
          !checkPasswordTenCharacters
        ) {
          setCheckTextPasswordCharacters(false);
          setCheckTextNumberOrSpecialCharacter(false);
          setCheckTextTenCharacters(false);
          setCheckPassword(false);
          return;
        }
        window.location.hash = "step2";

        break;

      case "step2":
        if (!checkName || !checkDate || !checkGender) {
          setIsFocusGender(true);
          setIsFocusDate(true);
          setIsFocusName(true);
          return;
        }
        if (!checkValidateStepTwo()) {
          setIsFocusGender(true);
          return;
        }
        window.location.hash = "step3";

        break;

      case "step3":
        window.location.hash = "";
        navigate("/login");
        registerUser();
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (isFocusEmail) {
      if (!emailPattern.test(email)) {
        setCheckEmail(false);
      } else {
        setCheckEmail(true);
      }
    }
  }, [email, isFocusEmail]);

  useEffect(() => {
    const passwordOneCharactersPatter = /[A-Za-z]/;
    const passwordANumberOrSpecialCharacterPatter = /[\d#?!&]/;
    const passwordTenCharactersPatter = /^[A-Za-z\d#?!&]{10,}$/;

    if (isFocusPassword) {
      if (!passwordOneCharactersPatter.test(password)) {
        setCheckPasswordCharacters(false);
        setCheckPassword(false);
        setCheckTextPasswordCharacters(false);
      } else {
        setCheckPasswordCharacters(true);
        setCheckTextPasswordCharacters(true);
      }

      if (!passwordANumberOrSpecialCharacterPatter.test(password)) {
        setCheckPasswordNumberOrSpecialCharacter(false);
        setCheckPassword(false);
        setCheckTextNumberOrSpecialCharacter(false);
      } else {
        setCheckPasswordNumberOrSpecialCharacter(true);
        setCheckTextNumberOrSpecialCharacter(true);
      }
      if (!passwordTenCharactersPatter.test(password)) {
        setCheckPasswordTenCharacters(false);
        setCheckPassword(false);
        setCheckTextTenCharacters(false);
      } else {
        setCheckPasswordTenCharacters(true);
        setCheckTextTenCharacters(true);
      }

      if (
        checkPasswordCharacters &&
        checkPasswordNumberOrSpecialCharacter &&
        checkPasswordTenCharacters
      ) {
        setCheckPassword(true);
      }
    }
  }, [
    checkPasswordCharacters,
    checkPasswordNumberOrSpecialCharacter,
    checkPasswordTenCharacters,
    isFocusPassword,
    password,
  ]);

  useEffect(() => {
    if (isFocusName) {
      if (name.trim() === "") {
        setCheckName(false);
      } else {
        setCheckName(true);
      }
    }
    if (isFocusDate) {
      if (date.trim() === "") {
        setCheckDate(false);
      } else {
        setCheckDate(true);
      }
    }
    if (isFocusGender) {
      if (gender === "") {
        setCheckGender(false);
      } else {
        setCheckGender(true);
      }
    }
  }, [date, name, gender, isFocusName, isFocusDate, isFocusGender]);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentStep(window.location.hash.substring(1));
    };

    // Set the initial step based on the hash
    handleHashChange();

    // Add event listener for hash change
    window.addEventListener("hashchange", handleHashChange);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  return (
    <Container fluid className="container-register p-0">
      <h4 className="header d-flex align-self-left">SPOTOFY</h4>
      <div className="container-content d-flex justify-content-center">
        <div className="content">
          {currentStep === "" && (
            <>
              <h1 className="text-title">Đăng ký để bắt đầu nghe</h1>
              <form>
                <div className="mb-1">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="label form-label"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    autoCorrect="off"
                    value={email}
                    onChange={(e) => handleInputEmailChange(e)}
                    placeholder="name@domain.com"
                    className={
                      checkEmail
                        ? "input-email form-control"
                        : "input-email-error form-control"
                    }
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onFocus={() => setIsFocusEmail(true)}
                    onBlur={() => setIsFocusEmail(false)}
                  />
                  <label
                    hidden={checkEmail}
                    style={{
                      color: "#f15e6c",
                      fontSize: "0.875rem",
                      fontWeight: 400,
                      marginTop: 8,
                    }}
                  >
                    <img src={icWarning} alt="" /> Email này không hợp lệ. Hãy
                    đảm bảo rằng email được nhập dưới dạng example@email.com
                  </label>
                </div>
                <button
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                  className="btn-register btn "
                >
                  Tiếp theo
                </button>
              </form>

              <hr role="presentation" className="line"></hr>

              <div className="text-register-footer text-center">
                <span>Bạn đã có tài khoản? </span>
                <span>
                  <a href="/login" className="text-register">
                    Đăng nhập tại đây
                  </a>
                </span>
              </div>
            </>
          )}

          {currentStep === "step1" && (
            <div id="step1" className="mx-sm-3">
              <SliderStepRegister currentStep={1} />
              <div className="d-flex flex-row align-items-center ms-sm-4">
                <img
                  onMouseEnter={() => setIsHovered(1)}
                  onMouseLeave={() => setIsHovered(0)}
                  src={isHovered !== 1 ? icBack : icBackHover}
                  alt=""
                  onClick={() => (window.location.hash = "")}
                  className="ic-back"
                />
                <div className="d-flex flex-column p-sm-3">
                  <span className="text-step">Bước 1/3</span>
                  <span className="text-name-step">Tạo mật khẩu</span>
                </div>
              </div>

              <form className="form-step ms-sm-4">
                <div className="mb-1">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="label form-label"
                  >
                    Mật khẩu
                  </label>
                  <div
                    className={
                      checkPassword
                        ? "d-flex flex-row form-control bg-transparent"
                        : "d-flex flex-row input-email-error form-control bg-transparent"
                    }
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onFocus={() => setIsFocusPassword(true)}
                      onBlur={() => setIsFocusPassword(false)}
                      onChange={(e) => handleInputPasswordChange(e)}
                      className="form-control-plaintext"
                      id="exampleInputPassword1"
                      style={{ color: "white" }}
                    />

                    <img
                      onClick={togglePasswordVisibility}
                      src={showPassword ? icShowPassword : icHiddenPassword}
                      alt={showPassword ? "Hiển thị mật khẩu" : "Ẩn mật khẩu"}
                      style={{ width: 24, height: 24, alignSelf: "center" }}
                    />
                  </div>
                  <span className="text-name-step">
                    Mật khẩu của bạn phải có ít nhất
                  </span>
                  <div className="block-radio">
                    <input
                      className="checkbox-block-password"
                      type="checkbox"
                      value="1 chữ cái"
                      checked={checkPasswordCharacters}
                      style={{ color: "white" }}
                    />
                    <span
                      className={
                        checkTextPasswordCharacters
                          ? "title-radio"
                          : "title-radio-error"
                      }
                    >
                      1 chữ cái
                    </span>
                  </div>
                  <div>
                    <input
                      className="checkbox-block-password"
                      type="checkbox"
                      value="1 chữ cái"
                      checked={checkPasswordNumberOrSpecialCharacter}
                      style={{ color: "white" }}
                    />
                    <span
                      className={
                        checkTextNumberOrSpecialCharacter
                          ? "title-radio"
                          : "title-radio-error"
                      }
                    >
                      1 chữ số hoặc ký tự đặc biệt (ví dụ: # ? ! &)
                    </span>
                  </div>
                  <div>
                    <input
                      className="checkbox-block-password"
                      type="checkbox"
                      value="1 chữ cái"
                      checked={checkPasswordTenCharacters}
                      style={{ color: "white" }}
                    />
                    <span
                      className={
                        checkTextTenCharacters
                          ? "title-radio"
                          : "title-radio-error"
                      }
                    >
                      10 ký tự
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                  className="btn-register btn "
                >
                  Tiếp theo
                </button>
              </form>
            </div>
          )}
          {/* =======FStep 2====== */}
          {currentStep === "step2" && (
            <div id="step1" className="mx-sm-3">
              <SliderStepRegister currentStep={2} />
              <div className="d-flex flex-row align-items-center ms-sm-4">
                <img
                  onMouseEnter={() => setIsHovered(1)}
                  onMouseLeave={() => setIsHovered(0)}
                  src={isHovered !== 1 ? icBack : icBackHover}
                  alt=""
                  onClick={() => (window.location.hash = "step1")}
                  className="ic-back"
                />
                <div className="d-flex flex-column p-sm-3">
                  <span className="text-step">Bước 2/3</span>
                  <span className="text-name-step">
                    Giới thiệu thông tin về bản thân bạn
                  </span>
                </div>
              </div>

              <form className="form-step ms-sm-4">
                <div className="mb-1">
                  <div className="d-flex flex-column">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="label form-label"
                    >
                      Tên
                    </label>
                    <span className="span-label">
                      Tên này sẽ xuất hiện trên hồ sơ của bạn
                    </span>
                  </div>

                  <input
                    type={"text"}
                    value={name}
                    onFocus={() => setIsFocusName(true)}
                    onBlur={() => setIsFocusName(false)}
                    onChange={(e) => handleInputNameChange(e)}
                    className={
                      checkName
                        ? "form-control bg-transparent"
                        : "input-email-error form-control bg-transparent"
                    }
                    id="exampleInputPassword1"
                    style={{ color: "white", height: 52 }}
                  />
                  <label
                    hidden={checkName}
                    style={{
                      color: "#f15e6c",
                      fontSize: "0.875rem",
                      fontWeight: 400,
                      marginTop: 8,
                    }}
                  >
                    <img src={icWarning} alt="" /> Nhập tên cho hồ sơ của bạn.
                  </label>

                  <div className="d-flex flex-column mt-sm-3">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="label form-label"
                    >
                      Ngày sinh
                    </label>
                    <span className="span-label">
                      Tại sao chúng tôi cần biết ngày sinh của bạn?{" "}
                      <a
                        style={{
                          color: "#a7a7a7",
                        }}
                        target="blank"
                        href="https://www.spotify.com/vn-vi/legal/end-user-agreement/"
                      >
                        Tìm hiểu thêm.
                      </a>
                    </span>
                  </div>

                  <input
                    type={"date"}
                    value={date}
                    onFocus={() => setIsFocusDate(true)}
                    onBlur={() => setIsFocusDate(false)}
                    onChange={(e) => handleInputDateChange(e)}
                    className={
                      checkDate
                        ? "form-control bg-transparent"
                        : "input-email-error form-control bg-transparent"
                    }
                    id="exampleInputPassword1"
                    style={{ color: "white", height: 52 }}
                  />
                  <label
                    hidden={checkDate}
                    style={{
                      color: "#f15e6c",
                      fontSize: "0.875rem",
                      fontWeight: 400,
                      marginTop: 8,
                    }}
                  >
                    <img src={icWarning} alt="" /> Vui lòng nhập ngày sinh của
                    bạn.
                  </label>

                  <div className="d-flex flex-column mt-sm-3">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="label form-label"
                    >
                      Giới tính
                    </label>
                    <span className="span-label">
                      Giới tính của bạn giúp chúng tôi cung cấp nội dung đề xuất
                      và quảng cáo phù hợp với bạn.
                    </span>
                  </div>
                  <div>
                    <input
                      type="radio"
                      value="Nam"
                      onBlur={() => setIsFocusDate(false)}
                      checked={gender === "Nam"}
                      onChange={handleGenderChange}
                    />
                    <span className="text-gender">Nam</span>
                    <input
                      type="radio"
                      value="Nữ"
                      onBlur={() => setIsFocusDate(false)}
                      checked={gender === "Nữ"}
                      onChange={handleGenderChange}
                    />
                    <span className="text-gender">Nữ</span>
                  </div>
                  <label
                    hidden={checkGender}
                    style={{
                      color: "#f15e6c",
                      fontSize: "0.875rem",
                      fontWeight: 400,
                      marginTop: 8,
                    }}
                  >
                    <img src={icWarning} alt="" />
                    Chọn giới tính của bạn.
                  </label>
                </div>

                <button
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                  className="btn-register btn "
                >
                  Tiếp theo
                </button>
              </form>
            </div>
          )}

          {/* =======Step 3====== */}
          {currentStep === "step3" && (
            <div id="step1" className="mx-sm-3">
              <SliderStepRegister currentStep={3} />
              <div className="d-flex flex-row align-items-center ms-sm-4">
                <img
                  onMouseEnter={() => setIsHovered(1)}
                  onMouseLeave={() => setIsHovered(0)}
                  src={isHovered !== 1 ? icBack : icBackHover}
                  alt=""
                  onClick={() => (window.location.hash = "step2")}
                  className="ic-back"
                />
                <div className="d-flex flex-column p-sm-3">
                  <span className="text-step">Bước 3/3</span>
                  <span className="text-name-step">Điều khoản & Điều kiện</span>
                </div>
              </div>

              <form className="form-step ms-sm-4">
                <div className="mb-1">
                  <div className="block-item-step-three">
                    <div className="block-content">
                      <label className="text-block-content">
                        <input
                          type="checkbox"
                          className="checkbox-block-content"
                        />
                        Tôi không muốn nhận tin nhắn tiếp thị từ Spotofy
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-sm-2 mb-sm-2">
                  <div className="block-item-step-three">
                    <div className="block-content">
                      <label className="text-block-content">
                        <input
                          className="checkbox-block-content"
                          type="checkbox"
                        />
                        Chia sẻ dữ liệu đăng ký của tôi với các nhà cung cấp nội
                        dung của Spotify cho mục đích tiếp thị.
                      </label>
                    </div>
                  </div>
                </div>

                <div style={{ lineHeight: 0.7 }}>
                  <span className="text-content-footer">
                    Bằng việc nhấp vào nút Đăng ký, bạn đồng ý với{" "}
                    <a
                      className="text-link-footer"
                      target="blank"
                      href="https://www.spotify.com/vn-vi/legal/end-user-agreement/"
                    >
                      Điều khoản và điều kiện sử dụng
                    </a>{" "}
                    của Spotofy.
                  </span>
                </div>

                <div style={{ lineHeight: 0.7, marginTop: 8 }}>
                  <span className="text-content-footer">
                    Để tìm hiểu thêm về cách thức Spotify thu thập, sử dụng,
                    chia sẻ và bảo vệ dữ liệu cá nhân của bạn, vui lòng xem{" "}
                    <a
                      className="text-link-footer"
                      target="blank"
                      href="https://www.spotify.com/vn-vi/legal/end-user-agreement/"
                    >
                      Chính sách quyền riêng tư của Spotify
                    </a>
                    .
                  </span>
                </div>

                <button
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                  className="btn-register btn "
                >
                  Đăng ký
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Register;
