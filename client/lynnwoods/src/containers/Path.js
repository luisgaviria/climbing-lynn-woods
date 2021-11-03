import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../url";

const Path = (props) => {
  const [state, setState] = useState({});
  useEffect(async () => {
    const response = await axios.get(url + "/path/" + props.match.params.path, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    setState({
      ...response.data.path,
    });
  }, []);

  return (
    <>
      <div style={{ display: "grid", placeItems: "center" }}>
        <h1>Name: {state.route}</h1>
        <h1>FA: {state.FA}</h1>
        <h1>Location: {state.location}</h1>
        <p>Description: {state.description}</p>
        <p>Average Stars: {state.avgStars}</p>
        <p>Rating: {state.rating}</p>
        {state.photos?.map((photo) => {
          return (
            <div style={{ width: "100px", height: "100px", margin: "20px" }}>
              <img src={photo} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Path;
