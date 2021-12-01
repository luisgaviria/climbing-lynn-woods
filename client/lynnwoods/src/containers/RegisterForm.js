import { useState } from "react";
import { url } from "../url";
import { useHistory } from "react-router-dom";
import axios from "axios";

const RegisterForm = (props) => {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    error: false,
  });

  const history = useHistory();

  const onChangeInput = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onClickSignIn = async () => {
    // console.log(url);
    try {
      const response = await axios.post(
        `api/auth/register`,
        {
          username: state.username,
          email: state.email,
          password: state.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response);
      localStorage.setItem("token", response.data.token);
      history.push("/rocks");
    } catch (err) {
      console.log(err);
      return setState((prevState) => {
        return {
          ...prevState,
          error: true,
        };
      });
    }
  };
  return (
    <div>
      <div>
        <input
          placeholder="Username"
          name="username"
          value={state.username}
          onChange={onChangeInput}
        />
      </div>
      <div>
        <input
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={onChangeInput}
        />
      </div>
      <div>
        <input
          placeholder="Password"
          type="password"
          name="password"
          value={state.password}
          onChange={onChangeInput}
        />
      </div>
      <button onClick={onClickSignIn}>Sign In</button>
      {state.error ? (
        <>
          <p style={{ color: "red" }}>
            Account Username or Email is already taken
          </p>
        </>
      ) : null}
    </div>
  );
};

export default RegisterForm;
