import React from "react";
import { Modal } from "react-bootstrap";
import "../../styles/ModalCheckLogin.scss";
import { NavLink } from "react-router-dom";

interface ModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  image: string;
}
const ModalCheckLogin: React.FC<ModalProps> = ({
  showModal,
  setShowModal,
  image,
}) => {
  const handleClose = () => setShowModal(false);
  console.log(image);

  return (
    <div className="rounded-5">
      <Modal
        show={showModal}
        onHide={handleClose}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="container-modal ">
          <div style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}>
            <div className="d-flex flex-row p-sm-5">
              <img
                src={require(`../../assets/images/${image}`)}
                alt=""
                width={300}
                height={300}
              />
              <div className="block-title d-flex flex-column">
                <h2 className="title-modal px-5 text-center">
                  Bắt đầu nghe bằng tài khoản Spotofy Free
                </h2>
                <NavLink to={"/register"}>
                  <label className="text-button-register">
                    Đăng ký miễn phí
                  </label>
                </NavLink>
                <NavLink to={"/login"}>
                  <label className="text-button-login">Đăng nhập</label>
                </NavLink>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <span
                className="btn-close-modal bg-transparent"
                onClick={handleClose}
              >
                Đóng
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalCheckLogin;
