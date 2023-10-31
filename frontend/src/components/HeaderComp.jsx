import { useEffect, useState } from "react";
import "../assets/appcomponents.css";
import ProfileMenuComp from "./ProfileMenuComp";
import { useNavigate } from "react-router-dom";
import { getProfileInfoService } from "../services/profileServices";
import CartNotificationComp from "./CartNotificationComp";
import cartIcon from "../assets/cartIcon.svg";

export default function HeaderComp(props) {
  const {
    listOfMenuItems,
    usertype,
    pagename,
    numberOfCartItems,
    showAuthCompState,
    setShowAuthCompState,
    userInfoState,
    setUserInfoState,
  } = props;
  const [profileIconClickState, setProfileIconClickState] = useState(false);

  function profileMenu() {
    if (profileIconClickState === true) {
      setProfileIconClickState(false);
    } else {
      setProfileIconClickState(true);
    }
  }

  const navigate = useNavigate();

  async function getProfileInfoFunction(token) {
    let res = await getProfileInfoService(token);
    if (res) {
      if (!res.msg) {
        setUserInfoState(res);
      }
    }
  }

  useEffect(() => {
    if (
      localStorage.getItem("auth") &&
      JSON.parse(localStorage.getItem("auth")).token
    ) {
      getProfileInfoFunction(
        `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`
      );
    }
  }, []);

  return (
    <>
      <div className="header-container">
        {usertype === "buyer" && pagename !== "cart" ? (
          <div className="cart-icon" onClick={() => navigate("/buyer/cart")}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CartNotificationComp numberOfCartItems={numberOfCartItems} />
              <img style={{ height: "24px", width: "24px" }} src={cartIcon} />
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="profile-icon" onClick={profileMenu}>
          <i style={{ fontSize: "20px", color: "wheat" }}>
            {userInfoState.username ? userInfoState.username : "None"}
          </i>
        </div>
      </div>
      <div>
        {profileIconClickState ? (
          <>
            <ProfileMenuComp
              listOfMenuItems={listOfMenuItems}
              usertype={usertype}
              setShowAuthCompState={setShowAuthCompState}
              setUserInfoState={setUserInfoState}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
