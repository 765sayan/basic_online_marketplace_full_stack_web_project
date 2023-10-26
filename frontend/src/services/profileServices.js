import {
  DELETE_PROFILE_URL,
  GET_PROFILE_URL,
  UPDATE_PROFILE_URL,
} from "../apiUrls/profileUrls";

export const getProfileInfoService = async (token) => {
  if (token) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    };

    let res = await fetch(GET_PROFILE_URL, options);
    res = await res.json();

    if (res) {
      return res;
    }
  }
};

export const updateProfileInfoService = async (newInfo, token) => {
  if (newInfo && token) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
      body: JSON.stringify(newInfo),
    };

    let res = await fetch(UPDATE_PROFILE_URL, options);
    res = await res.json();

    if (res) {
      return res;
    }
  }
};

export const deleteProfileInfoService = async (token) => {
  if (token) {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    };

    let res = await fetch(DELETE_PROFILE_URL, options);
    res = await res.json();

    if (res) {
      return res;
    }
  }
};
