import React, { useState } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";
import Header from "./Header";
import "font-awesome/css/font-awesome.min.css";

const Checkout = props => {
  const[firstNameText, setFirstNameText] = useState('');
  const[lastNameText, setLastNameText] = useState('');
  const[addressText, setAddressText] = useState('');
  const[cityText, setCityText] = useState('');
  const[countryText, setCountryText] = useState('');
  const[stateText, setStateText] = useState('');
  const[zipText, setZipText] = useState('');
  const[cardNameText, setCardNameText] = useState('');
  const[cardNumberText, setCardNumberText] = useState('');
  const[expirationText, setExpirationText] = useState('');
  const[cvvText, setCvvText] = useState('');

  const[firstNameLabel, setFirstNameLabel] = useState('');
  const[lastNameLabel, setLastNameLabel] = useState('');
  const[addressLabel, setAddressLabel] = useState('');
  const[cityLabel, setCityLabel] = useState('');
  const[countryLabel, setCountryLabel] = useState('');
  const[stateLabel, setStateLabel] = useState('');
  const[zipLabel, setZipLabel] = useState('');
  const[cardNameLabel, setCardNameLabel] = useState('');
  const[cardNumberLabel, setCardNumberLabel] = useState('');
  const[expirationLabel, setExpirationLabel] = useState('');
  const[cvvLabel, setCvvlabel] = useState('');

  const {products, loggedInUser} = props.location.state;
  
  //console.dir( props.location.state);
  let total = products.reduce( function(sum, product){
    return sum = sum + product.product.price* product.qty;
  },0);
 
  
  const validateInput = event => {
    event.preventDefault();
    console.log('Validating form');

    console.log('State text: ' + stateText);
    console.log('Country text: ' + countryText);
    if (stateText === 'Choose') {
      setStateLabel('Plelase select a state');
      return false;
    } else {
      setStateLabel('');
    }

    if (countryText === 'Choose') {
      setCountryLabel('Please select a country');
      return false;
    } else {
      setCountryLabel('');
    }

    if (cvvText.length < 3) {
      setCvvlabel('Invalid cvv number');
      return false;
    } else {
      setCvvlabel('');
    }

    if (expirationText.length < 5) {
      setExpirationLabel('Invalid expiration date');
      return false;
    } else {
      setExpirationLabel('');
    }

    if (cardNumberText.length < 15) {
      setCardNumberLabel('Number on card should be more than 15 characters');
      return false;
    } else {
      setCardNumberLabel('');
    }

    if (cardNameText.length < 2) {
      setCardNameLabel('Name on Card should be longer than 2 characters');
      return false;
    } else {
      setCardNameLabel('');
    }

    if (zipText.length < 5) { // Missing validation for only numbers
      setZipLabel('Invalid zip code');
      return false;
    } else {
      setZipLabel('');
    }

    if (addressText.length < 6) {
      setAddressLabel('Address should be longer than 6 characters');
      return false;
    } else {
      setAddressLabel('');
    }

    if (cityText.length < 3) {
      setCityLabel('City should be longer than 3 characters');
      return false;
    } else {
      setCityLabel('');
    }

    if (firstNameText.length < 3) {
      setFirstNameLabel('First name should be longer than 3 characters');
      return false;
    } else {
    setFirstNameLabel('');
    }

     if (lastNameText.length < 2) {
       setLastNameLabel('Last name should be longer than 2 characters');
       return false;
     } else {
      setLastNameLabel('');
     }

     // This is the function that will update user and create checkout objects
     performCheckoutOperations();

     return true;
  }

  const performCheckoutOperations = () => {
    // use axios to update payment info on user
    //
    const payment = {
      card: {
          nameOnCard: cardNameText,
          cardNumber:cardNumberText,
          expiration: expirationText,
          cvv: cvvText,
      },
      billingAddress : {
          streetAddress: addressText,
          city: cityText,
          state: stateText,
          zip: zipText,

      }
    };
     // use axios to update payment info on user
      axios
        .put(`http://localhost:8000/api/users/${loggedInUser._id}`,{
         // products:products,
          payment:payment,
        })
        .then(res => {
          console.log(res.data);
         
        })
        .catch(err => {
          console.log(err);
        });

    // use axios to create checkout object and call checkout api
    axios
        .post("http://localhost:8000/api/checkout", {
          userId: loggedInUser._id,
          products : products
        })
        .then(res => {
          console.log(res);
          navigate("/productlist");
          alert('Thank you for your order');
        })
        .catch(err => {
          //alert(JSON.stringify(err))
          console.log(err);
        });

        //empty shopping carts


  }
  
  return (
    <>
      <Header /> <br />
      <form id="checkout_form" onSubmit={e => validateInput(e)}>
        <div className="container">
          <div className="row">
            <div className="col-md-4 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Your cart</span>
                <span className="badge badge-secondary badge-pill">{products.length}</span>
              </h4>
              <ul className="list-group mb-3">
              {products.map((singleProd, i) => (
               
                                        <>
                                          <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                            {singleProd.product.productName}{" "}
                                            <span>${singleProd.product.price}</span>
                                          </li>
                                          <p className="text-muted">(qty: {singleProd.qty})</p>
                                        </>
                                      ) )}       
                <li className="list-group-item d-flex justify-content-between">
                  <span><strong>Total (USD)</strong></span>
                  <strong>{total}</strong>
                </li> 
              </ul>

              <div className="card p-2">
                <button className="btn btn-primary " type="submit">
                  Place Order
                </button>
              </div>
            </div>
            <div className="col-md-8 order-md-1">
              <h4 className="mb-3">Billing address</h4>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label for="firstName">First name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder=""
                      required
                      onChange={e => setFirstNameText(e.target.value)}
                    />
                    <div className="text-danger">
                      <small>{firstNameLabel}</small>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label for="lastName">Last name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder=""
                      required
                      onChange={e => setLastNameText(e.target.value)}
                    />
                    <div className="text-danger">
                      <small>{lastNameLabel}</small>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label for="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Suite 3, 1234 Main St"
                    required
                    onChange={e => setAddressText(e.target.value)}
                  />
                  <div className="text-danger">
                    <small>{addressLabel}</small>
                  </div>
                </div>

              
                <div className="mb-3">
                  <label for="city">
                    {cityLabel}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    placeholder="City"
                    required
                    onChange={e => setCityText(e.target.value)}
                  />
                </div>

                <div className="row">
                  <div className="col-md-5 mb-3">
                    <label for="country">Country</label>
                    <select
                      className="custom-select d-block w-100"
                      id="country"
                      required
                      onChange={e => setCountryText(e.target.selectedValue)}
                    >
                      <option value="Choose">Choose...</option>
                      <option value="US">United States</option>
                    </select>
                    <div className="text-danger">
                      <small>{countryLabel}</small>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label for="state">State</label>
                    <select
                      className="custom-select d-block w-100"
                      id="state"
                      required
                      onChange={e => setStateText(e.target.selectedValue)}
                    >
                      <option value="Choose">Choose...</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District Of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </select>
                    <div className="text-danger">
                      <small>{stateLabel}</small>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label for="zip">Zip</label>
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
                      placeholder=""
                      required
                      onChange={e => setZipText(e.target.value)}
                    />
                    <div className="text-danger">
                      <small>{zipLabel}</small>
                    </div>
                  </div>
                </div>
                <hr className="mb-4"></hr>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="same-address"
                  />
                  <label className="custom-control-label" for="same-address">
                    Shipping address is the same as my billing address
                  </label>
                </div>

                <hr className="mb-4"></hr>

                <h4 className="mb-3">Payment</h4>

                <div className="d-block my-3">
                  <div className="custom-control custom-radio">
                    <input
                      id="credit"
                      name="paymentMethod"
                      type="radio"
                      className="custom-control-input"
                      checked
                      required
                    />
                    <label className="custom-control-label" for="credit">
                      Credit card
                    </label>
                    <div className="text-danger">
                      <small>{cardNameLabel}</small>
                    </div>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      id="debit"
                      name="paymentMethod"
                      type="radio"
                      className="custom-control-input"
                      required
                    />
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      id="paypal"
                      name="paymentMethod"
                      type="radio"
                      className="custom-control-input"
                      required
                    />
                    <label className="custom-control-label" for="paypal">
                      PayPal
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label for="cc-name">Name on card</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-name"
                      placeholder=""
                      required
                      onChange={e => setCardNameText(e.target.value)}
                    />
                    <small className="text-muted">
                      Full name as displayed on card
                    </small>
                    <div className="text-danger">
                      <small>{cardNameLabel}</small>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label for="cc-number">Credit card number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-number"
                      placeholder=""
                      required
                      onChange={e => setCardNumberText(e.target.value)}
                    />
                    <div className="text-danger">
                      <small>{cardNumberLabel}</small>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label for="cc-expiration">Expiration</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-expiration"
                      placeholder=""
                      required
                      onChange={e => setExpirationText(e.target.value)}
                    />
                    <div className="text-danger">
                      <small>{expirationLabel}</small>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label for="cc-cvv">CVV</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-cvv"
                      placeholder=""
                      required
                      onChange={e => setCvvText(e.target.value)}
                    />
                    <div className="text-danger"><small>{cvvLabel}</small></div>
                  </div>
                </div>
                <hr className="mb-4"></hr>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Checkout;