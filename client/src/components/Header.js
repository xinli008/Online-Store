import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, navigate } from "@reach/router";
import axios from "axios";
import logo from "../images/logo.PNG";

export default props => {
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
       .catch(err=> console.log(err));       
     navigate("/login");
   };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img alt="logo" src={logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Products" id="collasible-nav-dropdown" disabled>
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {props.isLoginButton ? (
              <Nav.Link href="/login">Log In</Nav.Link>
            ) : (
              ""
            )}
            {props.isRegisterButton ? (
              <Nav.Link eventKey={2} href="/register">
                Register
              </Nav.Link>
            ) : (
              ""
            )}
            {props.isLogoutButton ? (
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