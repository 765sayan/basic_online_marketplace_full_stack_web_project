import { useEffect, useState } from "react";
import {
  cancelProductService,
  getAllOrderedProductsAsUser,
} from "../services/userProductsServices";
import imageIcon from "../assets/imageIcon.svg";
import "../assets/productscomponents.css";

export default function UserProductsPageCenterComp() {
  const [productClickedState, setProductClickedStated] = useState([]);
  const [listOfCompState, setListOfCompState] = useState([]);
  const [token, setToken] = useState("");

  function getOrderedProductsAsUser() {
    const listOfComp = [];

    getAllOrderedProductsAsUser(
      `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`
    ).then((res) => {
      if (res.productsordered) {
        let productsList = res.productsordered;
        productsList.map((element) => {
          listOfComp.push(element);
        });
        setListOfCompState(listOfComp);
      }
    });
  }

  async function cancelOrderedProductFunction(productid) {
    if (token !== "" && productid) {
      let res = await cancelProductService(productid, token);
      if (res) {
        if (!res.msg) {
          let newListOfCompState = listOfCompState.filter((element) => {
            if (element._id !== res._id) {
              return true;
            } else {
              return false;
            }
          });
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
      getOrderedProductsAsUser();
    }
  }, []);

  return (
    <>
      <div
        style={{
          borderStyle: "none",
          borderRadius: "8px",
          // boxShadow: "1px 1px 1px 1px",
          border: "solid",
          borderColor: "#1d1d44",
          borderWidth: "1px",
          margin: "10px",
        }}
      >
        <div className="products-components-container">
          {listOfCompState && listOfCompState.length === 0 ? (
            <h2 style={{ padding: "4px" }}>Your Do Not Have Any Orders</h2>
          ) : (
            ""
          )}
          {listOfCompState.map((element, index) => {
            return (
              <div key={index}>
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
                        cancelOrderedProductFunction(element._id);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
