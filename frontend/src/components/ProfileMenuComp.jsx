import { useNavigate } from "react-router-dom";
import "../assets/appcomponents.css";

export default function ProfileMenuComp(props) {
  const { listOfMenuItems, usertype, setShowAuthCompState, setUserInfoState } =
    props;
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("auth");
    setShowAuthCompState(false);
    let state = { username: "None" };
    setUserInfoState(state);
    window.location.reload();
    navigate("/");
  }

  return (
    <div className="profile-menu">
      <ul>
        {listOfMenuItems
          ? listOfMenuItems.map((element, index) => {
              if (element === "Logout") {
                return (
                  <li key={index}>
                    <button className="profile-menu-btn" onClick={logout}>
                      {element}
                    </button>
                  </li>
                );
              } else {
                return (
                  <li key={index}>
                    <button
                      className="profile-menu-btn"
                      onClick={() => {
                        if (element === "Home") {
                          navigate(`/${usertype}`);
                        } else if (element === "Sign In") {
                          // navigate(`/`);
                          setShowAuthCompState(true);
                        } else {
                          navigate(`/${usertype}/${element.toLowerCase()}`);
                        }
                      }}
                    >
                      {element}
                    </button>
                  </li>
                );
              }
            })
          : ""}
      </ul>
    </div>
  );
}
