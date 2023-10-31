import imageIcon from "../assets/imageIcon.svg";
import "../assets/productscomponents.css";
import { useContext, useEffect, useState } from "react";
import {
  buyProduct,
  getAllProductsAsUserService,
  getCollectionOfProductsService,
} from "../services/userProductsServices";
import { addToCartService } from "../services/cartServices";
import { PageNoContext, SetPageNoContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function ProductsComp(props) {
  const [productClickedState, setProductClickedStated] = useState([]);
  const [listOfCompState, setListOfCompState] = useState([]);
  const [token, setToken] = useState("");
  const [totalListOfCompLength, setTotalListOfCompLength] = useState(0);
  const [totalLengthList, setTotalLengthList] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const {
    productNameFilter,
    sellerNameFilter,
    numberOfCartItems,
    setNumberOfCartItems,
    setShowAuthCompState,
  } = props;

  const navigate = useNavigate();

  function getAllProductsAsUser() {
    let totalLengthArray = [];

    getAllProductsAsUserService().then((res) => {
      if (res.products) {
        let productsList = res.products;
        let totalLength = Math.floor(productsList / 8);
        setTotalListOfCompLength(totalLength);
        for (let i = 0; i < totalLength; i++) {
          totalLengthArray.push(i);
        }
        setTotalLengthList(totalLengthArray);
      }
    });
  }

  const pageNoState = useContext(PageNoContext);
  const setPageNoState = useContext(SetPageNoContext);

  function fetchData(offset) {
    const listOfComp = [];
    let limit = 8;

    setPageNo(offset);
    setPageNoState(offset);
    if (offset !== 0) {
      getCollectionOfProductsService(limit, offset * 8).then((res) => {
        if (res && res.products) {
          let productsList = res.products;
          productsList.map((element) => {
            listOfComp.push(element);
          });

          setListOfCompState(listOfComp);
        }
      });
    } else if (offset === 0) {
      getCollectionOfProductsService(limit, 0).then((res) => {
        if (res && res.products) {
          let productsList = res.products;
          productsList.map((element) => {
            listOfComp.push(element);
          });

          setListOfCompState(listOfComp);
        }
      });
    }
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
    }
  }

  function goToDetailsPage(id, productName, sellerName, sellerId) {
    if (id && productName && sellerName && sellerId) {
      navigate("/details", {
        state: {
          id: id,
          productName: productName,
          sellerName: sellerName,
          sellerId: sellerId,
        },
      });
    }
  }

  useEffect(() => {
    if (
      localStorage.getItem("auth") &&
      JSON.parse(localStorage.getItem("auth")).token
    ) {
      setToken(`Bearer ${JSON.parse(localStorage.getItem("auth")).token}`);
      getAllProductsAsUser();
      if (pageNoState !== undefined) {
        fetchData(pageNoState);
      } else {
        fetchData(0);
      }
    } else {
      getAllProductsAsUser();
      if (pageNoState !== undefined) {
        fetchData(pageNoState);
      } else {
        fetchData(0);
      }
    }
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
                          goToDetailsPage(
                            element._id,
                            element.name,
                            element.seller.name,
                            element.seller._id
                          );
                        }}
                      >
                        See Details
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
                        goToDetailsPage(
                          element._id,
                          element.name,
                          element.seller.name,
                          element.seller._id
                        );
                      }}
                    >
                      See Details
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {totalLengthList.map((element, index) => {
          if (
            element === 0 ||
            element === 1 ||
            element === pageNo + 1 ||
            element === pageNo ||
            element === pageNo - 1 ||
            element === totalListOfCompLength - 1 ||
            element === totalLengthList
          ) {
            if (element === pageNo + 1 || element === pageNo - 1) {
              if (element === pageNo - 1 && pageNo - 1 !== 0) {
                return (
                  <div key={index}>
                    {pageNo === element ? (
                      <div
                        style={{
                          fontSize: "20px",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          cursor: "pointer",
                          color: "blue",
                        }}
                        onClick={() => fetchData(element)}
                      >
                        {" . . . "}
                        {element}
                      </div>
                    ) : (
                      <div
                        style={{
                          fontSize: "20px",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => fetchData(element)}
                      >
                        {" . . . "}
                        {element}
                      </div>
                    )}
                  </div>
                );
              } else if (
                element === pageNo + 1 &&
                pageNo + 1 !== totalListOfCompLength - 1
              ) {
                return (
                  <div key={index}>
                    {pageNo === element ? (
                      <div
                        style={{
                          fontSize: "20px",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          cursor: "pointer",
                          color: "blue",
                        }}
                        onClick={() => fetchData(element)}
                      >
                        {element}
                        {" . . . "}
                      </div>
                    ) : (
                      <div
                        style={{
                          fontSize: "20px",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => fetchData(element)}
                      >
                        {element}
                        {" . . . "}
                      </div>
                    )}
                  </div>
                );
              } else {
                return (
                  <div key={index}>
                    {pageNo === element ? (
                      <div
                        style={{
                          fontSize: "20px",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          cursor: "pointer",
                          color: "blue",
                        }}
                        onClick={() => fetchData(element)}
                      >
                        {element}
                      </div>
                    ) : (
                      <div
                        style={{
                          fontSize: "20px",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => fetchData(element)}
                      >
                        {element}
                      </div>
                    )}
                  </div>
                );
              }
            } else {
              return (
                <div key={index}>
                  {pageNo === element ? (
                    <div
                      style={{
                        fontSize: "20px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        cursor: "pointer",
                        color: "blue",
                      }}
                      onClick={() => fetchData(element)}
                    >
                      {element}
                    </div>
                  ) : (
                    <div
                      style={{
                        fontSize: "20px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => fetchData(element)}
                    >
                      {element}
                    </div>
                  )}
                </div>
              );
            }
          } else {
            return <div key={index}>{""}</div>;
          }
        })}

        <div
          style={{
            fontSize: "20px",
            paddingLeft: "10px",
            paddingRight: "10px",
            cursor: "pointer",
          }}
          onClick={() => fetchData(totalLengthList.length)}
        >
          More ...
        </div>
      </div>
    </>
  );
}
