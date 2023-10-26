import { useState } from "react";
import "../assets/productscomponents.css";
import FilterComp from "./FilterComp";
import ProductsComp from "./ProductsComp";
import AuthPage from "../pages/AuthPage";

export default function CenterComp(props) {
  const [filterCompState, setFilterCompState] = useState(false);
  const [sellerNameFilter, setSellerNameFilter] = useState("");
  const [productNameFilter, setProductNameFilter] = useState("");

  const {
    numberOfCartItems,
    setNumberOfCartItems,
    showAuthCompState,
    setShowAuthCompState,
  } = props;

  function setFilterCompStateFunction() {
    if (filterCompState === true) {
      setFilterCompState(false);
    } else {
      setFilterCompState(true);
    }
  }

  return (
    <>
      <div className="center-comp">
        <div className="filter-comp">
          <button
            style={{
              borderRadius: "8px",
              fontSize: "20px",
              cursor: "pointer",
              padding: "5px",
            }}
            onClick={setFilterCompStateFunction}
          >
            Filters
          </button>
          {filterCompState ? (
            <FilterComp
              setProductNameFilter={setProductNameFilter}
              setSellerNameFilter={setSellerNameFilter}
            />
          ) : (
            ""
          )}
        </div>
        <div
          style={{
            borderStyle: "none",
            borderRadius: "8px",
            border: "solid",
            borderWidth: "1px",
            margin: "10px",
          }}
        >
          <ProductsComp
            productNameFilter={productNameFilter}
            sellerNameFilter={sellerNameFilter}
            numberOfCartItems={numberOfCartItems}
            setNumberOfCartItems={setNumberOfCartItems}
            setShowAuthCompState={setShowAuthCompState}
          />
        </div>
      </div>
    </>
  );
}
