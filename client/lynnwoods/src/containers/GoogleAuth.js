import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const GoogleAuth = (props) => {
  const history = useHistory();
  useEffect(async () => {
    const query = new URLSearchParams(props.location.search);
    const token = query.get("token");

    localStorage.setItem("token", token);
    history.push("/rocks");
  }, []);

  return <></>;
};

export default GoogleAuth;
