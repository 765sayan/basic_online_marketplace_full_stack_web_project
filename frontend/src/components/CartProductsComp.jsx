import { useEffect, useState } from "react";
import imageIcon from "../assets/imageIcon.svg";
import "../assets/productscomponents.css";
import {
  deleteCartService,
  deleteFromCartService,
  getCartService,
} from "../services/cartServices";
import { buyProduct } from "../services/userProductsServices";

export default function CartProductsComp(props) {
  const [productClickedState, setProductClickedStated] = useState([]);
  const [listOfCompState, setListOfCompState] = useState([]);
  const [token, setToken] = useState("");

  function getCartAsUser() {
    const listOfComp = [];

    getCartService(JSON.parse(localStorage.getItem("auth")).token).then(
      (res) => {
        if (res.cartitems) {
          let productsList = res.cartitems;
          productsList.map((element) => {
            listOfComp.push(element);
          });
          setListOfCompState(listOfComp);
        }
      }
    );
  }

  const { numberOfCartItems, setNumberOfCartItems } = props;

  async function buyProductFunction(productId, productName) {
    if ((token, productId)) {
      const productInfo = {
        productid: productId,
      };
      let res = await buyProduct(productInfo, token);
    }
  }

  async function removeFromCartFunction(cartitemid) {
    if (token !== "" && cartitemid) {
      let res = await deleteFromCartService(token, cartitemid);
      if (res) {
        if (!res.msg) {
          let newListOfCompState = listOfCompState.filter((element) => {
            if (element._id !== res._id) {
              return true;
            } else {
              return false;
            }
          });
          let numberOfCartItemsTemp = numberOfCartItems;
          numberOfCartItemsTemp = numberOfCartItemsTemp - 1;
          setNumberOfCartItems(numberOfCartItemsTemp);
          setListOfCompState(newListOfCompState);
        }
      }
    }
  }

  async function removeAllFromCart() {
    if (token !== "") {
      let res = await deleteCartService(token);

      if (res) {
        if (!res.msg) {
          let newListOfCompState = res.cartitems;
          let numberOfCartItemsTemp = 0;
          setNumberOfCartItems(numberOfCartItemsTemp);
          setListOfCompState(newListOfCompState);
        }
      }
    }
  }

  useEffect(() => {
    if (
      localStorage.getItem("auth") &&
      JSON.parse(localStorage.getItem("auth")).token
    ) {
      setToken(`Bearer ${JSON.parse(localStorage.getItem("auth")).token}`);
      getCartAsUser();
    }
  }, []);

  return (
    <>
      <div
        style={{
          borderStyle: "none",
          borderRadius: "8px",
          border: "solid",
          borderColor: "darkblue",
          borderWidth: "1px",
          margin: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {listOfCompState && listOfCompState.length !== 0 ? (
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
              onClick={removeAllFromCart}
            >
              Remove All From Cart
            </button>
          ) : (
            ""
          )}
          {listOfCompState.length === 0 ? (
            <h2 style={{ padding: "4px" }}>Your Cart Is Empty</h2>
          ) : (
            ""
          )}
          <div className="products-components-container">
            {listOfCompState.map((element, index) => {
              return (
                <div key={element._id}>
                  {productClickedState[0] !== index ? (
                    <div
                      className="comp-container comp-container-minimized"
                      key={index}
                      onClick={() => {
                        let newProductClickedState = [];
                        if (productClickedState.length === 0) {
                          newProductClickedState.push(index);
                          setProductClickedStated(newProductClickedState);
                        }
                      }}
                    >
                      <h4>{element.productid.name}</h4>
                      <img src={imageIcon} width={200} height={200} />
                      <i>{element.sellerid.name}</i>
                    </div>
                  ) : (
                    <div
                      className="comp-container comp-container-maximized"
                      key={index}
                      onClick={() => {
                        if (productClickedState.length !== 0) {
                          let newProductClickedState = [];
                          setProductClickedStated(newProductClickedState);
                        }
                      }}
                    >
                      <h4>{element.productid.name}</h4>
                      <img src={imageIcon} width={200} height={200} />
                      <i>{element.sellerid.name}</i>
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
                            element.productid._id,
                            element.productid.name
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
                          removeFromCartFunction(element._id);
                        }}
                      >
                        Remove From Cart
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
