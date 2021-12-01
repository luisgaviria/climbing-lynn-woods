import { useHistory } from "react-router-dom";
import Image from "react-bootstrap/Image";
import "../styles/Path.scss";
import ReactStars from "react-rating-stars-component";

const PathTile = (props) => {
  const history = useHistory();

  const onClickTile = () => {
    history.push(`/path/${props.path.route}`);
  };

  const starExample = {
    size: 50,
    isHalf: true,
    char: "★",
    count: 4,
    value: props.path.avgStars,
    edit: false,
    // onChange: (newValue) => {
    //   console.log(`Example 4: new value is ${newValue}`);
    // },
  };

  return (
    <div
      className="card"
      style={{
        cursor: "pointer",
      }}
      onClick={onClickTile}
    >
      <div className="card-image">
        {props.path.photos[0] ? (
          <Image className="image-inner" fluid src={props.path.photos[0]} />
        ) : (
          <Image
            className="image-inner"
            fluid
            src="http://frmpollet.me/pictures/upload/2019/06/02/20190602122401-695dffd6.png"
          />
        )}
      </div>
      <div className="card-body">
        <ReactStars data={props.path.avgStars} {...starExample} />
        <h2>{`${props.path.route} ${props.path.rating}`}</h2>
      </div>
    </div>
  );
};

export default PathTile;
