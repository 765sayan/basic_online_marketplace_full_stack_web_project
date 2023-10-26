import { useState } from "react";
import "../assets/authcomponents.css";
import { loginService } from "../services/authServices";
import { useNavigate } from "react-router-dom";

export default function LoginComp(props) {
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const { setShowAuthCompState, setUserInfoState } = props;
  const navigate = useNavigate();

  async function loginFunction() {
    if (username !== "" && password !== "") {
      const newLoginInfo = { username, password };
      let res = await loginService(newLoginInfo);
      if (!res.msg) {
        if (res.usertype) {
          const authKeyLocalStorage = {
            usertype: res.usertype,
            token: res.token,
          };
          localStorage.setItem("auth", JSON.stringify(authKeyLocalStorage));
          if (res.usertype === "user") {
            setShowAuthCompState(false);
            setUserInfoState({ username: res.username });
            window.location.reload();
            navigate("/buyer");
          } else {
            setShowAuthCompState(false);
            let state = { username: res.username };
            setUserInfoState(state);
            navigate("/seller");
          }
        }
      } else {
        alert(res.msg);
      }
    }
  }

  return (
    <div className="auth-comp-container">
      <label className="auth-comp-descriptor-label">
        Login To Your Account
      </label>
      <div className="auth-comp-input-sections">
        <label className="auth-comp-labels">Username:</label>
        <input
          type="text"
          placeholder="Type here"
          className="auth-comp-input"
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
      <button
        style={{
          backgroundColor: "darkblue",
          padding: "4px",
          borderRadius: "4px",
          color: "white",
          fontSize: "20px",
          margin: "8px",
          cursor: "pointer",
        }}
        onClick={loginFunction}
      >
        Login
      </button>
    </div>
  );
}
