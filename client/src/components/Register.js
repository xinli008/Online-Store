import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, navigate } from "@reach/router";
import Alert from "react-bootstrap/Alert";
import Header from "./Header";

const Register = props => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [userCreated, setUserCreated] = useState(false);

  const register = event => {
    event.preventDefault();

    const newUser = { firstName, lastName, address, city, state, zip, email, password, confirmPassword };

    axios
      .post("http://localhost:8000/api/register", newUser, {
        withCredentials: true
      })
      .then(res => {
        console.log(res);
        setUserCreated(true);
        //navigate("/login");
      })
      .catch(err => {
        console.log(err);
        setErrors(err.response.data.errors);
      });
  };
const cancelRegister = () => {
  navigate("/productlist/", {
    state: null
  });
}
  return (
    <>
      <Header isLoginButton={true} isRegisterButton={false} /> <br />
      <div className="container w-60">
        <Card className="text-center" bg="dark" text={"white"}>
          <Card.Header as="h2">Register</Card.Header>
          <Card.Body style={{ backgroundColor: "lightgrey", color: "black" }}>
            <div
              className="container"
              style={{
                margin: "auto",
                width: "50%"
              }}
            >
              <div className="row">
                {userCreated ? (
                  <div className="col w-5">
                    <Alert
                      variant="success"
                      onClose={() => setUserCreated("")}
                      dismissible
                    >
                      <Alert.Heading>Success!</Alert.Heading>
                      <p>
                        User created successfully!
                        <Link to={"/login"}> Click here</Link> to Login...
                      </p>
                    </Alert>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="row">
                <div className="col">
                  <form>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label className="form-label">First Name</label>
                          <input
                            className="form-control"
                            type="text"
                            name="firstname"
                            onClick={() => setErrors("")}
                            onChange={e => setFirstName(e.target.value)}
                            value={firstName}
                          />
                        </div>
                        {errors.firstName ? (
                          <span className="error-message">
                            {errors.firstName.message}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label className="form-label">Last Name</label>
                          <input
                            className="form-control"
                            type="text"
                            name="lastname"
                            onClick={() => setErrors("")}
                            onChange={e => setLastName(e.target.value)}
                            value={lastName}
                          />
                        </div>
                        {errors.lastName ? (
                          <span className="error-message">
                            {errors.lastName.message}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <input
                        className="form-control"
                        type="address"
                        name="address"
                        onClick={() => setErrors("")}
                        onChange={e => setAddress(e.target.value)}
                        value={address}
                      />
                    </div>
                    {errors.address ? (
                      <span className="error-message">
                        {errors.address.message}
                      </span>
                    ) : (
                      ""
                    )}
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label className="form-label">City</label>
                          <input
                            className="form-control"
                            type="text"
                            name="city"
                            onClick={() => setErrors("")}
                            onChange={e => setCity(e.target.value)}
                            value={city}
                          />
                        </div>
                        {errors.city ? (
                          <span className="error-message">
                            {errors.city.message}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label className="form-label">State</label>
                          <input
                            className="form-control"
                            type="text"
                            name="state"
                            onClick={() => setErrors("")}
                            onChange={e => setState(e.target.value)}
                            value={state}
                          />
                        </div>
                        {errors.state ? (
                          <span className="error-message">
                            {errors.state.message}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label className="form-label">Zip</label>
                          <input
                            className="form-control"
                            type="text"
                            name="zip"
                            onClick={() => setErrors("")}
                            onChange={e => setZip(e.target.value)}
                            value={zip}
                          />
                        </div>
                        {errors.zip ? (
                          <span className="error-message">
                            {errors.zip.message}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        onClick={() => setErrors("")}
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                    {errors.email ? (
                      <span className="error-message">
                        {errors.email.message}
                      </span>
                    ) : (
                      ""
                    )}
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label>Password</label>
                          <input
                            className="form-control"
                            type="password"
                            name="password"
                            onClick={() => setErrors("")}
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                          />
                        </div>
                        {errors.password ? (
                          <span className="error-message">
                            {errors.password.message}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Confirm Password</label>
                          <input
                            className="form-control"
                            type="password"
                            name="confirmPassword"
                            onClick={() => setErrors("")}
                            onChange={e => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                          />
                        </div>
                        {errors.confirmPassword ? (
                          <span className="error-message">
                            {errors.confirmPassword.message}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Card.Body>
          <Card.Footer>
            <Button
              type="button"
              variant="outline-success"
              onClick={register}
              size="sm"
            >
              Register
            </Button>{" "}
            
              <Button type="button" variant="outline-danger"
              onClick={cancelRegister} size="sm">
                Cancel
              </Button>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
};

export default Register;
