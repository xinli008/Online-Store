import React, { useState, useEffect } from "react";
import axios from "axios";
import QuickViewModal from "./QuickViewModal";
import Header from "./Header";
import Image from "react-bootstrap/Image";
import { navigate } from "@reach/router";
import Toast from "react-bootstrap/Toast";
import ToastBody from "react-bootstrap/ToastBody";
import { faEye, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default props => {
  const [modalShow, setModalShow] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState();
  const [products, setProducts] = useState([]);
  const [selectedProduct , setSelectedProduct] = useState({});
  const [existingProducts, setExistingProducts] = useState([]);
  const [selectedProductPhotos, setSelectedProductPhotos] = useState([]);
  const [tempProd, setTempProd] = useState("");
  const [tempProductPass, setTempProductPass] = useState(false);
  const [tempProductFail, setTempProductFail] = useState(false);

  const testPorductArray = [
    {
      productName: "Dead Sea Mud Mask",
      description:
        "New York Biology Dead Sea Mud Mask for Face and Body - Spa Quality Pore Reducer for Acne, Blackheads and Oily Skin, Natural Skincare for Women, Men - Tightens Skin for A Healthier Complexion - 8.8 oz",
      rating: 4.5,
      price: 15.49,
      discount: 0,
      categories: ["Beauty", "Health"],
      photos: [
        "https://images-na.ssl-images-amazon.com/images/I/81UYOXNTqIL._SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/61DJ0VwouaL._SL1000_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/61z6cdp7mjL._SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/61UpGMnOicL._SL1500_.jpg"
      ]
    },
    {
      productName: "Olay Regenerist",
      description:
        "Olay Regenerist Retinol 24 Night Moisturizer Fragrance-Free + Whip Face Moisturizer Travel/Trial Size Gift Set",
      rating: 4.5,
      price: 46.99,
      discount: 0,
      categories: ["Beauty", "Health"],
      photos: [
        "https://images-na.ssl-images-amazon.com/images/I/714BQJRjQNL._SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/71-Hg1f0o9L._SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/81m8TBJGokL._SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/61n1WbvmS8L._SL1280_.jpg"
      ]
    },
    {
      productName: "Anti Aging Serum",
      description:
        "Anti Aging Serum 3-Pack for Face - Vitamin C Serum, Retinol Serum, Hyaluronic Acid Serum - Face Serum Full Regimen",
      rating: 4.5,
      price: 17.96,
      discount: 0,
      categories: ["Beauty", "Health"],
      photos: [
        "https://images-na.ssl-images-amazon.com/images/I/71nvEGwVJ6L._SL1024_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/81HxpXGWPCL._SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/81YeBYG7g6L._SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/71Ks8umV0FL._SL1500_.jpg"
      ]
    },
    {
      productName: "MB",
      description:
        "Meaningful Beauty Anti-Aging Daily Skincare System with Youth Activating Serum",
      rating: 4.5,
      price: 59.0,
      discount: 0,
      categories: ["Beauty", "Health"],
      photos: [
        "https://images-na.ssl-images-amazon.com/images/I/71-diubdixL._SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/51u2ypE2onL._SL1000_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/61TmUpBbzfL._SL1000_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/41gsvOMR3AL._SL1000_.jpg"
      ]
    },
    {
      productName: "M3 Naturals Himalayan Salt Scrub",
      description:
        "M3 Naturals Himalayan Salt Scrub Infused with Collagen and Stem Cell Natural Exfoliating Body and Face Souffle for Acne Cellulite Dead Skin Scars Wrinkles Cleansing Exfoliator 12 oz",
      rating: 4.5,
      price: 33.15,
      discount: 0,
      categories: ["Beauty", "Health"],
      photos: [
        "https://images-na.ssl-images-amazon.com/images/I/81b5B6YYL4L._SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/81Mpku8LRbL._SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/71153ng8z0L._SL1200_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/71XeOL-00pL._SL1200_.jpg"
      ]
    },
    {
      productName: "Lenovo ThinkPad L15",
      description:
        "Lenovo ThinkPad L15 15.6 Full HD 1080P Business Laptop, Intel Core i5-10210U, 8GB Memory, 256GB SSD, Windows 10 Pro",
      rating: 4.5,
      price: 798.94,
      discount: 0,
      categories: ["Technology"],
      photos: [
        "https://images-na.ssl-images-amazon.com/images/I/4188Ncc9wVL._AC_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/51Z9vqv%2BO7L._AC_SL1280_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/215AwPrvxjL._AC_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/31lEqaq-bTL._AC_.jpg"
      ]
    },
    {
      productName: "MacBook Pro 13",
      description:
        "Apple MacBook Pro 13in MD101LL/A 8GB/128GB SSD Mid-2012 i5-3210M 2.5GHz (Renewed)",
      rating: 4.5,
      price: 2500,
      discount: 0,
      categories: ["Technology"],
      photos: [
        "https://m.media-amazon.com/images/I/71qVOM+lgnL._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/I/31Gn1kSyiDL._AC_.jpg"
      ]
    },
    {
      productName: "Apple iPad",
      description:
        "New Apple iPad (10.2-inch, Wi-Fi, 32GB) - Space Gray (Latest Model, 8th Generation)",
      rating: 4.5,
      price: 299.0,
      discount: 0,
      categories: ["Technology", "Mobile"],
      photos: [
        "https://images-na.ssl-images-amazon.com/images/I/71gOkVA6-eL._AC_SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/71IY%2BPo9y6L._AC_SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/91D5Pmj4AQL._AC_SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/91oo%2BXVjHgL._AC_SL1500_.jpg"
      ]
    },
    {
      productName: "HP Premium Monitor",
      description:
        "2021 HP Premium 31.5 Inch FHD (1920 x 1080) IPS LED Monitor, HDMI, VGA, Black + NexiGo 4K HDMI Cable Bundle",
      rating: 4.5,
      price: 299.0,
      discount: 0,
      categories: ["Technology", "Monitors"],
      photos: [
        "https://images-na.ssl-images-amazon.com/images/I/51zAn-QZ4pL._AC_SL1000_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/61nCqOINvoL._AC_SL1000_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/51zAn-QZ4pL._AC_SL1000_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/51r9wtwmOvL._AC_SL1000_.jpg"
      ]
    },
    {
      productName: "Roku Streaming Stick+",
      description:
        "Roku Streaming Stick+ | HD/4K/HDR Streaming Device with Long-range Wireless and Voice Remote with TV Controls",
      rating: 4.5,
      price: 39.0,
      discount: 0,
      categories: ["Technology", "Streaming"],
      photos: [
        "https://images-na.ssl-images-amazon.com/images/I/81lsA5v8EIL._AC_SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/81sQAg-3jVL._AC_SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/81qiriSImjL._AC_SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/81y-l4Er2CL._AC_SL1500_.jpg"
      ]
    },
    {
      productName: "Dog harness",
      description:
        "Voyager Step-in Air Dog Harness - All Weather Mesh, Step in Vest Harness by Best Pet Supplies",
      rating: 4.5,
      price: 13.99,
      discount: 0,
      categories: ["Pets"],
      photos: [
        "https://images-na.ssl-images-amazon.com/images/I/81jy-V87ucL._AC_SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/81eSalnRfJL._AC_SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/81Gz0%2Buq6vL._AC_SL1440_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/81TJsdnugqL._AC_SL1500_.jpg"
      ]
    },
    {
      productName: "GloFishAquarium Kit",
      description:
        "GloFish Aquarium Kit Fish Tank with LED Lighting and Filtration Included",
      rating: 4.5,
      price: 89.99,
      discount: 0,
      categories: ["Pets"],
      photos: [
        "https://images-na.ssl-images-amazon.com/images/I/91L8UHu0mpL._AC_SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/81u2JJ5VpeL._AC_SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/81fKZxaqLlL._AC_SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/81M41C222WL._AC_SL1500_.jpg"
      ]
    },
    {
      productName: "Foldable Dog Pet Bath Pool",
      description:
        "Jasonwell Foldable Dog Pet Bath Pool Collapsible Dog Pet Pool Bathing Tub Kiddie Pool for Dogs Cats and Kids",
      rating: 4.5,
      price: 28.99,
      discount: 0,
      categories: ["Pets"],
      photos: [
        "https://images-na.ssl-images-amazon.com/images/I/61nt5PycB6L._AC_SL1000_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/51EBdBhxDDL._AC_SL1000_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/61kdLQ8mjHL._AC_SL1001_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/61TS9eMjrGL._AC_SL1068_.jpg"
      ]
    },
    {
      productName: "SLOCME Aquarium Ornaments",
      description:
        "SLOCME Aquarium Ornaments Resin Castle Decorations - Fish Tank Supplies Accessories,Eco-Friendly Fish Tank Castle Aquarium Ornament",
      rating: 4.5,
      price: 18.99,
      discount: 0,
      categories: ["Pets"],
      photos: [
        "https://images-na.ssl-images-amazon.com/images/I/71zW-MFE%2BUL._AC_SL1001_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/81T97mcY1jL._AC_SL1000_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/71BnpgXPqvL._AC_SL1000_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/81s9rTwuMwL._AC_SL1003_.jpg"
      ]
    },
    {
      productName: "Bird Cage",
      description:
        "YAHEETECH 52-inch Wrought Iron Standing Large Flight King Bird Cage for Cockatiels African Grey Quaker Amazon Sun Parakeets Green Cheek Conures Pigeons Small Parrot Bird Cage Birdcage with Stand",
      rating: 4.5,
      price: 104.99,
      discount: 0,
      categories: ["Pets"],
      photos: [
        "https://images-na.ssl-images-amazon.com/images/I/718OSH4psqL._AC_SL1000_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/81bMEkDiGdL._AC_SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/717e%2B2NyY4L._AC_SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/81amIE3a-EL._AC_SL1500_.jpg"
      ]
    }
  ];
  
  useEffect(() => {
                    axios
                      .get("http://localhost:8000/api/users/getLoggedInUser", {
                        withCredentials: true
                      })
                      .then(res => {
                        console.log(res.data.user);
                        setLoggedInUser(res.data.user);
                        setExistingProducts(res.data.user.products);
                      })
                      .catch(err => {
                        console.log(err);
                      });

                    setProducts(testPorductArray);
                    /*
    Note: 
testPorductArray variable can completely be removed and 
Below API call can be uncommented if product is configured on backend.

    axios
      .get("http://localhost:8000/api/product")
      .then(res => {
        console.log(res);
        setProducts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    
      */
                  }, []);  //[selectedProduct] Cindy

  const openQuickView = (selProduct) => {
    setModalShow(true);
    setSelectedProduct(selProduct);
    setSelectedProductPhotos(selProduct.photos);
  }

  const addProductToCart = (product) => {
    if (loggedInUser) {
      setSelectedProduct(product);
      setTempProd(product.productName);
      const userProducts = [];
      const selectedProd={ product:product, qty: 1 };
      userProducts.push(...existingProducts, selectedProd);
      
        axios
          .put(`http://localhost:8000/api/users/${loggedInUser._id}`, {
            products: userProducts
          })
          .then(res => {
            console.log(res.data);
            setTempProductPass(true);            
          })
          .catch(err => {
            setTempProductFail(true);
          });
    } else {
      alert("Login first to add to cart");
      navigate("/login");
    }
  };
  return (
    <>
      <Header />
      <br />

      <div className="container">
        <div className="row">
        <div className="col-lg-4"></div>
          <div className="col-lg-6">
            {tempProductPass ? (
              <Toast
                onClose={() => setTempProductPass(false)}
                show={tempProductPass}
                delay={3000}
                autohide
              >
                <Toast.Body style={{ backgroundColor: "lightgreen" }}>
                  <strong>{tempProd}</strong> added to cart successfully!!{" "}
                  <FontAwesomeIcon icon={faCheckCircle} />
                </Toast.Body>
              </Toast>
            ) : (
              ""
            )}

            {tempProductFail ? (
              <Toast
                onClose={() => setTempProductFail(false)}
                show={tempProductFail}
                delay={3000}
                autohide
              >
                <Toast.Body style={{ backgroundColor: "lightred" }}>
                  Unable to add <strong>{tempProd}</strong> to cart!!{" "}
                  <FontAwesomeIcon icon={faTimesCircle} />
                </Toast.Body>
              </Toast>
            ) : (
              ""
            )}
            <br/>
          </div>
        </div>

        <div className="row">
          {products.map((product, i) => (
            <div className="col-md-2 col-sm-5" key={i}>
              <div className="product-grid2">
                <div className="product-image2">
                  <a>
                    <Image
                      src={product.photos[0]}
                      className="pic-1"
                      thumbnail
                    />
                    <Image
                      src={product.photos[1]}
                      className="pic-2"
                      thumbnail
                    />
                  </a>
                  <ul className="social">
                    <li onClick={() => openQuickView(product)}>
                      <a data-tip="Quick View">
                        <FontAwesomeIcon icon={faEye} />
                      </a>
                    </li>
                  </ul>
                  <button
                    className="add-to-cart"
                    onClick={() => addProductToCart(product)}
                  >
                    Add to cart
                  </button>
                </div>
                <div className="product-content">
                  <h3 className="title">
                    <a>{product.productName}</a>
                  </h3>
                  <span className="price">${product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <QuickViewModal
          show={modalShow}
          productData={selectedProduct}
          productImages={selectedProductPhotos}
          onHide={() => setModalShow(false)}
        />
      </div>
    </>
  );
};
