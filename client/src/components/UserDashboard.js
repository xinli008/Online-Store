import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import { Link, navigate } from "@reach/router";
import axios from "axios";
import Header from "./Header";

const UserDashboard = props => {
      const [loggedInUser, setLoggedInUser] = useState({});

      useEffect(() => {
        axios
          .get("http://localhost:8000/api/users/getLoggedInUser", {
            withCredentials: true
          })
          .then(res => {
            //console.log(res);
            setLoggedInUser(res.data.user);
            
          })
          .catch(err => {
           
            console.log(err);
          });
      }, []); 
      
  return (
    <>
      <Header /> <br />
      <section className="container">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-8">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="mb-4">User Detail</h5>
                <hr className="mb-4"></hr>
                <div className="row mb-4">
                  <div className="col">
                    <div>
                      <div className="d-flex justify-content-between">
                        <div>
                          <p className="mb-2 text-muted">
                            First Name: {loggedInUser.firstName}
                          </p>
                          <p className="mb-2 text-muted">
                            Last Name: {loggedInUser.lastName}
                          </p>
                          <p className="mb-2 text-muted">
                            Email: {loggedInUser.email}
                          </p>
                          <p className="mb-2 text-muted">
                            Address: {loggedInUser.address}
                          </p>
                          <p className="mb-2 text-muted">
                            City: {loggedInUser.city}
                          </p>
                          <p className="mb-2 text-muted">
                            State: {loggedInUser.state}
                          </p>
                          <p className="mb-2 text-muted">
                            Zipcode: {loggedInUser.zip}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="mb-4">Recent Orders</h5>
                <hr className="mb-4"></hr>
                <p className="mb-2 text-muted">
                  You haven't placed any orders yet!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserDashboard;