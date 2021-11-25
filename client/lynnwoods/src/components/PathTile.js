import { useHistory } from "react-router-dom";

const PathTile = (props) => {
  const history = useHistory();

  const onClickTile = () => {
    history.push(`/path/${props.path.route}`);
  };

  return (
    <div
      style={{
        cursor: "pointer",
        width: "50%",
        margin: "auto",
        border: "1px solid black",
        borderRadius: "20px",
      }}
      onClick={onClickTile}
    >
      <h2>{props.path.route}</h2>
      {props.path.photos[0] ? (
        <img width={100} height={100} src={props.path.photos[0]} />
      ) : (
        <p>No Images</p>
      )}

      <p>Rating: {props.path.rating}</p>
      <p>Stars: {props.path.avgStars}</p>
    </div>
  );
};

export default PathTile;
