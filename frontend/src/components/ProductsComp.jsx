import imageIcon from "../assets/imageIcon.svg";
import "../assets/productscomponents.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  buyProduct,
  getAllProductsAsUserService,
} from "../services/userProductsServices";
import { addToCartService } from "../services/cartServices";

export default function ProductsComp(props) {
  const [productClickedState, setProductClickedStated] = useState([]);
  const [listOfCompState, setListOfCompState] = useState([]);
  const [token, setToken] = useState("");

  const {
    productNameFilter,
    sellerNameFilter,
    numberOfCartItems,
    setNumberOfCartItems,
    setShowAuthCompState,
  } = props;
  const navigate = useNavigate();

  function getAllProductsAsUser() {
    const listOfComp = [];

    getAllProductsAsUserService().then((res) => {
      if (res.products) {
        let productsList = res.products;
        productsList.map((element) => {
          listOfComp.push(element);
        });
        setListOfCompState(listOfComp);
      }
    });
  }

  async function addToCartFunction(productId, sellerId) {
    if (
      localStorage.getItem("auth") &&
      JSON.parse(localStorage.getItem("auth")).token
    ) {
      let res = await addToCartService(token, productId, sellerId);
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
    if (token === "") {
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
      let res = await buyProduct(productInfo, token);
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
      localStorage.getItem("auth") &&
      JSON.parse(localStorage.getItem("auth")).token
    ) {
      setToken(`Bearer ${JSON.parse(localStorage.getItem("auth")).token}`);
      getAllProductsAsUser();
    }
    getAllProductsAsUser();
  }, []);

  return (
    <>
      <div className="products-components-container">
        {listOfCompState.map((element, index) => {
          if (sellerNameFilter !== "" || productNameFilter !== "") {
            let productName = element.name.toString();
            let sellerName = element.seller.name.toString();
            if (
              productName.indexOf(productNameFilter) > -1 &&
              sellerName.indexOf(sellerNameFilter) > -1
            ) {
              return (
                <div key={element._id}>
                  {" "}
                  {productClickedState[0] !== index ? (
                    <div
                      className="comp-container comp-container-minimized"
                      // key={element._id}
                      onClick={() => {
                        let newProductClickedState = [];
                        if (productClickedState.length === 0) {
                          newProductClickedState.push(index);
                          setProductClickedStated(newProductClickedState);
                        }
                      }}
                    >
                      <h4>{element.name}</h4>
                      <img src={imageIcon} width={200} height={200} />
                      <i>{element.seller.name}</i>
                    </div>
                  ) : (
                    <div
                      className="comp-container comp-container-maximized"
                      // key={element._id}
                      onClick={() => {
                        if (productClickedState.length !== 0) {
                          let newProductClickedState = [];
                          setProductClickedStated(newProductClickedState);
                        }
                      }}
                    >
                      <h4>{element.name}</h4>
                      <img src={imageIcon} width={200} height={200} />
                      <i>{element.seller.name}</i>

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
                          buyProductFunction(element._id, element.name);
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
                          addToCartFunction(element._id, element.seller._id);
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  )}
                </div>
              );
            } else {
              return <></>;
            }
          } else {
            return (
              <div key={element._id}>
                {productClickedState[0] !== index ? (
                  <div
                    className="comp-container comp-container-minimized"
                    // key={element._id}
                    onClick={() => {
                      let newProductClickedState = [];
                      if (productClickedState.length === 0) {
                        newProductClickedState.push(index);
                        setProductClickedStated(newProductClickedState);
                      }
                    }}
                  >
                    <h4>{element.name}</h4>
                    <img src={imageIcon} width={200} height={200} />
                    <i>{element.seller.name}</i>
                  </div>
                ) : (
                  <div
                    className="comp-container comp-container-maximized"
                    onClick={() => {
                      if (productClickedState.length !== 0) {
                        let newProductClickedState = [];
                        setProductClickedStated(newProductClickedState);
                      }
                    }}
                  >
                    <h4>{element.name}</h4>
                    <img src={imageIcon} width={200} height={200} />
                    <i>{element.seller.name}</i>
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
                        buyProductFunction(element._id, element.name);
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
                        addToCartFunction(element._id, element.seller._id);
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                )}
              </div>
            );
          }
        })}
      </div>
    </>
  );
}
