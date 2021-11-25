import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../url";

const Requests = (props) => {
  const [state, setState] = useState({
    requests: [],
  });
  useEffect(async () => {
    const response = await axios.get("/requests", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    setState({
      requests: response.data.requests,
    });
    // console.log(response);
  }, []);

  const onClickConfirm = async (request) => {
    const response = await axios.patch(
      "/request/" + request._id.toString(),
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    setState({ requests: response.data.requests });
    console.log(response.data);
  };

  const onClickDeny = async (request) => {
    const response = await axios.delete("api/request/" + request._id.toString(), {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    setState({ requests: response.data.requests });
    // console.log(response.data)
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Requests</h1>
      <div>
        {state.requests.map((request) => {
          return (
            <div style={{ margin: "auto", width: "400px", marginTop: "50px" }}>
              <p>{request.climber.username}</p>
              <p>{request.boulder.route}</p>
              <p>{request.boulder.location}</p>
              <p>{request.boulder.rating}</p>
              <button onClick={() => onClickConfirm(request)}>Confirm</button>
              <button onClick={() => onClickDeny(request)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
