import { useHistory } from "react-router-dom";
import "../styles/Rocks.scss";

const Area = (props) => {
  const history = useHistory();

  const onClickBoulder = (boulder) => {
    history.push(`/rocks/${boulder}`);
  };

  return (
    <div>
      {props.area.map((boulder) => {
        return (
          <div
            className="area"
            style={{ cursor: "pointer" }}
            onClick={() => onClickBoulder(boulder)}
          >
            {boulder}
          </div>
        );
      })}
    </div>
  );
};

export default Area;
