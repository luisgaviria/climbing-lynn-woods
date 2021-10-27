import { useState } from "react";
import { url } from "../url";
import axios from "axios";

const RegisterForm = (props) => {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChangeInput = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onClickSignIn = async () => {
    console.log(url);
    const response = await axios.post(
      `${url}/auth/register`,
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
    console.log(response);
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
    </div>
  );
};

export default RegisterForm;
