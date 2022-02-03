import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../url";

const AdminEvent = () => {
  const [state, setState] = useState({});

  useEffect(async () => {
    const response = await axios.get(url + "api/admin/event", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    setState((prevState) => {
      return {
        ...prevState,
        ...response.data.event,
      };
    });
  }, []);

  const DeactivateEvent = async () => {
    try {
      await axios.patch(
        url + "api/admin/event/deactivate",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  const ActivateEvent = async () => {
    try {
      await axios.patch(
        url + "api/admin/event/activate",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Event</h1>
      {state?.active ? (
        <div>
          <p>Currently active event {state.number}</p>
          <button onClick={DeactivateEvent}>
            Deactivate Event {state.number}
          </button>
        </div>
      ) : (
        <div>
          <p>No Currently active event</p>
          <button onClick={ActivateEvent}>Activate Event</button>
        </div>
      )}
    </div>
  );
};

export default AdminEvent;
