import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { url } from "../url";

const Path = (props) => {
  const [state, setState] = useState({
    input: "",
    users: [],
    choosen_user: null,
    completion_input: false,
  });
  useEffect(async () => {
    const response = await axios.get(url + "/path/" + props.match.params.path, {
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
    const response = await axios.get(url + "/users/" + state.input, {
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
    const response = await axios.post(
      url + "/path/" + state._id.toString() + "/finish",
      {
        witnessId: state.choosen_user._id.toString(),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    // for now just submit no special effects
    console.log(response.data);
  };

  return (
    <>
      <div style={{ display: "grid", placeItems: "center" }}>
        <h1>Name: {state.route}</h1>
        <h1>FA: {state.FA}</h1>
        <h1>Location: {state.location}</h1>
        <p>Description: {state.description}</p>
        <p>Average Stars: {state.avgStars}</p>
        <p>Rating: {state.rating}</p>
        {state.photos?.map((photo) => {
          return (
            <div style={{ width: "100px", height: "100px", margin: "20px" }}>
              <img src={photo} />
            </div>
          );
        })}
        <button
          onClick={() =>
            setState((prevState) => {
              return {
                ...prevState,
                completion_input: true,
              };
            })
          }
        >
          Submit completion this path
        </button>
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
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Path;
