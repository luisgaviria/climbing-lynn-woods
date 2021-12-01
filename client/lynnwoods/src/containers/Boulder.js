import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../url";
import PathTile from "../components/PathTile";

const Boulder = (props) => {
  const [state, setState] = useState({
    paths: [],
  });
  useEffect(async () => {
    const response = await axios.get("api/rocks/" + props.match.params.boulder, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

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
      <div
        style={{
          textAlign: "center",
          display: "grid",
          gridGap: "1rem",
          gridTemplateColumns: "repeat(3,1fr)",
          marginTop: "50px",
        }}
      >
        {state.paths.map((path) => {
          return <PathTile path={path} />;
        })}
      </div>
    </>
  );
};

export default Boulder;
