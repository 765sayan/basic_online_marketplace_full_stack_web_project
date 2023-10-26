import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import BuyerHomePage from "./pages/BuyerHomePage";
import SellerHomePage from "./pages/SellerHomePage";
import ErrorPage from "./pages/ErrorPage";
import BuyerProductsPage from "./pages/BuyerProductsPage";
import SellerProductsPage from "./pages/SellerProductsPage";
import BuyerProfilePage from "./pages/BuyerProfilePage";
import SellerProfilePage from "./pages/SellerProfilePage";
import CartPage from "./pages/CartPage";
import { useEffect, useState } from "react";
import { getCartService } from "./services/cartServices";

function App() {
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);

  const [showAuthCompState, setShowAuthCompState] = useState(false);
  const [userInfoState, setUserInfoState] = useState({});

  async function getCartLength(token) {
    if (token) {
      let res = await getCartService(token);
      if (res) {
        if (!res.msg) {
          setNumberOfCartItems(res.length);
        }
      }
    }
  }

  useEffect(() => {
    if (
      localStorage.getItem("auth") &&
      JSON.parse(localStorage.getItem("auth")).token &&
      JSON.parse(localStorage.getItem("auth")).usertype === "user"
    ) {
      getCartLength(JSON.parse(localStorage.getItem("auth")).token);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/">
          <Route path="auth" element={<AuthPage />} />
          <Route
            path=""
            element={
              <BuyerHomePage
                numberOfCartItems={numberOfCartItems}
                setNumberOfCartItems={setNumberOfCartItems}
                showAuthCompState={showAuthCompState}
                setShowAuthCompState={setShowAuthCompState}
                userInfoState={userInfoState}
                setUserInfoState={setUserInfoState}
              />
            }
          />
        </Route>
        <Route path="/buyer">
          <Route
            path=""
            element={
              <BuyerHomePage
                numberOfCartItems={numberOfCartItems}
                setNumberOfCartItems={setNumberOfCartItems}
                showAuthCompState={showAuthCompState}
                setShowAuthCompState={setShowAuthCompState}
                userInfoState={userInfoState}
                setUserInfoState={setUserInfoState}
              />
            }
          />
          <Route
            path="orders"
            element={
              <BuyerProductsPage
                numberOfCartItems={numberOfCartItems}
                showAuthCompState={showAuthCompState}
                setShowAuthCompState={setShowAuthCompState}
                userInfoState={userInfoState}
                setUserInfoState={setUserInfoState}
              />
            }
          />
          <Route
            path="profile"
            element={
              <BuyerProfilePage
                numberOfCartItems={numberOfCartItems}
                showAuthCompState={showAuthCompState}
                setShowAuthCompState={setShowAuthCompState}
                userInfoState={userInfoState}
                setUserInfoState={setUserInfoState}
              />
            }
          />
          <Route
            path="cart"
            element={
              <CartPage
                numberOfCartItems={numberOfCartItems}
                setNumberOfCartItems={setNumberOfCartItems}
                showAuthCompState={showAuthCompState}
                setShowAuthCompState={setShowAuthCompState}
                userInfoState={userInfoState}
                setUserInfoState={setUserInfoState}
              />
            }
          />
        </Route>
        <Route path="/seller">
          <Route
            path=""
            element={
              <SellerHomePage
                showAuthCompState={showAuthCompState}
                setShowAuthCompState={setShowAuthCompState}
                userInfoState={userInfoState}
                setUserInfoState={setUserInfoState}
              />
            }
          />
          <Route
            path="orders"
            element={
              <SellerProductsPage
                showAuthCompState={showAuthCompState}
                setShowAuthCompState={setShowAuthCompState}
                userInfoState={userInfoState}
                setUserInfoState={setUserInfoState}
              />
            }
          />
          <Route
            path="profile"
            element={
              <SellerProfilePage
                showAuthCompState={showAuthCompState}
                setShowAuthCompState={setShowAuthCompState}
                userInfoState={userInfoState}
                setUserInfoState={setUserInfoState}
              />
            }
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;