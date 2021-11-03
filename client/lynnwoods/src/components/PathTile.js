import { useHistory } from "react-router-dom";

const PathTile = (props) => {
  const history = useHistory();

  const onClickTile = () => {
    history.push(`/path/${props.path.route}`);
  };

  return (
    <div
      style={{ cursor: "pointer", width: "50%", margin: "auto" }}
      onClick={onClickTile}
    >
      <h2>{props.path.route}</h2>
      <p>Rating: {props.path.rating}</p>
      <p>Stars: {props.path.avgStars}</p>
    </div>
  );
};

export default PathTile;
