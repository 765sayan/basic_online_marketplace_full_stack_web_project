import { LOGIN_URL, REGISTER_URL } from "../apiUrls/authUrls";

export const loginService = async (loginInfo) => {
  if (loginInfo) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    };

    let res = await fetch(LOGIN_URL, options);
    res = await res.json();
    return res;
  }
};

export const registerService = async (registerInfo) => {
  if (registerInfo) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerInfo),
    };

    let res = await fetch(REGISTER_URL, options);
    res = await res.json();
    return res;
  }
};
