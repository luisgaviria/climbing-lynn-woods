import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { url } from "../url";

const EditMyProfile = () => {
  const [state, setState] = useState({});
  const history = useHistory();
  useEffect(async () => {
    const response = await axios.get(url + "api/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    setState({
      username: response.data.response.climber.username,
      gender: response.data.response.climber.gender,
      category: response.data.response.climber.category,
    });
  }, []);

  const onClickSaveChanges = async () => {
    try {
      const response = await axios.patch(
        url + "api/profile",
        {
          ...state,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      history.push("/myprofile");
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeInput = (event) => {
    if (event.target.value == "-") {
      setState((prevState) => {
        return {
          ...prevState,
          [event.target.name]: null,
        };
      });
    } else {
      setState((prevState) => {
        return {
          ...prevState,
          [event.target.name]: event.target.value,
        };
      });
    }
  };

  return (
    <>
      <h1>Edit Your Profile</h1>
      <div style={{ margin: "auto", textAlign: "center" }}>
        <h1>My Profile</h1>
        <h1>Image</h1>
        <h1>BIO</h1>

        <div>
          <label>Gender: </label>
          <select name="gender" onChange={onChangeInput} value={state.gender}>
            <option>-</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div>
          <label>Category: </label>
          <select
            name="category"
            onChange={onChangeInput}
            value={state.category}
          >
            <option>-</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advance</option>
          </select>
        </div>
        <Button onClick={onClickSaveChanges}>Save Changes</Button>
      </div>
    </>
  );
};

export default EditMyProfile;
