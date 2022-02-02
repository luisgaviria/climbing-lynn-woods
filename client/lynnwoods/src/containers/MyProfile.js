import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { url } from "../url";

const MyProfile = () => {
  const [state, setState] = useState({
    climber: {},
    completed_boulders: [],
  });

  const history = useHistory();

  useEffect(async () => {
    const response = await axios.get(url + "api/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    setState({
      climber: response.data.response.climber,
      completed_boulders: response.data.response.completed_boulders,
    });
  }, []);
  return (
    <>
      <div style={{ margin: "auto", textAlign: "center" }}>
        <h1>My Profile</h1>
        <h1>Image</h1>
        <img
          src={url + state.climber.image}
          style={{ width: "200px", height: "200px" }}
        />
        <h1>BIO</h1>
        <div>{state.climber.bio}</div>
        <div>
          <p>Gender: {state.climber.gender}</p>
          <p>Category: {state.climber.category}</p>
        </div>
        <Button
          onClick={() => {
            history.push("/myprofile/edit");
          }}
          type="primary"
        >
          Edit Profile
        </Button>
      </div>
      {/* <div style={{ textAlign: "center" }}>
        <h1>{state.climber.id}</h1>
        <h1>{state.climber.username}</h1>
        <h1>Points: {state.climber.points}</h1>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Route</th>
            <th>Rating</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {state.completed_boulders.map((boulder, index) => {
            return (
              <tr>
                <td>{index}</td>
                <td>{boulder.route}</td>
                <td>{boulder.rating}</td>
                <td>{boulder.points}</td>
              </tr>
            );
          })}
        </tbody>
      </Table> */}
    </>
  );
};

export default MyProfile;
