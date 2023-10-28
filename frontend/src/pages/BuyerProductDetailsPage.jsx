import { useEffect, useRef, useState } from "react";

import ImageIcon from "../assets/imageIcon.svg";
import HeaderComp from "../components/HeaderComp";
import AuthPage from "./AuthPage";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/productdetails.css";
import { addToCartService } from "../services/cartServices";
import { buyProduct } from "../services/userProductsServices";
import ProductImageComp from "../components/ProductImageComp";

export default function BuyerProductDetailsPage(props) {
  let listOfMenuItems = ["Home", "Profile", "Orders", "Logout"];
  const navigate = useNavigate();

  const location = useLocation();
  const [productDetails, setProductDetails] = useState({});
  const [cursorOnImageState, setCursorOnImageState] = useState(false);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  const {
    numberOfCartItems,
    setNumberOfCartItems,
    showAuthCompState,
    setShowAuthCompState,
    userInfoState,
    setUserInfoState,
    productInfo,
  } = props;

  async function addToCartFunction(productId, sellerId) {
    if (
      localStorage.getItem("auth") &&
      JSON.parse(localStorage.getItem("auth")).token
    ) {
      let res = await addToCartService(
        `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`,
        productId,
        sellerId
      );
      if (res) {
        if (!res.msg) {
          let numberOfCartItemsTemp = numberOfCartItems;
          if (numberOfCartItems === 0) {
            setNumberOfCartItems(1);
          } else if (numberOfCartItems > 0) {
            numberOfCartItemsTemp = numberOfCartItemsTemp + 1;
            setNumberOfCartItems(numberOfCartItemsTemp);
          }
        } else {
          alert(res.msg);
        }
      }
    } else {
      setShowAuthCompState(true);
      return;
    }
  }

  async function buyProductFunction(productId, productName) {
    if (
      !localStorage.getItem("auth") ||
      !JSON.parse(localStorage.getItem("auth")).token
    ) {
      setShowAuthCompState(true);
      return;
    }

    if (
      productId &&
      localStorage.getItem("auth") &&
      JSON.parse(localStorage.getItem("auth")).token
    ) {
      const productInfo = {
        productid: productId,
      };
      let res = await buyProduct(
        productInfo,
        `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`
      );
      if (res) {
        if (!res.msg) {
          alert(`Product ${productName} Ordered`);
        } else {
          alert(`${res.msg}`);
        }
      }
    }
  }

  useEffect(() => {
    if (
      !localStorage.getItem("auth") ||
      !JSON.parse(localStorage.getItem("auth")).token
    ) {
      if (location.state !== null) {
        let productDetailsVar = {
          id: location.state.id,
          productName: location.state.productName,
          sellerName: location.state.sellerName,
          sellerId: location.state.sellerId,
        };
        setProductDetails(productDetailsVar);
      }
    } else {
      if (!JSON.parse(localStorage.getItem("auth")).usertype === "user") {
        navigate("/seller");
      } else {
        if (location.state !== null) {
          let productDetailsVar = {
            id: location.state.id,
            productName: location.state.productName,
            sellerName: location.state.sellerName,
            sellerId: location.state.sellerId,
          };
          setProductDetails(productDetailsVar);
        }
      }
    }
  }, []);

  if (!localStorage.getItem("auth")) {
    listOfMenuItems = ["Sign In"];
  }

  return (
    <>
      {productInfo === "Non" ? (
        <h2>Error 404 Page Not Found</h2>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <HeaderComp
              listOfMenuItems={listOfMenuItems}
              usertype={"buyer"}
              numberOfCartItems={numberOfCartItems}
              showAuthCompState={showAuthCompState}
              setShowAuthCompState={setShowAuthCompState}
              userInfoState={userInfoState}
              setUserInfoState={setUserInfoState}
            />
          </div>
          {showAuthCompState === true ? (
            <AuthPage
              setShowAuthCompState={setShowAuthCompState}
              setUserInfoState={setUserInfoState}
            />
          ) : (
            ""
          )}
          <div style={{ marginTop: "80px" }}>
            <div style={{ marginTop: "4px" }}>
              <div className="center-product-detail-comp">
                <div className="product-comp-container">
                  <div className="frame-1">
                    <h2>{productDetails.productName}</h2>
                  </div>
                  <ProductImageComp
                    imgRef={imgRef}
                    ImageIcon={ImageIcon}
                    setCursorOnImageState={setCursorOnImageState}
                    canvasRef={canvasRef}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      style={{
                        border: "solid",
                        borderColor: "darkblue",
                        borderWidth: "1px",
                        padding: "4px",
                        borderRadius: "4px",
                        color: "darkblue",
                        fontSize: "20px",
                        margin: "8px",
                        cursor: "pointer",
                        boxShadow: "none",
                      }}
                      onClick={() => {
                        buyProductFunction(
                          productDetails.id,
                          productDetails.productName
                        );
                      }}
                    >
                      Buy Now
                    </button>
                    <button
                      style={{
                        border: "solid",
                        borderColor: "darkblue",
                        borderWidth: "1px",
                        padding: "4px",
                        borderRadius: "4px",
                        color: "darkblue",
                        fontSize: "20px",
                        margin: "8px",
                        cursor: "pointer",
                        boxShadow: "none",
                      }}
                      onClick={() => {
                        addToCartFunction(
                          productDetails.id,
                          productDetails.sellerId
                        );
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
                {cursorOnImageState ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      visibility: "visible",
                    }}
                  >
                    <canvas
                      className="magnified-image"
                      ref={canvasRef}
                    ></canvas>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#1d1d44",
                    }}
                    className="frame-2"
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#ffffff",
                      }}
                      className="frame-2"
                    >
                      <h1>Description</h1>
                      <h4>Seller Name: {productDetails.sellerName}</h4>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
