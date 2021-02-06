import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import { Link, navigate } from "@reach/router";
import axios from "axios";
import Header from "./Header";

const Login = props => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = event => {
    event.preventDefault();
    if (email == "" || password == "") {
      if (email == "") {
        setEmailError("Email is required!");
      }
      if (password == "") {
        setPasswordError("Password is required!");
      }
    } else {
      axios
        .post(
          "http://localhost:8000/api/login",
          { email, password },
          {
            withCredentials: true
          }
        )
        .then(res => {
          console.log(res);
          navigate("/productlist/", {
            state: res.data 
          });
        })
        .catch(err => {
          console.log(err);
          setErrorMessage(err.response.data.msg);
        });
    }
  };

  const handleEmail = e => {
    e.preventDefault();
    setEmailError("");
    setErrorMessage("");
    setEmail(e.target.value);
  };
  const handlePassword = e => {
    e.preventDefault();
    setPasswordError("");
    setErrorMessage("");
    setPassword(e.target.value);
  };
  return (
    <>
      <Header /> <br />
      <div className="container w-60">
        <Card className="text-center" bg="dark" text={"white"}>
          <Card.Header as="h2">Login</Card.Header>
          <Card.Body
            style={{
              backgroundColor: "lightgrey",
              color: "black"
            }}
          >
            <div
              className="container"
              style={{
                margin: "auto",
                width: "50%"
              }}
            >
              <div className="row">
                {errorMessage ? (
                  <div className="col w-5">
                    <Alert
                      variant="danger"
                      onClose={() => setErrorMessage("")}
                      dismissible
                    >
                      {errorMessage}
                    </Alert>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="row">
                <div className="col">
                  <form>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        className="form-control"
                        placeholder="Enter email"
                        type="text"
                        onChange={handleEmail}
                      ></input>
                      {emailError ? (
                        <p className="error-message">{emailError}</p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handlePassword}
                        value={password}
                      />
                      {passwordError ? (
                        <span className="error-message">{passwordError}</span>
                      ) : (
                        ""
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Card.Body>
          <Card.Footer>
            <Button
              type="button"
              variant="primary"
              onClick={login}
              size="sm"
            >
              Login
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
};

export default Login;
