import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import { Link, navigate } from "@reach/router";
import axios from "axios";
import Header from "./Header";

const UserDashboard = props => {
      
  return (
    <>
      <Header isLogoutButton={true} userRec={props.location.state} /> <br />
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
                            First Name: {props.location.state.firstName}
                          </p>
                          <p className="mb-2 text-muted">
                            Last Name: {props.location.state.lastName}
                          </p>
                          <p className="mb-2 text-muted">
                            Email: {props.location.state.email}
                          </p>
                          <p className="mb-2 text-muted">
                            Address: {props.location.state.address}
                          </p>
                          <p className="mb-2 text-muted">
                            City: {props.location.state.city}
                          </p>
                          <p className="mb-2 text-muted">
                            State: {props.location.state.state}
                          </p>
                          <p className="mb-2 text-muted">
                            Zipcode: {props.location.state.zip}
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