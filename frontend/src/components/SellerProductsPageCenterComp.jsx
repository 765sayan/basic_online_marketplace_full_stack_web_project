import { useEffect, useState } from "react";
import imageIcon from "../assets/imageIcon.svg";
import "../assets/productscomponents.css";
import { getOrderedProductsAsSeller } from "../services/sellerProductsServices";

export default function SellerProductsPageCenterComp() {
  const [productClickedState, setProductClickedStated] = useState([]);
  const [listOfCompState, setListOfCompState] = useState([]);
  const [token, setToken] = useState("");

  function getOrderedProductsAsSellerFunction() {
    const listOfComp = [];

    getOrderedProductsAsSeller(
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

  useEffect(() => {
    if (
      localStorage.getItem("auth") &&
      JSON.parse(localStorage.getItem("auth")).token
    ) {
      setToken(`Bearer ${JSON.parse(localStorage.getItem("auth")).token}`);
      getOrderedProductsAsSellerFunction();
    }
  }, []);

  return (
    <>
      <div
        style={{
          borderStyle: "none",
          borderRadius: "20px",
          boxShadow: "1px 1px 1px 1px",
          margin: "10px",
        }}
      >
        <div className="products-components-container">
          {listOfCompState.map((element, index) => {
            return (
              <div key={element._id}>
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
                  <i>{element.userid.name}</i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
