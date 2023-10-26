import { useEffect, useState } from "react";
import "../assets/authpage.css";
import LoginComp from "../components/LoginComp";
import RegisterComp from "../components/RegisterComp";
import { useNavigate } from "react-router-dom";

export default function AuthPage(props) {
  const navigate = useNavigate();
  const [loginOrRegisterState, setLoginOrRegisterState] = useState(false);
  const { setShowAuthCompState, setUserInfoState } = props;

  useEffect(() => {
    if (
      localStorage.getItem("auth") &&
      JSON.parse(localStorage.getItem("auth")).usertype === "user"
    ) {
      navigate("/buyer");
    } else if (
      localStorage.getItem("auth") &&
      JSON.parse(localStorage.getItem("auth")).usertype === "admin"
    ) {
      navigate("/seller");
    } else {
      navigate("");
    }
  }, []);

  return (
    <div className="auth-page-container">
      <div className="container">
        <div className="card">
          {loginOrRegisterState === false ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={() => setLoginOrRegisterState(true)}
                  style={{
                    fontSize: "20px",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    marginTop: "8px",
                    padding: "4px",
                    cursor: "pointer",
                  }}
                >
                  New Here Register
                </button>
                <button
                  onClick={() => setShowAuthCompState(false)}
                  style={{
                    fontSize: "20px",
                    color: "darkblue",
                    marginTop: "4px",
                    marginLeft: "20px",
                  }}
                >
                  X
                </button>
              </div>
              <LoginComp
                setShowAuthCompState={setShowAuthCompState}
                setUserInfoState={setUserInfoState}
              />
            </>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={() => setLoginOrRegisterState(false)}
                  style={{
                    fontSize: "20px",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    marginTop: "8px",
                    padding: "4px",
                    cursor: "pointer",
                  }}
                >
                  Already Have Account Login
                </button>
                <button
                  onClick={() => setShowAuthCompState(false)}
                  style={{
                    fontSize: "20px",
                    color: "darkblue",
                    marginTop: "4px",
                    marginLeft: "20px",
                  }}
                >
                  X
                </button>
              </div>
              <RegisterComp setShowAuthCompState={setShowAuthCompState} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
