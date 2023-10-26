import { useEffect } from "react";
import HeaderComp from "../components/HeaderComp";
import { useNavigate } from "react-router-dom";
import UserProductsPageCenterComp from "../components/UserProductsPageCenterComp";

export default function BuyerProductsPage(props) {
  const listOfMenuItems = ["Home", "Profile", "Orders", "Logout"];
  const navigate = useNavigate();

  const {
    showAuthCompState,
    setShowAuthCompState,
    userInfoState,
    setUserInfoState,
    numberOfCartItems,
  } = props;

  useEffect(() => {
    if (
      !localStorage.getItem("auth") ||
      !JSON.parse(localStorage.getItem("auth")).token
    ) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <HeaderComp
        listOfMenuItems={listOfMenuItems}
        usertype={"buyer"}
        numberOfCartItems={numberOfCartItems}
        showAuthCompState={showAuthCompState}
        setShowAuthCompState={setShowAuthCompState}
        userInfoState={userInfoState}
        setUserInfoState={setUserInfoState}
      />
      <div style={{ paddingTop: "80px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <b style={{ fontSize: "20px" }}>Your Orders</b>
          <UserProductsPageCenterComp />
        </div>
      </div>
    </>
  );
}
