import { useEffect, useState, useCallback, Component } from "react";
import { render } from "react-dom";
import axios from "axios";
import { url } from "../url";
import BoulderMap from "../components/BoulderMap";

import ReactStars from "react-rating-stars-component";
import Image from "react-bootstrap/Image";
import "../styles/Path.scss";

const Path = (props) => {
  const [state, setState] = useState({
    input: "",
    users: [],
    choosen_user: null,
    completion_input: false,
    message: null,
  });

  useEffect(async () => {
    const response = await axios.get("/path/" + props.match.params.path, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    setState((prevState) => {
      return {
        ...prevState,
        ...response.data.path,
        submissions: response.data.submissions,
      };
    });
  }, []);

  const getUsers = useCallback(async () => {
    const response = await axios.get("/users/" + state.input, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    setState((prevState) => {
      return {
        ...prevState,
        users: response.data.users,
      };
    });
  }, [state.input]);

  useEffect(() => {
    let timer;

    setState((prevState) => {
      return {
        ...prevState,
      };
    });
    timer = setTimeout(() => {
      getUsers();
    }, 400);
    return () => clearTimeout(timer);
  }, [getUsers]);

  const handleChange = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        input: event.target.value,
      };
    });
  };

  const onClickSubmit = async (req, res, next) => {
    try {
      const response = await axios.post(
        "/path/" + state._id.toString() + "/finish",
        {
          witnessId: state.choosen_user?._id.toString(),
        },
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
          message: { data: response.data.message, color: "green" },
        };
      });
    } catch (error) {
      setState((prevState) => {
        return {
          ...prevState,
          message: { data: error.response.data.message, color: "red" },
        };
      });
    }
  };

  const starExample = {
    size: 60,
    isHalf: true,
    char: "★",
    count: 4,
    edit: false,
    value: state.avgStars,
    // onChange: (newValue) => {
    //   console.log(`Example 4: new value is ${newValue}`);
    // },
  };

  return (
    <>
      <div className='container'>
        <h6 className='route-location'>{state.location}</h6>
        <div className='route-name-description'>
          <h2>{state.route + " " + state.rating}</h2>
        </div>
        {state.photos?.map((photo) => {
          return (
            <div className='image-container'>
              <Image className='grow' src={photo} fluid />
            </div>
          );
        })}
        <ReactStars {...starExample} />

        <p className='route-description'>
          <strong>Description:</strong> {state.description}
        </p>
        <h6>FA: {state.FA}</h6>

        {/* <button
          onClick={() =>
            setState((prevState) => {
              return {
                ...prevState,
                completion_input: true,
              };
            })
          }
        >
          Submit problem completion
        </button> */}
        {state.completion_input ? (
          <div>
            <input
              placeholder="Username of witness"
              value={state.input}
              onChange={handleChange}
            />
            {state.users.map((user) => {
              return (
                <div
                  onClick={() =>
                    setState((prevState) => {
                      return {
                        ...prevState,
                        choosen_user: user,
                        input: user.username,
                      };
                    })
                  }
                >
                  <p style={{ cursor: "pointer" }}>{user.username}</p>
                </div>
              );
            })}
            <button onClick={onClickSubmit}>Submit</button>
            {state.message ? (
              <p style={{ color: state.message.color }}>{state.message.data}</p>
            ) : null}
          </div>
        ) : null}
      </div>

      <BoulderMap className='path-map' boulder={state} />
    </>
  );
};

export default Path;
