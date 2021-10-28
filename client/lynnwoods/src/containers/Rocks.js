import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { url } from "../url";
import axios from "axios";
import "../styles/Rocks.scss";

const Rocks = () => {
  const [state, setState] = useState({
    boulders: {},
  });
  const history = useHistory();
  useEffect(async () => {
    const response = await axios.get(url + "/rocks", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    setState((prevState) => {
      return {
        ...prevState,
        boulders: response.data.rocks,
      };
    });
  }, []);

  const onClickBoulder = (boulder) => {
    history.push(`/rocks/${boulder}`);
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Rocks:</h1>
      <div className="rocks-grid">
        {Object.keys(state.boulders)?.map((key) => {
          return (
            <>
              <div>
                <h3>{key}</h3>
                {state.boulders[key]?.map((boulder) => {
                  return (
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        onClickBoulder(boulder);
                      }}
                    >
                      {boulder}
                    </p>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Rocks;
