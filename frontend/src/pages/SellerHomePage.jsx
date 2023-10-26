import { useEffect } from "react";
import HeaderComp from "../components/HeaderComp";
import ProductSellerComp from "../components/ProductSellerComp";
import { useNavigate } from "react-router-dom";

export default function SellerHomePage(props) {
  const listOfMenuItems = ["Home", "Profile", "Orders", "Logout"];

  const navigate = useNavigate();
  const {
    showAuthCompState,
    setShowAuthCompState,
    userInfoState,
    setUserInfoState,
  } = props;

  useEffect(() => {
    if (
      !localStorage.getItem("auth") ||
      !JSON.parse(localStorage.getItem("auth")).token
    ) {
      navigate("/");
    } else {
      navigate("");
    }
  }, []);

  return (
    <>
      <HeaderComp
        listOfMenuItems={listOfMenuItems}
        usertype={"seller"}
        showAuthCompState={showAuthCompState}
        setShowAuthCompState={setShowAuthCompState}
        userInfoState={userInfoState}
        setUserInfoState={setUserInfoState}
      />
      <div style={{ paddingTop: "80px" }}>
        <ProductSellerComp />
      </div>
    </>
  );
}
