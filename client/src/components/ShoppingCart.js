import React, { useState } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";
import Header from "./Header";
import "font-awesome/css/font-awesome.min.css";
import "mdbreact/dist/css/mdb.css";

const ShoppingCart = props => {
  return (
    <div>
      <Header isLogoutButton={true} /> <br />
      <section className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="card wish-list mb-3">
              <div className="card-body">
                <h5 className="mb-4">
                  Shopping Cart (<span>1</span> item)
                </h5>

                <div className="row mb-4">
                  <div className="col-md-5 col-lg-3 col-xl-3">
                    <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                      <img
                        className="img-fluid w-100"
                        src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg"
                        alt="Sample"
                      />
                      <a href="#!">
                        <div className="mask waves-effect waves-light">
                          <img
                            className="img-fluid w-100"
                            src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12.jpg"
                          />
                          <div className="mask rgba-black-slight waves-effect waves-light"></div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-7 col-lg-9 col-xl-9">
                    <div>
                      <div className="d-flex justify-content-between">
                        <div>
                          <h5>Blue denim shirt</h5>
                          <p className="mb-3 text-muted text-uppercase small">
                            Shirt - blue
                          </p>
                          <p className="mb-2 text-muted text-uppercase small">
                            Color: blue
                          </p>
                          <p className="mb-3 text-muted text-uppercase small">
                            Size: M
                          </p>
                        </div>
                        <div>
                          <div className="mb-0 w-100">
                            <i onClick="stepDown()" className="fa fa-minus"></i>
                            <input id="number" type="number" value="1" />
                            <i onClick="stepUp()" className="fa fa-plus"></i>
                          </div>
                          <small
                            id="passwordHelpBlock"
                            className="form-text text-muted text-center"
                          >
                            QUANTITY
                          </small>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <a
                            href="#!"
                            type="button"
                            className="card-link-secondary small text-uppercase mr-3"
                          >
                            <i className="fa fa-trash-alt mr-1"></i> Remove item{" "}
                          </a>
                          <a
                            href="#!"
                            type="button"
                            className="card-link-secondary small text-uppercase"
                          >
                            <i className="fa fa-heart mr-1"></i> Save for Later{" "}
                          </a>
                        </div>
                        <p className="mb-0">
                          <span>
                            <strong>$25.99</strong>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="mb-4"></hr>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body">
                <h5 className="mb-4">We accept</h5>

                <img
                  className="mr-2"
                  width="45px"
                  src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                  alt="Visa"
                />
                <img
                  className="mr-2"
                  width="45px"
                  src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                  alt="American Express"
                />
                <img
                  className="mr-2"
                  width="45px"
                  src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                  alt="Mastercard"
                />
                <img
                  className="mr-2"
                  width="65px"
                  height="70px"
                  src="https://cdn3.iconfinder.com/data/icons/payment-method-1/64/_Paypal-39-512.png"
                  alt="PayPal acceptance mark"
                />
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="mb-3">Cart Summary</h5>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Blue denim shirt (1)
                    <span>$25.99</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>Free</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total</strong>
                      <strong>
                        <p className="mb-0">(excluding tax)</p>
                      </strong>
                    </div>
                    <span>
                      <strong>$25.99</strong>
                    </span>
                  </li>
                </ul>

                <button
                  type="button"
                  className="btn btn-primary btn-block waves-effect waves-light"
                  onClick={()=> navigate("/")}
                >
                  go to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShoppingCart;
