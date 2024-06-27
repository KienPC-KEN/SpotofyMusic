import React from "react";
import { NavLink } from "react-router-dom";

interface DataProps {
  id: number;
  img: string;
  name: string;
  backgroundColor: string;
  widthItem: number;
}

const ItemSearchPlaylist: React.FC<DataProps> = ({
  id,
  name,
  img,
  backgroundColor,
  widthItem,
}) => {

  return (
    <NavLink to={`/play-list/${id}`}>
      <div
        style={{ width: widthItem, backgroundColor: `#${backgroundColor}` }}
        className="layout-item-search d-inline-flex rounded-3 me-sm-3 mb-sm-4 mt-sm-4"
      >
        <h5 className="text-name-item mt-sm-3 ms-sm-2">{name}</h5>
        <img
          className="image-item rounded-start-3"
          src={require(`../../assets/images/${img}`)}
          alt={`Lỗi ảnh ${img}`}
          width={128}
          height={128}
        />
      </div>
    </NavLink>
  );
};

export default ItemSearchPlaylist;
