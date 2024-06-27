import React, { useEffect, useState } from "react";

import "../styles/SearchStyle.scss";
import ItemSearchPlaylist from "../components/item/ItemSearchPlaylist";
import { PlaylistWithSongs } from "../model/PlaylistWithSongs";
import { setBackgroundHeader } from "../redux/actions/HeaderAction";
import { useDispatch, useSelector } from "react-redux";
interface DataProps {
  data: Array<PlaylistWithSongs>;
}
const Search: React.FC<DataProps> = ({ data }) => {
  const dispatch = useDispatch();
  const headerSearchTerm = useSelector(
    (state: any) => state.headerData.searchTerm
  );
  const [searchTerm, setSearchTerm] = useState("");

  const searchString = () => {
    if (searchTerm.trim() === "") {
      return [];
    }
    const searchRegExp = new RegExp(searchTerm, "i");
    const playlistSearch = data.filter((playlist) =>
      searchRegExp.test(playlist.playlist.name)
    );

    return playlistSearch;
  };

  useEffect(() => {
    dispatch(setBackgroundHeader("2c2c2c"));
    setSearchTerm(headerSearchTerm);
  }, [dispatch, headerSearchTerm]);

  return (
    <div>
      {searchTerm === "" ? (
        <div>
          <div className="mt-sm-5 mx-sm-5">
            <h3>Your top genres</h3>
            {data &&
              data.length > 0 &&
              data.map((item, index) =>
                index > 2 ? null : (
                  <ItemSearchPlaylist
                    id={item.playlist.id}
                    name={item.playlist.name}
                    img={item.playlist.image}
                    backgroundColor={item.playlist.color}
                    widthItem={470}
                  />
                )
              )}
          </div>

          <div className="mt-sm-5 mx-sm-5">
            <h3>Browse all</h3>
            {data &&
              data.length > 0 &&
              data.map((item) => (
                <ItemSearchPlaylist
                  id={item.playlist.id}
                  name={item.playlist.name}
                  img={item.playlist.image}
                  backgroundColor={item.playlist.color}
                  widthItem={230}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className="mt-sm-5 mx-sm-5">
          {searchString() &&
            searchString().length > 0 &&
            searchString().map((item) => (
              <ItemSearchPlaylist
                id={item.playlist.id}
                name={item.playlist.name}
                img={item.playlist.image}
                backgroundColor={item.playlist.color}
                widthItem={400}
              />
            ))}
        </div>
      )}
      <div style={{ marginTop: 150 }}></div>
    </div>
  );
};

export default Search;
