import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { url } from "../url";
import { useHistory } from "react-router-dom";
import axios from "axios";

const AdminLeaderboard = () => {
  const [state, setState] = useState([]);
  const history = useHistory();

  useEffect(async () => {
    const response = await axios.get(url + "api/admin/climbers", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    const data = [];
    const keys = Object.keys(response.data.response);
    keys.map((key) => {
      data.push({
        id: key,
        ...response.data.response[key],
      });
    });

    setState(data);
  }, []);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Id</th>
            <th>Username</th>
            <th>Points</th>
            <th>Amount of completed boulders</th>
            <th>Completed Boulders</th>
          </tr>
        </thead>
        <tbody>
          {state.map((climber, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{climber.id}</td>
                <td>{climber.username}</td>
                <td>{climber.points}</td>
                <td>{climber.completed_boulders.length}</td>
                <td>
                  <a
                    style={{
                      color: "blue",
                      textDecoration: "underline",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      history.push("/admin/completed_climbs/" + climber.id);
                    }}
                  >
                    Completed boulders
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default AdminLeaderboard;
