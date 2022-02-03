import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { url } from "../url";
import axios from "axios";

const AdminSingleUserCompletedClimbs = (props) => {
  const [state, setState] = useState({
    climber: {},
    completed_boulders: [],
  });

  useEffect(async () => {
    const response = await axios.get(
      url + "api/admin/completedClimbs/" + props.match.params.climberId,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    setState({
      climber: response.data.response.climber,
      completed_boulders: response.data.response.completed_boulders,
    });
  }, []);

  return (
    <>
      <div style={{ textAlign: "center" }}>
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
      </Table>
    </>
  );
};

export default AdminSingleUserCompletedClimbs;
