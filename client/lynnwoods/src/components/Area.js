import { useHistory } from "react-router-dom";
import { useState } from "react";
import "../styles/Rocks.scss";
import ListGroup from "react-bootstrap/ListGroup";

const Area = (props) => {
  const history = useHistory();

  const [state, setState] = useState({
    show: false,
  });

  const onClickBoulder = (boulder) => {
    history.push(`/rocks/${boulder}`);
  };

  return (
    <ListGroup>
      <h3
        className="area-name"
        style={{ cursor: "pointer" }}
        onClick={() => {
          setState((prevState) => {
            return {
              show: !prevState.show,
            };
          });
        }}
      >
        {props.name}
      </h3>

      {state.show
        ? props.area.map((boulder) => {
            return (
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                onClick={() => onClickBoulder(boulder)}
              >
                {boulder}
              </ListGroup.Item>
            );
          })
        : null}
    </ListGroup>
  );
};

export default Area;
