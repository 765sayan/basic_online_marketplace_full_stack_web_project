import { useEffect, useState } from "react";
import CenterComp from "../components/CenterComp";
import HeaderComp from "../components/HeaderComp";
import { useNavigate } from "react-router-dom";
import AuthPage from "./AuthPage";

export default function BuyerHomePage(props) {
  let listOfMenuItems = ["Home", "Profile", "Orders", "Logout"];
  const navigate = useNavigate();

  const {
    numberOfCartItems,
    setNumberOfCartItems,
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
      if (JSON.parse(localStorage.getItem("auth")).usertype === "user") {
        navigate("");
      } else {
        navigate("/seller");
      }
    }
  }, []);

  if (!localStorage.getItem("auth")) {
    listOfMenuItems = ["Sign In"];
  }

  return (
    <>
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
            <CenterComp
              numberOfCartItems={numberOfCartItems}
              setNumberOfCartItems={setNumberOfCartItems}
              showAuthCompState={showAuthCompState}
              setShowAuthCompState={setShowAuthCompState}
            />
          </div>
        </div>
      </div>
    </>
  );
}
