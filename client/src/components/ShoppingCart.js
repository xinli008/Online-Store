import React, { useState, useEffect } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";
import Header from "./Header";
import "font-awesome/css/font-awesome.min.css";
import "mdbreact/dist/css/mdb.css";

const ShoppingCart = props => {
  const [qty, setQty] = useState(1);
  const [loggedInUser, setLoggedInUser] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/getLoggedInUser", {
        withCredentials: true
      })
      .then(res => {
        setLoggedInUser(res.data.user);
        if (res.data.user.products.length > 0) {
          setProducts(res.data.user.products);          
        }
        console.log(res.data.user);
      })
      .catch(err => {
        navigate("/login");
        console.log(err);
      });
  }, [products]);

  if (products.length> 0) {
    var tempArray = [];
    for (let i = 0; i < products.length; i++) {
      tempArray.push(products[i].product.price);
    }

    function sum(a) {
      return (a.length && parseFloat(a[0]) + sum(a.slice(1))) || 0;
    }
    var total = sum(tempArray).toFixed(2);
  }

  const removeProduct =(product)=>{
    products.pop(product);
    axios
      .put(`http://localhost:8000/api/users/${loggedInUser._id}`, {
        products: products
      })
      .then(res => {
        console.log(res.data);
        setProducts(res.data.products);
      });
  }

  const goToCheckout = () =>{
    navigate("/checkout/", { state: products });
  }
  
  return (
    <div>
      <Header /> <br />
      <section className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="card wish-list mb-3">
              <div className="card-body">
                <h5 className="mb-4">
                  Shopping Cart (<span>{products.length}</span> item)
                </h5>
                {products.length > 0 ? (
                  <>
                    {products.map((singleProd, i) => (
                      <>
                        <div className="row mb-4">
                          <div className="col-md-5 col-lg-3 col-xl-3">
                            <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                              <img
                                className="img-fluid w-100"
                                src={singleProd.product.photos[0]}
                                alt="prod-image"
                              />
                              <a href="#!">
                                <div className="mask waves-effect waves-light">
                                  <img
                                    className="img-fluid w-100"
                                    src={singleProd.product.photos[0]}
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
                                  <h5 className="mb-3">
                                    {singleProd.product.productName}
                                  </h5>
                                  <p className="mb-3 text-uppercase small">
                                    <div>
                                      <div className="mb-0 w-100">
                                        <i
                                          onClick={() =>
                                            singleProd.qty > 0
                                              ? singleProd.qty - 1
                                              : singleProd.qty
                                          }
                                          className="fa fa-minus"
                                        ></i>
                                        <input
                                          type="number"
                                          id="quantity"
                                          name="quantity"
                                          min="0"
                                          value={singleProd.qty}
                                        />
                                        <i
                                          onClick={() => singleProd.qty + 1}
                                          className="fa fa-plus"
                                        ></i>
                                      </div>
                                      <small
                                        id="passwordHelpBlock"
                                        className="form-text text-muted text-center"
                                      >
                                        QUANTITY
                                      </small>
                                    </div>
                                  </p>
                                </div>
                                <p className="mb-0">
                                  <span>
                                    <strong>${singleProd.product.price}</strong>
                                  </span>
                                </p>
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <a
                                    onClick={() => removeProduct(singleProd)}
                                    type="button"
                                    className="card-link-secondary small text-uppercase mr-3"
                                  >
                                    <i className="fa fa-trash mr-1"></i> Remove
                                    item{" "}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr className="mb-4"></hr>
                        </div>
                      </>
                    ))}
                  </>
                ) : (
                  <h5>Your shopping cart is empty.</h5>
                )}
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

          {products.length > 0 ? (
            <>
              <div className="col-lg-4">
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="mb-3">Cart Summary</h5>

                    <ul className="list-group list-group-flush">
                      {products.map((singleProd, i) => (
                        <>
                          <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                            {singleProd.product.productName}{" "}
                            <span>${singleProd.product.price}</span>
                          </li>
                          <p className="text-muted">(qty: {singleProd.qty})</p>
                        </>
                      ))}
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
                          <strong>${total}</strong>
                        </span>
                      </li>
                    </ul>

                    <button
                      type="button"
                      className="btn btn-primary btn-block waves-effect waves-light"
                      onClick={goToCheckout}
                    >
                      go to checkout
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </section>
    </div>
  );
};

export default ShoppingCart;
