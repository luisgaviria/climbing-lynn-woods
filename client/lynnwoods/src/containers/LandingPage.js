import { useState } from "react";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { url } from "../url";
import axios from "axios";

const LandingPage = (props) => {
  const [state, setState] = useState({
    login: "",
    password: "",
    error: false,
  });
  const history = useHistory();
  const onClickRegister = () => {
    history.push("/register");
  };
  const onChangeInput = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };
  const onClickLogin = async () => {
    try {
      const response = await axios.post(
        url + "api/auth/login",
        {
          login: state.login,
          password: state.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", response.data.token);
      history.push("/rocks");
    } catch (err) {
      return setState((prevState) => {
        return {
          ...prevState,
          error: true,
        };
      });
    }
  };
  return (
    <Form className="w-50 m-auto border">
      <Form.Group
        className="mb-3 text-center"
        controlId="exampleForm.ControlInput1"
      >
        <Form.Label>Login</Form.Label>
        <Form.Control
          className="w-50 m-auto"
          type="email"
          placeholder="email"
        />
      </Form.Group>
      <Form.Group
        className="mb-3 text-center"
        controlId="exampleForm.ControlPassword"
      >
        <Form.Label>Password</Form.Label>
        <Form.Control className="w-50 m-auto" type="password" />
      </Form.Group>
      <Form.Group className="text-center">
        <Button variant="primary">Log In</Button>
      </Form.Group>
    </Form>
    // <div style={{ margin: "auto", width: "500px", marginTop: "200px" }}>

    //   {/* <input
    //     placeholder="Login"
    //     onChange={onChangeInput}
    //     value={state.login}
    //     name="login"
    //     style={{ display: "inline-block" }}
    //   />
    //   <br />
    //   <input
    //     placeholder="Password"
    //     onChange={onChangeInput}
    //     value={state.password}
    //     name="password"
    //     style={{ display: "inline-block" }}
    //     type="password"
    //   />
    //   <br /> */}
    //   <button style={{ margin: "auto" }} onClick={onClickLogin}>
    //     Login
    //   </button>
    //   {state.error ? (
    //     <>
    //       <p style={{ color: "red" }}>Wrong Password or Login</p>
    //     </>
    //   ) : null}
    //   <GoogleAuthButton />
    //   <button style={{ margin: "auto" }} onClick={onClickRegister}>
    //     Register
    //   </button>
    // </div>
  );
};

export default LandingPage;
