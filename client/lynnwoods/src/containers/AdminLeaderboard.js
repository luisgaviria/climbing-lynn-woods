import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { url } from "../url";
import { useHistory } from "react-router-dom";
import axios from "axios";

const AdminLeaderboard = () => {
  const [state, setState] = useState({
    leaderboard: [],
    category: "all_categories",
  });
  const history = useHistory();

  useEffect(async () => {
    const response = await axios.get(
      url + "api/admin/climbers?category=" + state.category,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    const data = [];
    const keys = Object.keys(response.data.response);
    keys.map((key) => {
      data.push({
        id: key,
        ...response.data.response[key],
      });
    });

    setState((prevState) => {
      return { ...prevState, leaderboard: data };
    });
  }, [state.category]);

  const onChangeCategory = (event) => {
    if (event.target.value == "All Categories"){
      setState(prevState=>{
        return {
          ...prevState,
          category: "all_categories"
        }
      });
    }
    else {
      setState((prevState) => {
        return {
          ...prevState,
          category: event.target.value,
        };
      });
    }
 
  };

  return (
    <>
      <select
        name="category"
        onChange={onChangeCategory}
        value={state.category}
      >
        <option>All Categories</option>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advance</option>
      </select>
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
          {state.leaderboard.map((climber, index) => {
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
