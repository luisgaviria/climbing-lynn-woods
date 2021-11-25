import { useHistory } from "react-router-dom";
import "../styles/Rocks.scss";
import ListGroup from "react-bootstrap/ListGroup";

const Area = (props) => {
  const history = useHistory();

  const onClickBoulder = (boulder) => {
    history.push(`/rocks/${boulder}`);
  };

  return (
    <ListGroup>
      {props.area.map((boulder) => {
        return (
          <ListGroup.Item
            style={{ cursor: "pointer" }}
            onClick={() => onClickBoulder(boulder)}
          >
            {boulder}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default Area;
