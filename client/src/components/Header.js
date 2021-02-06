import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, navigate } from "@reach/router";
import axios from "axios";
import logo from "../images/logo.PNG";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default props => {

  const [loggedInUser, setLoggedInUser] = useState({});
  const [isLoginButton, setIsLoginButton] = useState(false);
  const [isRegisterButton, setIsRegisterButton] = useState(false);
  const [isLogoutButton, setIsLogoutButton] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/getLoggedInUser", {
        withCredentials: true
      })
      .then(res => {
        //console.log(res);
        setLoggedInUser(res.data.user);
        setIsLogoutButton(true);
        //navigate("/productlist");
      })
      .catch(err => {
        setIsLoginButton(true);
        setIsRegisterButton(true);
        console.log(err);
      });

  }, []);
  
  const logout = () => {

    axios
      .post(
        "http://localhost:8000/api/logout",
        {},
        {
          withCredentials: true
        }
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    navigate("/login");
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
          <img alt="logo" src={logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => navigate("/productlist")}>Home</Nav.Link>
          </Nav>
          <Nav>
            {isLoginButton ? (
              <Nav.Link onClick={() => navigate("/login")}>Log In</Nav.Link>
            ) : (
                ""
              )}
            {isRegisterButton ? (
              <Nav.Link eventKey={2} onClick={() => navigate("/register")}>
                Register
              </Nav.Link>
            ) : (
                ""
              )}
            {isLogoutButton ? (
              <Nav.Link onClick={() => navigate("/dashboard")}>
                <FontAwesomeIcon icon={faUser} />
              </Nav.Link>
            ) : (
                ""
              )}
            {isLogoutButton ? (
              <Nav.Link onClick={() => navigate("/shoppingcart")}>
                <FontAwesomeIcon icon={faShoppingCart} />
              </Nav.Link>
            ) : (
                ""
              )}
            {isLogoutButton ? (
              <Nav.Link onClick={logout}>Log Out</Nav.Link>
            ) : (
                ""
              )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};