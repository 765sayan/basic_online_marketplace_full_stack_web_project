import {
  ADD_TO_CART,
  DELETE_CART,
  GET_CART,
  deleteFromCart,
} from "../apiUrls/cartUrls";

export const getCartService = async (token) => {
  if (token) {
    token = `Bearer ${token}`;

    const options = {
      method: "GET",
      headers: {
        auth: token,
      },
    };

    let res = await fetch(GET_CART, options);
    res = await res.json();

    if (res) {
      return res;
    }
  }
};

export const addToCartService = async (token, productid, sellerid) => {
  if (token && productid && sellerid) {
    // token = `Bearer ${token}`;

    let requestBody = {
      cartitem: {
        productid: productid,
        sellerid: sellerid,
      },
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
      body: JSON.stringify(requestBody),
    };

    let res = await fetch(ADD_TO_CART, options);
    res = await res.json();

    if (res) {
      return res;
    }
  }
};

export const deleteFromCartService = async (token, cartitemid) => {
  if (token && cartitemid) {
    // let token = `Bearer ${token}`;

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "applicaton/json",
        auth: token,
      },
    };

    let res = await fetch(deleteFromCart(cartitemid.toString()), options);
    res = await res.json();

    if (res) {
      return res;
    }
  }
};

export const deleteCartService = async (token) => {
  if (token) {
    // token = `Bearer ${token}`;

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    };

    let res = await fetch(DELETE_CART, options);
    res = await res.json();

    if (res) {
      return res;
    }
  }
};
