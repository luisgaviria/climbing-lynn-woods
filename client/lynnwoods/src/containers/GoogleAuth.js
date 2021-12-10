import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";

const GoogleAuth = (props) => {
  const history = useHistory();
  useEffect(async () => {
    const query = new URLSearchParams(props.location.search);
    const token = query.get("token");

    props.setLogged(token);
    history.push("/rocks");
  }, []);

  return <></>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLogged: (token) => dispatch(actions.setLogged(token)),
  };
};

export default connect(null, mapDispatchToProps)(GoogleAuth);
