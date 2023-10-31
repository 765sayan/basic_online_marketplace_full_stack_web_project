import { useState } from "react";
import "../assets/authcomponents.css";
import { registerService } from "../services/authServices";
import { useNavigate } from "react-router-dom";

export default function RegisterComp(props) {
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [name, setName] = useState("");
  const [usertype, serUserType] = useState("0");

  const { setShowAuthCompState } = props;

  const navigate = useNavigate();

  async function registerFunction() {
    if (username !== "" && password !== "" && name !== "") {
      const newRegisterInfo = { username, password, name, usertype };

      let res = await registerService(newRegisterInfo);
    }
  }

  return (
    <div className="auth-comp-container">
      <label className="auth-comp-descriptor-label">
        Register If Your Are New Here
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
      <div className="auth-comp-input-sections">
        <label className="auth-comp-labels">Name: </label>
        <input
          type="text"
          placeholder="Type here"
          className="auth-comp-input"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="auth-comp-input-sections">
        <label className="auth-comp-labels">Are you an admin or user: </label>
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
          backgroundColor: "darkblue",
          padding: "4px",
          borderRadius: "4px",
          color: "white",
          fontSize: "20px",
          margin: "8px",
          cursor: "pointer",
        }}
        onClick={registerFunction}
      >
        Register
      </button>
    </div>
  );
}
