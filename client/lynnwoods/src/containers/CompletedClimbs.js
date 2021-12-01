import { useEffect, useState } from "react";
import { url } from "../url";
import axios from "axios";
import CompletedClimb from "../components/CompletedClimb";

const CompletedClimbs = (props) => {
  const [state, setState] = useState({
    completed_climbs: [],
  });
  useEffect(async () => {
    const response = await axios.get("api/completed_climbs", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    setState({ completed_climbs: response.data.completedBoulders });
  }, []);
  return (
    <div>
      <h1>Completed Climbs</h1>
      {state.completed_climbs?.map((completed_climb) => {
        return <CompletedClimb completed_climb={completed_climb} />;
      })}
    </div>
  );
};

export default CompletedClimbs;
