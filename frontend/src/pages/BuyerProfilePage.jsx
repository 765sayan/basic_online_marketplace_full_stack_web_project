import { useEffect, useState } from "react";
import HeaderComp from "../components/HeaderComp";
import { useNavigate } from "react-router-dom";
import {
  deleteProfileInfoService,
  getProfileInfoService,
  updateProfileInfoService,
} from "../services/profileServices";

export default function SellerProfilePage(props) {
  const listOfMenuItems = ["Home", "Profile", "Orders", "Logout"];
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [name, setName] = useState("");
  const [usertype, serUserType] = useState("0");
  const [token, setToken] = useState("");
  const [userProfileInfoState, setUserProfileInfoState] = useState({});

  const {
    showAuthCompState,
    setShowAuthCompState,
    userInfoState,
    setUserInfoState,
    numberOfCartItems,
  } = props;

  async function getProfileInfoFunction(token) {
    let res = await getProfileInfoService(token);
    if (res) {
      if (!res.msg) {
        setUserProfileInfoState(res);
      } else {
        alert(res.msg);
      }
    }
  }

  async function updateSellerProfileData() {
    if (token !== "") {
      const newUserInfo = {
        username,
        usertype,
        password,
        name,
      };

      let res = await updateProfileInfoService(newUserInfo, token);
      if (res) {
        if (!res.msg) {
          localStorage.removeItem("auth");
          navigate("/");
        } else {
          alert(res.msg);
        }
      }
    }
  }

  async function deleteSellerProfileData() {
    if (token !== "") {
      let res = await deleteProfileInfoService(token);

      if (res) {
        if (!res.msg) {
          localStorage.removeItem("auth");
          navigate("/");
        } else {
          alert(res.msg);
        }
      }
    }
  }

  useEffect(() => {
    if (
      !localStorage.getItem("auth") ||
      !JSON.parse(localStorage.getItem("auth")).token
    ) {
      navigate("/");
    } else {
      getProfileInfoFunction(
        `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`
      );
      setToken(`Bearer ${JSON.parse(localStorage.getItem("auth")).token}`);
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
            alignItems: "center",
            justifyContent: "center",
            border: "solid",
            borderColor: "darkblue",
            borderRadius: "8px",
            borderWidth: "1px",
            margin: "8px",
          }}
        >
          <div className="auth-comp-container">
            <label className="auth-comp-descriptor-label">
              Your Profile Info As Buyer
            </label>
            <div className="auth-comp-input-sections">
              <label className="auth-comp-labels">Username:</label>
              <input
                type="text"
                placeholder="Type here"
                className="auth-comp-input"
                defaultValue={userProfileInfoState.username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="auth-comp-input-sections">
              <label className="auth-comp-labels">Password:</label>
              <input
                type="password"
                placeholder="Type here"
                className="auth-comp-input"
                onChange={(e) => setPassWord(e.target.value)}
              />
            </div>
            <div className="auth-comp-input-sections">
              <label className="auth-comp-labels">Name: </label>
              <input
                type="text"
                placeholder="Type here"
                className="auth-comp-input"
                defaultValue={userProfileInfoState.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="auth-comp-input-sections">
              <label className="auth-comp-labels">
                You are a{" "}
                {userProfileInfoState.usertype === "user" ? "Buyer" : "Seller"},
                to change user type:{" "}
              </label>
              <select
                className="auth-comp-input"
                onChange={(e) => serUserType(e.target.value)}
              >
                <option value="0">Buyer</option>
                <option value="1">Seller</option>
              </select>
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
              onClick={updateSellerProfileData}
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
              onClick={deleteSellerProfileData}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
