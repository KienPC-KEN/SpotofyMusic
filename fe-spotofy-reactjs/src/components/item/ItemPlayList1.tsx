import React from "react";
import "../../styles/item/ItemPlaylist1Style.scss";
import { NavLink } from "react-router-dom";

interface DataProps {
  id: number;
  img: string;
  name: string;
}
const ItemPlayList1: React.FC<DataProps> = ({ id, img, name }) => {
  return (
    <NavLink to={`/play-list/${id}`}>
      <div className="layout-item d-inline-flex bg-white bg-opacity-25 ms-sm-5 mt-sm-2 rounded-3">
        <img
          className="rounded-start-3"
          src={require(`../../assets/images/${img}`)}
          alt={`Lỗi ảnh ${img}`}
          width={82}
          height={82}
        />
        <h5 className="text-name-item align-self-center mx-sm-3">{name}</h5>
      </div>
    </NavLink>
  );
};

export default ItemPlayList1;
