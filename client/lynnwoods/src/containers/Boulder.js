import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../url";

const Boulder = (props) => {
  const [state, setState] = useState({
    paths: [],
  });
  useEffect(async () => {
    const response = await axios.get(
      url + "/rocks/" + props.match.params.boulder,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    setState((prevState) => {
      return {
        ...prevState,
        paths: response.data.paths,
      };
    });
  }, []);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>{props.match.params.boulder}</h1>
      <div style={{ textAlign: "center" }}>
        {state.paths.map((path) => {
          return (
            <div>
              <h2>{path.route}</h2>
              <p>Rating: {path.rating}</p>
              <p>Stars: {path.avgStars}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Boulder;
