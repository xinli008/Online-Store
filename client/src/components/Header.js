import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, navigate } from "@reach/router";
import axios from "axios";
import logo from "../images/logo.PNG";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 
export default props => {
  
  const viewDashboard = () => {
    axios
      .get(`http://localhost:8000/api/users/${props.userRec.id}`, {
        withCredentials: true
      })
      .then(res => {
        //console.log(res.data[0]);
        navigate("/dashboard/", {
          state: res.data[0]
        });        
      })
      .catch(err => {
        //alert("not authorized");
        console.log(err);
      });

  }
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
            {!props.isLogoutButton ? <Nav.Link href="/">Home</Nav.Link> : ""}            
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
              <Nav.Link onClick={viewDashboard}>
                <FontAwesomeIcon icon={faUser} />
              </Nav.Link>
            ) : (
              ""
            )}
            {props.isLogoutButton ? (
              <Nav.Link onClick={() => navigate("/shoppingcart")}>
                <FontAwesomeIcon icon={faShoppingCart} />1
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