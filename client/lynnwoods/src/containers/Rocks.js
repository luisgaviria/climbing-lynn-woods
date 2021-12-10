import { useEffect, useState } from "react";
import { url } from "../url";
import axios from "axios";
import Area from "../components/Area";
import "../styles/Rocks.scss";

const Rocks = () => {
  const [state, setState] = useState({
    boulders: {},
  });
  useEffect(async () => {
    const response = await axios.get(url + "api/rocks", {
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

  return (
    <>
      <div className="rocks-grid">
        {Object.keys(state.boulders)?.map((key, index) => {
          return (
            <>
              {" "}
              <div className="area">
                <Area area={state.boulders[key]} name={key} />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Rocks;
