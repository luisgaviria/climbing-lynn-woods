import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../url";
import ReactStars from "react-rating-stars-component";
import BoulderMap from "../components/BoulderMap";
import Image from "react-bootstrap/Image";

import "../styles/Path.scss";

const EditPath = (props) => {
  const [state, setState] = useState({
    okey_location: false,
    okey_route: false,
    okey_points: false,
    okey_description: false,
  });
  useEffect(async () => {
    const response = await axios.get(
      url + "api/path/" + props.match.params.path,
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
        ...response.data.path,
      };
    });
  }, []);

  const onAddPhoto = (event) => {
    const temp = state.photos;
    console.log(event.target.files[0]);
    temp.push(event.target.files[0]);
    setState((prevState) => {
      return {
        ...prevState,
        photos: temp,
      };
    });
  };

  const handleChangeStars = (rating) => {
    console.log(rating);
    setState((prevState) => {
      return {
        ...prevState,
        avgStars: rating,
      };
    });
  };

  const changeBoulder = (info) => {
    setState((prevState) => {
      return {
        ...prevState,
        latitude: info.latLng.lat(),
        longitude: info.latLng.lng(),
      };
    });
  };

  const handleChange = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };
  const lockOrUnlockInput = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        ["okey_" + event.target.name]: !prevState["okey_" + event.target.name], //!prevState.okey_location
      };
    });
  };

  return (
    <>
      <div className="container">
        <input
          name="location"
          value={state.location}
          className="route-location"
          onChange={handleChange}
          disabled={state.okey_location}
        />
        <button name="location" onClick={lockOrUnlockInput}>
          {state.okey_location ? "Unlock" : "Lock"}
        </button>
        <div className="route-name-description">
          <input
            name="route"
            value={state.route}
            onChange={handleChange}
            disabled={state.okey_route}
          />
          <button name="route" onClick={lockOrUnlockInput}>
            {state.okey_route ? "Unlock" : "Lock"}
          </button>
        </div>
        {state.photos?.map((photo) => {
          return (
            <div className="image-container">
              <Image
                onClick={() => console.log(state)}
                className="grow"
                src={
                  typeof photo == "string" ? photo : URL.createObjectURL(photo)
                }
                fluid
              />
            </div>
          );
        })}

        <input type="file" onChange={onAddPhoto} />

        <p className="route-description">
          Points:{" "}
          <input
            name="points"
            onChange={handleChange}
            type="number"
            value={state.points}
            style={{ width: "50px" }}
            disabled={state.okey_points}
          />
          <button name="points" onClick={lockOrUnlockInput}>
            {state.okey_points ? "Unlock" : "Lock"}
          </button>
        </p>

        {state.avgStars ? (
          <ReactStars
            size={60}
            name=""
            isHalf={true}
            char="★"
            count={4}
            edit={true}
            onChange={handleChangeStars}
            value={state.avgStars}
          />
        ) : null}

        <p style={{ fontWeight: "bold" }}>Description</p>
        <textarea
          style={{ width: "800px", height: "50px" }}
          value={state.description}
          name="description"
          onChange={handleChange}
          disabled={state.okey_description}
          className="route-description"
        />
        <button name="description" onClick={lockOrUnlockInput}>
          {state.okey_description ? "Unlock" : "Lock"}
        </button>
        <h6>FA: {state.FA}</h6>
      </div>

      <BoulderMap
        className="path-map"
        boulder={state}
        changeBoulder={changeBoulder}
      />
    </>
  );
};

export default EditPath;
