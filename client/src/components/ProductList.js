import React, { useState, useEffect } from "react";
import axios from "axios";
import QuickViewModal from "./QuickViewModal";
import Header from "./Header";

export default props => {
    const [modalShow, setModalShow] = useState(false);

  return (
    <>
      {props.location.state.userId ? (
        <Header isLoginButton={false} isRegisterButton={false} isLogoutButton={true} />
      ) : (
        <Header isLoginButton={true} isRegisterButton={true} />
      )}
      <br />
      <div className="container">
        <h5> Sample Product</h5>
        <div className="row">
          <div className="col-md-2 col-sm-5">
            <div className="product-grid2">
              <div className="product-image2">
                <a>
                  <img
                    className="pic-1"
                    src="https://i.pinimg.com/originals/f7/4b/06/f74b06992f9e4214ef295cc078bc8ec9.jpg"
                  />
                  <img
                    className="pic-2"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrJLDbhiTCd5zHSYnMTzffr6NLfNK1KT1EbQ&usqp=CAU"
                  />
                </a>
                <ul className="social">
                  <li onClick={() => setModalShow(true)}>
                    <a data-tip="Quick View">
                      <i className="fa fa-eye"></i>
                    </a>
                  </li>
                </ul>
                <a className="add-to-cart" href="">
                  Add to cart
                </a>
              </div>
              <div className="product-content">
                <h3 className="title">
                  <a>Women's Designer Top</a>
                </h3>
                <span className="price">$299.99</span>
              </div>
            </div>
          </div>
        </div>
        <QuickViewModal show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </>
  );
};
