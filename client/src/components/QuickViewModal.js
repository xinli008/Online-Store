import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Carousel from 'react-bootstrap/Carousel';
import "font-awesome/css/font-awesome.min.css";

const QuickViewModal = (props) => {
    const [qty, setQty] = useState(1);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.productData.productName}{" "}
          <Badge variant="primary">${props.productData.price}</Badge>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-lg-6">
            <Carousel>
              {props.productImages.map((image, i) => (
                <Carousel.Item interval="1000">
                  <img
                    className="d-block w-100"
                    src={image}
                    alt="images"
                    style={{ objectFit: "fill" }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className="col-lg-6">
            <h5>Quantity</h5>
            <div className="mb-4 w-100">
              <i
                onClick={() => (qty > 1 ? setQty(qty - 1) : qty)}
                className="fa fa-minus"
              ></i>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="0"
                value={qty}
              />
              <i onClick={() => setQty(qty + 1)} className="fa fa-plus"></i>
            </div>
            <h5>Item Description</h5>
            <p className="mb-4">{props.productData.description}</p>
            
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success">Add to Cart</Button>{" "}
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default QuickViewModal;