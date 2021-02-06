import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Carousel from 'react-bootstrap/Carousel'

const QuickViewModal = (props) => {
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
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <Carousel>
              {props.productImages.map((image, i) => (
                <Carousel.Item>
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
          <div className="col-lg-3"></div>
        </div>

        <h5>Item Description</h5>
        <p>{props.productData.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success">Add to Cart</Button>{" "}
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default QuickViewModal;