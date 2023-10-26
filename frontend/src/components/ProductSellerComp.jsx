import imageIcon from "../assets/imageIcon.svg";
import { useEffect, useState } from "react";
import "../assets/authcomponents.css";
import {
  addProductServiceAsSeller,
  deleteProductServiceAsSeller,
  getAllAddedProductsAsSeller,
  updateProductServiceAsSeller,
} from "../services/sellerProductsServices";
import { useNavigate } from "react-router-dom";

export default function ProductSellerComp() {
  const [productname, setProductName] = useState("");
  const [listOfCompState, setListOfCompState] = useState([]);
  const [token, setToken] = useState("");

  const [productClickedState, setProductClickedStated] = useState([]);

  const navigate = useNavigate();
  const [updateState, setUpdateState] = useState("");
  const [updateProduct, setUpdateProduct] = useState("");
  const [updatedProductName, setUpdatedProductName] = useState("");
  function getAllProductsAsSeller() {
    const listOfComp = [];

    getAllAddedProductsAsSeller(
      `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`
    ).then((res) => {
      if (res.products) {
        let productsList = res.products;
        productsList.map((element) => {
          listOfComp.push(element);
        });
        setListOfCompState(listOfComp);
      }
    });
  }

  async function addProductFunction() {
    if (productname !== "") {
      const newProductInfo = { name: productname };
      if (
        localStorage.getItem("auth") &&
        JSON.parse(localStorage.getItem("auth")).token
      ) {
        let res = await addProductServiceAsSeller(
          newProductInfo,
          `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`
        );

        if (res) {
          if (!res.msg) {
            alert(`Product ${res.productname} added`);
            window.location.reload();
          } else {
            alert(`${res.msg}`);
          }
        }
      }
    }
  }

  async function updateProductAsSellerFunction() {
    if (updateState !== "") {
      const newInfo = {
        name: updatedProductName,
      };
      let res = await updateProductServiceAsSeller(newInfo, updateState, token);
      if (res) {
        if (!res.msg) {
          let newListOfCompState = listOfCompState.filter((element) => {
            if (element._id !== res.product._id) {
              return true;
            } else {
              return false;
            }
          });

          newListOfCompState.push(res.product);
          setListOfCompState(newListOfCompState);
          setUpdateState("");
        }
      }
    }
  }

  async function deleteProductAsSellerFunction(productId) {
    if (productId) {
      let res = await deleteProductServiceAsSeller(productId, token);
      if (res) {
        if (res.productid) {
          let newListOfCompState = listOfCompState.filter((element) => {
            if (element._id !== res.productid) {
              return true;
            } else {
              return false;
            }
          });
          setListOfCompState(newListOfCompState);
        } else if (res.msg) {
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
      getAllProductsAsSeller();
    }
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "solid",
          borderRadius: "8px",
          borderColor: "darkblue",
          borderWidth: "1px",
          padding: "20px",
          margin: "8px",
        }}
      >
        <div className="auth-comp-container">
          <label className="auth-comp-descriptor-label">Enter Product</label>
          <div className="auth-comp-input-sections">
            <label className="auth-comp-labels">Product Name:</label>
            <input
              type="text"
              placeholder="Type here"
              className="auth-comp-input"
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
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
            onClick={addProductFunction}
          >
            Enter Product
          </button>
        </div>
      </div>

      {updateState !== "" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "solid",
            borderRadius: "8px",
            borderColor: "darkblue",
            borderWidth: "1px",
            padding: "20px",
            margin: "8px",
          }}
        >
          <div className="auth-comp-container">
            <label className="auth-comp-descriptor-label">
              Update {updateProduct}
            </label>
            <div className="auth-comp-input-sections">
              <label className="auth-comp-labels">Product Name:</label>
              <input
                type="text"
                placeholder="Type here"
                className="auth-comp-input"
                onChange={(e) => setUpdatedProductName(e.target.value)}
              />
            </div>
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
              onClick={updateProductAsSellerFunction}
            >
              Update Product
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
              onClick={() => setUpdateState("")}
            >
              Cancel
            </button>
          </div>
        </div>
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
                  <h4>{element.name}</h4>
                  <img src={imageIcon} width={200} height={200} />
                  <i>{element.seller.name}</i>
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
                      setUpdateState(element._id);
                      setUpdateProduct(element.name);
                    }}
                  >
                    Update
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
                      deleteProductAsSellerFunction(element._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
